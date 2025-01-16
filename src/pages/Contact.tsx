import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { supabase } from '../lib/supabase';

const schema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  message: z.string().min(10, 'Mensagem deve ter no mínimo 10 caracteres'),
});

type FormData = z.infer<typeof schema>;

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([data]);

      if (error) throw error;

      alert('Mensagem enviada com sucesso!');
      reset();
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      alert('Erro ao enviar mensagem. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Espaçamento para a navbar fixa */}
      <div className="h-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Entre em Contato</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Estamos aqui para ajudar. Entre em contato conosco através de qualquer um dos nossos canais de atendimento.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Informações de Contato */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-6 text-gray-900">Canais de Atendimento</h2>
              <div className="space-y-6">
                <a
                  href="mailto:contato@piauimaisgenetica.pi.gov.br"
                  className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 hover:bg-green-50 transition-colors group"
                >
                  <Mail className="h-6 w-6 text-green-600 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-sm text-gray-600">sdrural.corrente@hotmail.com</p>
                  </div>
                </a>

                <a
                  href="tel:+558633303000"
                  className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 hover:bg-green-50 transition-colors group"
                >
                  <Phone className="h-6 w-6 text-green-600 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-medium text-gray-900">Telefone</p>
                    <p className="text-sm text-gray-600">(86) 99982-5231</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/5586999825231"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 hover:bg-green-50 transition-colors group"
                >
                  <FaWhatsapp className="h-6 w-6 text-green-600 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-medium text-gray-900">WhatsApp</p>
                    <p className="text-sm text-gray-600">(86) 99982-5231</p>
                  </div>
                </a>

                <div className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50">
                  <MapPin className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Endereço</p>
                    <p className="text-sm text-gray-600">
                      Avenida Manoel Lourenço Cavalcante, 600
                      <br />
                      Nova Corrente, Corrente/PI
                      <br />
                      CEP: 64980-000
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-6 text-gray-900">Links Úteis</h2>
              <div className="space-y-4">
                <a
                  href="http://transparencia.corrente.pi.gov.br/corrente/servicosonline/ouvidoria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-600 hover:text-green-600 transition-colors"
                >
                  → Ouvidoria
                </a>
                <a
                  href="http://transparencia.corrente.pi.gov.br/corrente"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-600 hover:text-green-600 transition-colors"
                >
                  → Portal da Transparência
                </a>
                <a
                  href="http://transparencia.corrente.pi.gov.br/corrente/acessoinformacao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-600 hover:text-green-600 transition-colors"
                >
                  → Fale Conosco
                </a>
              </div>
            </div>
          </div>

          {/* Formulário de Contato */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-6 text-gray-900">Envie sua Mensagem</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Seu nome completo"
                  {...register('name')}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 transition-colors"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="seu@email.com"
                  {...register('email')}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 transition-colors"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Digite sua mensagem aqui..."
                  {...register('message')}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 transition-colors"
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;