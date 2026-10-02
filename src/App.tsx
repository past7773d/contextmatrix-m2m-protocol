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
import { Leaf, ShieldCheck } from 'lucide-react';

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
      </main>

      {/* App Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-6 text-xs text-slate-400 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-semibold text-slate-300 font-mono">
              ContextMatrix Enterprise Protocol
            </span>
            <span>—</span>
            <span>Engenharia de Contexto M2M & Redução de Joules em Modelos de Linguagem</span>
          </div>

          <div className="flex items-center gap-6 font-mono text-[11px]">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Leaf className="w-3.5 h-3.5" />
              Green Compute Standard
            </span>
            <span className="flex items-center gap-1.5 text-cyan-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              RFC-8259 Schema Constrained
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
