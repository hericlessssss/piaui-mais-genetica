import React from 'react';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Footer = () => {
  const [visitorCount, setVisitorCount] = React.useState(0);

  React.useEffect(() => {
    const incrementVisitors = async () => {
      try {
        const { data, error } = await supabase
          .from('visitors')
          .select('count')
          .single();

        if (error) throw error;

        const newCount = (data?.count || 0) + 1;
        
        await supabase
          .from('visitors')
          .upsert({ id: 1, count: newCount });

        setVisitorCount(newCount);
      } catch (error) {
        console.error('Error updating visitor count:', error);
      }
    };

    incrementVisitors();
  }, []);

  return (
    <footer className="bg-green-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-base font-semibold mb-3 text-green-100">Endereço</h3>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <MapPin className="mt-1 flex-shrink-0 w-4 h-4 text-green-300" />
                <p className="text-sm leading-relaxed text-green-100">
                  PREFEITURA MUNICIPAL DE CORRENTE
                  <br />
                  <span className="text-green-300">CNPJ: 06.082.413/0001-49</span>
                  <br />
                  Avenida Manoel Lourenço Cavalcante, 600
                  <br />
                  Bairro: Nova Corrente
                  <br />
                  CEP: 64980-000 - Corrente/PI
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-3 text-green-100">Contato</h3>
            <div className="space-y-2">
              <a href="tel:+558935731053" className="flex items-center space-x-2 text-sm text-green-100 hover:text-green-300 transition-colors group">
                <Phone className="w-4 h-4 text-green-300 group-hover:scale-110 transition-transform" />
                <span>(89) 3573-1053</span>
              </a>
              <a href="mailto:prefeitura.corrente.pi@gmail.com" className="flex items-center space-x-2 text-sm text-green-100 hover:text-green-300 transition-colors group">
                <Mail className="w-4 h-4 text-green-300 group-hover:scale-110 transition-transform" />
                <span>prefeitura.corrente.pi@gmail.com</span>
              </a>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2 text-green-100">Redes Sociais</h4>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-300 hover:text-white transition-colors group"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-300 hover:text-white transition-colors group"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-3 text-green-100">Links Úteis</h3>
            <div className="space-y-2">
              <a
                href="http://transparencia.corrente.pi.gov.br/corrente/servicosonline/ouvidoria"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-green-100 hover:text-green-300 transition-colors"
              >
                Ouvidoria
              </a>
              <a
                href="http://transparencia.corrente.pi.gov.br/corrente"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-green-100 hover:text-green-300 transition-colors"
              >
                Portal da Transparência
              </a>
              <a
                href="http://transparencia.corrente.pi.gov.br/corrente/acessoinformacao"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-green-100 hover:text-green-300 transition-colors"
              >
                Fale Conosco
              </a>
            </div>
            <p className="mt-4 text-sm text-green-300">Visitantes: {visitorCount}</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-green-700">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-xs text-center md:text-left mb-4 md:mb-0 text-green-200">
              &copy; {new Date().getFullYear()} Secretaria Municipal de Desenvolvimento Rural de Corrente - PI, todos os direitos reservados.
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-green-300">Desenvolvido por</span>
              <a
                href="https://www.instagram.com/labora_tech/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img
                  src="https://i.imgur.com/fLD3bdu.png"
                  alt="Labora Tech"
                  className="h-6"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;