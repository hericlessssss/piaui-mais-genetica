import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Download } from 'lucide-react';
import generatePDF from '../utils/generatePDF';
import { supabase } from '../lib/supabase';

const ThankYou = () => {
  const location = useLocation();
  const { registrationId, nome } = location.state || {};

  const handleDownloadPDF = async () => {
    try {
      if (!registrationId) {
        throw new Error('ID da inscrição não encontrado');
      }

      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .eq('id', registrationId)
        .single();

      if (error) throw error;

      if (data) {
        // Baixar o PDF do storage
        const { data: fileData, error: downloadError } = await supabase.storage
          .from('comprovantes')
          .download(data.pdf_url);

        if (downloadError) throw downloadError;

        // Criar URL do blob e forçar o download
        const url = window.URL.createObjectURL(fileData);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `inscricao-${nome?.toLowerCase().replace(/\s+/g, '-') || 'piaui-mais-genetica'}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Erro ao baixar PDF:', error);
      alert('Erro ao baixar o PDF. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-20"></div>
      
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="flex flex-col items-center">
            <div className="bg-green-50 p-4 rounded-full mb-6">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Inscrição Recebida!
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Agradecemos seu interesse no Programa Piauí + Genética. 
              Nossa equipe analisará suas informações e entrará em contato 
              em breve através do email ou telefone fornecido.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={handleDownloadPDF}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg transform hover:scale-[1.02] duration-200"
            >
              <Download className="w-5 h-5 mr-2" />
              Baixar Comprovante
            </button>
            
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors transform hover:scale-[1.02] duration-200"
            >
              Voltar para a Página Inicial
            </Link>
          </div>

          <div className="bg-green-50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-green-800 mb-4">
              Próximos Passos
            </h2>
            <ol className="text-left space-y-3">
              <li className="flex items-start">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-green-200 text-green-800 text-sm font-semibold mr-3 mt-0.5">
                  1
                </span>
                <span className="text-green-900">
                  Aguarde o contato de nossa equipe técnica
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-green-200 text-green-800 text-sm font-semibold mr-3 mt-0.5">
                  2
                </span>
                <span className="text-green-900">
                  Prepare a documentação necessária
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-green-200 text-green-800 text-sm font-semibold mr-3 mt-0.5">
                  3
                </span>
                <span className="text-green-900">
                  Agende a visita técnica inicial
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-green-200 text-green-800 text-sm font-semibold mr-3 mt-0.5">
                  4
                </span>
                <span className="text-green-900">
                  Inicie o programa de melhoramento
                </span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;