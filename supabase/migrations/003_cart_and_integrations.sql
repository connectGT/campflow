-- ============================================================
-- CampFlow — Migration 003: Cart Timers & Form Fields
-- Run this in your Supabase SQL Editor (Dashboard → SQL)
-- ============================================================

-- 1. Update existing registrations table to use text[] for sports
-- The frontend passes strings like ['badminton', 'football'] instead of UUIDs now.
ALTER TABLE public.registrations
  ALTER COLUMN sports TYPE text[] USING sports::text[];

-- 2. Add the newly requested form fields
ALTER TABLE public.children
  ADD COLUMN IF NOT EXISTS school text;

ALTER TABLE public.registrations
  ADD COLUMN IF NOT EXISTS transport_pickup text,
  ADD COLUMN IF NOT EXISTS emergency_contact_name text,
  ADD COLUMN IF NOT EXISTS emergency_contact_phone text;

-- 3. Create Seat Reservations Table (Cart Locking)
-- This holds a temporary lock for 10 minutes when a user adds a sport to cart.
CREATE TABLE IF NOT EXISTS public.seat_reservations (
  id uuid primary key default gen_random_uuid(),
  sport_id text not null,
  session_id text not null,
  expires_at timestamptz not null,
  created_at timestamptz default now()
);

-- RLS handles for reservations
ALTER TABLE public.seat_reservations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public full access via anon/server"
  ON public.seat_reservations FOR ALL
  USING (true);

-- 4. Create Capacity View
-- Determines how many seats are currently taken for a given sport by combining 
-- permanent 'paid' registrations and active 'in-cart' 10-minute reservations.
CREATE OR REPLACE VIEW public.realtime_sport_capacity AS
SELECT 
  sport_id,
  SUM(seats_taken) as total_seats_taken
FROM (
  -- Permanent completed registrations 
  SELECT unnest(sports) as sport_id, 1 as seats_taken
  FROM public.registrations
  WHERE payment_status = 'paid'

  UNION ALL

  -- Active Cart Reservations (unexpired)
  SELECT sport_id, 1 as seats_taken
  FROM public.seat_reservations
  WHERE expires_at > now()
) as unified_seats
GROUP BY sport_id;
