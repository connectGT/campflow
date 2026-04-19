-- ============================================================
-- MIGRATION 005: New form fields + student photo
-- Run in Supabase SQL Editor (safe — ADD IF NOT EXISTS)
-- ============================================================

ALTER TABLE public.children 
  ADD COLUMN IF NOT EXISTS gender text CHECK (gender IN ('male', 'female', 'other')),
  ADD COLUMN IF NOT EXISTS date_of_birth date,
  ADD COLUMN IF NOT EXISTS father_name text,
  ADD COLUMN IF NOT EXISTS mother_name text,
  ADD COLUMN IF NOT EXISTS photo_url text;

ALTER TABLE public.registrations
  ADD COLUMN IF NOT EXISTS whatsapp_number text,
  ADD COLUMN IF NOT EXISTS full_address text;

-- Storage bucket for student photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('student-photos', 'student-photos', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Allow public read for student photos" ON storage.objects;
CREATE POLICY "Allow public read for student photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'student-photos');

DROP POLICY IF EXISTS "Allow authenticated upload for student photos" ON storage.objects;
CREATE POLICY "Allow authenticated upload for student photos"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'student-photos');

-- ============================================================
-- DONE ✅
-- ============================================================
