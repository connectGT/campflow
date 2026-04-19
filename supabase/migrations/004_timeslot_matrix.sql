-- ============================================================
-- CampFlow — Migration 004: Explicit Time-Slot Matrix
-- Run this in your Supabase SQL Editor (Dashboard → SQL)
-- ============================================================

-- 1. Drop existing view dependent on sports columns
DROP VIEW IF EXISTS public.realtime_sport_capacity;

-- 2. Wipe test data safely since schema is fundamentally altering
TRUNCATE TABLE public.seat_reservations;
TRUNCATE TABLE public.registrations CASCADE;

-- 3. Modify Registrations Table
ALTER TABLE public.registrations
  DROP COLUMN IF EXISTS sports,
  ADD COLUMN slot_1_sport text,
  ADD COLUMN slot_2_sport text,
  ADD COLUMN slot_3_sport text;

-- 4. Modify Seat Reservations Table
ALTER TABLE public.seat_reservations
  ADD COLUMN slot_id text not null;

-- 5. Recreate Capacity View grouping by sport AND slot!
CREATE OR REPLACE VIEW public.realtime_sport_capacity AS
SELECT 
  sport_id,
  slot_id,
  SUM(seats_taken) as total_seats_taken
FROM (
  -- Permanent completed registrations (Unpivoted into slots)
  SELECT slot_1_sport as sport_id, 'slot_1' as slot_id, 1 as seats_taken FROM public.registrations WHERE payment_status = 'paid' AND slot_1_sport IS NOT NULL
  UNION ALL
  SELECT slot_2_sport as sport_id, 'slot_2' as slot_id, 1 as seats_taken FROM public.registrations WHERE payment_status = 'paid' AND slot_2_sport IS NOT NULL
  UNION ALL
  SELECT slot_3_sport as sport_id, 'slot_3' as slot_id, 1 as seats_taken FROM public.registrations WHERE payment_status = 'paid' AND slot_3_sport IS NOT NULL

  UNION ALL

  -- Active Cart Reservations (unexpired)
  SELECT sport_id, slot_id, 1 as seats_taken
  FROM public.seat_reservations
  WHERE expires_at > now()
) as unified_seats
GROUP BY sport_id, slot_id;
