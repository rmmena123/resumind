<img width="1800" height="520" alt="Readme-Thumbnail" src="/public/images/hero.webp" />

# 📝 Resumind

Um analisador de currículos com inteligência artificial, construído com React, React Router e Puter.js. Oferece autenticação simplificada, upload e armazenamento de currículos, e análise de compatibilidade entre candidatos e vagas com avaliações inteligentes. Obtenha feedback personalizado e pontuações ATS para cada vaga e currículo cadastrado.

---

## 🚀 Features

- 🔐 **Autenticação Fácil e Conveniente**: Gerencie a autenticação inteiramente no navegador com Puter.js - sem necessidade de backend ou configurações complexas.
- 📤 **Upload e Armazenamento de Currículos**: Permita que os usuários façam upload e guardem todos os seus currículos em um só lugar, de forma segura e confiável.
- 🤖 **Análise de Currículos com IA**: Forneça uma descrição de vaga e receba uma pontuação ATS com feedback personalizado para cada currículo.
- 🖥️ **UI Moderna e Reutilizável**: Construído com componentes reutilizáveis, responsivos, com forte tipagem e consistentes para uma interface moderna e de manutenção simplificada.

---

## 📁 Estrutura de Pastas

A estrutura de pastas do projeto foi organizada para manter o código modular e de fácil manutenção:

```bash
resumind/
├─ app
  ├─ components/          # Componentes reutilizáveis da aplicação
  ├─ lib/                 # Funções reutilizáveis e hook do Puter.js
  └─ routes/              # Renderização das páginas e suas funcionalidades com React Router
├─ constants              # Definição de mock de dados e instruções de IA
├─ public                 # Arquivos estáticos
└─ types                  # Interfaces Typescript globais da aplicação
```

[Documentação técnica completa](https://rmmena123.notion.site/Resumind-23d5a575c33f808e8e44e254cf498930)

---

## ⚙️ Instalação e Configuração

```bash
# Clone o repositório
git clone https://github.com/rmmena123/resumind.git

# Navegue até o diretório do repositório
cd resumind

# Instale as dependências (Versão 22 do Node.js)
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

---

## 🧰 Tecnologias Utilizadas

- **[React](https://react.dev/)**: Uma biblioteca JavaScript de código aberto para construir interfaces de usuário com componentes reutilizáveis e um DOM virtual, permitindo criar aplicações de página única (SPA) e nativas de forma eficiente e dinâmica.

- **[React Router v7](https://reactrouter.com/)**: A principal biblioteca de roteamento para aplicações React, oferecendo rotas aninhadas, `data loaders/actions`, `error boundaries`, `code splitting` e suporte a SSR — tudo com um caminho de atualização suave a partir da v6.

- **[Puter.com](https://puter.com/)**: Um sistema operacional de internet avançado e de código aberto, projetado para ser rico em recursos, excepcionalmente rápido e altamente extensível. O Puter pode ser usado como uma nuvem pessoal focada em privacidade para manter todos os seus arquivos e aplicativos em um lugar seguro.

- **[Puter.js](https://docs.puter.com/)**: Um pequeno SDK do lado do cliente que adiciona autenticação _serverless_, armazenamento, banco de dados e IA (GPT, Claude, DALL·E, OCR...) diretamente no seu aplicativo de navegador — sem necessidade de backend e com custos arcados pelos usuários.

- **[Tailwind CSS](https://tailwindcss.com/)**: Um framework CSS _utility-first_ que permite aos desenvolvedores criar interfaces de usuário personalizadas aplicando classes de utilitários de baixo nível diretamente no HTML, otimizando o processo de design.

- **[TypeScript](https://www.typescriptlang.org/)**: Um superset do JavaScript que adiciona tipagem estática, fornecendo melhores ferramentas, qualidade de código e detecção de erros para desenvolvedores, tornando-o ideal para a construção de aplicações em larga escala.

- **[Vite](https://vite.dev/)**: Uma ferramenta de build e servidor de desenvolvimento rápido que utiliza módulos ES nativos para inicialização instantânea, _hot-module replacement_ e builds de produção otimizadas com Rollup — perfeito para o desenvolvimento web moderno.

- **[Zustand](https://github.com/pmndrs/zustand)**: Uma biblioteca de gerenciamento de estado minimalista e baseada em hooks para React. Permite gerenciar o estado global com zero boilerplate, sem provedores de contexto e com excelente desempenho através de subscrições seletivas de estado.

---

## 👨‍💻 Autor

Desenvolvido por [Rodrigo Mena](https://github.com/rmmena123)

---

## 📝 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
