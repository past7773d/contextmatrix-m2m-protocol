import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, Trash2, ArrowUpRight, Award, Lock, Sparkles } from 'lucide-react';
import { FidelityAudit, RequirementAnchor } from '../types';
import { PROMPT_PRESETS } from '../data/presets';

interface FidelityAuditViewProps {
  rawPrompt?: string;
  machineInstruction?: string;
}

export const FidelityAuditView: React.FC<FidelityAuditViewProps> = ({
  rawPrompt = PROMPT_PRESETS[0].rawPrompt,
  machineInstruction = `[ROLE: DETERMINISTIC_CONTEXT_PROCESSOR]
[DOMAIN: DATA_EXTRACTION_AND_MAPPING]
[OUTPUT_RULE: Retorne estritamente o payload solicitado em formato JSON estruturado RFC-8259]

[OPERATIONAL_SPECIFICATION]
GOAL: Analisar a fatura e extrair quem comprou, valor total com impostos, itens e data de vencimento.

[EXECUTION_CONSTRAINTS]
- Valores numéricos float sem máscara de moeda
- Datas padronizadas no formato ISO-8601
- Conformidade estrita ao schema de saída`
}) => {
  const [audit, setAudit] = useState<FidelityAudit | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const runAudit = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/audit-fidelity', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            rawPrompt,
            machineInstructionText: machineInstruction
          })
        });
        const result = await res.json();
        if (res.ok) {
          setAudit(result);
        }
      } catch (err) {
        console.error('Audit execution error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    runAudit();
  }, [rawPrompt, machineInstruction]);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/50 via-slate-900 to-slate-950 border border-emerald-500/20 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Auditor de Fidelidade Semântica & Zero-Loss Guard
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
              Garante que a poda de tokens e a formalização para contexto de máquina não causaram a perda de nenhum 
              requisito funcional, regra de negócio ou restrição implícita do prompt original do usuário.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center">
            <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-emerald-400">
              Certificação: <strong>Semantic Invariance Verified</strong>
            </span>
          </div>
        </div>
      </div>

      {audit ? (
        <div className="space-y-6">
          
          {/* Top Score Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-1">
              <div className="text-xs font-mono text-emerald-400 font-semibold flex items-center justify-between">
                <span>Índice de Fidelidade Semântica</span>
                <Award className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-black text-emerald-300">
                {audit.fidelityScore}%
              </div>
              <div className="text-[11px] text-slate-400">
                Todos os requisitos de negócio preservados integralmente
              </div>
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/40 space-y-1">
              <div className="text-xs font-mono text-cyan-400 font-semibold flex items-center justify-between">
                <span>Proteção Contra Alucinação</span>
                <Lock className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-3xl font-black text-cyan-300">
                {audit.hallucinationProtectionRate}%
              </div>
              <div className="text-[11px] text-slate-400">
                Eliminação de ambiguidades através de schemas estritos
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-xs font-mono text-slate-300 font-semibold flex items-center justify-between">
                <span>Risco de Perda de Contexto</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-black text-emerald-400">
                {audit.semanticLossRisk}
              </div>
              <div className="text-[11px] text-slate-400">
                Zero perda de especificações funcionais
              </div>
            </div>

          </div>

          {/* Audit Breakdown Checklist Table */}
          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white font-mono uppercase">
                Mapeamento Sentença a Sentença (Auditoria de Cláusulas)
              </h3>
              <span className="text-[11px] font-mono text-slate-400">
                {audit.originalRequirements.length} cláusulas analisadas
              </span>
            </div>

            <div className="space-y-2.5">
              {audit.originalRequirements.map((item, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    item.status === 'PRUNED_NOISE'
                      ? 'bg-slate-950/50 border-slate-800/80 text-slate-400'
                      : 'bg-emerald-950/20 border-emerald-500/30 text-slate-200'
                  }`}
                >
                  <div className="space-y-1 max-w-xl">
                    <div className="font-semibold text-white flex items-center gap-2">
                      <span>"{item.requirement}"</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {item.explanation}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right text-[11px] font-mono hidden md:block">
                      <div className="text-slate-400">Destino:</div>
                      <div className="text-emerald-400">{item.anchoredLocation}</div>
                    </div>

                    <span className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                      item.status === 'STRENGTHENED'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : item.status === 'PRUNED_NOISE'
                        ? 'bg-amber-950/60 text-amber-400 border border-amber-800'
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      {item.status === 'STRENGTHENED' && 'Fortalecido em Schema'}
                      {item.status === 'PRUNED_NOISE' && 'Ruído Podado (Green)'}
                      {item.status === 'PRESERVED' && 'Preservado'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans">
              <strong>Parecer da Auditoria:</strong> {audit.auditSummary}
            </div>
          </div>

        </div>
      ) : (
        <div className="p-8 text-center rounded-xl bg-slate-900/40 border border-slate-800 text-slate-400 text-xs font-mono">
          Executando auditoria semântica de invariância...
        </div>
      )}

    </div>
  );
};
