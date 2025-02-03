import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Phone, Mail, ArrowLeft } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const Registration = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Espaçamento para a navbar fixa */}
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
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-red-50 p-4 rounded-full">
              <AlertCircle className="h-16 w-16 text-red-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Inscrições Encerradas
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            O período de inscrições para o Programa Piauí +Genética foi encerrado.
            Agradecemos o interesse de todos os produtores rurais.
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Precisa de Ajuda?
            </h2>
            <p className="text-gray-600 mb-6">
              Para dúvidas ou mais informações, entre em contato através dos nossos canais de atendimento:
            </p>

            <div className="space-y-4">
              <a
                href="tel:+558699825231"
                className="flex items-center justify-center space-x-3 p-4 bg-white rounded-lg hover:bg-green-50 transition-colors group"
              >
                <Phone className="h-6 w-6 text-green-600 group-hover:scale-110 transition-transform" />
                <span className="text-gray-900">(86) 99982-5231</span>
              </a>

              <a
                href="https://wa.me/5586999825231"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-3 p-4 bg-white rounded-lg hover:bg-green-50 transition-colors group"
              >
                <FaWhatsapp className="h-6 w-6 text-green-600 group-hover:scale-110 transition-transform" />
                <span className="text-gray-900">WhatsApp</span>
              </a>

              <a
                href="mailto:sdrural.corrente@hotmail.com"
                className="flex items-center justify-center space-x-3 p-4 bg-white rounded-lg hover:bg-green-50 transition-colors group"
              >
                <Mail className="h-6 w-6 text-green-600 group-hover:scale-110 transition-transform" />
                <span className="text-gray-900">sdrural.corrente@hotmail.com</span>
              </a>
            </div>
          </div>

          <Link
            to="/"
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium group"
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar para a Página Inicial
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;