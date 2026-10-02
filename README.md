# ContextMatrix — Otimizador de Contexto de Máquinas & Green AI

**Autor:** pastana7773d (<pastana7773d@gmail.com>)  
**Licença:** [Apache-2.0](./LICENSE)  
**Padrão:** Green Software Foundation & Machine-to-Machine (M2M) Context Protocol  

---

## 📌 Visão Geral
**ContextMatrix** é uma plataforma de engenharia de contexto máquina-a-máquina (M2M) e otimização energética de prompts (*Green AI*). O objetivo central é converter prompts humanos informais e carregados de ruído semântico em instruções computacionais sólidas, ancoradas e de baixo consumo de FLOPs e Joules, prevenindo o desperdício energético em data centers de inteligência artificial.

## 🚀 Capacidades do Sistema

1. **Compilador de Contexto M2M**:
   - Poda de cortesias e preâmbulos antropomórficos desnecessários.
   - Formalização imperativa contendo `[ROLE]`, `[DOMAIN]`, `[OPERATIONAL_SPECIFICATION]`, `[EXECUTION_CONSTRAINTS]` e `[PAYLOAD_CONTRACT]`.
   - Geração automática de contratos **JSON Schema RFC-8259** para *Schema-Constrained Decoding* direto na GPU.
   - Calibração de hiperparâmetros determinísticos (`temperature: 0.1-0.2`, `topP: 0.95`, `ThinkingLevel`).

2. **Decompositor KV-Cache & Prefix Pinning**:
   - Separação entre Prefixo Estático Imutável (cacheado na VRAM da GPU via `@google/genai ai.caches`) e Slot Dinâmico Efêmero.
   - Economia de até **75% em Joules** por inferência em chamadas recorrentes.

3. **Auditor de Fidelidade Semântica & Zero-Loss Guard**:
   - Auditoria sentença a sentença confirmando preservação integral de requisitos (`STRENGTHENED`) e poda segura de ruídos (`PRUNED_NOISE`).
   - Índice de fidelidade semântica (0 a 100%) e proteção contra alucinações.

4. **Topologia de Micro-Agentes M2M (DAG Desacoplado)**:
   - Orquestração sequencial de modelos ultra-eficientes especializados (`Gemini 3.1 Flash-Lite` + `Gemini 3.8 Flash`).
   - Redução de até **89% do consumo de Joules** em comparação com chamadas monolíticas a modelos pesados.

5. **Destilador de Conversas Multi-Turn & Anti-Looping Engine**:
   - Colapso de 4 a 8 mensagens de tentativa, erro e correções de chat em uma instrução única one-shot.

6. **Cruzamento de Modelos & Laboratório de Benchmark**:
   - Comparativo físico e termodinâmico de consumo: Joules/1k tokens, latência P50, W·h por 10k requisições e fatores de desperdício.
   - Execução lado a lado com telemetria de tokens e tempo de inferência em tempo real.

7. **Calculadora de Impacto Energético em Escala Corporativa**:
   - Projeção de economia anual em kWh, kg de CO2e, custos de API e equivalentes ambientais.

---

## 🛠️ Tecnologias Utilizadas
- **Runtime:** Node.js com Express e TypeScript (`tsx`)
- **Frontend:** React 19, Tailwind CSS v4, Motion, Lucide Icons
- **SDK de IA:** `@google/genai` (v2 SDK oficial com suporte a Gemini 3 Series, Context Caching e `responseSchema`)
- **Compilador:** Vite 8

---

## 💻 Como Executar Localmente

### 1. Clonar e Instalar Dependências
```bash
git clone <URL_DO_REPOSITORIO>
cd context-matrix
npm install
```

### 2. Configurar Variáveis de Ambiente
Copie o arquivo `.env.example`:
```bash
cp .env.example .env
```
Adicione sua chave de API Gemini no `.env`:
```env
GEMINI_API_KEY="SUA_CHAVE_AQUI"
```

### 3. Iniciar o Servidor de Desenvolvimento
```bash
npm run dev
```
Acesse a aplicação no navegador em `http://localhost:3000`.

### 4. Build de Produção
```bash
npm run build
npm start
```

---

## 📄 Licença e Autoria
Desenvolvido por **pastana7773d** (<pastana7773d@gmail.com>).  
Distribuído sob a licença **Apache-2.0**. Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.
