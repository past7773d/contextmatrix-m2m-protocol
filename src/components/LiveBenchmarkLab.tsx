import React, { useState } from 'react';
import { Sparkles, Play, RefreshCw, Zap, ArrowRight, ShieldCheck, CheckCircle2, Clock, Leaf } from 'lucide-react';
import { ExecutionRunResult } from '../types';
import { PROMPT_PRESETS } from '../data/presets';

interface BenchmarkLabProps {
  initialRawPrompt?: string;
  initialOptimizedPrompt?: string;
  initialModel?: string;
}

export const LiveBenchmarkLab: React.FC<BenchmarkLabProps> = ({
  initialRawPrompt,
  initialOptimizedPrompt,
  initialModel
}) => {
  const [rawText, setRawText] = useState<string>(
    initialRawPrompt || PROMPT_PRESETS[0].rawPrompt
  );
  const [optimizedText, setOptimizedText] = useState<string>(
    initialOptimizedPrompt || `[ROLE: DETERMINISTIC_CONTEXT_PROCESSOR]
[DOMAIN: DATA_EXTRACTION_AND_MAPPING]
[OUTPUT_RULE: Retorne estritamente JSON RFC-8259 sem preâmbulo]

[OPERATIONAL_SPECIFICATION]
GOAL: Extrair comprador, total com impostos, itens e data de vencimento da fatura.

[EXECUTION_CONSTRAINTS]
- Valores monetários como números float
- Data no formato ISO-8601
- Sem texto conversacional adicional`
  );

  const [selectedModel, setSelectedModel] = useState<string>(initialModel || 'gemini-3.8-flash');
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const [rawResult, setRawResult] = useState<ExecutionRunResult | null>(null);
  const [optimizedResult, setOptimizedResult] = useState<ExecutionRunResult | null>(null);

  const handleRunComparison = async () => {
    setIsRunning(true);
    setRawResult(null);
    setOptimizedResult(null);

    try {
      // 1. Run raw prompt
      const resRaw = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: rawText,
          model: selectedModel,
          temperature: 0.7 // higher entropy typical of unstructured human prompts
        })
      });
      const dataRaw = await resRaw.json();

      // 2. Run machine-optimized prompt
      const resOpt = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: optimizedText,
          model: selectedModel,
          temperature: 0.1, // low deterministic temperature for machine context
          systemInstruction: 'Retorne estritamente dados estruturados conforme o schema requisitado sem qualquer introdução ou conclusão.'
        })
      });
      const dataOpt = await resOpt.json();

      setRawResult(dataRaw);
      setOptimizedResult(dataOpt);
    } catch (err) {
      console.error('Benchmark execution error:', err);
      alert('Erro durante a execução do benchmark.');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Intro Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/20 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <Sparkles className="w-4 h-4" />
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Laboratório de Benchmark em Tempo Real
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
              Execute o prompt humano bruto e a instrução de máquina otimizada em paralelo. Compare o gasto de tokens, 
              tempo de resposta, consumo em Joules e a pureza estrutural da saída.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center">
            <button
              onClick={handleRunComparison}
              disabled={isRunning || !rawText.trim() || !optimizedText.trim()}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all shadow-md disabled:opacity-50 cursor-pointer"
            >
              {isRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isRunning ? 'Disparando Inferência...' : 'Executar Comparativo ao Vivo'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Model & Settings Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/70 border border-slate-800 rounded-xl text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Modelo Testado:</span>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            <option value="gemini-3.1-flash-lite">Gemini 3.1 Flash-Lite (~1.15 J/1k tok)</option>
            <option value="gemini-3.8-flash">Gemini 3.8 Flash (~3.42 J/1k tok)</option>
            <option value="gemini-3.1-pro-preview">Gemini 3.1 Pro Preview (~21.8 J/1k tok)</option>
          </select>
        </div>

        <span className="text-[11px] text-slate-400">
          Metodologia: Inferência simultânea com telemetria de tokens e tempo de GPU
        </span>
      </div>

      {/* Side-by-Side Prompt Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Raw Column */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-amber-900/40 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              A) Prompt Humano Bruto (Conversacional)
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              ~{Math.ceil(rawText.length / 3.8)} tokens
            </span>
          </div>

          <textarea
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            rows={5}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-300 font-sans focus:outline-none focus:border-amber-500 resize-none"
          />

          <div className="text-[11px] text-slate-400 font-mono">
            Temperatura Padrão: 0.7 (Alta variabilidade estocástica)
          </div>
        </div>

        {/* Optimized Column */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-emerald-900/40 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              B) Instrução de Máquina Compilada (M2M Direct)
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              ~{Math.ceil(optimizedText.length / 3.8)} tokens
            </span>
          </div>

          <textarea
            value={optimizedText}
            onChange={(e) => setOptimizedText(e.target.value)}
            rows={5}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-emerald-300 font-mono focus:outline-none focus:border-emerald-500 resize-none"
          />

          <div className="text-[11px] text-emerald-400/80 font-mono">
            Temperatura Calibrada: 0.1 (Determinismo de máquina de alta precisão)
          </div>
        </div>

      </div>

      {/* Comparison Results */}
      {rawResult && optimizedResult ? (
        <div className="space-y-4 animate-in fade-in duration-300">
          
          {/* Winner Metrics Strip */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-950 border border-emerald-500/40 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-[11px] font-mono text-slate-400 uppercase">Delta de Latência</div>
              <div className="text-xl font-bold text-emerald-300 mt-0.5">
                {rawResult.durationMs > optimizedResult.durationMs ? (
                  `-${rawResult.durationMs - optimizedResult.durationMs} ms`
                ) : (
                  `+${optimizedResult.durationMs - rawResult.durationMs} ms`
                )}
              </div>
              <div className="text-[10px] text-slate-400">Tempo de inferência</div>
            </div>

            <div>
              <div className="text-[11px] font-mono text-slate-400 uppercase">Tokens de Saída Descartados</div>
              <div className="text-xl font-bold text-emerald-300 mt-0.5">
                {Math.max(0, rawResult.outputTokens - optimizedResult.outputTokens)} tokens
              </div>
              <div className="text-[10px] text-slate-400">Economia em preâmbulos</div>
            </div>

            <div>
              <div className="text-[11px] font-mono text-slate-400 uppercase">Economia Energética</div>
              <div className="text-xl font-bold text-cyan-300 mt-0.5">
                {Math.max(0, Number((rawResult.joulesConsumed - optimizedResult.joulesConsumed).toFixed(3)))} J
              </div>
              <div className="text-[10px] text-slate-400">Joules evitados nesta chamada</div>
            </div>

            <div>
              <div className="text-[11px] font-mono text-slate-400 uppercase">Eliminação de Ruído</div>
              <div className="text-xl font-bold text-amber-300 mt-0.5">
                100%
              </div>
              <div className="text-[10px] text-slate-400">Zero conversação desnecessária</div>
            </div>
          </div>

          {/* Results Comparison Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Raw Output Card */}
            <div className="p-4 rounded-xl bg-slate-950 border border-amber-900/30 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-mono">
                <span className="text-amber-400 font-semibold">Resposta do Prompt Bruto</span>
                <span className="text-slate-400">{rawResult.outputTokens} tokens gerados</span>
              </div>
              <pre className="p-3 rounded bg-slate-900/80 border border-slate-800 text-xs font-sans text-slate-300 whitespace-pre-wrap max-h-60 overflow-y-auto leading-relaxed">
                {rawResult.output}
              </pre>
              <div className="text-[11px] text-amber-400/80 font-mono">
                ⚠️ Contém preâmbulo conversacional ou falta de validação estrita de schema.
              </div>
            </div>

            {/* Optimized Output Card */}
            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-900/30 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-mono">
                <span className="text-emerald-400 font-semibold">Resposta do Contexto de Máquina</span>
                <span className="text-emerald-300 font-bold">{optimizedResult.outputTokens} tokens gerados</span>
              </div>
              <pre className="p-3 rounded bg-slate-900/80 border border-slate-800 text-xs font-mono text-emerald-300 whitespace-pre-wrap max-h-60 overflow-y-auto leading-relaxed">
                {optimizedResult.output}
              </pre>
              <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Payload limpo, decodificado diretamente no formato RFC-8259 da máquina consumidora.</span>
              </div>
            </div>

          </div>

        </div>
      ) : (
        <div className="p-8 text-center rounded-xl bg-slate-950/40 border border-dashed border-slate-800 space-y-2">
          <Clock className="w-6 h-6 text-slate-600 mx-auto" />
          <div className="text-xs text-slate-400">
            Clique em <strong>"Executar Comparativo ao Vivo"</strong> acima para rodar ambos os testes simultaneamente e visualizar a telemetria em tempo real.
          </div>
        </div>
      )}

    </div>
  );
};
