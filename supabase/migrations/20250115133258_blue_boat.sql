/*
  # Adicionar coluna pdf_url na tabela registrations

  1. Alterações
    - Adiciona coluna pdf_url na tabela registrations para armazenar o caminho do PDF gerado
  
  2. Notas
    - A coluna é opcional (nullable) para manter compatibilidade com registros existentes
    - Tipo text para armazenar o caminho do arquivo no storage
*/

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