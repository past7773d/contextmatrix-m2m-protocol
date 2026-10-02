import React, { useState } from 'react';
import { Terminal, Shield, Cpu, Zap, AlertTriangle, Check, BookOpen, Layers, ArrowUpRight } from 'lucide-react';
import { AILibraryReview } from '../types';

export const LibrariesReview: React.FC = () => {
  const [selectedLibId, setSelectedLibId] = useState<string>('google-genai');

  const libraries: AILibraryReview[] = [
    {
      id: 'google-genai',
      name: '@google/genai (v2 SDK)',
      ecosystem: 'Google DeepMind',
      runtime: 'Universal (Node.js / TypeScript / Python / Go)',
      efficiencyRating: 'A+ (Ultra Eficiente)',
      energyOverhead: 'Mínimo (~0.02ms de overhead de SDK)',
      tokenEconomy: 'Alta (Decodificação restrita por schema direto na GPU, sem injeção de tokens ocultos)',
      features: [
        'Decodificação restrita nativa via responseSchema (desliga ramos de alucinação na GPU)',
        'ThinkingLevel granular (MINIMAL, LOW, HIGH) para calibrar consumo de FLOPs',
        'Context Caching nativo: reutilização de blocos de contexto com até 75% de economia de computação',
        'Suporte multimodal nativo sem necessidade de conversores intermediários pesados',
        'Cliente unificado e leve, sem abstrações desnecessárias de memória conversacional'
      ],
      m2mSuitability: 'Padrão ouro para orquestração M2M direta, microsserviços autônomos e pipelines de baixa latência.',
      recommendation: 'Recomendação primária para produção corporativa e mínima pegada de carbono.'
    },
    {
      id: 'dspy',
      name: 'DSPy (Declarative Self-Improving Framework)',
      ecosystem: 'Stanford NLP Group',
      runtime: 'Python (Compilador de Prompts)',
      efficiencyRating: 'A (Excelente na Compilação)',
      energyOverhead: 'Baixo em produção (Custo concentrado na fase de compilação offline)',
      tokenEconomy: 'Excelente (Substitui prompts longos de tentativa e erro por assinaturas compactas)',
      features: [
        'Compilação algorítmica de assinaturas em vez de "prompt engineering" manual',
        'Teleprompters para destilação de modelos grandes (ex: Gemini Pro) em modelos compactos (Flash-Lite)',
        'Otimização baseada em asserções lógicas que evitam re-tentativas em tempo de execução',
        'Separação estrita entre a especificação da tarefa e os parâmetros do modelo'
      ],
      m2mSuitability: 'Ideal para equipes que desejam sintetizar prompts compactos antes do deploy em larga escala.',
      recommendation: 'Excelente ferramenta de compilação para reduzir o desperdício semântico de desenvolvedores.'
    },
    {
      id: 'langchain',
      name: 'LangChain & LangGraph',
      ecosystem: 'Ecossistema Open Source',
      runtime: 'Python / TypeScript',
      efficiencyRating: 'C+ (Sobrecarga Elevada)',
      energyOverhead: 'Alto (Camadas espessas de classes, parsing intermediário e serializações múltiplas)',
      tokenEconomy: 'Baixa a Moderada (Costuma injetar preâmbulos longos, wrappers de memória e templates inflados)',
      features: [
        'Vasta coleção de conectores de banco de dados e APIs legadas',
        'Roteamento de agentes baseado em grafos de estados',
        'Multi-provedor genérico para alternância de fornecedores'
      ],
      m2mSuitability: 'Pode introduzir desperdício de 30% a 150% em tokens intermediários se não for severamente podado.',
      recommendation: 'Evitar em microsserviços de alta frequência onde Joules, milissegundos e clareza de contexto importam.'
    },
    {
      id: 'direct-m2m-protocol',
      name: 'Direct M2M Context Protocol (AST Distilled)',
      ecosystem: 'Arquitetura Verde Nativa de Máquinas',
      runtime: 'JSON RFC-8259 / REST / gRPC',
      efficiencyRating: 'A++ (Zero Bloat)',
      energyOverhead: 'Zero (Execução direta no pipeline de transporte)',
      tokenEconomy: 'Máxima (Remoção de 100% da polidez humana, contexto ancorado, zero tokens de conversa)',
      features: [
        'Diretivas imperativas em formato de blocos de máquina ([ROLE], [SPEC], [SCHEMA])',
        'Eliminação total de preâmbulos antropomórficos ("com certeza posso te ajudar com isso")',
        'Temperatura calibrada (<0.2) e nucleus sampling podado',
        'Garantia de saída one-shot sem loops de re-tentativa'
      ],
      m2mSuitability: 'A arquitetura nativa para comunicação máquina-a-máquina orientada à sustentabilidade energética.',
      recommendation: 'Adotar como padrão em qualquer comunicação automatizada entre sistemas e IAs.'
    }
  ];

  const currentLib = libraries.find(l => l.id === selectedLibId) || libraries[0];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-teal-950/50 via-slate-900 to-slate-950 border border-teal-500/20 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/30">
                <Terminal className="w-4 h-4" />
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Revisão Crítica das Livrarias e Runtimes de IA
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
              Comparativo arquitetural de frameworks e SDKs. Entenda o impacto da camada de abstração no 
              desperdício de tokens, latência de transporte e pegada energética da GPU.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center">
            <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-teal-300">
              Foco: <strong>Eficiência de Execução & Green AI</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Library Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {libraries.map((lib) => (
          <button
            key={lib.id}
            onClick={() => setSelectedLibId(lib.id)}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              selectedLibId === lib.id
                ? 'bg-teal-950/30 border-teal-500 shadow-md ring-1 ring-teal-500/50'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                {lib.ecosystem}
              </span>
              <span className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded ${
                lib.efficiencyRating.startsWith('A')
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  : 'bg-amber-950 text-amber-300 border border-amber-800'
              }`}>
                {lib.efficiencyRating.split(' ')[0]}
              </span>
            </div>
            <div className="font-bold text-white text-sm mt-1">
              {lib.name}
            </div>
            <div className="text-xs text-slate-400 mt-1 truncate">
              {lib.runtime}
            </div>
          </button>
        ))}
      </div>

      {/* Detailed Inspection Card */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white">
                {currentLib.name}
              </h3>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-slate-800 text-teal-300 border border-slate-700">
                {currentLib.runtime}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Criado por: {currentLib.ecosystem}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-300">
              Classificação Energética:
            </span>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {currentLib.efficiencyRating}
            </span>
          </div>
        </div>

        {/* 2x2 Metric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 space-y-1">
            <div className="text-[11px] font-mono text-slate-400 uppercase">
              Sobrecarga Computacional (Overhead)
            </div>
            <div className="text-sm font-semibold text-white">
              {currentLib.energyOverhead}
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 space-y-1">
            <div className="text-[11px] font-mono text-slate-400 uppercase">
              Economia de Tokens & Decodificação
            </div>
            <div className="text-sm font-semibold text-white">
              {currentLib.tokenEconomy}
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase text-slate-400 font-semibold">
            Destaques de Engenharia e Eficiência:
          </div>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {currentLib.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Suitability Banner */}
        <div className="p-3.5 rounded-lg bg-slate-950 border border-teal-500/30 text-xs text-slate-200 space-y-1">
          <div className="font-semibold text-teal-300 font-mono">
            Adequação para Comunicação Baseada em Contexto de Máquinas (M2M):
          </div>
          <div className="text-slate-300 leading-relaxed">
            {currentLib.m2mSuitability}
          </div>
          <div className="text-[11px] text-emerald-400 pt-1">
            💡 {currentLib.recommendation}
          </div>
        </div>

      </div>

      {/* Deep-Dive Article Section: Why Machine Context eliminates conversational waste */}
      <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
        <h4 className="text-sm font-bold text-white flex items-center gap-2 font-mono uppercase">
          <BookOpen className="w-4 h-4 text-emerald-400" />
          Por que a Comunicação de Máquinas Deve Dispensar o Formato Conversacional?
        </h4>
        <div className="text-xs text-slate-300 leading-relaxed space-y-2 font-sans">
          <p>
            Grandes Modelos de Linguagem (LLMs) são naturalmente preditores de tokens auto-regressivos. 
            Quando um usuário ou uma aplicação envia um prompt humano com <em>"Olá, gostaria que você fizesse..."</em>, 
            o modelo é estatisticamente forçado a iniciar sua resposta espelhando essa mesma polidez: 
            <em>"Com certeza! Aqui está o que você me pediu..."</em>.
          </p>
          <p>
            Em uma chamada isolada, isso pode parecer inofensivo. No entanto, em microsserviços corporativos 
            que realizam <strong>1.000.000 de requisições por dia</strong>, esses preâmbulos descartáveis somam 
            mais de <strong>40 milhões de tokens inúteis por mês</strong>, exigindo ciclos de inferência de GPU 
            que aquecem data centers e geram quilowatts-hora de consumo elétrico sem gerar nenhum valor funcional.
          </p>
          <p>
            O protocolo de <strong>Contexto de Máquinas</strong> transforma a interação em uma chamada declarativa: 
            um <code>systemDirective</code> rígido, restrições delimitadas, temperatura próxima a zero e um 
            <code>responseSchema</code> JSON compilado. O modelo decodifica diretamente a carga útil desejada em 
            uma única passada, sem preâmbulo, sem alucinação e sem re-tentativas.
          </p>
        </div>
      </div>

    </div>
  );
};
