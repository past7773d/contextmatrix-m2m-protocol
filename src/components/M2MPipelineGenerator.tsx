import React, { useState, useEffect } from 'react';
import { GitFork, Layers, ArrowRight, Zap, CheckCircle2, Shield, Network, Cpu, Sliders } from 'lucide-react';
import { M2MPipelineGraph } from '../types';

export const M2MPipelineGenerator: React.FC = () => {
  const [pipelineData, setPipelineData] = useState<M2MPipelineGraph | null>(null);
  const [activeDomain, setActiveDomain] = useState<string>('DATA_PIPELINE');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchDAG = async (domain: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/generate-dag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskDescription: 'Pipeline de processamento M2M com micro-agentes especializados',
          domain
        })
      });
      const data = await res.json();
      if (res.ok) {
        setPipelineData(data);
      }
    } catch (err) {
      console.error('Error fetching DAG:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDAG(activeDomain);
  }, [activeDomain]);

  return (
    <div className="space-y-6">
      
      {/* Intro Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-950/50 via-slate-900 to-slate-950 border border-purple-500/20 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/30">
                <GitFork className="w-4 h-4" />
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Topologia de Micro-Agentes M2M (DAG Desacoplado)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
              Em vez de enviar um prompt monstruoso para um modelo gigante e caro (gerando alucinações e alto consumo de Joules), 
              o padrão M2M desacopla a tarefa em um <strong>Grafo Direcionado Acíclico (DAG)</strong> de micro-agentes verdes e especializados.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center">
            <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-purple-400">
              Arquitetura: <strong>Micro-Agent Choreography</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Domain Switcher */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-slate-400 mr-2">Topologia de Exemplo:</span>
        {[
          { id: 'DATA_PIPELINE', label: 'Ingestão e Validação de Dados' },
          { id: 'CODE_AUDIT_PIPELINE', label: 'Auditoria de Segurança de Código' },
          { id: 'IOT_ORCHESTRATION', label: 'Orquestração de Sensores IoT' }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveDomain(item.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border cursor-pointer ${
              activeDomain === item.id
                ? 'bg-purple-950/50 border-purple-500 text-purple-300 font-bold'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {pipelineData && (
        <div className="space-y-6">
          
          {/* Energy Comparison Strip: DAG vs Monolith */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-emerald-950/40 border border-purple-500/30 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-[11px] font-mono text-slate-400 uppercase">Monolítico Pro (Prompt Único Pesado)</div>
              <div className="text-2xl font-bold text-amber-400 mt-0.5">
                {pipelineData.monolithicSingleCallJoules} J
              </div>
              <div className="text-[10px] text-slate-500">Alto risco de desvio semântico e custo térmico</div>
            </div>

            <div>
              <div className="text-[11px] font-mono text-slate-400 uppercase">Pipeline M2M Verde (DAG com Flash-Lite)</div>
              <div className="text-2xl font-bold text-emerald-400 mt-0.5">
                {pipelineData.totalPipelineJoules} J
              </div>
              <div className="text-[10px] text-slate-400">Soma de todos os nós especializados</div>
            </div>

            <div>
              <div className="text-[11px] font-mono text-slate-400 uppercase">Economia Computacional</div>
              <div className="text-2xl font-black text-cyan-300 mt-0.5">
                -{pipelineData.pipelineSavingsPercent}%
              </div>
              <div className="text-[10px] text-emerald-400 font-mono">Mais rápido, mais barato e sem alucinação</div>
            </div>
          </div>

          {/* Visual DAG Flowchart */}
          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Fluxo Sequencial do Grafo de Execução M2M
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
              {pipelineData.nodes.map((node, idx) => (
                <div
                  key={node.id}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/50 transition-all flex flex-col justify-between space-y-3 relative group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800 font-bold">
                        NÓ #{node.stepNumber}
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        {node.joulesEstimate} J
                      </span>
                    </div>

                    <h4 className="font-bold text-white text-sm">
                      {node.name}
                    </h4>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {node.role}
                    </p>
                  </div>

                  {/* Node Contracts */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-800/80 text-[11px] font-mono">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Modelo:</span>
                      <span className="text-cyan-300 font-semibold">{node.recommendedModel}</span>
                    </div>

                    <div className="flex items-center justify-between truncate">
                      <span className="text-slate-500">Input:</span>
                      <span className="text-slate-300 truncate max-w-[140px]">{node.inputContract}</span>
                    </div>

                    <div className="flex items-center justify-between truncate">
                      <span className="text-slate-500">Output:</span>
                      <span className="text-emerald-400 truncate max-w-[140px]">{node.outputContract}</span>
                    </div>
                  </div>

                  <div className="p-2 rounded bg-slate-900/90 border border-slate-800 text-[10px] text-slate-400 leading-relaxed font-sans">
                    💡 {node.whyThisModel}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400 font-mono">
              Protocolo de Transporte: <span className="text-purple-400">{pipelineData.orchestrationProtocol}</span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
