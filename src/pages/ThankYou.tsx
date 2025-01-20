import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { CheckCircle, Download } from 'lucide-react';
import { supabase } from '../lib/supabase';
import generatePDF from '../utils/generatePDF';

const ThankYou = () => {
  const location = useLocation();
  const { registrationId, nome } = location.state || {};
  const [isDownloading, setIsDownloading] = React.useState(false);

  // Redirecionar se não houver ID de registro
  if (!registrationId) {
    return <Navigate to="/" replace />;
  }

  const handleDownloadPDF = async () => {
    if (isDownloading) return;
    setIsDownloading(true);

    try {
      const { data: registration, error } = await supabase
        .from('registrations')
        .select('*')
        .eq('id', registrationId)
        .single();

      if (error) throw error;

      if (!registration) {
        throw new Error('Registro não encontrado');
      }

      // Se temos o pdf_url, baixar diretamente
      if (registration.pdf_url) {
        const { data: fileData, error: downloadError } = await supabase.storage
          .from('comprovantes')
          .download(registration.pdf_url);

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
      } else {
        // Se não temos o pdf_url, gerar o PDF novamente
        const doc = await generatePDF(registration);
        const pdfBlob = doc.output('blob');

        // Criar URL do blob e forçar o download
        const url = window.URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `inscricao-${nome?.toLowerCase().replace(/\s+/g, '-') || 'piaui-mais-genetica'}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);

        // Salvar o PDF gerado no storage para uso futuro
        const pdfFileName = `inscricoes/${Date.now()}-inscricao.pdf`;
        await supabase.storage
          .from('comprovantes')
          .upload(pdfFileName, pdfBlob);

        // Atualizar o registro com o novo pdf_url
        await supabase
          .from('registrations')
          .update({ pdf_url: pdfFileName })
          .eq('id', registrationId);
      }
    } catch (error) {
      console.error('Erro ao baixar comprovante:', error);
      alert('Não foi possível baixar o comprovante neste momento. Por favor, tente novamente mais tarde.');
    } finally {
      setIsDownloading(false);
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
              Agradecemos seu interesse no Programa Piauí +Genética. 
              Nossa equipe analisará suas informações e entrará em contato 
              em breve através do email ou telefone fornecido.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className={`w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg transition-all duration-200 shadow-md ${
                isDownloading 
                  ? 'opacity-75 cursor-not-allowed'
                  : 'hover:bg-green-700 hover:shadow-lg transform hover:scale-[1.02]'
              }`}
            >
              <Download className={`w-5 h-5 mr-2 ${isDownloading ? 'animate-pulse' : ''}`} />
              {isDownloading ? 'Baixando...' : 'Baixar Comprovante'}
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