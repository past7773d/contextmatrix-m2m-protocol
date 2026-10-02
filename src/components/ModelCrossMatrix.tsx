import React, { useState } from 'react';
import { Layers, Zap, Leaf, Scale, CheckCircle2, AlertOctagon, HelpCircle, Activity } from 'lucide-react';
import { ModelCrossSpec } from '../types';

export const ModelCrossMatrix: React.FC = () => {
  const [selectedTaskArchetype, setSelectedTaskArchetype] = useState<string>('json-extraction');
  const [simulatedVolume, setSimulatedVolume] = useState<number>(50000);

  const models: ModelCrossSpec[] = [
    {
      id: 'gemini-3.1-flash-lite',
      name: 'Gemini 3.1 Flash-Lite',
      tier: 'Ultra-Eficiente (Edge / High-Throughput)',
      joulesPer1kTokens: 1.15,
      wattHoursPer10kReq: 3.19,
      co2GramsPer10kReq: 1.34,
      latencyP50Ms: 140,
      thinkingLevelSupport: 'MINIMAL (Padrão)',
      recommendedTemp: 0.1,
      recommendedTopP: 0.9,
      contextWindow: '1M tokens',
      reasoningCapacity: 'Essencial & Estruturado',
      energyProfile: 'Mínimo Absoluto (Green Certified)',
      bestFor: 'Classificação em lote, extração JSON, validação de regras, IoT e alta volumetria',
      computeWasteFactor: 1.0,
    },
    {
      id: 'gemini-3.8-flash',
      name: 'Gemini 3.8 Flash',
      tier: 'Equilíbrio Ótimo (Workhorse Geral)',
      joulesPer1kTokens: 3.42,
      wattHoursPer10kReq: 9.5,
      co2GramsPer10kReq: 3.99,
      latencyP50Ms: 290,
      thinkingLevelSupport: 'LOW ou Dinâmico',
      recommendedTemp: 0.2,
      recommendedTopP: 0.95,
      contextWindow: '1M tokens',
      reasoningCapacity: 'Raciocínio Ágil & Síntese',
      energyProfile: 'Muito Eficiente',
      bestFor: 'Compilação de código, geração contextual de máquinas, sumarização técnica, agentes autônomos',
      computeWasteFactor: 2.8,
    },
    {
      id: 'gemini-3.1-pro-preview',
      name: 'Gemini 3.1 Pro (Preview)',
      tier: 'Alta Complexidade (Deep Reasoning)',
      joulesPer1kTokens: 21.8,
      wattHoursPer10kReq: 60.5,
      co2GramsPer10kReq: 25.4,
      latencyP50Ms: 1200,
      thinkingLevelSupport: 'HIGH',
      recommendedTemp: 0.3,
      recommendedTopP: 0.95,
      contextWindow: '2M tokens',
      reasoningCapacity: 'Máxima / Formal / Multi-passo',
      energyProfile: 'Alto Consumo Computacional',
      bestFor: 'Auditorias de segurança de código complexo, provas matemáticas, arquiteturas multi-agentes críticas',
      computeWasteFactor: 18.2,
    },
    {
      id: 'gemma-local-quantized',
      name: 'Gemma 2B/9B (Local 4-bit Quantized)',
      tier: 'Borda Local (Zero Cloud Flops)',
      joulesPer1kTokens: 0.82,
      wattHoursPer10kReq: 2.28,
      co2GramsPer10kReq: 0.95,
      latencyP50Ms: 90,
      thinkingLevelSupport: 'Nenhum (Direto)',
      recommendedTemp: 0.1,
      recommendedTopP: 0.85,
      contextWindow: '8k tokens',
      reasoningCapacity: 'Tarefas Pontuais de Roteamento',
      energyProfile: 'Bateria / On-Device',
      bestFor: 'Dispositivos embarcados, pré-filtragem de prompts antes de despachar para nuvem',
      computeWasteFactor: 0.7,
    }
  ];

  const taskArchetypes = [
    {
      id: 'json-extraction',
      name: 'Extração Estruturada & Validação JSON',
      recommendedModelId: 'gemini-3.1-flash-lite',
      reason: 'Tarefas baseadas em schemas estritos não necessitam de raciocínio profundo. O Flash-Lite executa 100% da tarefa consumindo apenas 1.15 Joules/1k tokens.'
    },
    {
      id: 'm2m-router',
      name: 'Roteamento e Telemetria M2M',
      recommendedModelId: 'gemini-3.1-flash-lite',
      reason: 'Baixa latência (<150ms) e determinismo são vitais. Qualquer modelo Pro aqui representa 18x de desperdício energético puro.'
    },
    {
      id: 'code-synthesis',
      name: 'Síntese de Código & Refatoração Técnica',
      recommendedModelId: 'gemini-3.8-flash',
      reason: 'O Gemini 3.8 Flash oferece o ponto ideal de compreensão de AST e tipagem com ThinkingLevel LOW, evitando a latência pesada de modelos Pro.'
    },
    {
      id: 'formal-audit',
      name: 'Auditoria de Segurança & Raciocínio Multi-Passo',
      recommendedModelId: 'gemini-3.1-pro-preview',
      reason: 'Aqui o ThinkingLevel HIGH se justifica, pois o custo de um falso positivo ou falha de raciocínio supera o gasto energético da inferência.'
    }
  ];

  const currentArchetype = taskArchetypes.find(t => t.id === selectedTaskArchetype) || taskArchetypes[0];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-cyan-950/50 via-slate-900 to-slate-950 border border-cyan-500/20 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <Layers className="w-4 h-4" />
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Cruzamento Comparativo de Modelos & Perfil Energético
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
              Análise cruzada de modelos de fronteira e borda. Compreenda o consumo em Joules, latência real, 
              suporte a níveis de raciocínio (ThinkingLevel) e evite o superdimensionamento de modelos (over-provisioning).
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center">
            <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-cyan-300">
              Taxonomia: <strong className="text-white">Gemini 3 Series & Gemma</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Model Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {models.map((model) => {
          const isRecommendedForCurrent = model.id === currentArchetype.recommendedModelId;

          return (
            <div
              key={model.id}
              className={`p-4 rounded-xl border transition-all relative flex flex-col justify-between ${
                isRecommendedForCurrent
                  ? 'bg-emerald-950/20 border-emerald-500 shadow-md shadow-emerald-950/40 ring-1 ring-emerald-500/50'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              {isRecommendedForCurrent && (
                <div className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider font-mono">
                  Recomendado para a Tarefa
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
                    {model.tier}
                  </div>
                  <h3 className="text-base font-bold text-white mt-0.5">
                    {model.name}
                  </h3>
                </div>

                {/* Energy & Speed Metrics */}
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      Joules / 1k tokens:
                    </span>
                    <span className="font-bold text-white">
                      {model.joulesPer1kTokens} J
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Activity className="w-3.5 h-3.5 text-teal-400" />
                      Latência P50:
                    </span>
                    <span className="font-bold text-white">
                      {model.latencyP50Ms} ms
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                      W·h / 10k chamadas:
                    </span>
                    <span className="font-bold text-white">
                      {model.wattHoursPer10kReq} Wh
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">ThinkingLevel:</span>
                    <span className="font-semibold text-cyan-300">
                      {model.thinkingLevelSupport}
                    </span>
                  </div>
                </div>

                {/* Best For */}
                <div className="pt-2 text-xs text-slate-300 border-t border-slate-800/60 leading-relaxed">
                  <span className="text-slate-500 font-mono text-[10px] uppercase block mb-0.5">Aplicação Ideal:</span>
                  {model.bestFor}
                </div>
              </div>

              {/* Energy bar visualizer */}
              <div className="pt-3 mt-3 border-t border-slate-800">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                  <span>Intensidade Energética</span>
                  <span>{model.computeWasteFactor}x baseline</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      model.computeWasteFactor <= 1.2
                        ? 'bg-emerald-400 w-1/12'
                        : model.computeWasteFactor <= 3
                        ? 'bg-cyan-400 w-3/12'
                        : 'bg-amber-500 w-full'
                    }`}
                  />
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Interactive Task Router Quiz */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-400" />
              Roteador Inteligente de Modelo por Arquétipo de Tarefa
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Selecione o objetivo da sua comunicação de máquina para verificar a escolha mais sustentável.
            </p>
          </div>

          <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300">
            Regra Green AI: Menor modelo suficiente
          </span>
        </div>

        {/* Archetype Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {taskArchetypes.map((archetype) => (
            <button
              key={archetype.id}
              onClick={() => setSelectedTaskArchetype(archetype.id)}
              className={`p-3 rounded-lg text-left transition-all border text-xs cursor-pointer ${
                selectedTaskArchetype === archetype.id
                  ? 'bg-emerald-950/40 border-emerald-500/80 text-white shadow-sm'
                  : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="font-semibold text-slate-200">
                {archetype.name}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Archetype Explanation Banner */}
        <div className="p-3.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-xs text-slate-200 flex items-start gap-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-semibold text-emerald-300">
              Diagnóstico do Roteador para "{currentArchetype.name}":
            </div>
            <div className="text-slate-300 leading-relaxed">
              {currentArchetype.reason}
            </div>
          </div>
        </div>

      </div>

      {/* Cross-Analysis Detailed Comparison Table */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
          Tabela Comparativa de Especificações de Máquina
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60">
                <th className="py-2.5 px-3">Modelo</th>
                <th className="py-2.5 px-3">Joules / 1k Tok</th>
                <th className="py-2.5 px-3">Latência Média</th>
                <th className="py-2.5 px-3">Temp. Recomendada</th>
                <th className="py-2.5 px-3">Thinking Overhead</th>
                <th className="py-2.5 px-3">Janela de Contexto</th>
                <th className="py-2.5 px-3">Perfil Ecológico</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {models.map((m) => (
                <tr key={m.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-3 font-bold text-slate-200">
                    {m.name}
                  </td>
                  <td className="py-3 px-3 text-emerald-400 font-semibold">
                    {m.joulesPer1kTokens} J
                  </td>
                  <td className="py-3 px-3 text-cyan-400">
                    ~{m.latencyP50Ms} ms
                  </td>
                  <td className="py-3 px-3 text-slate-300">
                    {m.recommendedTemp} (baixa)
                  </td>
                  <td className="py-3 px-3 text-amber-400">
                    {m.thinkingLevelSupport}
                  </td>
                  <td className="py-3 px-3 text-slate-300">
                    {m.contextWindow}
                  </td>
                  <td className="py-3 px-3 text-slate-400">
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[11px] text-slate-300">
                      {m.energyProfile}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
