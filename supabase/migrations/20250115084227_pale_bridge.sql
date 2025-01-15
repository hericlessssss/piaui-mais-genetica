/*
  # Criar bucket de armazenamento para comprovantes

  1. Novo Bucket
    - Nome: comprovantes
    - Público: não
    - Tipo de arquivos: imagens e PDFs
  
  2. Segurança
    - Políticas de acesso para upload e download
*/

-- Criar bucket para comprovantes
INSERT INTO storage.buckets (id, name, public)
VALUES ('comprovantes', 'comprovantes', false);

-- Política para permitir upload de arquivos
CREATE POLICY "Anyone can upload files"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (
  bucket_id = 'comprovantes'
  AND (storage.foldername(name))[1] != 'private'
);

-- Política para permitir download de arquivos
CREATE POLICY "Anyone can download files"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'comprovantes');

-- Política para permitir atualização de arquivos
CREATE POLICY "Anyone can update files"
ON storage.objects
FOR UPDATE
TO public
USING (bucket_id = 'comprovantes')
WITH CHECK (bucket_id = 'comprovantes');