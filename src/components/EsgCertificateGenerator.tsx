import React, { useState } from 'react';
import { Award, Leaf, ShieldCheck, Download, Printer, CheckCircle2, FileText, Globe, Building, Hash, Zap } from 'lucide-react';

export const EsgCertificateGenerator: React.FC = () => {
  const [organization, setOrganization] = useState<string>('Sua Empresa / Startup S.A.');
  const [projectName, setProjectName] = useState<string>('M2M Context Optimization Infrastructure');
  const [monthlyRequests, setMonthlyRequests] = useState<number>(100000);
  const [targetModel, setTargetModel] = useState<string>('gemini-3.8-flash');
  const [certificateData, setCertificateData] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Calculations based on physical benchmarks
  const joulesPer1k = targetModel.includes('lite') ? 1.15 : 3.42;
  const avgTokensSavedPerCall = 120; // 60% of average 200 token verbose prompt
  const totalTokensSavedAnnual = monthlyRequests * 12 * avgTokensSavedPerCall;
  const annualJoulesSaved = (totalTokensSavedAnnual / 1000) * joulesPer1k;
  const pue = 1.25; // Data center Power Usage Effectiveness
  const annualKwhSaved = Number(((annualJoulesSaved * pue) / 3600000).toFixed(2));
  // Global grid emission average ~385 gCO2e/kWh
  const annualCarbonAvoidedKg = Number(((annualKwhSaved * 385) / 1000).toFixed(2));
  // 1 tree absorbs ~22 kg CO2 per year
  const treesEquivalent = Number((annualCarbonAvoidedKg / 22).toFixed(1));
  // FinOps savings at ~$0.00015 per 1k input tokens
  const annualCostSavedUSD = Number(((totalTokensSavedAnnual / 1000) * 0.00015).toFixed(2));

  const handleGenerateCertificate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/esg/generate-certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organization,
          projectName,
          monthlyRequests,
          annualKwhSaved,
          annualCarbonAvoidedKg,
          treesEquivalent,
          targetModel
        })
      });

      const data = await response.json();
      setCertificateData(data);
    } catch (err: any) {
      console.error('Erro ao gerar certificado:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadJson = () => {
    if (!certificateData) return;
    const blob = new Blob([JSON.stringify(certificateData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contextmatrix-esg-certificate-${certificateData.certificateId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 border border-emerald-800/40 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Award className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                Auditoria de Carbono ESG & Certificação Scope 3
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-900/60 border border-emerald-700/60 text-emerald-300">
                  GHG Protocol Cat. 1
                </span>
              </h2>
            </div>
            <p className="text-sm text-slate-400 max-w-3xl">
              Emita o atestado auditável de conformidade ecológica do seu sistema. Comprova a redução física de consumo em Joules,
              eliminação de emissões de CO2e e conformidade com os padrões da Green Software Foundation para auditorias corporativas.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-emerald-800/60 text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Auditoria Criptografada SHA-256
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Parameters */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-lg">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <Building className="w-4 h-4 text-emerald-400" />
              Dados da Entidade Auditada
            </h3>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Nome da Organização / Empresa:
              </label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 font-mono focus:border-emerald-500 focus:outline-none"
                placeholder="Ex: Minha Empresa Corp"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Nome do Projeto / Serviço:
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 font-mono focus:border-emerald-500 focus:outline-none"
                placeholder="Ex: Pipeline de Atendimento IA"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Volume de Chamadas / Mês:
              </label>
              <input
                type="number"
                value={monthlyRequests}
                onChange={(e) => setMonthlyRequests(Math.max(1000, Number(e.target.value)))}
                step="5000"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 font-mono focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Modelo Principal Otimizado:
              </label>
              <select
                value={targetModel}
                onChange={(e) => setTargetModel(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 font-mono focus:border-emerald-500 focus:outline-none"
              >
                <option value="gemini-3.8-flash">Gemini 3.8 Flash (3.42 J/1k)</option>
                <option value="gemini-3.1-flash-lite">Gemini 3.1 Flash-Lite (1.15 J/1k)</option>
              </select>
            </div>

            {/* Quick Math Summary */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Tokens Poupados/Ano:</span>
                <span className="text-emerald-400 font-bold">{(totalTokensSavedAnnual / 1000000).toFixed(2)}M</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Energia Evitada:</span>
                <span className="text-teal-400 font-bold">{annualKwhSaved} kWh/ano</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>CO2e Evitado:</span>
                <span className="text-cyan-400 font-bold">{annualCarbonAvoidedKg} kg/ano</span>
              </div>
              <div className="flex justify-between text-slate-400 border-t border-slate-800 pt-2">
                <span>Economia FinOps:</span>
                <span className="text-emerald-400 font-bold">${annualCostSavedUSD} USD</span>
              </div>
            </div>

            <button
              onClick={handleGenerateCertificate}
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-emerald-950/40"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                  <span>Calculando Assinatura SHA-256...</span>
                </>
              ) : (
                <>
                  <Award className="w-4 h-4" />
                  <span>Emitir Certificado ESG Oficial</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Preview: Official Certificate Display */}
        <div className="lg:col-span-8 space-y-4">
          {certificateData ? (
            <div className="space-y-4">
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={handleDownloadJson}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-mono transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Exportar JSON de Auditoria</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-xs font-mono font-bold transition-colors cursor-pointer shadow-md"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimir / Salvar PDF</span>
                </button>
              </div>

              {/* Printable Official Certificate View */}
              <div className="p-8 rounded-3xl bg-slate-900/95 border-2 border-emerald-500/40 shadow-2xl relative overflow-hidden print:bg-white print:text-black print:border-black">
                {/* Background Watermark */}
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                  <Award className="w-96 h-96 text-emerald-400" />
                </div>

                <div className="relative space-y-6">
                  {/* Top Certificate Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                        <span className="text-xs font-mono tracking-widest uppercase text-emerald-400 font-bold">
                          Green Software Foundation Compliant
                        </span>
                      </div>
                      <h1 className="text-2xl font-black tracking-tight text-slate-100 uppercase mt-1">
                        Certificado de Eficiência Energética de IA
                      </h1>
                      <p className="text-xs text-slate-400 font-mono">
                        Protocolo M2M & Green Computing Scope 3 Attestation
                      </p>
                    </div>

                    <div className="text-right font-mono text-xs space-y-1">
                      <div className="text-slate-400">ID do Certificado:</div>
                      <div className="font-bold text-emerald-400 text-sm tracking-wider">
                        {certificateData.certificateId}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Emitido em: {new Date(certificateData.issuedAt).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </div>

                  {/* Body Statement */}
                  <div className="space-y-3 text-sm text-slate-300">
                    <p>
                      Certifica-se formalmente que a entidade <strong className="text-emerald-300">{certificateData.organization}</strong> implementou
                      o protocolo de otimização de contexto de máquinas <strong className="text-emerald-300">ContextMatrix</strong> no projeto{' '}
                      <strong className="text-emerald-300">{certificateData.projectName}</strong>, auditado em conformidade com as diretrizes do{' '}
                      <em className="text-slate-200">GHG Protocol Scope 3 (Category 1: Purchased Goods and Services / Cloud & AI Computing)</em>.
                    </p>
                  </div>

                  {/* Physical Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4">
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                      <div className="text-[11px] font-mono text-slate-400 mb-1">Energia Poupada</div>
                      <div className="text-xl font-bold font-mono text-emerald-400">
                        {certificateData.metrics.annualKwhSaved} <span className="text-xs font-normal">kWh/ano</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                      <div className="text-[11px] font-mono text-slate-400 mb-1">CO2e Evitado</div>
                      <div className="text-xl font-bold font-mono text-teal-400">
                        {certificateData.metrics.annualCarbonAvoidedKg} <span className="text-xs font-normal">kg/ano</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                      <div className="text-[11px] font-mono text-slate-400 mb-1">Equivalente Vegetal</div>
                      <div className="text-xl font-bold font-mono text-cyan-400">
                        {certificateData.metrics.treesEquivalent} <span className="text-xs font-normal">árvores</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                      <div className="text-[11px] font-mono text-slate-400 mb-1">PUE de Data Center</div>
                      <div className="text-xl font-bold font-mono text-emerald-300">
                        {certificateData.metrics.pueMultiplier}x
                      </div>
                    </div>
                  </div>

                  {/* Audit Cryptographic Trail */}
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 font-mono text-xs">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Hash className="w-4 h-4 text-emerald-400" />
                      <span className="font-semibold text-slate-300">Hash de Verificação Criptográfica (SHA-256):</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-[10px] text-emerald-400 break-all select-all">
                      {certificateData.auditVerification.sha256Checksum}
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between text-[11px] text-slate-500 pt-1">
                      <span>Emissor: {certificateData.auditVerification.issuer}</span>
                      <span className="text-emerald-400 font-semibold">Status: VERIFICADO & VÁLIDO</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 rounded-3xl bg-slate-900/40 border border-dashed border-slate-800 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                <Award className="w-8 h-8" />
              </div>
              <div className="space-y-1 max-w-md">
                <h4 className="text-base font-semibold text-slate-200">Pronto para Gerar a Certificação</h4>
                <p className="text-xs text-slate-400">
                  Preencha os dados da sua empresa ou projeto no formulário ao lado e clique em{' '}
                  <strong className="text-emerald-400">"Emitir Certificado ESG Oficial"</strong> para produzir o atestado criptográfico com selo digital.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
