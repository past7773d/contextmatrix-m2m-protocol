import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, Share2, Tag, ArrowRight, CheckCircle2, Sparkles, User, ExternalLink, Leaf } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: 'FinOps' | 'Green AI' | 'Arquitetura' | 'Case Study';
  author: string;
  content: string[];
  keyTakeaways: string[];
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Como Reduzir em até 65% os Custos de LLM em Produção com Prefix Pinning e Protocolo M2M',
    slug: 'reduzir-custos-llm-prefix-pinning-m2m',
    excerpt: 'Conversar com IA como se fosse um humano custa bilhões em tokens desperdiçados. Veja como o desacoplamento de prefixos e a decodificação estruturada eliminam gastos invisíveis.',
    date: '02 de Outubro de 2026',
    readTime: '5 min de leitura',
    category: 'FinOps',
    author: 'Vitor Pastana Santana',
    keyTakeaways: [
      'Remoção de ruído antropomórfico corta 40% a 65% dos tokens de entrada.',
      'Prefix Pinning na VRAM da GPU aproveita o Context Caching nativo com até 75% de desconto de infraestrutura.',
      'Schema-Constrained Decoding direto no compilador da GPU elimina 100% dos loops de retry por falha de JSON.'
    ],
    content: [
      'A grande armadilha da engenharia de IA moderna é tratar modelos estatísticos como seres humanos. Quando um desenvolvedor envia prompts carregados de saudações ("por favor", "gostaria que você"), o modelo aloca tensores de atenção para cada um desses tokens sem qualquer ganho de precisão.',
      'No protocolo ContextMatrix, substituímos preâmbulos por especificações imperativas puras (ex: [ROLE], [TASK_SPECIFICATION], [CONSTRAINTS]). Isso ancora o contexto na primeira posição do prompt, permitindo que a VRAM da GPU reutilize os tensores de chave-valor (KV-Cache) de requisições anteriores.',
      'O resultado prático: uma requisição típica de 280 tokens é destilada para 95 tokens sem perder nenhuma regra de negócio. Em uma empresa rodando 500.000 chamadas mensais, isso representa uma economia líquida de mais de R$ 3.500 todos os meses.'
    ]
  },
  {
    id: '2',
    title: 'A Física Oculta da IA: Por Que Joules por Token é a Métrica Mais Importante de 2026',
    slug: 'fisica-oculta-da-ia-joules-por-token',
    excerpt: 'Data centers globais estão enfrentando escassez de energia e limites térmicos. Entenda como o Green Computing transforma sustentabilidade em vantagem competitiva.',
    date: '01 de Outubro de 2026',
    readTime: '6 min de leitura',
    category: 'Green AI',
    author: 'Vitor Pastana Santana',
    keyTakeaways: [
      'Modelos densos consomem até 12.8 Joules por 1.000 tokens processados.',
      'O calor dissipado exige refrigeração que multiplica a energia total pelo fator PUE (1.25x - 1.5x).',
      'Auditorias ESG Scope 3 agora exigem atestados matemáticos de pegada de carbono em computação em nuvem.'
    ],
    content: [
      'A era da computação ilimitada chegou ao fim. As maiores empresas de tecnologia do mundo estão construindo usinas nucleares e solares dedicadas para conseguir manter novos data centers ligados.',
      'Cada token processado por uma GPU consome energia elétrica real e dissipa calor em Joules. Enquanto modelos ultra-densos consomem mais de 10 Joules por 1k tokens, modelos destilados como o Gemini Flash-Lite consomem apenas 1.15 Joules por 1k tokens.',
      'Ao utilizar o ContextMatrix, empresas não apenas reduzem a conta de nuvem: elas recebem um Certificado de Redução de Carbono com assinatura SHA-256 válido para o GHG Protocol Scope 3 (Categoria 1: Bens e Serviços Adquiridos).'
    ]
  },
  {
    id: '3',
    title: 'Estudo de Caso Real: Como uma Startup de Atendimento Poupou R$ 4.200/mês com o Gateway',
    slug: 'case-study-startup-atendimento-poupou-4200',
    excerpt: 'Análise detalhada de um pipeline de suporte ao cliente com 180.000 chamadas mensais antes e depois da implementação do ContextMatrix.',
    date: '28 de Setembro de 2026',
    readTime: '4 min de leitura',
    category: 'Case Study',
    author: 'Vitor Pastana Santana',
    keyTakeaways: [
      'Redução de latência média de resposta de 1.840ms para 620ms.',
      'Economia financeira líquida comprovada de R$ 4.218,00 no primeiro mês de uso.',
      'Zero falhas de parse de JSON após ativação do RFC-8259 Schema Guard.'
    ],
    content: [
      'A empresa analisada operava um pipeline de triagem automática de chamados de suporte. O prompt original continha 650 tokens com instruções repetitivas sobre polidez, estilo de escrita e regras redundantes.',
      'Com a ativação do ContextMatrix Live Gateway como proxy reverso, o tráfego foi interceptado em microssegundos. O prompt estático foi fixado em KV-Cache (KV-Pinning) e os dados do usuário foram transmitidos em JSON compacto.',
      'Em 30 dias de operação, o volume de tokens faturados caiu 62%, a latência percebida pelos clientes caiu pela metade e a fatura da OpenAI/Gemini foi reduzida de R$ 7.100 para menos de R$ 2.900.'
    ]
  }
];

