import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { supabase } from '../lib/supabase';
import generatePDF from '../utils/generatePDF';
import { maskPhone, maskCPF, useInputMask } from '../utils/masks';
import type { FormData } from '../types';

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

const schema = z.object({
  nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido'),
  cidade: z.string().min(2, 'Cidade inválida'),
  localidade: z.string().min(3, 'Localidade inválida'),
  telefone: z.string(), // Removed phone validation
  email: z.string().email('Email inválido'),
  area_imovel: z.number().min(0.1, 'Área deve ser maior que 0'),
  area_pastagem: z.number().min(0.1, 'Área deve ser maior que 0'),
  rebanho_total: z.number().int().min(1, 'Rebanho deve ser maior que 0'),
  femeas_reproducao: z.number().int().min(0, 'Valor inválido'),
  semen_utilizado: z.string().min(3, 'Campo obrigatório'),
  comprovante: z
    .instanceof(FileList)
    .refine((files) => files?.length === 1, 'Arquivo é obrigatório')
    .transform(files => files[0])
    .refine(
      (file) => file?.size <= MAX_FILE_SIZE,
      'Arquivo deve ter no máximo 1MB'
    )
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
      'Formato de arquivo inválido. Use PDF, JPG ou PNG'
    ),
});

const Registration = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const handlePhoneMask = useInputMask(maskPhone);
  const handleCPFMask = useInputMask(maskCPF);

  const compressImage = async (file: File): Promise<Blob> => {
    if (!file.type.startsWith('image/')) return file;

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d')!;

          let width = img.width;
          let height = img.height;
          const maxSize = 800;

          if (width > height && width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          } else if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => resolve(blob!),
            'image/jpeg',
            0.7
          );
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const onSubmit = async (data: FormData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const compressedFile = await compressImage(data.comprovante);
      
      const fileExt = data.comprovante.name.split('.').pop();
      const fileName = `comprovantes/${Date.now()}.${fileExt}`;
      
      const { error: uploadError, data: fileData } = await supabase.storage
        .from('comprovantes')
        .upload(fileName, compressedFile);

      if (uploadError) throw new Error('Erro ao fazer upload do arquivo');

      const { comprovante, ...registrationData } = data;
      
      const registrationWithUrl = {
        ...registrationData,
        comprovante_url: fileData.path
      };

      const { error: dbError, data: registration } = await supabase
        .from('registrations')
        .insert([registrationWithUrl])
        .select()
        .single();

      if (dbError) throw new Error('Erro ao salvar registro no banco de dados');

      const doc = await generatePDF(registrationWithUrl, fileData.path);
      const pdfBlob = doc.output('blob', {
        compress: true,
        compressPdf: true,
        userPassword: undefined,
        ownerPassword: undefined,
        putOnlyUsedFonts: true,
        precision: 2
      });
      
      const pdfFileName = `inscricoes/${Date.now()}-inscricao.pdf`;
      const { error: pdfUploadError } = await supabase.storage
        .from('comprovantes')
        .upload(pdfFileName, pdfBlob);

      if (pdfUploadError) throw new Error('Erro ao fazer upload do PDF');

      const { data: pdfUrl } = supabase.storage
        .from('comprovantes')
        .getPublicUrl(pdfFileName);

      if (!pdfUrl) throw new Error('Erro ao gerar URL do PDF');

      const { error: updateError } = await supabase
        .from('registrations')
        .update({ pdf_url: pdfFileName })
        .eq('id', registration.id);

      if (updateError) throw new Error('Erro ao atualizar registro com URL do PDF');

      const emailResult = await emailjs.send(
        '+genetica',
        'template_adojtz5',
        {
          to_name: 'Administrador',
          from_name: data.nome,
          message: `Nova inscrição recebida!\n\nNome: ${data.nome}\nCPF: ${data.cpf}\nEmail: ${data.email}\nTelefone: ${data.telefone}`,
          pdf_url: pdfUrl.publicUrl
        },
        '7oMX1lR6lscYPctqr'
      );

      if (emailResult.status !== 200) {
        throw new Error('Erro ao enviar email de confirmação');
      }

      navigate('/obrigado', { 
        state: { 
          registrationId: registration.id,
          nome: data.nome
        }
      });
    } catch (error) {
      console.error('Erro ao enviar inscrição:', error);
      alert(error instanceof Error ? error.message : 'Erro ao enviar inscrição. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-20"></div>

      {/* New banner container */}
      <div className="w-full max-w-[1920px] mx-auto overflow-hidden">
        <img
          src="https://i.imgur.com/D1VkdUX.png"
          alt="Banner Piauí +Genética"
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Inscrição no Programa</h1>
          <p className="text-lg text-gray-600">
            Preencha o formulário abaixo para participar do Programa Piauí +Genética
          </p>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-r-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                As inscrições estão abertas até 31/01/2025
              </p>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">1. Dados Pessoais</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="nome"
                  placeholder="Exemplo: João Silva"
                  {...register('nome')}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
                {errors.nome && (
                  <p className="mt-1 text-sm text-red-600">{errors.nome.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-1">
                  CPF
                </label>
                <input
                  type="text"
                  id="cpf"
                  placeholder="123.456.789-00"
                  {...register('cpf')}
                  onChange={handleCPFMask}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
                {errors.cpf && (
                  <p className="mt-1 text-sm text-red-600">{errors.cpf.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone
                </label>
                <input
                  type="text"
                  id="telefone"
                  placeholder="(89) 99999-9999"
                  {...register('telefone')}
                  onChange={handlePhoneMask}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
                {errors.telefone && (
                  <p className="mt-1 text-sm text-red-600">{errors.telefone.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="joao@email.com"
                  {...register('email')}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">2. Localização</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="cidade" className="block text-sm font-medium text-gray-700 mb-1">
                  Cidade
                </label>
                <input
                  type="text"
                  id="cidade"
                  placeholder="Exemplo: Corrente"
                  {...register('cidade')}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
                {errors.cidade && (
                  <p className="mt-1 text-sm text-red-600">{errors.cidade.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="localidade" className="block text-sm font-medium text-gray-700 mb-1">
                  Localidade
                </label>
                <input
                  type="text"
                  id="localidade"
                  placeholder="Exemplo: Fazenda Boa Vista"
                  {...register('localidade')}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
                {errors.localidade && (
                  <p className="mt-1 text-sm text-red-600">{errors.localidade.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">3. Dados da Propriedade</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="area_imovel" className="block text-sm font-medium text-gray-700 mb-1">
                  Área do Imóvel (hectares)
                </label>
                <input
                  type="number"
                  step="0.1"
                  id="area_imovel"
                  placeholder="0.0"
                  {...register('area_imovel', { valueAsNumber: true })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
                {errors.area_imovel && (
                  <p className="mt-1 text-sm text-red-600">{errors.area_imovel.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="area_pastagem" className="block text-sm font-medium text-gray-700 mb-1">
                  Área de Pastagem (hectares)
                </label>
                <input
                  type="number"
                  step="0.1"
                  id="area_pastagem"
                  placeholder="0.0"
                  {...register('area_pastagem', { valueAsNumber: true })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
                {errors.area_pastagem && (
                  <p className="mt-1 text-sm text-red-600">{errors.area_pastagem.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">4. Dados do Rebanho</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="rebanho_total" className="block text-sm font-medium text-gray-700 mb-1">
                  Rebanho Total
                </label>
                <input
                  type="number"
                  id="rebanho_total"
                  placeholder="0"
                  {...register('rebanho_total', { valueAsNumber: true })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
                {errors.rebanho_total && (
                  <p className="mt-1 text-sm text-red-600">{errors.rebanho_total.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="femeas_reproducao" className="block text-sm font-medium text-gray-700 mb-1">
                  Fêmeas em Reprodução
                </label>
                <input
                  type="number"
                  id="femeas_reproducao"
                  placeholder="0"
                  {...register('femeas_reproducao', { valueAsNumber: true })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
                {errors.femeas_reproducao && (
                  <p className="mt-1 text-sm text-red-600">{errors.femeas_reproducao.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="animais_genetica" className="block text-sm font-medium text-gray-700 mb-1">
                  Animais para +Genética
                </label>
                <input
                  type="number"
                  id="animais_genetica"
                  placeholder="0"
                  {...register('animais_genetica', { valueAsNumber: true })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
                {errors.animais_genetica && (
                  <p className="mt-1 text-sm text-red-600">{errors.animais_genetica.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="semen_utilizado" className="block text-sm font-medium text-gray-700 mb-1">
                  Sêmen Utilizado
                </label>
                <input
                  type="text"
                  id="semen_utilizado"
                  placeholder="Especifique o tipo de sêmen"
                  {...register('semen_utilizado')}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
                {errors.semen_utilizado && (
                  <p className="mt-1 text-sm text-red-600">{errors.semen_utilizado.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">5. Documentação</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comprovante de Inscrição ADAPI
              </label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                {...register('comprovante')}
                className="w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-green-50 file:text-green-700
                  hover:file:bg-green-100
                  cursor-pointer"
              />
              <p className="mt-2 text-sm text-gray-500">
                Aceitamos arquivos PDF, JPG ou PNG até 1 MB
              </p>
              {errors.comprovante && (
                <p className="mt-1 text-sm text-red-600">{errors.comprovante.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-green-600 text-white py-4 px-6 rounded-lg transition-colors font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
            }`}
          >
            {isSubmitting ? 'Enviando...' : 'Realizar Inscrição'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;