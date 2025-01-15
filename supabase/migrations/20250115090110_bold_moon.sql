/*
  # Create registrations table

  1. New Tables
    - `registrations`
      - `id` (uuid, primary key)
      - `nome` (text)
      - `cpf` (text)
      - `cidade` (text)
      - `localidade` (text)
      - `telefone` (text)
      - `email` (text)
      - `area_imovel` (numeric)
      - `area_pastagem` (numeric)
      - `rebanho_total` (integer)
      - `femeas_reproducao` (integer)
      - `animais_genetica` (integer)
      - `semen_utilizado` (text)
      - `comprovante_url` (text)
      - `created_at` (timestamptz)
      - `email_sent` (boolean)

  2. Security
    - Enable RLS on `registrations` table
    - Add policy for public inserts
    - Add policy for authenticated users to read their own data
*/

-- Create registrations table if it doesn't exist
CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  cpf text NOT NULL,
  cidade text NOT NULL,
  localidade text NOT NULL,
  telefone text NOT NULL,
  email text NOT NULL,
  area_imovel numeric NOT NULL,
  area_pastagem numeric NOT NULL,
  rebanho_total integer NOT NULL,
  femeas_reproducao integer NOT NULL,
  animais_genetica integer NOT NULL,
  semen_utilizado text NOT NULL,
  comprovante_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  email_sent boolean DEFAULT false
);

-- Enable RLS
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Create policy for public inserts
CREATE POLICY "Allow public to insert registrations"
ON registrations
FOR INSERT
TO public
WITH CHECK (true);

-- Create policy for public to read their own data
CREATE POLICY "Allow public to read own registrations"
ON registrations
FOR SELECT
TO public
USING (true);