export const BlogEngine: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredPosts = filterCategory === 'all'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(p => p.category === filterCategory);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-950/50 via-slate-900 to-teal-950/50 border border-emerald-800/40 shadow-2xl relative overflow-hidden">
        <div className="relative max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <BookOpen className="w-5 h-5" />
            </span>
            <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 font-bold tracking-wider">
              Artigos de Engenharia & FinOps
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-100">
            Blog Técnico & Estudos de Caso
          </h1>

          <p className="text-sm sm:text-base text-slate-300">
            Conteúdo aprofundado sobre arquitetura de dados, eficiência energética em LLMs,
            redução de custos em nuvem e padrões do protocolo ContextMatrix.
          </p>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 text-xs font-mono">
        <button
          onClick={() => setFilterCategory('all')}
          className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
            filterCategory === 'all' ? 'bg-emerald-600 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          Todos os Artigos
        </button>
        <button
          onClick={() => setFilterCategory('FinOps')}
          className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
            filterCategory === 'FinOps' ? 'bg-emerald-600 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          FinOps de IA
        </button>
        <button
          onClick={() => setFilterCategory('Green AI')}
          className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
            filterCategory === 'Green AI' ? 'bg-emerald-600 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          Green AI & Sustentabilidade
        </button>
        <button
          onClick={() => setFilterCategory('Case Study')}
          className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
            filterCategory === 'Case Study' ? 'bg-emerald-600 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          Casos Reais de Clientes
        </button>
      </div>

      {/* Main Grid or Selected Article View */}
      {selectedPost ? (
        <div className="space-y-6">
          <button
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-2 text-xs font-mono text-emerald-400 hover:underline cursor-pointer"
          >
            ← Voltar para todos os artigos
          </button>

          <article className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-2xl">
            <div className="space-y-3 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                  {selectedPost.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {selectedPost.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {selectedPost.readTime}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 leading-tight">
                {selectedPost.title}
              </h1>

              <div className="flex items-center gap-2 pt-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-xs">
                  VP
                </div>
                <div className="text-xs font-mono">
                  <span className="text-slate-200 font-semibold block">{selectedPost.author}</span>
                  <span className="text-slate-500">Fundador da Pastana Dynamics • Autor do ContextMatrix</span>
                </div>
              </div>
            </div>

            {/* Key Takeaways */}
            <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 space-y-3">
              <h3 className="text-sm font-bold text-emerald-300 font-mono flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Destaques Executivos:
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                {selectedPost.keyTakeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Article Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              {selectedPost.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Author Footer & CTA */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
              <div className="space-y-1">
                <span className="text-xs font-mono text-emerald-400 font-bold block">Quer aplicar essa economia na sua empresa?</span>
                <p className="text-xs text-slate-400">
                  Experimente o Gateway ao vivo ou fale diretamente com nossa engenharia via <strong className="text-slate-200 font-mono">pastanadynamics@proton.me</strong>.
                </p>
              </div>

              <button
                onClick={() => setSelectedPost(null)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-xs font-bold font-mono transition-colors cursor-pointer"
              >
                Explorar Mais Artigos
              </button>
            </div>
          </article>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-emerald-500/50 hover:bg-slate-900 transition-all cursor-pointer group shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 font-semibold">
                    {post.category}
                  </span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-base font-bold text-slate-100 group-hover:text-emerald-300 transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">{post.date}</span>
                <span className="text-emerald-400 flex items-center gap-1 font-semibold group-hover:translate-x-1 transition-transform">
                  Ler Artigo <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
