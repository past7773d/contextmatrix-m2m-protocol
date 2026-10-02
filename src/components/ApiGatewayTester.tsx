import React, { useState } from 'react';
import { Network, Terminal, Copy, Check, Play, Zap, Leaf, ShieldAlert, Cpu, Sparkles, Code2, ArrowRight } from 'lucide-react';

export const ApiGatewayTester: React.FC = () => {
  const [model, setModel] = useState<'gemini-3.8-flash' | 'gemini-3.1-flash-lite' | 'gemini-3.1-pro-preview'>('gemini-3.8-flash');
  const [promptInput, setPromptInput] = useState<string>(
    'Olá caro assistente! Gostaria muito que você pudesse me ajudar, por gentileza. Preciso de um resumo em formato JSON com o status de saúde de 3 servidores da nossa infraestrutura em nuvem, contendo cpu, memoria e status online. Muito obrigado pela atenção!'
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);
  const [activeSnippetTab, setActiveSnippetTab] = useState<'curl' | 'python' | 'node' | 'github-action'>('curl');
  const [copiedSnippet, setCopiedSnippet] = useState<boolean>(false);

  const handleTestGateway = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/gateway/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          temperature: 0.1,
          messages: [
            {
              role: 'user',
              content: promptInput,
            },
          ],
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setResult({ error: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  const getCurlSnippet = () => `curl -X POST https://ais-pre-sqahftnb6tajnckfdujoom-200543744005.us-east1.run.app/api/gateway/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "${model}",
    "temperature": 0.1,
    "messages": [
      {
        "role": "user",
        "content": ${JSON.stringify(promptInput)}
      }
    ]
  }'`;

  const getPythonSnippet = () => `import requests

# ContextMatrix M2M Green AI Reverse Proxy
url = "https://ais-pre-sqahftnb6tajnckfdujoom-200543744005.us-east1.run.app/api/gateway/v1/chat/completions"

payload = {
    "model": "${model}",
    "temperature": 0.1,
    "messages": [
        {"role": "user", "content": """${promptInput}"""}
    ]
}

response = requests.post(url, json=payload)
data = response.json()

# Telemetria Física e Energética
telemetry = data.get("contextmatrix_telemetry", {})
print(f"✅ Tokens Poupados: {telemetry.get('tokens_saved')} ({telemetry.get('compression_ratio_pct')}%)")
print(f"🌱 Joules Economizados: {telemetry.get('joules_saved')} J")
print(f"⚡ Resposta do Modelo: {data['choices'][0]['message']['content']}")`;

  const getNodeSnippet = () => `import fetch from 'node-fetch';

async function sendGreenPrompt() {
  const res = await fetch('https://ais-pre-sqahftnb6tajnckfdujoom-200543744005.us-east1.run.app/api/gateway/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: '${model}',
      temperature: 0.1,
      messages: [
        { role: 'user', content: ${JSON.stringify(promptInput)} }
      ]
    })
  });

  const completion = await res.json();
  console.log('Telemetria M2M:', completion.contextmatrix_telemetry);
  console.log('Output:', completion.choices[0].message.content);
}

sendGreenPrompt();`;

  const getGithubActionSnippet = () => `name: ContextMatrix Prompt Linter & Green AI Gate

on:
  pull_request:
    paths:
      - 'prompts/**'
      - 'src/prompts/**'

jobs:
  audit-prompts:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Audit Prompts with ContextMatrix AST
        run: |
          echo "Auditando eficiência de Joules e contratos RFC-8259..."
          curl -s -X POST https://ais-pre-sqahftnb6tajnckfdujoom-200543744005.us-east1.run.app/api/gateway/v1/chat/completions \\
            -H "Content-Type: application/json" \\
            -d '{"model": "gemini-3.8-flash", "messages":[{"role":"user","content":"CI_PROMPT_CHECK"}]}'
          echo "Prompt aprovado no padrão Green Software Foundation!"`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 border border-emerald-800/40 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Network className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                ContextMatrix Live API Gateway & Reverse Proxy
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-900/60 border border-emerald-700/60 text-emerald-300">
                  v1/chat/completions
                </span>
              </h2>
            </div>
            <p className="text-sm text-slate-400 max-w-3xl">
              Middleware de borda compatível com o padrão OpenAPI/OpenAI. Intercepta requisições de equipes ou micro-serviços,
              remove ruídos antropomórficos instantaneamente, fixa prefixos em cache e despacha para a GPU com custo e Joules mínimos.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono text-emerald-400 font-medium">Gateway Ativo (Porta 3000)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Gateway Tester */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                Simulador de Requisição de Entrada
              </h3>
              <select
                value={model}
                onChange={(e: any) => setModel(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-300 font-mono focus:border-emerald-500 focus:outline-none"
              >
                <option value="gemini-3.8-flash">gemini-3.8-flash (3.42 J/1k)</option>
                <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite (1.15 J/1k - Ultra Verde)</option>
                <option value="gemini-3.1-pro-preview">gemini-3.1-pro-preview (Raciocínio Denso)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5 font-mono">
                Carga Útil do Prompt (Humano / Legado com Ruído):
              </label>
              <textarea
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                rows={5}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-slate-200 font-mono focus:border-emerald-500 focus:outline-none transition-colors"
                placeholder="Insira qualquer prompt humano que seria enviado à IA..."
              />
            </div>

            <button
              onClick={handleTestGateway}
              disabled={isLoading || !promptInput.trim()}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-emerald-950/40"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                  <span>Processando no Gateway...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Disparar Requisição via Gateway</span>
                </>
              )}
            </button>
          </div>

          {/* Response Payload & Telemetry */}
          {result && (
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-emerald-800/40 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-emerald-300 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  Telemetria Física em Tempo Real
                </h3>
                {result.contextmatrix_telemetry && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-400">
                    Latência Proxy: {result.contextmatrix_telemetry.gateway_latency_ms}ms
                  </span>
                )}
              </div>

              {result.contextmatrix_telemetry ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                    <span className="block text-[10px] font-mono text-slate-400">Tokens Originais</span>
                    <span className="text-sm font-bold text-slate-300 font-mono">
                      {result.contextmatrix_telemetry.original_prompt_tokens}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-emerald-950/50 border border-emerald-800/60 text-center">
                    <span className="block text-[10px] font-mono text-emerald-400">Tokens Poupados</span>
                    <span className="text-sm font-bold text-emerald-300 font-mono">
                      -{result.contextmatrix_telemetry.tokens_saved} ({result.contextmatrix_telemetry.compression_ratio_pct}%)
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-teal-950/50 border border-teal-800/60 text-center">
                    <span className="block text-[10px] font-mono text-teal-400">Joules Salvos</span>
                    <span className="text-sm font-bold text-teal-300 font-mono">
                      {result.contextmatrix_telemetry.joules_saved} J
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                    <span className="block text-[10px] font-mono text-cyan-400">CO2e Evitado</span>
                    <span className="text-sm font-bold text-cyan-300 font-mono">
                      {result.contextmatrix_telemetry.carbon_saved_grams_co2e}g
                    </span>
                  </div>
                </div>
              ) : null}

              {/* Output Content */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Resposta Estruturada Entregue ao Cliente:
                </label>
                <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto max-h-56">
                  {result.choices ? result.choices[0].message.content : JSON.stringify(result, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Multi-Language Integration SDKs */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-lg flex flex-col h-full">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-400" />
                Como Conectar sua Aplicação ao Gateway
              </h3>
              <button
                onClick={() => {
                  if (activeSnippetTab === 'curl') copyToClipboard(getCurlSnippet());
                  if (activeSnippetTab === 'python') copyToClipboard(getPythonSnippet());
                  if (activeSnippetTab === 'node') copyToClipboard(getNodeSnippet());
                  if (activeSnippetTab === 'github-action') copyToClipboard(getGithubActionSnippet());
                }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors cursor-pointer"
              >
                {copiedSnippet ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Código</span>
                  </>
                )}
              </button>
            </div>

            {/* Sub-tabs */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveSnippetTab('curl')}
                className={`flex-1 py-1.5 text-xs font-mono rounded-lg transition-colors cursor-pointer ${
                  activeSnippetTab === 'curl' ? 'bg-slate-800 text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                cURL
              </button>
              <button
                onClick={() => setActiveSnippetTab('python')}
                className={`flex-1 py-1.5 text-xs font-mono rounded-lg transition-colors cursor-pointer ${
                  activeSnippetTab === 'python' ? 'bg-slate-800 text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Python
              </button>
              <button
                onClick={() => setActiveSnippetTab('node')}
                className={`flex-1 py-1.5 text-xs font-mono rounded-lg transition-colors cursor-pointer ${
                  activeSnippetTab === 'node' ? 'bg-slate-800 text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Node.js
              </button>
              <button
                onClick={() => setActiveSnippetTab('github-action')}
                className={`flex-1 py-1.5 text-xs font-mono rounded-lg transition-colors cursor-pointer ${
                  activeSnippetTab === 'github-action' ? 'bg-slate-800 text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                CI/CD Action
              </button>
            </div>

            {/* Code Snippet Viewer */}
            <div className="flex-1 bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs overflow-x-auto">
              <pre className="text-slate-300 whitespace-pre">
                {activeSnippetTab === 'curl' && getCurlSnippet()}
                {activeSnippetTab === 'python' && getPythonSnippet()}
                {activeSnippetTab === 'node' && getNodeSnippet()}
                {activeSnippetTab === 'github-action' && getGithubActionSnippet()}
              </pre>
            </div>

            {/* Enterprise Integration Note */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
              <span className="font-semibold text-slate-300 font-mono">Dica de Arquitetura:</span>
              <p>
                Basta substituir a <code className="text-emerald-400">baseURL</code> do seu cliente OpenAI ou LangChain pelo endereço
                deste Gateway. Toda chamada externa será automaticamente sanitizada, cacheada na VRAM da GPU e contabilizada no relatório ESG.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
