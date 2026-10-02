import React, { useState, useEffect } from 'react';
import { Database, Zap, Copy, Check, Clock, ShieldCheck, ArrowRight, Sparkles, Server } from 'lucide-react';
import { KVCacheDecomposition } from '../types';

interface KVCacheOptimizerProps {
  currentInstruction?: string;
  targetModel?: string;
}

export const KVCacheOptimizer: React.FC<KVCacheOptimizerProps> = ({
  currentInstruction = `[ROLE: DETERMINISTIC_CONTEXT_PROCESSOR]
[DOMAIN: DATA_EXTRACTION_AND_MAPPING]
[OUTPUT_RULE: Retorne estritamente o payload solicitado em formato JSON estruturado RFC-8259, sem introduções sociais, preâmbulos, saudações ou explicações pós-geração.]

[EXECUTION_CONSTRAINTS]
- Concisão extrema: omitir redundâncias semânticas
- Conformidade estrita ao schema de saída
- Determinismo calibrado: temperatura baixa (<=0.2)
- Zero alucinação: sinalizar explicitamente com null se ausente

[OPERATIONAL_SPECIFICATION]
GOAL: Analisar fatura de compra e extrair dados de comprador, itens, data de vencimento e totais com impostos.`,
  targetModel = 'gemini-3.8-flash'
}) => {
  const [data, setData] = useState<KVCacheDecomposition | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedSnippet, setCopiedSnippet] = useState<boolean>(false);
  const [callFrequency, setCallFrequency] = useState<number>(500); // calls per hour against the same cached prefix

  const fetchCacheDecomposition = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/decompose-cache', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          machineInstructionText: currentInstruction,
          targetModel
        })
      });
      const result = await res.json();
      if (res.ok) {
        setData(result);
      }
    } catch (err) {
      console.error('Error fetching cache decomposition:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCacheDecomposition();
  }, [currentInstruction, targetModel]);

  const handleCopy = () => {
    if (!data) return;
    navigator.clipboard.writeText(data.geminiCacheConfigSnippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  // Hourly energy calculation based on frequency
  const totalJoulesWithoutCacheHourly = data ? data.energyJoulesWithoutCache * callFrequency : 0;
  // With cache: 1 full compilation + (callFrequency - 1) cache hit runs
  const totalJoulesWithCacheHourly = data
    ? data.energyJoulesWithoutCache + (data.energyJoulesWithCache * (callFrequency - 1))
    : 0;
  const hourlyJoulesSaved = Math.max(0, totalJoulesWithoutCacheHourly - totalJoulesWithCacheHourly);

  return (
    <div className="space-y-6">
      
      {/* Intro Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-cyan-950/50 via-slate-900 to-slate-950 border border-cyan-500/20 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <Database className="w-4 h-4" />
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Decompositor KV-Cache & Prefix Pinning (Gemini Context Caching)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
              Em produção, recalcular o contexto estático a cada requisição é a maior fonte de desperdício em data centers.
              Esta ferramenta decompõe a instrução em <strong>Prefixo Estático Imutável (Cacheável na GPU/TPU)</strong> e 
              <strong> Slot Dinâmico Efêmero</strong>, reduzindo em até <strong>75%</strong> a energia por chamada.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center">
            <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-cyan-400">
              API: <strong>@google/genai ai.caches</strong>
            </span>
          </div>
        </div>
      </div>

      {data ? (
        <div className="space-y-6">
          
          {/* Top KPI Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-1">
              <div className="text-[11px] font-mono text-cyan-400 font-medium">Economia em Cache Hit</div>
              <div className="text-2xl font-black text-cyan-300">
                -{data.cacheHitSavingsPercent}%
              </div>
              <div className="text-[10px] text-slate-400">Redução em Joules por chamada</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-[11px] font-mono text-slate-400 font-medium">Prefixo Estático Ancorado</div>
              <div className="text-2xl font-black text-white">
                {data.staticPrefixTokens} <span className="text-xs font-normal text-slate-400">tokens</span>
              </div>
              <div className="text-[10px] text-slate-400">Processado apenas 1x no TTL</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-[11px] font-mono text-emerald-400 font-medium">Slot Dinâmico Efêmero</div>
              <div className="text-2xl font-black text-emerald-300">
                {data.dynamicDeltaTokens} <span className="text-xs font-normal text-slate-400">tokens</span>
              </div>
              <div className="text-[10px] text-slate-400">Único custo variável em runtime</div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
              <div className="text-[11px] font-mono text-emerald-400 font-medium">TTL de Cache Recomendado</div>
              <div className="text-2xl font-black text-emerald-300">
                60 <span className="text-xs font-normal text-emerald-400">minutos</span>
              </div>
              <div className="text-[10px] text-slate-400">Persistência na memória do acelerador</div>
            </div>
          </div>

          {/* Side-by-Side Decomposition Visualizer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Cacheable Static Prefix Card */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5 uppercase">
                  <Database className="w-3.5 h-3.5" />
                  1. Prefixo Estático (Ancorado no KV-Cache)
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {data.staticPrefixTokens} tokens fixos
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Contém regras globais, diretrizes de sistema, esquemas de validação e restrições. Salvo uma única vez na VRAM do cluster.
              </p>
              <pre className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 whitespace-pre-wrap max-h-56 overflow-y-auto leading-relaxed">
                {data.cacheablePrefix}
              </pre>
            </div>

            {/* Dynamic Runtime Slot Card */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/30 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5 uppercase">
                  <Zap className="w-3.5 h-3.5" />
                  2. Slot Dinâmico (Delta de Execução em Runtime)
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {data.dynamicDeltaTokens} tokens variáveis
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Apenas os parâmetros operacionais e argumentos específicos da transação. É a única porção decodificada a cada requisição.
              </p>
              <pre className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300 whitespace-pre-wrap max-h-56 overflow-y-auto leading-relaxed">
                {data.dynamicSlotTemplate}
              </pre>
            </div>

          </div>

          {/* Interactive Hourly Frequency Impact Simulator */}
          <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono uppercase">
                  <Server className="w-4 h-4 text-cyan-400" />
                  Simulador de Frequência de Chamadas com KV-Cache
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Arraste a frequência horária para calcular a economia de Joules e FLOPs em pipelines contínuos de microsserviços.
                </p>
              </div>

              <div className="text-xs font-mono px-3 py-1.5 rounded bg-slate-950 border border-slate-800 text-slate-200">
                Frequência: <strong className="text-cyan-400">{callFrequency} chamadas / hora</strong>
              </div>
            </div>

            <input
              type="range"
              min={10}
              max={5000}
              step={20}
              value={callFrequency}
              onChange={(e) => setCallFrequency(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-slate-400">Sem Cache (Custo Bruto):</div>
                <div className="text-base font-bold text-amber-400 mt-0.5">
                  {totalJoulesWithoutCacheHourly.toFixed(1)} J / hora
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-slate-400">Com Prefix Pinning:</div>
                <div className="text-base font-bold text-emerald-400 mt-0.5">
                  {totalJoulesWithCacheHourly.toFixed(1)} J / hora
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/50">
                <div className="text-emerald-400 font-semibold">Energia Economizada:</div>
                <div className="text-base font-bold text-emerald-300 mt-0.5">
                  -{hourlyJoulesSaved.toFixed(1)} J ({(hourlyJoulesSaved / 3600).toFixed(4)} kWh)
                </div>
              </div>
            </div>
          </div>

          {/* Ready-to-use Implementation Code Card */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 uppercase font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Código de Produção (@google/genai Context Caching)
              </span>
              <button
                onClick={handleCopy}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {copiedSnippet ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedSnippet ? 'Copiado!' : 'Copiar Snippet de Cache'}</span>
              </button>
            </div>

            <pre className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto whitespace-pre leading-relaxed">
              {data.geminiCacheConfigSnippet}
            </pre>
          </div>

        </div>
      ) : (
        <div className="p-8 text-center rounded-xl bg-slate-900/40 border border-slate-800 text-slate-400 text-xs font-mono">
          Analisando decomposição do KV-Cache...
        </div>
      )}

    </div>
  );
};
