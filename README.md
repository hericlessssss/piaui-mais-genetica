# Piauí + Genética 🐄

Website do programa Piauí + Genética, uma iniciativa do Governo do Estado do Piauí para melhoramento genético do rebanho bovino.

## 🌟 Funcionalidades

- ✅ Página inicial com informações sobre o programa
- 📝 Formulário de inscrição com validação completa
- ❓ FAQ com perguntas frequentes
- 📱 Design responsivo e acessível
- 📞 Página de contato com formulário
- 🔍 Integração com Portal da Transparência
- 📊 Contador de visitantes em tempo real

## 🛠️ Tecnologias Utilizadas

- [React](https://reactjs.org/) - Biblioteca JavaScript para construção de interfaces
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript com tipagem estática
- [Vite](https://vitejs.dev/) - Build tool e dev server
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utility-first
- [React Router DOM](https://reactrouter.com/) - Roteamento para React
- [React Hook Form](https://react-hook-form.com/) - Gerenciamento de formulários
- [Zod](https://zod.dev/) - Validação de esquemas TypeScript
- [Lucide React](https://lucide.dev/) - Ícones modernos
- [Supabase](https://supabase.com/) - Backend as a Service (BaaS)

## 📋 Pré-requisitos

- Node.js 18 ou superior
- npm 9 ou superior
- Conta no Supabase para o backend

## 🚀 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/piaui-mais-genetica.git
   cd piaui-mais-genetica
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto
   - Adicione as variáveis do Supabase:
     ```
     VITE_SUPABASE_URL=sua_url_do_supabase
     VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
     ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

O site estará disponível em `http://localhost:5173`

## 🏗️ Estrutura do Projeto

```
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
  ├── App.tsx        # Componente principal
  └── main.tsx       # Ponto de entrada
```

## 📦 Build e Deploy

Para gerar a versão de produção:

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist`.

## 🔒 Banco de Dados

O projeto utiliza Supabase como backend, com as seguintes tabelas:

- `registrations`: Armazena as inscrições no programa
- `contact_messages`: Mensagens do formulário de contato
- `visitors`: Contador de visitantes do site

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das mudanças (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
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