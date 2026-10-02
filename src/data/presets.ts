export interface PromptPreset {
  id: string;
  title: string;
  category: string;
  rawPrompt: string;
  suggestedModel: string;
  targetDomain: string;
  humanNoiseExplained: string;
}

export const PROMPT_PRESETS: PromptPreset[] = [
  {
    id: 'data-invoice',
    title: 'Extração de Fatura & Pedido (Vago & Conversacional)',
    category: 'Extração de Dados',
    suggestedModel: 'gemini-3.1-flash-lite',
    targetDomain: 'DATA_EXTRACTION_AND_MAPPING',
    rawPrompt: 'Olá! Você poderia por favor dar uma olhada nessa fatura de compra aqui e me dizer quem foi que comprou, quanto deu no total com impostos, os itens e a data de vencimento? Eu gostaria que você colocasse tudo bonitinho numa tabela ou algo fácil de ler no meu sistema. Muito obrigado pela ajuda!',
    humanNoiseExplained: '65% de preâmbulos sociais ("Olá", "por favor", "gostaria que", "muito obrigado"), ausência de schema, sem tipos numéricos definidos e instrução ambígua ("bonitinho numa tabela") que causaria 2 a 3 voltas de re-tentativa.'
  },
  {
    id: 'code-refactor',
    title: 'Refatoração & Otimização de Código',
    category: 'Engenharia de Software',
    suggestedModel: 'gemini-3.8-flash',
    targetDomain: 'SOFTWARE_ENGINEERING',
    rawPrompt: 'Será que você pode refatorar essa função em TypeScript pra mim? Tá meio lenta no loop e acho que tem memory leak. Se puder deixar ela bem mais rápida e com tipagem forte eu agradeceria muito. Não se esqueça de me explicar detalhadamente tudo o que você mudou passo a passo.',
    humanNoiseExplained: 'Pedido de explicação desnecessária em ambiente de máquina, ausência de contrato de entrada/saída, ambiguidade de critérios de benchmark.'
  },
  {
    id: 'iot-telemetry',
    title: 'Telemetria IoT e Disparo de Ação Industrial',
    category: 'M2M & Sensores',
    suggestedModel: 'gemini-3.1-flash-lite',
    targetDomain: 'MACHINE_TO_MACHINE_TELEMETRY',
    rawPrompt: 'Oi robô! Recebi os dados do sensor de temperatura da caldeira 4 que bateu 94 graus com vibração de 4.2mm/s e pressão de 6.1 bar. Avalie se devemos acionar o duto de resfriamento ou cortar a válvula principal e me dê um parecer rápido.',
    humanNoiseExplained: 'Conversação antropomórfica desnecessária para lógica de controle. A máquina precisa apenas de JSON { action: "ACTIVATE_COOLING", priority: "CRITICAL", safetyScore: 0.98 } sem latência ou prosa explicativa.'
  },
  {
    id: 'compliance-audit',
    title: 'Auditoria de Conformidade & Risco',
    category: 'Raciocínio Analítico',
    suggestedModel: 'gemini-3.1-pro-preview',
    targetDomain: 'TECHNICAL_ANALYSIS',
    rawPrompt: 'Por gentileza, analise as cláusulas contratuais de SLA anexadas e verifique se o cliente pode rescindir sem multa caso o uptime caia para 99.2% no trimestre. Destaque todas as brechas jurídicas e penalidades financeiras possíveis.',
    humanNoiseExplained: 'Falta de delimitação de schema e parâmetros de probabilidade. Contexto de máquina precisa de checklist booleano com evidências pontuais, evitando deriva especulativa.'
  }
];

export const GREEN_COMPUTING_TIPS = [
  {
    title: 'Elimine a Cortesia Antropomórfica',
    desc: 'Tokens como "por favor", "olá" e saudações gastam até 30% da janela inicial de contexto sem adicionar valor semântico.',
    impact: 'Até -25% de tokens de entrada'
  },
  {
    title: 'Use Schemas Estritos (JSON RFC-8259)',
    desc: 'Quando a IA sabe a estrutura exata exigida via responseSchema, a GPU desliga ramos estocásticos e economiza até 40% em tempo de decodificação.',
    impact: 'Zero falhas de parse e re-tentativas'
  },
  {
    title: 'Calibre o ThinkingLevel para a Tarefa',
    desc: 'Modelos Gemini 3 têm ThinkingLevel (MINIMAL, LOW, HIGH). Deixar em HIGH para tarefas triviais desperdiça até 20x mais Joules de processamento.',
    impact: 'Até 85% de redução em Joules por chamada'
  },
  {
    title: 'Adote Modelos Flash-Lite para Pipelines M2M',
    desc: 'O Gemini 3.1 Flash-Lite gasta ~1.15 Joules por 1k tokens, contra ~21 Joules de modelos Pro. Para fluxos máquina-a-máquina com schema rígido, o resultado é idêntico com fração do consumo.',
    impact: 'Economia de 90%+ em emissões de carbono'
  }
];
