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
      - `created_at` (timestamp)
      - `email_sent` (boolean)
  
  2. Security
    - Enable RLS on `registrations` table
    - Add policy for authenticated users to insert data
*/

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

ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert registrations"
  ON registrations
  FOR INSERT
  TO anon
  WITH CHECK (true);