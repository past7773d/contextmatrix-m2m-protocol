---
name: pastana-dynamics-core
description: >
  Blueprint mestre de arquitetura, liquidação bancária (Banco Inter PIX & Inter Global USD),
  comunicação oficial (Proton Mail), design system IBM Carbon 18 e proteção jurídica
  para todos os softwares e projetos de inteligência artificial da Pastana Dynamics.
---

# Pastana Dynamics — Master Project & Deploy Skill Blueprint

Este documento consolida a infraestrutura padrão, dados bancários, canais de comunicação, normas de design system **IBM Carbon 18** e cláusulas de proteção de conteúdo para **todos os novos projetos de IA criados pela Pastana Dynamics**.

Ao criar um novo projeto, **mantenha todas as bases institucionais, financeiras e visuais inalteradas**, customizando apenas as regras de negócio e o nome do novo produto.

---

## 🏛️ 1. Identidade Institucional & Autoria

* **Organização / Produtora:** `Pastana Dynamics`
* **Fundador & Arquiteto Líder:** `Vitor Pastana Santana`
* **Slogan Corporativo:** *Next-Generation AI Infrastructure & Green Computing Protocols*
* **Licença Padrão de Software:** `Apache-2.0` (Código Aberto) com Termos de Uso e Cláusulas Comerciais
* **Email Oficial & Faturamento:** `pastanadynamics@proton.me` (Proton Mail)
* **Email Secundário de Desenvolvimento:** `pastana7773d@gmail.com`
* **GitHub do Fundador:** `https://github.com/past7773d`

---

## 💳 2. Dados de Liquidação Bancária & Faturamento

Todos os projetos e produtos que possuam monetização, planos SaaS, tokens de acesso ou contratação de consultoria devem apontar estritamente para estas contas:

### 🇧🇷 A. Recebimento Nacional (Brasil — PIX Instantâneo)
* **Instituição Bancária:** Banco Inter S.A. (Código de Compensação: `077`)
* **Chave PIX Oficial (E-mail):** `pastanadynamics@proton.me`
* **Titular da Conta:** Vitor Pastana Santana (Pastana Dynamics)
* **Finalidade:** Faturamento imediato de planos Pro/Enterprise e consultoria técnica.
* **Comprovantes:** Devem ser encaminhados para `pastanadynamics@proton.me` para liberação automática de credenciais.

### 🌎 B. Recebimento Internacional (Global — Dólares Americanos USD)
* **Instituição:** Banco Inter Global Account (Estados Unidos)
* **Moeda:** `USD` (Dólares Americanos)
* **Métodos de Transferência:** ACH / Wire / SWIFT
* **Beneficiário:** Vitor Pastana Santana / Pastana Dynamics
* **Solicitação de Invoices / Faturas Comerciais:** `pastanadynamics@proton.me`

---

## 🎨 3. Padrão Visual Obrigatório: IBM Carbon 18

Todos os frontends de novos softwares devem seguir as diretrizes do **IBM Carbon Design System v11/18**:

1. **Paleta de Cores Industrial Dark (Carbon g100):**
   * Background Principal: `#0a0d14` ou `#161616` (slate-950 / carbon-dark)
   * Containers e Cards: `#1e293b` ou `#262626` (slate-900 / carbon-layer-1)
   * Bordas de Alta Precisão: `#334155` ou `#393939` (slate-800 / border-subtle)
   * Acentos de Ação: Azul Carbon (`#0f62fe` / blue-500) e Verde Esmeralda Green AI (`#10b981` / emerald-500)
2. **Tipografia Técnica:**
   * Código, Métricas, Logs e Schemas: `JetBrains Mono` ou `IBM Plex Mono`
   * Textos de Interface e Headings: `Plus Jakarta Sans` ou `IBM Plex Sans`
3. **Selos Visuais Obrigatórios em Todos os Softwares:**
   * Selo Superior / Header: `[IBM Carbon 18 Standard]` + `[Green AI Computing]`
   * Selo de Segurança: `[Conteúdo Protegido © Pastana Dynamics]`

---

## 🛡️ 4. Regras de Proteção Jurídica & Conteúdo (Copyright)

Todo software e blog gerado sob a marca deve conter as seguintes proteções expressas:

1. **Aviso Legal nos Rodapés (Footer):**
   > *"© 2026 Pastana Dynamics (Vitor Pastana Santana). Conteúdo e Protocolo Protegidos sob Registro de Propriedade Intelectual & Padrão Aberto M2M RFC-8259. Chave PIX & Faturamento: pastanadynamics@proton.me. Todos os Direitos Reservados."*

2. **Cláusula Anti-Scraping nos Artigos e Dados:**
   * Proteção sob a **Lei Federal nº 9.610/98 (Direitos Autorais do Brasil)** e tratados internacionais (**Convenção de Berna / OMPI**).
   * Proibição expressa de raspagem automatizada (scraping) ou ingestão de datasets para treinamento de modelos proprietários de terceiros sem licença comercial da Pastana Dynamics.

---

## 🚀 5. Especificações de Deploy & Arquitetura Técnica

Ao inicializar qualquer novo projeto no AI Studio ou servidor dedicado:

1. **Stack Tecnológica Padrão:**
   * **Runtime:** Node.js (v20+) com TypeScript (`tsx`)
   * **Servidor Full-Stack:** Express com `vite.middlewares` montado em desenvolvimento (`server.ts`)
   * **Frontend:** React 19 + Vite + Tailwind CSS v4 + Motion
   * **Porta do Servidor:** `3000` (Obrigatório para container Cloud Run / AI Studio)
   * **SDK de IA:** `@google/genai` (SDK oficial v2 com suporte a Gemini 3 Series, Context Caching e `responseSchema`)

2. **Estrutura de Scripts no `package.json`:**
   ```json
   {
     "scripts": {
       "dev": "tsx server.ts",
       "build": "vite build",
       "start": "NODE_ENV=production tsx server.ts",
       "lint": "tsc --noEmit"
     }
   }
   ```

3. **Deploy em Produção:**
   * Build: `npm run build`
   * Execução: `node server.ts` ou `tsx server.ts` escutando na porta `3000` e no host `0.0.0.0`.

---

## 📋 6. Guia Rápido: Como Criar um Novo Projeto com este Blueprint

Quando for iniciar o próximo produto da Pastana Dynamics:

1. **Copie a Estrutura Base:**
   * Mantenha os arquivos `SKILL.md`, componentes de cabeçalho (`Header.tsx`), rodapé institucional (`App.tsx`) e módulo financeiro (`PricingMonetizationHub.tsx`).
2. **Substitua Apenas o Produto:**
   * Altere a variável do nome do produto (ex: de `ContextMatrix` para o nome da nova ferramenta).
   * Implemente as novas telas e endpoints no `server.ts`.
3. **Mantenha os Canais Fixos:**
   * Chave PIX: `pastanadynamics@proton.me`
   * Conta Inter Global: `pastanadynamics@proton.me`
   * Selo IBM Carbon 18 ativo no cabeçalho e rodapé.
   * Direitos reservados para Vitor Pastana Santana / Pastana Dynamics.
