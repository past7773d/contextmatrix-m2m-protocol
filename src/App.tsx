/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header, AppTab } from './components/Header';
import { PromptCompiler } from './components/PromptCompiler';
import { KVCacheOptimizer } from './components/KVCacheOptimizer';
import { FidelityAuditView } from './components/FidelityAuditView';
import { M2MPipelineGenerator } from './components/M2MPipelineGenerator';
import { ChatDelooper } from './components/ChatDelooper';
import { ModelCrossMatrix } from './components/ModelCrossMatrix';
import { LibrariesReview } from './components/LibrariesReview';
import { LiveBenchmarkLab } from './components/LiveBenchmarkLab';
import { EnergyCalculator } from './components/EnergyCalculator';
import { ApiGatewayTester } from './components/ApiGatewayTester';
import { EsgCertificateGenerator } from './components/EsgCertificateGenerator';
import { PricingMonetizationHub } from './components/PricingMonetizationHub';
import { BlogEngine } from './components/BlogEngine';
import { Leaf, ShieldCheck, Lock, Award, ShieldAlert } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('compiler');
  const [systemHealth, setSystemHealth] = useState<{ status: string; hasApiKey: boolean }>({
    status: 'online',
    hasApiKey: false,
  });

  // State shared when transferring prompt to benchmark lab
  const [benchmarkRawPrompt, setBenchmarkRawPrompt] = useState<string | undefined>();
  const [benchmarkOptimizedPrompt, setBenchmarkOptimizedPrompt] = useState<string | undefined>();
  const [benchmarkModel, setBenchmarkModel] = useState<string | undefined>();

  useEffect(() => {
    // Check backend status and Gemini SDK connectivity
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        setSystemHealth({
          status: data.status || 'online',
          hasApiKey: !!data.hasApiKey,
        });
      })
      .catch((err) => {
        console.warn('Backend health check error:', err);
      });
  }, []);

  const handleRunBenchmarkWithPrompt = (raw: string, optimized: string, model: string) => {
    setBenchmarkRawPrompt(raw);
    setBenchmarkOptimizedPrompt(optimized);
    setBenchmarkModel(model);
    setActiveTab('benchmark');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Main Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        systemHealth={systemHealth}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'compiler' && (
          <PromptCompiler onRunBenchmarkWithPrompt={handleRunBenchmarkWithPrompt} />
        )}

        {activeTab === 'gateway' && (
          <ApiGatewayTester />
        )}

        {activeTab === 'caching' && (
          <KVCacheOptimizer
            currentInstruction={benchmarkOptimizedPrompt}
            targetModel={benchmarkModel}
          />
        )}

        {activeTab === 'fidelity' && (
          <FidelityAuditView
            rawPrompt={benchmarkRawPrompt}
            machineInstruction={benchmarkOptimizedPrompt}
          />
        )}

        {activeTab === 'pipeline' && (
          <M2MPipelineGenerator />
        )}

        {activeTab === 'delooper' && (
          <ChatDelooper />
        )}

        {activeTab === 'models' && (
          <ModelCrossMatrix />
        )}

        {activeTab === 'libraries' && (
          <LibrariesReview />
        )}

        {activeTab === 'benchmark' && (
          <LiveBenchmarkLab
            initialRawPrompt={benchmarkRawPrompt}
            initialOptimizedPrompt={benchmarkOptimizedPrompt}
            initialModel={benchmarkModel}
          />
        )}

        {activeTab === 'calculator' && (
          <EnergyCalculator />
        )}

        {activeTab === 'esg' && (
          <EsgCertificateGenerator />
        )}

        {activeTab === 'pricing' && (
          <PricingMonetizationHub />
        )}

        {activeTab === 'blog' && (
          <BlogEngine />
        )}
      </main>

      {/* App Footer with IBM Carbon 18 & Intellectual Property Notice */}
      <footer className="border-t border-slate-800 bg-slate-950/95 py-8 text-xs text-slate-400 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span className="font-bold text-slate-200 font-mono text-sm">
                  Pastana Dynamics
                </span>
                <span className="text-slate-600">—</span>
                <span className="text-slate-300 font-mono">ContextMatrix Enterprise Protocol</span>
              </div>
              <p className="text-xs text-slate-400">
                Padrão Aberto de Otimização M2M, Redução de Joules em LLMs e FinOps de Inteligência Artificial.
              </p>
            </div>

            {/* Badges: IBM Carbon 18 + Green AI + Security */}
            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px]">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-950/50 border border-blue-600/40 text-blue-300 shadow-sm">
                <Award className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-bold">IBM Carbon 18 Standard</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-950/40 border border-emerald-800/40 text-emerald-300">
                <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                <span>Green Compute Scope 3</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 border border-slate-700 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>RFC-8259 Schema Guard</span>
              </div>
            </div>
          </div>

          {/* Legal Rights & Protected Content Notice */}
          <div className="pt-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-slate-500">
            <div className="flex items-center gap-2 text-slate-400">
              <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>
                © 2026 <strong>Pastana Dynamics</strong> (Vitor Pastana Santana). Conteúdo e Protocolo Protegidos sob Registro de Propriedade Intelectual.
              </span>
            </div>

            <div className="flex items-center gap-4 text-slate-400">
              <span className="text-emerald-400">PIX & Faturamento: pastanadynamics@proton.me</span>
              <span>•</span>
              <span>Todos os Direitos Reservados</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
