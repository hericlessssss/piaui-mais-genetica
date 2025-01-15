# Piauí + Genética 🐄

Website do programa Piauí + Genética, uma iniciativa do Governo do Estado do Piauí para melhoramento genético do rebanho bovino.

## 🌟 Funcionalidades

### Páginas
- ✨ **Página Inicial**
  - Banner principal com chamada para ação
  - Seção de benefícios do programa
  - Estatísticas e números
  - Chamada para inscrição
  - Design responsivo e animações suaves

- 📝 **Formulário de Inscrição**
  - Validação completa de todos os campos
  - Máscaras para CPF e telefone
  - Upload de documentos (PDF, JPG, PNG até 1MB)
  - Compressão automática de imagens
  - Geração de PDF da inscrição
  - Envio de email com link do comprovante
  - Armazenamento seguro no Supabase

- ❓ **FAQ**
  - Perguntas e respostas mais frequentes
  - Interface interativa com animações
  - Seção de contato rápido

- 📱 **Contato**
  - Formulário de contato direto
  - Integração com EmailJS
  - Mapa de localização
  - Links para redes sociais
  - Informações de contato completas

### Recursos Técnicos
- 🔒 **Segurança**
  - Validação de dados no frontend e backend
  - Políticas de segurança no Supabase (RLS)
  - Proteção contra uploads maliciosos
  - Compressão e validação de arquivos

- 📊 **Banco de Dados**
  - Supabase como backend
  - Tabelas para registros, mensagens e visitantes
  - Storage para arquivos e documentos
  - Migrations automatizadas

- 📨 **Notificações**
  - Sistema de email automático após inscrição
  - Templates personalizados no EmailJS
  - Confirmação de envio de mensagens

- 📱 **Responsividade**
  - Design adaptativo para todos os dispositivos
  - Menu mobile otimizado
  - Imagens e layouts responsivos
  - Performance otimizada

## 🛠️ Tecnologias Utilizadas

- **Frontend**
  - [React](https://reactjs.org/) - Biblioteca JavaScript
  - [TypeScript](https://www.typescriptlang.org/) - Tipagem estática
  - [Vite](https://vitejs.dev/) - Build tool
  - [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
  - [React Router DOM](https://reactrouter.com/) - Roteamento
  - [React Hook Form](https://react-hook-form.com/) - Formulários
  - [Zod](https://zod.dev/) - Validação
  - [Lucide React](https://lucide.dev/) - Ícones
  - [EmailJS](https://www.emailjs.com/) - Serviço de email

- **Backend**
  - [Supabase](https://supabase.com/) - Backend as a Service
  - PostgreSQL - Banco de dados
  - Storage - Armazenamento de arquivos

- **Utilitários**
  - [jsPDF](https://github.com/parallax/jsPDF) - Geração de PDF
  - [PDF.js](https://mozilla.github.io/pdf.js/) - Manipulação de PDF

## 📋 Pré-requisitos

- Node.js 18 ou superior
- npm 9 ou superior
- Conta no Supabase
- Conta no EmailJS

## 🚀 Instalação

1. Clone o repositório:
   \`\`\`bash
   git clone https://github.com/seu-usuario/piaui-mais-genetica.git
   cd piaui-mais-genetica
   \`\`\`

2. Instale as dependências:
   \`\`\`bash
   npm install
   \`\`\`

3. Configure as variáveis de ambiente:
   - Crie um arquivo \`.env\` na raiz do projeto
   - Adicione as variáveis necessárias:
     \`\`\`
     VITE_SUPABASE_URL=sua_url_do_supabase
     VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
     \`\`\`

4. Inicie o servidor de desenvolvimento:
   \`\`\`bash
   npm run dev
   \`\`\`

## 🏗️ Estrutura do Projeto

\`\`\`
src/
  ├── components/     # Componentes reutilizáveis
  │   ├── Footer.tsx
  │   ├── Layout.tsx
  │   └── Navbar.tsx
  ├── pages/         # Páginas da aplicação
  │   ├── Contact.tsx
  │   ├── FAQ.tsx
  │   ├── Home.tsx
  │   ├── Registration.tsx
  │   └── ThankYou.tsx
  ├── lib/           # Utilitários e configurações
  │   └── supabase.ts
  ├── utils/         # Funções utilitárias
  │   ├── generatePDF.ts
  │   └── masks.ts
  ├── types/         # Definições de tipos
  │   └── index.ts
  ├── App.tsx        # Componente principal
  └── main.tsx       # Ponto de entrada
\`\`\`

## 📦 Build e Deploy

Para gerar a versão de produção:

\`\`\`bash
npm run build
\`\`\`

Os arquivos otimizados serão gerados na pasta \`dist\`.

## 🔒 Banco de Dados

O projeto utiliza Supabase como backend, com as seguintes tabelas:

- \`registrations\`: Inscrições no programa
  - Dados pessoais e da propriedade
  - URLs dos documentos
  - Status do email

- \`contact_messages\`: Mensagens de contato
  - Nome, email e mensagem
  - Data de envio

- \`visitors\`: Contador de visitantes
  - Contagem total
  - Timestamps

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (\`git checkout -b feature/nova-feature\`)
3. Faça commit das mudanças (\`git commit -m 'Adiciona nova feature'\`)
4. Faça push para a branch (\`git push origin feature/nova-feature\`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

- **Prefeitura Municipal de Corrente**
  - CNPJ: 06.082.413/0001-49
  - Endereço: Avenida Manoel Lourenço Cavalcante, 600 - Nova Corrente
  - CEP: 64980-000 - Corrente/PI
  - Telefone: (89) 3573-1053
  - Email: prefeitura.corrente.pi@gmail.com

## 🙋‍♂️ Suporte

Para suporte e dúvidas, entre em contato através:
- Email: contato@piauimaisgenetica.pi.gov.br
- Telefone: (89) 3573-1053
- [Ouvidoria](http://transparencia.corrente.pi.gov.br/corrente/servicosonline/ouvidoria)

## ✨ Créditos

Desenvolvido por [Labora Tech](https://www.instagram.com/labora_tech/)