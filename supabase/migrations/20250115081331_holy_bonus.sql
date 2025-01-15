/*
  # Add missing insert policy and initial record for visitors table

  1. Changes
    - Add insert policy for visitors table
    - Add initial record with counter set to 0
*/

-- Add insert policy if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'visitors' 
    AND policyname = 'Anyone can insert visitors count'
  ) THEN
    CREATE POLICY "Anyone can insert visitors count"
      ON visitors
      FOR INSERT
      TO anon
      WITH CHECK (true);
  END IF;
END $$;

-- Insert initial record if it doesn't exist
INSERT INTO visitors (id, count)
VALUES (1, 0)
ON CONFLICT (id) DO NOTHING;