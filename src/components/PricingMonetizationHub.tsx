import React, { useState } from 'react';
import { 
  DollarSign, TrendingUp, CheckCircle2, ShieldCheck, Sparkles, 
  Building, Rocket, Zap, Award, ArrowRight, Wallet, HelpCircle, 
  FileText, ExternalLink, Check, Copy
} from 'lucide-react';

export const PricingMonetizationHub: React.FC = () => {
  const [currency, setCurrency] = useState<'BRL' | 'USD'>('BRL');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [currentAiSpend, setCurrentAiSpend] = useState<number>(1500); // R$ or $ per month
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  // Pricing configuration
  const prices = {
    free: { brl: 0, usd: 0 },
    pro: {
      monthly: { brl: 149, usd: 29 },
      annual: { brl: 119, usd: 24 } // 20% discount on annual
    },
    enterprise: {
      monthly: { brl: 690, usd: 129 },
      annual: { brl: 550, usd: 99 }
    },
    custom: {
      monthly: { brl: 2490, usd: 490 },
      annual: { brl: 1990, usd: 390 }
    }
  };

  // ROI Math
  const estimatedSavingsPercent = 0.58; // 58% average savings from verbose token reduction
  const monthlyGrossSavings = Math.round(currentAiSpend * estimatedSavingsPercent);
  const proCost = currency === 'BRL' ? prices.pro[billingCycle].brl : prices.pro[billingCycle].usd;
  const netMonthlyProfit = Math.max(0, monthlyGrossSavings - proCost);
  const annualNetProfit = netMonthlyProfit * 12;

  const copyContactEmail = () => {
    navigator.clipboard.writeText('pastanadynamics@proton.me');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-950/50 via-slate-900 to-teal-950/50 border border-emerald-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <TrendingUp className="w-80 h-80 text-emerald-400" />
        </div>

        <div className="relative max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Wallet className="w-5 h-5" />
            </span>
            <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 font-bold tracking-wider">
              FinOps & Monetização Sustentável
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-100">
            Corte até 65% da sua fatura de IA. <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              O software que se paga na primeira semana.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300">
            Modelos de assinatura transparentes para desenvolvedores, startups e corporações.
            Reduza custos em nuvem, acelere a latência e garanta conformidade ESG auditável.
          </p>
        </div>
      </div>

      {/* Currency & Billing Cycle Switchers */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Moeda de Cobrança:</span>
          <div className="flex bg-slate-950 rounded-xl p-1 border border-slate-800">
            <button
              onClick={() => setCurrency('BRL')}
              className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-colors cursor-pointer ${
                currency === 'BRL' ? 'bg-emerald-600 text-slate-950' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Real (R$ - Brasil)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-colors cursor-pointer ${
                currency === 'USD' ? 'bg-emerald-600 text-slate-950' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Dólar ($ - Global)
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Ciclo:</span>
          <div className="flex bg-slate-950 rounded-xl p-1 border border-slate-800">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-colors cursor-pointer ${
                billingCycle === 'monthly' ? 'bg-emerald-600 text-slate-950' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-colors cursor-pointer ${
                billingCycle === 'annual' ? 'bg-emerald-600 text-slate-950' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Anual (20% OFF)
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Tier 1: Free Developer */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-6 hover:border-slate-700 transition-all">
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Rocket className="w-5 h-5 text-slate-400" />
                Community
              </h3>
              <p className="text-xs text-slate-400">
                Ideal para testar, validar e projetos de código aberto.
              </p>
            </div>

            <div className="py-2">
              <span className="text-3xl font-black text-slate-100 font-mono">
                {currency === 'BRL' ? 'R$ 0' : '$0'}
              </span>
              <span className="text-xs text-slate-400 font-mono"> / sempre grátis</span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Até 10.000 requisições / mês</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Compilador M2M AST em tempo real</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>KV-Cache Prefix Pinning nativo</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Auditoria semântica de até 10 regras</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Suporte da comunidade via GitHub</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => window.open('https://github.com/past7773d/contextmatrix-m2m-protocol', '_blank')}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Usar Open Source</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Tier 2: Pro Startup (Featured) */}
        <div className="p-6 rounded-3xl bg-gradient-to-b from-emerald-950/60 to-slate-900 border-2 border-emerald-500/60 flex flex-col justify-between space-y-6 shadow-xl relative scale-[1.02]">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider font-mono">
            Mais Popular • Melhor ROI
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-emerald-300 flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-400" />
                Pro Startup
              </h3>
              <p className="text-xs text-slate-400">
                Para equipes que rodam agentes ou produtos em produção.
              </p>
            </div>

            <div className="py-2">
              <span className="text-3xl font-black text-slate-100 font-mono">
                {currency === 'BRL'
                  ? `R$ ${prices.pro[billingCycle].brl}`
                  : `$${prices.pro[billingCycle].usd}`}
              </span>
              <span className="text-xs text-slate-400 font-mono"> / mês</span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-200">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="font-semibold">Até 250.000 requisições / mês</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>API Gateway de Borda com latência &lt;30ms</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Destilador Anti-Looping para chats</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>GitHub Actions Linter para Pull Requests</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Telemetria em tempo real de Joules & CO2e</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Suporte prioritário por email</span>
              </li>
            </ul>
          </div>

          <button
            onClick={copyContactEmail}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2"
          >
            {copiedEmail ? (
              <>
                <Check className="w-4 h-4" />
                <span>Email Copiado!</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Contratar Plano Pro</span>
              </>
            )}
          </button>
        </div>

        {/* Tier 3: Enterprise & Scale-Up */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-6 hover:border-slate-700 transition-all">
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Building className="w-5 h-5 text-teal-400" />
                Enterprise
              </h3>
              <p className="text-xs text-slate-400">
                Para empresas com alta demanda e requisitos ESG.
              </p>
            </div>

            <div className="py-2">
              <span className="text-3xl font-black text-slate-100 font-mono">
                {currency === 'BRL'
                  ? `R$ ${prices.enterprise[billingCycle].brl}`
                  : `$${prices.enterprise[billingCycle].usd}`}
              </span>
              <span className="text-xs text-slate-400 font-mono"> / mês</span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="font-semibold">Até 2.000.000 requisições / mês</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Emissão de Certificados ESG com SHA-256</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Auditoria Semântica Zero-Loss Ilimitada</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>SLA de 99.9% de disponibilidade</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Canal dedicado no Slack ou WhatsApp</span>
              </li>
            </ul>
          </div>

          <button
            onClick={copyContactEmail}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Falar com Vendas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Tier 4: Custom Cloud / On-Premise */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-6 hover:border-slate-700 transition-all">
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                Dedicated VPC
              </h3>
              <p className="text-xs text-slate-400">
                Instalação privada na nuvem da sua empresa.
              </p>
            </div>

            <div className="py-2">
              <span className="text-2xl font-black text-slate-100 font-mono">
                {currency === 'BRL'
                  ? `Sob Consulta`
                  : `Custom`}
              </span>
              <span className="text-xs text-slate-400 font-mono block">a partir de R$ 2.490/mês</span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Deploy em VPC isolada (GCP / AWS / Azure)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Zero trânsito de dados fora da sua rede</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Consultoria FinOps de IA inclusa</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Auditoria e refatoração de código legado</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>SLA Empresarial com garantia contratual</span>
              </li>
            </ul>
          </div>

          <button
            onClick={copyContactEmail}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Solicitar Orçamento</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive ROI Calculator for Prospects */}
      <div className="p-8 rounded-3xl bg-slate-900/90 border border-emerald-800/40 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              Simulador de Retorno sobre Investimento (ROI)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Arraste a barra para ver quanto sua empresa economiza líquido todos os meses com o ContextMatrix.
            </p>
          </div>

          <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-700 text-emerald-400 font-bold">
            Média de 58% de redução comprovada
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm font-mono">
            <span className="text-slate-400">Gasto Atual Mensal com LLMs (OpenAI / Gemini / Anthropic):</span>
            <span className="text-emerald-400 font-bold text-lg">
              {currency === 'BRL' ? `R$ ${currentAiSpend.toLocaleString('pt-BR')}` : `$${currentAiSpend.toLocaleString('en-US')}`} / mês
            </span>
          </div>

          <input
            type="range"
            min={200}
            max={20000}
            step={100}
            value={currentAiSpend}
            onChange={(e) => setCurrentAiSpend(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-950 rounded-lg appearance-none"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
              <span className="block text-xs font-mono text-slate-400 mb-1">Economia Bruta de Fatura</span>
              <span className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono">
                {currency === 'BRL' ? `R$ ${monthlyGrossSavings.toLocaleString('pt-BR')}` : `$${monthlyGrossSavings.toLocaleString('en-US')}`}
              </span>
              <span className="block text-[10px] text-slate-500 font-mono mt-0.5">/ mês</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
              <span className="block text-xs font-mono text-slate-400 mb-1">Custo do Plano Pro</span>
              <span className="text-xl sm:text-2xl font-bold text-slate-300 font-mono">
                {currency === 'BRL' ? `R$ ${proCost}` : `$${proCost}`}
              </span>
              <span className="block text-[10px] text-slate-500 font-mono mt-0.5">/ mês</span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/60 border-2 border-emerald-500/60 text-center">
              <span className="block text-xs font-mono text-emerald-300 font-bold mb-1">Lucro Líquido no Seu Bolso</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-300 font-mono">
                +{currency === 'BRL' ? `R$ ${netMonthlyProfit.toLocaleString('pt-BR')}` : `$${netMonthlyProfit.toLocaleString('en-US')}`}
              </span>
              <span className="block text-[10px] text-emerald-400 font-mono mt-0.5">
                ou +{currency === 'BRL' ? `R$ ${annualNetProfit.toLocaleString('pt-BR')}` : `$${annualNetProfit.toLocaleString('en-US')}`}/ano!
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Direct Contact & Contracting Section */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Building className="w-4 h-4 text-emerald-400" />
            Precisa de uma Proposta Comercial ou Integração Personalizada?
          </h3>
          <p className="text-xs text-slate-400">
            Fale diretamente com a equipe de engenharia da <strong className="text-slate-200">Pastana Dynamics</strong> para consultoria FinOps de IA ou implantação em grande escala.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={copyContactEmail}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs font-mono transition-colors cursor-pointer shadow-md"
          >
            {copiedEmail ? (
              <>
                <Check className="w-4 h-4" />
                <span>pastanadynamics@proton.me copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>pastanadynamics@proton.me</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Official Payment Accounts: Inter Global (USD) & Inter Brasil (PIX) */}
      <div className="p-8 rounded-3xl bg-slate-900/90 border border-emerald-500/40 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Wallet className="w-5 h-5 text-emerald-400" />
              Canais Oficiais de Liquidação & Recebimento — Pastana Dynamics
            </h3>
            <p className="text-xs text-slate-400">
              Contrate os planos Pro, Enterprise ou Consultoria com liquidação direta nacional via PIX ou internacional via Inter Global (EUA).
            </p>
          </div>
          <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 font-bold">
            Faturamento Imediato
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inter Brasil: PIX Instantâneo */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                🇧🇷 Brasil • PIX / Transferência
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400">
                Banco Inter (077)
              </span>
            </div>

            <div className="space-y-1.5 text-xs font-mono text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Chave PIX (Email):</span>
                <span className="text-emerald-300 font-bold select-all">pastanadynamics@proton.me</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Titular:</span>
                <span className="text-slate-200">Vitor Pastana Santana (Pastana Dynamics)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Instituição:</span>
                <span className="text-slate-200">Banco Inter S.A.</span>
              </div>
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText('pastanadynamics@proton.me');
                setCopiedEmail(true);
                setTimeout(() => setCopiedEmail(false), 2000);
              }}
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Copy className="w-3.5 h-3.5 text-emerald-400" />
              <span>Copiar Chave PIX (pastanadynamics@proton.me)</span>
            </button>
          </div>

          {/* Inter Global: Recebimento Internacional USD */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                🌎 Global • Conta Inter Global (USD)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400">
                ACH / Wire / SWIFT
              </span>
            </div>

            <div className="space-y-1.5 text-xs font-mono text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Moeda:</span>
                <span className="text-cyan-300 font-bold">USD (Dólares Americanos)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Beneficiário:</span>
                <span className="text-slate-200">Vitor Pastana Santana / Pastana Dynamics</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Contato Faturamento:</span>
                <span className="text-slate-200 select-all">pastanadynamics@proton.me</span>
              </div>
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText('pastanadynamics@proton.me');
                setCopiedEmail(true);
                setTimeout(() => setCopiedEmail(false), 2000);
              }}
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Copy className="w-3.5 h-3.5 text-cyan-400" />
              <span>Solicitar Invoice em USD via Proton</span>
            </button>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Envie o comprovante de liquidação para <strong className="text-slate-200 font-mono">pastanadynamics@proton.me</strong> para liberação imediata de credenciais e chaves do Gateway de alta performance.</span>
        </div>
      </div>
    </div>
  );
};
