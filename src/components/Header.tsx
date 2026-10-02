import React from 'react';
import { Cpu, Zap, Leaf, Layers, Terminal, Sparkles, Activity, Database, ShieldCheck, GitFork, MessageSquare, Network, Award } from 'lucide-react';

export type AppTab = 'compiler' | 'gateway' | 'caching' | 'fidelity' | 'pipeline' | 'delooper' | 'models' | 'libraries' | 'benchmark' | 'calculator' | 'esg';

interface HeaderProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  systemHealth: { status: string; hasApiKey: boolean };
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, systemHealth }) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  ContextMatrix
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 tracking-wider">
                  Enterprise M2M
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Otimizador de Contexto de Máquinas & Green Computing
              </p>
            </div>
          </div>

          {/* Engine Status */}
          <div className="hidden md:flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
              <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Engine:</span>
              <span className={systemHealth.hasApiKey ? "text-emerald-400 font-semibold" : "text-amber-400 font-semibold"}>
                {systemHealth.hasApiKey ? "Gemini 3.8 Flash + AST" : "AST Determinístico Híbrido"}
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-800/50 text-emerald-300">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>Green AI:</span>
              <span className="font-semibold text-emerald-200">Zero Desperdício</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 border-t border-slate-800/60 no-scrollbar">
          <button
            onClick={() => setActiveTab('compiler')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'compiler'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm shadow-emerald-900/40 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>Compilador M2M</span>
          </button>

          <button
            onClick={() => setActiveTab('gateway')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'gateway'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm shadow-emerald-900/40 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
            }`}
          >
            <Network className="w-3.5 h-3.5 text-emerald-400" />
            <span>API Gateway & CI/CD</span>
          </button>

          <button
            onClick={() => setActiveTab('caching')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'caching'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm shadow-emerald-900/40 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span>KV-Cache Pinning</span>
          </button>

          <button
            onClick={() => setActiveTab('fidelity')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'fidelity'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm shadow-emerald-900/40 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Auditoria Semântica</span>
          </button>

          <button
            onClick={() => setActiveTab('pipeline')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'pipeline'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm shadow-emerald-900/40 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
            }`}
          >
            <GitFork className="w-3.5 h-3.5 text-purple-400" />
            <span>DAG de Micro-Agentes</span>
          </button>

          <button
            onClick={() => setActiveTab('delooper')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'delooper'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm shadow-emerald-900/40 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
            <span>Destilador Multi-Turn</span>
          </button>

          <button
            onClick={() => setActiveTab('models')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'models'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm shadow-emerald-900/40 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Cruzamento de Modelos</span>
          </button>

          <button
            onClick={() => setActiveTab('libraries')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'libraries'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm shadow-emerald-900/40 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-teal-400" />
            <span>Revisão de Livrarias</span>
          </button>

          <button
            onClick={() => setActiveTab('benchmark')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'benchmark'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm shadow-emerald-900/40 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Benchmark Lab</span>
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'calculator'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm shadow-emerald-900/40 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
            }`}
          >
            <Leaf className="w-3.5 h-3.5 text-green-400" />
            <span>Calculadora Verde</span>
          </button>

          <button
            onClick={() => setActiveTab('esg')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'esg'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm shadow-emerald-900/40 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Certificado ESG Scope 3</span>
          </button>
        </div>

      </div>
    </header>
  );
};
