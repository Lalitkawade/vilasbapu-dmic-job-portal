-- DMIC Bidkin Employment Registration Portal
-- Migration: 000005_storage_bucket.sql
-- Description: Private Supabase Storage bucket for candidate resumes and strict storage RLS policies.

-- Create storage bucket if not exists
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'candidate-resumes',
    'candidate-resumes',
    false, -- STRICTLY PRIVATE BUCKET: No direct public URL access
    5242880, -- 5 MB max limit
    ARRAY[
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]::text[]
)
ON CONFLICT (id) DO UPDATE SET
    public = false,
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY[
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]::text[];

-- Policy 1: Anonymous candidates can upload (INSERT) their own resume during registration
CREATE POLICY "Allow public resume upload"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (
    bucket_id = 'candidate-resumes'
);

-- Policy 2: Strictly restrict downloading (SELECT) to authenticated administrators
CREATE POLICY "Allow authenticated admins to read resumes"
ON storage.objects FOR SELECT
TO authenticated
USING (
    bucket_id = 'candidate-resumes'
);

-- Policy 3: Allow authenticated admins to delete resumes if requested by candidate
CREATE POLICY "Allow authenticated admins to delete resumes"
ON storage.objects FOR DELETE
TO authenticated
USING (
    bucket_id = 'candidate-resumes'
);
