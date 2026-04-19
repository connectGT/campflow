-- ============================================================
-- MIGRATION: Add new fields from Google Form
-- Run in Supabase SQL Editor (safe to run on existing DB)
-- ============================================================

-- Add new fields to children table
ALTER TABLE public.children 
  ADD COLUMN IF NOT EXISTS gender text CHECK (gender IN ('male', 'female', 'other')),
  ADD COLUMN IF NOT EXISTS date_of_birth date,
  ADD COLUMN IF NOT EXISTS father_name text,
  ADD COLUMN IF NOT EXISTS mother_name text;

-- Add new fields to registrations table
ALTER TABLE public.registrations
  ADD COLUMN IF NOT EXISTS whatsapp_number text,
  ADD COLUMN IF NOT EXISTS full_address text;

-- ============================================================
-- DONE ✅ — New columns added without dropping existing data
-- ============================================================
