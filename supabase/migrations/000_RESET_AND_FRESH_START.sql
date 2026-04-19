-- ============================================================
-- DHEERA SPORTS CAMP — FULL RESET & FRESH DATABASE SETUP
-- Run this ONCE in Supabase SQL Editor → SQL
-- This will DROP all existing data and start fresh.
-- ============================================================

-- ============================================================
-- STEP 1: DROP EVERYTHING (Clean Slate)
-- ============================================================

DROP VIEW IF EXISTS public.realtime_sport_capacity CASCADE;
DROP TABLE IF EXISTS public.seat_reservations CASCADE;
DROP TABLE IF EXISTS public.registrations CASCADE;
DROP TABLE IF EXISTS public.children CASCADE;
DROP TABLE IF EXISTS public.sports CASCADE;
DROP TABLE IF EXISTS public.whatsapp_sessions CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Drop trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();


-- ============================================================
-- STEP 2: PROFILES
-- Auto-created on Google/Email login via trigger
-- ============================================================

CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name text,
  email text,
  phone text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Service role can read all profiles (for admin dashboard)
CREATE POLICY "Service role can read all profiles"
  ON public.profiles FOR SELECT
  USING (true);

-- Trigger: auto-create profile row on new signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.email
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ============================================================
-- STEP 3: CHILDREN
-- ============================================================

CREATE TABLE public.children (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  age int CHECK (age >= 4 AND age <= 22),
  grade text,   -- school / class
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.children ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Parents can view own children"
  ON public.children FOR SELECT
  USING (auth.uid() = parent_id);

CREATE POLICY "Parents can insert own children"
  ON public.children FOR INSERT
  WITH CHECK (auth.uid() = parent_id);

CREATE POLICY "Parents can update own children"
  ON public.children FOR UPDATE
  USING (auth.uid() = parent_id);

-- Service role can read all (for admin dashboard)
CREATE POLICY "Service role can read all children"
  ON public.children FOR SELECT
  USING (true);


-- ============================================================
-- STEP 4: SEAT RESERVATIONS (Cart Timer Locks)
-- Holds a 10-min lock when a parent adds sport to cart
-- ============================================================

CREATE TABLE public.seat_reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sport_id text NOT NULL,        -- e.g. 'swimming'
  slot_id text NOT NULL,         -- 'slot_1', 'slot_2', 'slot_3'
  session_id text NOT NULL,      -- frontend cart session id
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.seat_reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public full access for reservations"
  ON public.seat_reservations FOR ALL
  USING (true);


-- ============================================================
-- STEP 5: REGISTRATIONS
-- One row = one child's full registration
-- ============================================================

CREATE TABLE public.registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  child_id uuid REFERENCES public.children(id) ON DELETE CASCADE NOT NULL,

  -- Time-slot sport assignments
  slot_1_sport text,   -- 7:00–8:00 AM
  slot_2_sport text,   -- 8:00–9:00 AM
  slot_3_sport text,   -- 9:00–10:00 AM

  -- Payment
  amount int DEFAULT 12000,
  payment_status text DEFAULT 'pending'
    CHECK (payment_status IN ('pending', 'pending_approval', 'paid', 'failed', 'rejected')),
  utr_number text UNIQUE,
  proof_image_url text,

  -- Admin
  manual_verified_by uuid REFERENCES auth.users(id),
  rejection_reason text,

  -- Contact / Logistics
  transport_pickup text,
  emergency_contact_name text,
  emergency_contact_phone text,

  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Parents can view own registrations"
  ON public.registrations FOR SELECT
  USING (auth.uid() = parent_id);

CREATE POLICY "Parents can insert own registrations"
  ON public.registrations FOR INSERT
  WITH CHECK (auth.uid() = parent_id);

-- Service/admin can update (approve/reject)
CREATE POLICY "Service role can update registrations"
  ON public.registrations FOR UPDATE
  USING (true);

-- Service/admin can read all (admin dashboard)
CREATE POLICY "Service role can read all registrations"
  ON public.registrations FOR SELECT
  USING (true);

-- Service/admin can delete (rejection cleanup)
CREATE POLICY "Service role can delete registrations"
  ON public.registrations FOR DELETE
  USING (true);


-- ============================================================
-- STEP 6: REALTIME CAPACITY VIEW
-- Counts seats taken per sport per time-slot
-- Includes both confirmed (paid) and active cart reservations
-- ============================================================

CREATE OR REPLACE VIEW public.realtime_sport_capacity AS
SELECT
  sport_id,
  slot_id,
  SUM(seats_taken) AS total_seats_taken
FROM (
  -- Confirmed paid registrations (slot 1)
  SELECT slot_1_sport AS sport_id, 'slot_1' AS slot_id, 1 AS seats_taken
  FROM public.registrations
  WHERE payment_status IN ('paid', 'pending_approval') AND slot_1_sport IS NOT NULL

  UNION ALL

  -- Confirmed paid registrations (slot 2)
  SELECT slot_2_sport AS sport_id, 'slot_2' AS slot_id, 1 AS seats_taken
  FROM public.registrations
  WHERE payment_status IN ('paid', 'pending_approval') AND slot_2_sport IS NOT NULL

  UNION ALL

  -- Confirmed paid registrations (slot 3)
  SELECT slot_3_sport AS sport_id, 'slot_3' AS slot_id, 1 AS seats_taken
  FROM public.registrations
  WHERE payment_status IN ('paid', 'pending_approval') AND slot_3_sport IS NOT NULL

  UNION ALL

  -- Active cart reservations (still within 10-min window)
  SELECT sport_id, slot_id, 1 AS seats_taken
  FROM public.seat_reservations
  WHERE expires_at > now()

) AS unified_seats
GROUP BY sport_id, slot_id;


-- ============================================================
-- STEP 7: STORAGE BUCKET FOR PAYMENT SCREENSHOTS
-- ============================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('payment-proofs', 'payment-proofs', true)
ON CONFLICT (id) DO NOTHING;

-- Public read (admin can view screenshots)
DROP POLICY IF EXISTS "Allow public read for proofs" ON storage.objects;
CREATE POLICY "Allow public read for proofs"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'payment-proofs');

-- Authenticated users can upload their own screenshots
DROP POLICY IF EXISTS "Allow authenticated upload for proofs" ON storage.objects;
CREATE POLICY "Allow authenticated upload for proofs"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'payment-proofs');


-- ============================================================
-- DONE ✅
-- Database is ready. Vercel/Next.js will handle the rest.
-- ============================================================
