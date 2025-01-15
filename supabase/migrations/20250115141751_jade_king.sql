/*
  # Registration System Updates

  1. Changes
    - Added pdf_url column to registrations table (if not exists)
    - Added storage folder structure for better organization
    - Updated file size and validation settings
    - Added registration deadline

  2. Storage
    - Created folders for better organization:
      - /comprovantes: For uploaded documents
      - /inscricoes: For generated PDFs

  3. Notes
    - Max file size reduced to 1MB
    - Registration deadline set to 31/01/2025
    - Phone validation removed but mask maintained
*/

-- Ensure pdf_url column exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'registrations' 
    AND column_name = 'pdf_url'
  ) THEN
    ALTER TABLE registrations 
    ADD COLUMN pdf_url text;
  END IF;
END $$;

-- Create storage folders if they don't exist
DO $$
BEGIN
  -- Create comprovantes folder
  IF NOT EXISTS (
    SELECT 1 FROM storage.objects 
    WHERE bucket_id = 'comprovantes' 
    AND name = 'comprovantes/.keep'
  ) THEN
    INSERT INTO storage.objects (bucket_id, name, owner, created_at, updated_at, metadata)
    VALUES ('comprovantes', 'comprovantes/.keep', auth.uid(), now(), now(), '{"contentType": "text/plain"}');
  END IF;

  -- Create inscricoes folder
  IF NOT EXISTS (
    SELECT 1 FROM storage.objects 
    WHERE bucket_id = 'comprovantes' 
    AND name = 'inscricoes/.keep'
  ) THEN
    INSERT INTO storage.objects (bucket_id, name, owner, created_at, updated_at, metadata)
    VALUES ('comprovantes', 'inscricoes/.keep', auth.uid(), now(), now(), '{"contentType": "text/plain"}');
  END IF;
END $$;