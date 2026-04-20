-- ============================================================
-- DHEERA CAMPFLOW: V1 PRODUCTION DATA RESET SCRIPT
-- Run this in Supabase SQL Editor -> New Query
--
-- Safely truncates all test data (registrations, children, etc)
-- but KEEPS your database schema, sports, and admins intact!
-- ============================================================

-- Disable triggers and constraints temporarily to allow clean cascade deletion
SET session_replication_role = 'replica';

-- 1. Clear all active Cart/Seat Reservations
TRUNCATE TABLE public.seat_reservations CASCADE;

-- 2. Clear all form submissions and payment proofs
TRUNCATE TABLE public.registrations CASCADE;

-- 3. Clear all child data 
TRUNCATE TABLE public.children CASCADE;

-- 4. Clear all WhatsApp bot routing states
TRUNCATE TABLE public.whatsapp_sessions CASCADE;

-- Note: We DO NOT truncate public.profiles or auth.users 
-- This ensures you as the Admin do not lose your login, 
-- and parents who simply logged in via OTP don't have to verify again.

-- OPTIONAL: If you DO want to completely wipe all parent accounts, uncomment below:
-- DELETE FROM auth.users;

-- Re-enable constraints
SET session_replication_role = 'origin';

-- ============================================================
-- SUCCESS: Your Dheera CampFlow is now clean and ready for Launch!
-- ============================================================
