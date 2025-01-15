/*
  # Create visitors and contact messages tables

  1. New Tables
    - `visitors`
      - `id` (integer, primary key)
      - `count` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `message` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for visitors table
    - Add policies for contact_messages table
*/

-- Create visitors table
CREATE TABLE IF NOT EXISTS visitors (
  id integer PRIMARY KEY,
  count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Policies for visitors table
CREATE POLICY "Anyone can read visitors count"
  ON visitors
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can update visitors count"
  ON visitors
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can insert visitors count"
  ON visitors
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy for contact_messages table
CREATE POLICY "Anyone can insert contact messages"
  ON contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Insert initial visitors record
INSERT INTO visitors (id, count)
VALUES (1, 0)
ON CONFLICT (id) DO NOTHING;