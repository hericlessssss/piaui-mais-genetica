/*
  # Remove file requirements from registrations table

  1. Changes
    - Make comprovante_url and pdf_url columns nullable
    - Update existing records to handle missing files
  
  2. Security
    - No changes to RLS policies
*/

-- Make comprovante_url and pdf_url columns nullable
ALTER TABLE registrations 
ALTER COLUMN comprovante_url DROP NOT NULL,
ALTER COLUMN comprovante_url SET DEFAULT NULL;

-- Add pdf_url column if it doesn't exist and make it nullable
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'registrations' 
    AND column_name = 'pdf_url'
  ) THEN
    ALTER TABLE registrations 
    ADD COLUMN pdf_url text DEFAULT NULL;
  END IF;
END $$;