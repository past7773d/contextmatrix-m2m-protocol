import React, { useState } from 'react';
import { Leaf, DollarSign, Cloud, Zap, TrendingDown, CheckSquare, Award } from 'lucide-react';
import { GREEN_COMPUTING_TIPS } from '../data/presets';

export const EnergyCalculator: React.FC = () => {
  const [monthlyRequests, setMonthlyRequests] = useState<number>(250000);
  const [tokensSavedPerRequest, setTokensSavedPerRequest] = useState<number>(140);
  const [energyTariffKwh, setEnergyTariffKwh] = useState<number>(0.18); // $0.18 / kWh average industrial
  const [modelType, setModelType] = useState<'flash' | 'pro'>('flash');

  // Calculation parameters
  // Flash: ~3.42 J per 1k tokens. Pro: ~21.8 J per 1k tokens.
  const joulesPer1k = modelType === 'flash' ? 3.42 : 21.8;
  const monthlyTokensSaved = monthlyRequests * tokensSavedPerRequest;
  const annualTokensSaved = monthlyTokensSaved * 12;

  // Energy in Joules -> kWh (1 kWh = 3,600,000 Joules)
  const annualJoulesSaved = (annualTokensSaved / 1000) * joulesPer1k;
  const annualKwhSaved = annualJoulesSaved / 3600000;

  // Carbon emission factor: ~0.42 kg CO2e per kWh (global grid mix)
  const annualCo2KgSaved = annualKwhSaved * 0.42;

  // Equivalencies
  const carKmEquivalent = Math.round(annualCo2KgSaved / 0.12); // ~120g CO2 per km for a standard vehicle
  const treesPlantedEquivalent = Math.max(1, Math.round(annualCo2KgSaved / 21)); // ~21kg CO2 absorbed per tree per year
  const financialCostSaved = (annualTokensSaved / 1000000) * (modelType === 'flash' ? 0.30 : 2.50);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/50 via-slate-900 to-slate-950 border border-emerald-500/20 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <Leaf className="w-4 h-4" />
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Calculadora de Impacto Energético e Escala Corporativa
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
              Projete a redução de custos, quilowatts-hora e emissões de CO2e ao converter prompts humanos em 
              instruções de máquina em larga escala na sua infraestrutura de software.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center">
            <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-emerald-400">
              Certificação: <strong>Green Software Foundation Alignment</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Simulator Inputs & Metric Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Controls Column */}
        <div className="lg:col-span-5 p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
            Variáveis do Pipeline de Inferência
          </h3>

          {/* Volume Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">Volume de Requisições Mensais:</span>
              <span className="font-bold text-emerald-400 text-sm">
                {monthlyRequests.toLocaleString('pt-BR')} req/mês
              </span>
            </div>
            <input
              type="range"
              min={10000}
              max={2000000}
              step={10000}
              value={monthlyRequests}
              onChange={(e) => setMonthlyRequests(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>10k</span>
              <span>500k</span>
              <span>1M</span>
              <span>2M</span>
            </div>
          </div>

          {/* Tokens Saved Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">Tokens Economizados por Chamada:</span>
              <span className="font-bold text-cyan-400 text-sm">
                {tokensSavedPerRequest} tokens
              </span>
            </div>
            <input
              type="range"
              min={20}
              max={400}
              step={10}
              value={tokensSavedPerRequest}
              onChange={(e) => setTokensSavedPerRequest(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>20 (básico)</span>
              <span>140 (médio + schema)</span>
              <span>400 (re-tentativas evitadas)</span>
            </div>
          </div>

          {/* Model Type Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300">
              Classe do Modelo de Inferência:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setModelType('flash')}
                className={`py-2 px-3 rounded-lg text-xs font-mono border transition-all cursor-pointer ${
                  modelType === 'flash'
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                Gemini Flash Series (~3.4 J)
              </button>
              <button
                onClick={() => setModelType('pro')}
                className={`py-2 px-3 rounded-lg text-xs font-mono border transition-all cursor-pointer ${
                  modelType === 'pro'
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                Gemini Pro Series (~21.8 J)
              </button>
            </div>
          </div>

          {/* Explanation note */}
          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
            * O cálculo engloba a remoção de preâmbulos humanos, a contração estrita de tokens de entrada e a 
            eliminação de chamadas de correção (retry loops) devido à garantia do JSON Schema.
          </div>

        </div>

        {/* Results Column */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* Annual Tokens Saved */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
                Tokens Evitados por Ano
              </div>
              <div className="text-2xl font-black text-white">
                {(annualTokensSaved / 1000000).toFixed(1)} <span className="text-sm font-normal text-slate-400">Milhões</span>
              </div>
              <div className="text-[11px] text-slate-500">
                {(monthlyTokensSaved / 1000).toFixed(0)}k tokens a menos por mês
              </div>
            </div>

            {/* Annual kWh Saved */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                Energia Elétrica Poupada
              </div>
              <div className="text-2xl font-black text-emerald-300">
                {annualKwhSaved.toFixed(1)} <span className="text-sm font-normal text-slate-400">kWh / ano</span>
              </div>
              <div className="text-[11px] text-slate-500">
                Em consumo bruto de GPU e refrigeração de data center
              </div>
            </div>

            {/* Annual CO2e Avoided */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
                <Cloud className="w-3.5 h-3.5" />
                Redução de Emissões de CO2e
              </div>
              <div className="text-2xl font-black text-cyan-300">
                {annualCo2KgSaved.toFixed(1)} <span className="text-sm font-normal text-slate-400">kg CO2e</span>
              </div>
              <div className="text-[11px] text-slate-500">
                Emissões diretas evitadas na matriz elétrica
              </div>
            </div>

            {/* Estimated Financial Savings */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="text-xs font-mono text-amber-400 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5" />
                Economia Financeira Direta
              </div>
              <div className="text-2xl font-black text-amber-300">
                ${financialCostSaved.toFixed(2)} <span className="text-sm font-normal text-slate-400">USD / ano</span>
              </div>
              <div className="text-[11px] text-slate-500">
                Economia em faturas de API de inferência
              </div>
            </div>

          </div>

          {/* Real-World Equivalents Card */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/30 to-slate-900 border border-emerald-500/30 space-y-3">
            <h4 className="text-xs font-mono uppercase text-emerald-400 font-bold flex items-center gap-2">
              <Award className="w-4 h-4" />
              Equivalentes Ecológicos Práticos
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1">
                <div className="text-slate-400">Distância Equivalente em Transporte:</div>
                <div className="text-base font-bold text-white">
                  ~{carKmEquivalent.toLocaleString('pt-BR')} km
                </div>
                <div className="text-[11px] text-slate-500">
                  Como se um veículo de combustão deixasse de rodar essa distância.
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1">
                <div className="text-slate-400">Compensação Florestal:</div>
                <div className="text-base font-bold text-white">
                  ~{treesPlantedEquivalent} árvores
                </div>
                <div className="text-[11px] text-slate-500">
                  Capacidade anual de absorção de carbono preservada.
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Guidelines Grid */}
      <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-white font-mono uppercase">
          Diretrizes Práticas para Engenharia de Prompts Sustentável
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {GREEN_COMPUTING_TIPS.map((tip, i) => (
            <div key={i} className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-white text-xs">
                  {tip.title}
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  {tip.impact}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {tip.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
