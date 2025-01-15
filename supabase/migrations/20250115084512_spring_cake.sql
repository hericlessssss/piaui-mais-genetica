/*
  # Safe bucket creation and policies

  1. Changes
    - Safely create bucket if it doesn't exist
    - Ensure policies are created only if they don't exist
*/

DO $$ 
BEGIN
  -- Only create bucket if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'comprovantes'
  ) THEN
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('comprovantes', 'comprovantes', false);
  END IF;
END $$;

-- Safely create policies if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE policyname = 'Anyone can upload files' 
    AND tablename = 'objects' 
    AND schemaname = 'storage'
  ) THEN
    CREATE POLICY "Anyone can upload files"
    ON storage.objects
    FOR INSERT
    TO public
    WITH CHECK (
      bucket_id = 'comprovantes'
      AND (storage.foldername(name))[1] != 'private'
    );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE policyname = 'Anyone can download files' 
    AND tablename = 'objects' 
    AND schemaname = 'storage'
  ) THEN
    CREATE POLICY "Anyone can download files"
    ON storage.objects
    FOR SELECT
    TO public
    USING (bucket_id = 'comprovantes');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE policyname = 'Anyone can update files' 
    AND tablename = 'objects' 
    AND schemaname = 'storage'
  ) THEN
    CREATE POLICY "Anyone can update files"
    ON storage.objects
    FOR UPDATE
    TO public
    USING (bucket_id = 'comprovantes')
    WITH CHECK (bucket_id = 'comprovantes');
  END IF;
END $$;