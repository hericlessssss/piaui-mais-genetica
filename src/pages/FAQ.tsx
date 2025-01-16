import React from 'react';
import { ChevronDown, ChevronUp, Mail, Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const faqs = [
  {
    question: 'Quem pode participar do programa?',
    answer: 'Produtores rurais do estado do Piauí que possuam rebanho bovino e estejam regularizados junto aos órgãos competentes.'
  },
  {
    question: 'Qual é o custo para participar?',
    answer: 'O programa é uma iniciativa do governo estadual e não há custos para inscrição. No entanto, podem haver custos relacionados à implementação das melhorias sugeridas.'
  },
  {
    question: 'Como funciona o processo de seleção?',
    answer: 'Após a inscrição, nossa equipe técnica avaliará seu cadastro e fará uma visita à propriedade para avaliar as condições e definir o melhor plano de ação.'
  },
  {
    question: 'Quanto tempo dura o programa?',
    answer: 'O programa tem duração inicial de 12 meses, podendo ser renovado conforme os resultados obtidos e disponibilidade.'
  },
  {
    question: 'Que tipo de suporte técnico é oferecido?',
    answer: 'Oferecemos assessoria técnica especializada, incluindo visitas periódicas, orientações sobre manejo, nutrição e reprodução, além de acompanhamento dos resultados.'
  },
  {
    question: 'Como é feito o acompanhamento dos resultados?',
    answer: 'Realizamos visitas técnicas regulares, coletamos dados de desempenho do rebanho e fornecemos relatórios detalhados sobre o progresso alcançado.'
  },
  {
    question: 'Posso desistir do programa?',
    answer: 'Sim, a participação é voluntária. No entanto, recomendamos completar pelo menos um ciclo (12 meses) para obter resultados significativos.'
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Espaçamento para a navbar fixa */}
      <div className="h-20"></div>
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-2">Perguntas Frequentes</h1>
        <p className="text-gray-600 text-center mb-12">
          Encontre respostas para as dúvidas mais comuns sobre o Programa Piauí +Genética
        </p>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-green-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </button>
              <div
                className={`transition-all duration-200 ease-in-out ${
                  openIndex === index
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0 overflow-hidden'
                }`}
              >
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
            Ainda tem dúvidas?
          </h2>
          <p className="text-gray-700 mb-8 text-center">
            Nossa equipe está pronta para ajudar. Entre em contato através dos nossos canais de atendimento:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="mailto:sdrural.corrente@hotmail.com"
              className="flex flex-col items-center p-4 rounded-lg bg-gray-50 hover:bg-green-50 transition-colors group"
            >
              <Mail className="h-8 w-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-gray-900">Email</span>
              <span className="text-sm text-gray-600">sdrural.corrente@hotmail.com</span>
            </a>
            <a
              href="tel:+558933303000"
              className="flex flex-col items-center p-4 rounded-lg bg-gray-50 hover:bg-green-50 transition-colors group"
            >
              <Phone className="h-8 w-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-gray-900">Telefone</span>
              <span className="text-sm text-gray-600">(89) 99982-5231</span>
            </a>
            <a
              href="https://wa.me/5589999825231"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 rounded-lg bg-gray-50 hover:bg-green-50 transition-colors group"
            >
              <FaWhatsapp className="h-8 w-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-gray-900">WhatsApp</span>
              <span className="text-sm text-gray-600">(89) 99982-5231</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;