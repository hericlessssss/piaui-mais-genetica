/*
  # Fix storage bucket permissions

  1. Changes
    - Make comprovantes bucket public
    - Update storage policies to allow public access
    - Enable RLS for storage objects
*/

-- Update bucket to be public
UPDATE storage.buckets
SET public = true
WHERE id = 'comprovantes';

-- Enable RLS on objects table if not already enabled
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Anyone can upload files" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can download files" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update files" ON storage.objects;

-- Create new, more permissive policies
CREATE POLICY "Public upload to comprovantes"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'comprovantes');

CREATE POLICY "Public select from comprovantes"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'comprovantes');

CREATE POLICY "Public update in comprovantes"
ON storage.objects
FOR UPDATE
TO public
USING (bucket_id = 'comprovantes')
WITH CHECK (bucket_id = 'comprovantes');