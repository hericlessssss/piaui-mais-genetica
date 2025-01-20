/*
  # Update registrations table schema
  
  1. Changes
    - Make animais_genetica column optional in registrations table
    
  2. Reason
    - Field is no longer required in the application form
    - Prevents null constraint violations
*/

ALTER TABLE registrations 
ALTER COLUMN animais_genetica DROP NOT NULL;