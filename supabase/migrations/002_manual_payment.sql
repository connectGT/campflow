-- ============================================================
-- CampFlow — Manual & AI Payment Verification Update
-- ============================================================

-- 1. Update Registrations table
ALTER TABLE public.registrations 
  ADD COLUMN utr_number text UNIQUE,
  ADD COLUMN proof_image_url text,
  ADD COLUMN ai_confidence float,
  ADD COLUMN verification_log jsonb DEFAULT '{}'::jsonb,
  ADD COLUMN manual_verified_by uuid REFERENCES auth.users(id),
  ADD COLUMN rejection_reason text;

-- 2. Update payment_status check constraint
ALTER TABLE public.registrations
  DROP CONSTRAINT registrations_payment_status_check;

ALTER TABLE public.registrations
  ADD CONSTRAINT registrations_payment_status_check 
  CHECK (payment_status IN ('pending', 'pending_approval', 'paid', 'failed'));

-- 3. Storage Setup (SQL helper for Policies)
-- Note: Create a bucket named 'payment-proofs' in Supabase Dashboard first.
-- The following policies assume the bucket exists.

INSERT INTO storage.buckets (id, name, public) 
VALUES ('payment-proofs', 'payment-proofs', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Allow public read for proofs"
ON storage.objects FOR SELECT
USING (bucket_id = 'payment-proofs');

CREATE POLICY "Allow authenticated upload for proofs"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'payment-proofs');
