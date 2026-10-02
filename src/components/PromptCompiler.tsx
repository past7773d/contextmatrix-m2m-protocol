import React, { useState } from 'react';
import { 
  Zap, Copy, Check, Play, RefreshCw, AlertTriangle, ArrowRight, 
  ShieldCheck, Leaf, Code2, Sliders, Database, Layers, Sparkles 
} from 'lucide-react';
import { OptimizedResult, ExecutionRunResult } from '../types';
import { PROMPT_PRESETS, PromptPreset, GREEN_COMPUTING_TIPS } from '../data/presets';

interface PromptCompilerProps {
  onRunBenchmarkWithPrompt?: (raw: string, optimized: string, model: string) => void;
}

export const PromptCompiler: React.FC<PromptCompilerProps> = ({ onRunBenchmarkWithPrompt }) => {
  const [rawPrompt, setRawPrompt] = useState<string>(PROMPT_PRESETS[0].rawPrompt);
  const [targetModel, setTargetModel] = useState<string>('gemini-3.1-flash-lite');
  const [isCompiling, setIsCompiling] = useState<boolean>(false);
  const [optimizedResult, setOptimizedResult] = useState<OptimizedResult | null>(null);
  const [activeOutputTab, setActiveOutputTab] = useState<'directive' | 'schema' | 'params' | 'code'>('directive');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Live test execution state
  const [isExecutingTest, setIsExecutingTest] = useState<boolean>(false);
  const [executionResult, setExecutionResult] = useState<ExecutionRunResult | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSelectPreset = (preset: PromptPreset) => {
    setRawPrompt(preset.rawPrompt);
    setTargetModel(preset.suggestedModel);
    setOptimizedResult(null);
    setExecutionResult(null);
  };

  const handleCompile = async () => {
    if (!rawPrompt.trim()) return;
    setIsCompiling(true);
    setExecutionResult(null);

    try {
      const res = await fetch('/api/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawPrompt, targetModel })
      });
      const data = await res.json();
      if (res.ok) {
        setOptimizedResult(data);
      } else {
        alert(data.error || 'Erro ao compilar prompt.');
      }
    } catch (err: any) {
      console.error(err);
      alert('Falha na comunicação com o compilador de contexto.');
    } finally {
      setIsCompiling(false);
    }
  };

  const handleRunLiveTest = async () => {
    if (!optimizedResult) return;
    setIsExecutingTest(true);

    try {
      const res = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: optimizedResult.machineInstructionText,
          model: optimizedResult.recommendedParameters.model,
          temperature: optimizedResult.recommendedParameters.temperature,
          systemInstruction: optimizedResult.systemDirective
        })
      });
      const data = await res.json();
      if (res.ok) {
        setExecutionResult(data);
      } else {
        alert(data.error || 'Erro ao executar teste.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsExecutingTest(false);
    }
  };

  // Generate code samples for export
  const getTsCode = () => {
    if (!optimizedResult) return '';
    return `import { GoogleGenAI, Type } from "@google/genai";

// Inicialização segura no backend
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
});

async function executeM2MInstruction() {
  const response = await ai.models.generateContent({
    model: "${optimizedResult.recommendedParameters.model}",
    contents: ${JSON.stringify(optimizedResult.operationalGoal)},
    config: {
      systemInstruction: ${JSON.stringify(optimizedResult.systemDirective)},
      temperature: ${optimizedResult.recommendedParameters.temperature},
      topP: ${optimizedResult.recommendedParameters.topP},
      responseMimeType: "application/json",
      responseSchema: ${JSON.stringify(optimizedResult.jsonSchema, null, 2)}
    }
  });

  const parsedData = JSON.parse(response.text || '{}');
  return parsedData;
}`;
  };

  const getPythonCode = () => {
    if (!optimizedResult) return '';
    return `from google import genai
from google.genai import types
import os

client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

response = client.models.generate_content(
    model="${optimizedResult.recommendedParameters.model}",
    contents="""${optimizedResult.operationalGoal}""",
    config=types.GenerateContentConfig(
        system_instruction="""${optimizedResult.systemDirective}""",
        temperature=${optimizedResult.recommendedParameters.temperature},
        top_p=${optimizedResult.recommendedParameters.topP},
        response_mime_type="application/json",
    )
)

print(response.text)`;
  };

  return (
    <div className="space-y-6">
      
      {/* Intro Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/50 via-slate-900 to-slate-950 border border-emerald-500/20 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <Leaf className="w-4 h-4" />
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Compilador de Contexto de Máquinas & Green Prompting
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
              Transforma prompts humanos informais e carregados de ruído semântico em diretrizes compactas, 
              estruturadas e ancoradas em schemas rígidos. Reduz o consumo computacional em Joules e 
              elimina o desperdício de tokens decorrentes de loops de re-tentativa.
            </p>
          </div>
          
          <div className="flex items-center gap-2 self-start md:self-center">
            <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700 text-slate-300">
              Protocolo: <span className="text-emerald-400 font-semibold">Zero-Entropy M2M</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Input and Parameters */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Preset Buttons */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3.5 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                Casos de Teste Prontos
              </span>
              <span className="text-[11px] text-slate-400">Clique para carregar</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {PROMPT_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className="text-left p-2.5 rounded-lg bg-slate-950/60 hover:bg-emerald-950/30 border border-slate-800 hover:border-emerald-500/40 transition-all text-xs group"
                >
                  <div className="font-semibold text-slate-200 group-hover:text-emerald-300 truncate">
                    {preset.category}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate mt-0.5">
                    {preset.title}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* User Prompt Input */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                Prompt Humano Inicial (Entrada Bruta)
              </label>
              <span className="text-xs font-mono text-slate-400">
                {rawPrompt.length} caracteres • ~{Math.ceil(rawPrompt.length / 3.8)} tokens est.
              </span>
            </div>

            <textarea
              value={rawPrompt}
              onChange={(e) => setRawPrompt(e.target.value)}
              placeholder="Digite ou cole aqui o prompt informal do usuário..."
              rows={6}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-lg p-3 text-xs sm:text-sm font-sans text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all resize-none"
            />

            {/* Target Model Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 flex items-center justify-between">
                <span>Modelo Alvo de Execução:</span>
                <span className="text-[10px] text-emerald-400">Cruzamento dinâmico</span>
              </label>
              <select
                value={targetModel}
                onChange={(e) => setTargetModel(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="gemini-3.1-flash-lite">Gemini 3.1 Flash-Lite (Ultra-Eficiente: ~1.15 J/1k tokens)</option>
                <option value="gemini-3.8-flash">Gemini 3.8 Flash (Padrão Equilibrado: ~3.42 J/1k tokens)</option>
                <option value="gemini-3.1-pro-preview">Gemini 3.1 Pro Preview (Raciocínio Profundo: ~21.8 J/1k tokens)</option>
                <option value="gemma-local-quantized">Gemma Local 4-bit Quantized (Edge On-Device: ~0.82 J/1k tokens)</option>
              </select>
            </div>

            {/* Compile Action Button */}
            <button
              onClick={handleCompile}
              disabled={isCompiling || !rawPrompt.trim()}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-md shadow-emerald-950/60 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {isCompiling ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Destilando Contexto de Máquina...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-slate-950 fill-current" />
                  <span>Compilar em Instrução de Máquina (Zero Waste)</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Green Computing Principles Card */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-3.5 space-y-2.5">
            <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5" />
              Princípios da Comunicação de Máquinas
            </span>
            <div className="text-[11px] text-slate-300 space-y-1.5 font-sans leading-relaxed">
              <p>• <strong>Sem cortesia artificial:</strong> Palavras como "olá" ou "por favor" gastam energia sem alterar o resultado computacional.</p>
              <p>• <strong>Schema rígido:</strong> Definir saída JSON fecha ramos estocásticos da GPU, diminuindo a temperatura para quase zero.</p>
              <p>• <strong>Prevenção de loops:</strong> Prompts vagos causam 2 a 3 re-tentativas, triplicando o consumo de energia no data center.</p>
            </div>
          </div>

        </div>

        {/* Right Column: Output & Context Engine */}
        <div className="lg:col-span-7 space-y-4">
          {optimizedResult ? (
            <div className="space-y-4">
              
              {/* Eco Metrics KPI Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                
                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-0.5">
                  <div className="text-[11px] font-mono text-emerald-400 font-medium">Redução de Desperdício</div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-300">
                    -{optimizedResult.tokenReductionPercent}%
                  </div>
                  <div className="text-[10px] text-slate-400">tokens economizados</div>
                </div>

                <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-0.5">
                  <div className="text-[11px] font-mono text-cyan-400 font-medium">Energia Evitada</div>
                  <div className="text-xl sm:text-2xl font-black text-cyan-300">
                    {optimizedResult.energyMetrics.joulesSavedPerExecution} <span className="text-xs font-normal text-cyan-400">J</span>
                  </div>
                  <div className="text-[10px] text-slate-400">Joules / execução</div>
                </div>

                <div className="p-3 rounded-xl bg-teal-950/30 border border-teal-500/30 space-y-0.5">
                  <div className="text-[11px] font-mono text-teal-400 font-medium">Evitou Re-tentativas</div>
                  <div className="text-xl sm:text-2xl font-black text-teal-300">
                    ~{optimizedResult.preventedRetryTokens}
                  </div>
                  <div className="text-[10px] text-slate-400">tokens de retry eliminados</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-0.5">
                  <div className="text-[11px] font-mono text-amber-400 font-medium">CO2e por 10k req</div>
                  <div className="text-xl sm:text-2xl font-black text-amber-300">
                    -{optimizedResult.energyMetrics.co2GramsSavedPer10k} <span className="text-xs font-normal text-amber-400">g</span>
                  </div>
                  <div className="text-[10px] text-slate-400">emissões evitadas</div>
                </div>

              </div>

              {/* Output Tabs Container */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
                
                {/* Tab Switcher */}
                <div className="flex items-center justify-between px-3 pt-2.5 border-b border-slate-800 bg-slate-950/70">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setActiveOutputTab('directive')}
                      className={`px-3 py-1.5 rounded-t-lg text-xs font-mono font-medium transition-all ${
                        activeOutputTab === 'directive'
                          ? 'bg-slate-900 text-emerald-400 border-t-2 border-emerald-500'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Instrução M2M
                    </button>

                    <button
                      onClick={() => setActiveOutputTab('schema')}
                      className={`px-3 py-1.5 rounded-t-lg text-xs font-mono font-medium transition-all ${
                        activeOutputTab === 'schema'
                          ? 'bg-slate-900 text-cyan-400 border-t-2 border-cyan-500'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      JSON Schema
                    </button>

                    <button
                      onClick={() => setActiveOutputTab('params')}
                      className={`px-3 py-1.5 rounded-t-lg text-xs font-mono font-medium transition-all ${
                        activeOutputTab === 'params'
                          ? 'bg-slate-900 text-teal-400 border-t-2 border-teal-500'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Hiperparâmetros
                    </button>

                    <button
                      onClick={() => setActiveOutputTab('code')}
                      className={`px-3 py-1.5 rounded-t-lg text-xs font-mono font-medium transition-all ${
                        activeOutputTab === 'code'
                          ? 'bg-slate-900 text-purple-400 border-t-2 border-purple-500'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Exportar Código
                    </button>
                  </div>

                  <div className="text-[11px] font-mono text-slate-400 hidden sm:block">
                    Motor: <span className="text-emerald-400">{optimizedResult.engine}</span>
                  </div>
                </div>

                {/* Tab Body */}
                <div className="p-4">
                  {/* Tab 1: Machine Instruction */}
                  {activeOutputTab === 'directive' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                          <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                          Instrução Computacional Estruturada (Direct Machine Frame)
                        </span>
                        <button
                          onClick={() => handleCopy(optimizedResult.machineInstructionText, 'directive')}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-all"
                        >
                          {copiedKey === 'directive' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedKey === 'directive' ? 'Copiado!' : 'Copiar'}</span>
                        </button>
                      </div>

                      <pre className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-72">
                        {optimizedResult.machineInstructionText}
                      </pre>

                      {/* Constraints Checklist */}
                      <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-1.5">
                        <div className="text-[11px] font-mono text-slate-400 uppercase font-semibold">
                          Restrições de Fronteira Injetadas:
                        </div>
                        <ul className="space-y-1 text-xs text-slate-300">
                          {optimizedResult.inputConstraints.map((c, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Tab 2: JSON Schema */}
                  {activeOutputTab === 'schema' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                          <Database className="w-3.5 h-3.5 text-cyan-400" />
                          Schema RFC-8259 para Decodificação Restrita (Zero Alucinação)
                        </span>
                        <button
                          onClick={() => handleCopy(JSON.stringify(optimizedResult.jsonSchema, null, 2), 'schema')}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-all"
                        >
                          {copiedKey === 'schema' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedKey === 'schema' ? 'Copiado!' : 'Copiar JSON'}</span>
                        </button>
                      </div>

                      <pre className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto whitespace-pre-wrap max-h-72 leading-relaxed">
                        {JSON.stringify(optimizedResult.jsonSchema, null, 2)}
                      </pre>
                    </div>
                  )}

                  {/* Tab 3: Calibrated Parameters */}
                  {activeOutputTab === 'params' && (
                    <div className="space-y-4">
                      <div className="text-xs text-slate-300">
                        Hiperparâmetros matematicamente calibrados para desabilitar a entropia da GPU e evitar ciclos de sampling desnecessários:
                      </div>

                      <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                          <div className="text-slate-400 text-[11px]">Temperature</div>
                          <div className="text-base font-bold text-emerald-400 mt-0.5">
                            {optimizedResult.recommendedParameters.temperature}
                          </div>
                          <div className="text-[10px] text-slate-500 mt-1">
                            Baixa para determinismo máximo de máquina
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                          <div className="text-slate-400 text-[11px]">Top-P</div>
                          <div className="text-base font-bold text-cyan-400 mt-0.5">
                            {optimizedResult.recommendedParameters.topP}
                          </div>
                          <div className="text-[10px] text-slate-500 mt-1">
                            Nucleus sampling podado para tokens de alta densidade
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                          <div className="text-slate-400 text-[11px]">Thinking Level</div>
                          <div className="text-base font-bold text-amber-400 mt-0.5">
                            {optimizedResult.recommendedParameters.thinkingLevel}
                          </div>
                          <div className="text-[10px] text-slate-500 mt-1">
                            Evita reasoning tokens estocásticos em tarefas estruturadas
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                          <div className="text-slate-400 text-[11px]">Response MIME</div>
                          <div className="text-base font-bold text-purple-400 mt-0.5">
                            application/json
                          </div>
                          <div className="text-[10px] text-slate-500 mt-1">
                            Elimina markdown wrappers e preâmbulos em linguagem natural
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab 4: Export Code */}
                  {activeOutputTab === 'code' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-400">
                          Implementação Pronta (@google/genai TypeScript SDK)
                        </span>
                        <button
                          onClick={() => handleCopy(getTsCode(), 'code')}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-all"
                        >
                          {copiedKey === 'code' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>Copiar Código</span>
                        </button>
                      </div>

                      <pre className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto whitespace-pre max-h-72 leading-relaxed">
                        {getTsCode()}
                      </pre>
                    </div>
                  )}
                </div>

                {/* Footer Action Bar */}
                <div className="px-4 py-3 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleRunLiveTest}
                      disabled={isExecutingTest}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isExecutingTest ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{isExecutingTest ? 'Executando...' : 'Testar Execução ao Vivo'}</span>
                    </button>

                    {onRunBenchmarkWithPrompt && (
                      <button
                        onClick={() => onRunBenchmarkWithPrompt(rawPrompt, optimizedResult.machineInstructionText, targetModel)}
                        className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-all"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>Comparar no Benchmark Lab</span>
                      </button>
                    )}
                  </div>

                  <span className="text-[11px] font-mono text-emerald-400/80">
                    Nível de Eficiência: {optimizedResult.energyMetrics.efficiencyTier}
                  </span>
                </div>

              </div>

              {/* Execution Result Drawer (if executed) */}
              {executionResult && (
                <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-3 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span className="text-xs font-mono font-bold text-white uppercase">
                        Resultado da Execução em Tempo Real
                      </span>
                      {executionResult.isSimulated && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800 text-amber-400">
                          Modo AST Integrado
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                      <span>Latência: <strong className="text-emerald-400">{executionResult.durationMs}ms</strong></span>
                      <span>Tokens Totais: <strong className="text-cyan-400">{executionResult.totalTokens}</strong></span>
                      <span>Energia: <strong className="text-emerald-400">{executionResult.joulesConsumed} J</strong></span>
                    </div>
                  </div>

                  <pre className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto whitespace-pre-wrap max-h-48 leading-relaxed">
                    {executionResult.output}
                  </pre>
                </div>
              )}

            </div>
          ) : (
            /* Placeholder State */
            <div className="h-full min-h-[380px] rounded-xl border border-dashed border-slate-800 bg-slate-950/30 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600">
                <Zap className="w-7 h-7 text-emerald-500/40" />
              </div>
              <div className="max-w-md space-y-1">
                <h3 className="text-sm font-semibold text-slate-300">
                  Aguardando Compilação de Contexto
                </h3>
                <p className="text-xs text-slate-500">
                  Insira o prompt inicial do usuário à esquerda ou selecione um dos casos prontos e clique em 
                  <strong> "Compilar em Instrução de Máquina"</strong> para analisar a redução de tokens e métricas verdes.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
                  Zero Politeness Overhead
                </span>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
                  Schema-Constrained Decoding
                </span>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
                  ThinkingLevel Calibrated
                </span>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
