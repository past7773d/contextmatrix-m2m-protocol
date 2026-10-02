import React, { useState } from 'react';
import { RefreshCw, MessageSquare, ArrowRight, Zap, Copy, Check, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { MultiTurnDistillation } from '../types';

export const ChatDelooper: React.FC = () => {
  const sampleChat = `Usuário: Olá! Você pode criar uma função em TypeScript para calcular o frete de um produto com base no peso e CEP de destino?
Assistente: Olá! Com certeza! Aqui está uma função em JavaScript para você. Ela usa CEP e peso... [código incompleto sem tipagem]
Usuário: Mas eu pedi explicitamente em TypeScript, não em JavaScript! E esqueci de dizer que para a região Sudeste o frete tem desconto de 15%.
Assistente: Mil desculpas pelo erro! Você tem toda razão, me perdoe pela distração. Aqui está a função em TypeScript corrigida com o desconto de 15% para o Sudeste...
Usuário: Agora ficou melhor, mas falta validar se o peso é maior que zero e retornar erro 400 se for negativo. Pode ajeitar isso por favor?
Assistente: Peço desculpas novamente! Vou ajustar agora mesmo adicionando a validação de peso positivo e retorno estruturado.`;

  const [chatTranscript, setChatTranscript] = useState<string>(sampleChat);
  const [distillation, setDistillation] = useState<MultiTurnDistillation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleDistill = async () => {
    if (!chatTranscript.trim()) return;
    setIsLoading(true);

    try {
      const res = await fetch('/api/distill-conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatTranscript })
      });
      const data = await res.json();
      if (res.ok) {
        setDistillation(data);
      } else {
        alert(data.error || 'Erro ao destilar conversa.');
      }
    } catch (err) {
      console.error(err);
      alert('Falha ao se comunicar com o motor de destilação.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!distillation) return;
    navigator.clipboard.writeText(distillation.finalMachineInstruction);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Intro Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-teal-950/50 via-slate-900 to-slate-950 border border-teal-500/20 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/30">
                <MessageSquare className="w-4 h-4" />
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Destilador de Conversas Multi-Turn & Anti-Looping Engine
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
              Quando usuários humanos conversam com IAs, é comum haver 4 a 8 mensagens de idas e vindas com pedidos de 
              desculpas e correções pontuais. Este motor colapsa todo o histórico estocástico em uma 
              <strong> única instrução de máquina one-shot</strong>, eliminando o acúmulo contínuo de tokens inúteis.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center">
            <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-teal-400">
              Objetivo: <strong>One-Shot Convergence</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Input Chat Transcript */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Histórico Conversacional Acumulado (Chat Verboso)
            </label>
            <span className="text-xs font-mono text-slate-400">
              {chatTranscript.length} caracteres
            </span>
          </div>

          <textarea
            value={chatTranscript}
            onChange={(e) => setChatTranscript(e.target.value)}
            rows={12}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-300 font-sans focus:outline-none focus:border-teal-500 resize-none leading-relaxed"
            placeholder="Cole aqui o transcript de várias mensagens de conversa..."
          />

          <button
            onClick={handleDistill}
            disabled={isLoading || !chatTranscript.trim()}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4 fill-current" />}
            <span>{isLoading ? 'Colapsando Conversa em Máquina...' : 'Destilar em Instrução One-Shot de Máquina'}</span>
          </button>
        </div>

        {/* Right Column: Distillation Output */}
        <div className="lg:col-span-6 space-y-4">
          {distillation ? (
            <div className="space-y-4 animate-in fade-in duration-300">
              
              {/* Metrics strip */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-teal-950/30 border border-teal-500/30">
                  <div className="text-[11px] font-mono text-teal-400">Compressão de Ruído</div>
                  <div className="text-xl font-bold text-teal-300">
                    -{distillation.compressionRatio}%
                  </div>
                  <div className="text-[10px] text-slate-400">tokens cortados</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[11px] font-mono text-slate-400">Turnos Colapsados</div>
                  <div className="text-xl font-bold text-white">
                    {distillation.turnsAnalyzed} → 1
                  </div>
                  <div className="text-[10px] text-slate-400">conversão one-shot</div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                  <div className="text-[11px] font-mono text-emerald-400">Joules Poupados</div>
                  <div className="text-xl font-bold text-emerald-300">
                    {distillation.wastedChatJoulesSaved} J
                  </div>
                  <div className="text-[10px] text-slate-400">por chamada futura</div>
                </div>
              </div>

              {/* Distilled Instruction Card */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-teal-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-teal-300 uppercase flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                    Instrução Única de Máquina Resultante (Converged One-Shot)
                  </span>
                  <button
                    onClick={handleCopy}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-all"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>

                <pre className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300 whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
                  {distillation.finalMachineInstruction}
                </pre>

                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Todos os pedidos de desculpas, tentativas com linguagem errada e hesitações foram purgados do contexto computacional.</span>
                </div>
              </div>

            </div>
          ) : (
            <div className="h-full min-h-[300px] rounded-xl border border-dashed border-slate-800 bg-slate-950/40 flex flex-col items-center justify-center p-8 text-center space-y-3">
              <MessageSquare className="w-8 h-8 text-slate-600" />
              <div className="max-w-sm text-xs text-slate-400 leading-relaxed">
                Clique no botão ao lado para processar o transcript de conversa e colapsar todos os turnos de correções em uma especificação formal de máquina.
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
