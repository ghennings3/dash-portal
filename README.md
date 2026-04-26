# 🚀 DashPortal: Seu Hub de Produtividade Blindado

**DashPortal** é um dashboard minimalista e de alta performance projetado para ser a sua página inicial definitiva. Com uma estética Dark moderna e refinada, ele combina uma interface limpa com uma arquitetura robusta, garantindo que seus links e preferências estejam sempre à mão com carregamento instantâneo.

---

## 🌟 Diferenciais do Projeto

* **⚡ Performance Local-First:** Utiliza `localStorage` + Zustand para carregar seus dados instantaneamente. O portal abre primeiro e sincroniza depois, eliminando tempos de espera.
* **🛡️ Blindagem de Dados:** Segurança em nível de linha (RLS) via Supabase, garantindo que seus dados sejam acessíveis apenas por você direto na camada do banco.
* **🔄 Sincronização Híbrida:** Flexibilidade total. Use anonimamente no navegador ou faça login para manter seus dados sincronizados entre múltiplos dispositivos.
* **🔍 Omnibox Inteligente:** Barra de pesquisa centralizada que alterna entre **Google**, **YouTube** e **GitHub** dinamicamente ao pressionar `Tab`.

---

## 🛠️ Funcionalidades Core

### 📂 Organização e Gestão
* **Categorias Customizáveis:** Crie e gerencie grupos de sites (ex: Dev, Lazer, Finanças, Ferramentas).
* **Gestão de Links:** Adicione e remova sites facilmente com busca automática de favicons.
* **Filtros Rápidos:** Navegação por categorias para manter o grid limpo e focado.

### 🔑 Autenticação Multimodal (Better Auth)
Acesso seguro e flexível através de múltiplos provedores:
* **Social Login:** Conexão rápida via **GitHub** e **Google**.
* **Tradicional:** Cadastro e login via **E-mail e Senha**.

### 🎨 Personalização e UX
* **Temas Dinâmicos:** Seletor de temas para adaptar a estética ao seu gosto (Dark, Cyberpunk, Minimalist).
* **Design Moderno:** Interface polida utilizando a fonte **Inter**, focada em máxima legibilidade e uma experiência visual premium.
* **Relógio de Alta Precisão:** Relógio centralizado com segundos e data por extenso.

---

## 🏗️ Tech Stack

* **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
* **Banco de Dados:** [Supabase](https://supabase.com/) (PostgreSQL)
* **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
* **Autenticação:** [Better Auth](https://better-auth.com/)
* **Estado:** [Zustand](https://docs.pmnd.rs/zustand/)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/) + [Shadcn/UI](https://ui.shadcn.com/)
