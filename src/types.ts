export interface AILibraryReview {
  id: string;
  name: string;
  ecosystem: string;
  runtime: string;
  efficiencyRating: string;
  energyOverhead: string;
  tokenEconomy: string;
  features: string[];
  m2mSuitability: string;
  recommendation: string;
}

export interface ModelCrossSpec {
  id: string;
  name: string;
  tier: string;
  joulesPer1kTokens: number;
  wattHoursPer10kReq: number;
  co2GramsPer10kReq: number;
  latencyP50Ms: number;
  thinkingLevelSupport: string;
  recommendedTemp: number;
  recommendedTopP: number;
  contextWindow: string;
  reasoningCapacity: string;
  energyProfile: string;
  bestFor: string;
  computeWasteFactor: number;
}

export interface MachineParameters {
  model: string;
  temperature: number;
  topP: number;
  thinkingLevel: string;
  responseMimeType: string;
  maxOutputTokens: number;
}

export interface EnergyMetrics {
  modelUsed: string;
  joulesSavedPerExecution: number;
  wattHoursSavedPer10k: number;
  co2GramsSavedPer10k: number;
  efficiencyTier: string;
  antiWasteNotes?: string;
}

export interface OptimizedResult {
  domain: string;
  originalTokens: number;
  optimizedTokens: number;
  preventedRetryTokens: number;
  tokenReductionPercent: number;
  systemDirective: string;
  operationalGoal: string;
  inputConstraints: string[];
  machineInstructionText: string;
  recommendedParameters: MachineParameters;
  jsonSchema: any;
  energyMetrics: EnergyMetrics;
  engine: string;
}

export interface ExecutionRunResult {
  success: boolean;
  output: string;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  durationMs: number;
  joulesConsumed: number;
  modelExecuted: string;
  isSimulated: boolean;
}

export interface KVCacheDecomposition {
  staticPrefixTokens: number;
  dynamicDeltaTokens: number;
  cacheHitSavingsPercent: number;
  cacheablePrefix: string;
  dynamicSlotTemplate: string;
  recommendedCacheTTLSeconds: number;
  geminiCacheConfigSnippet: string;
  energyJoulesWithoutCache: number;
  energyJoulesWithCache: number;
}

export interface RequirementAnchor {
  requirement: string;
  status: 'PRESERVED' | 'STRENGTHENED' | 'PRUNED_NOISE';
  anchoredLocation: string;
  explanation: string;
}

export interface FidelityAudit {
  fidelityScore: number;
  originalRequirements: RequirementAnchor[];
  semanticLossRisk: 'NONE' | 'LOW' | 'MODERATE';
  auditSummary: string;
  hallucinationProtectionRate: number;
}

export interface M2MPipelineNode {
  id: string;
  stepNumber: number;
  name: string;
  role: string;
  recommendedModel: string;
  inputContract: string;
  outputContract: string;
  joulesEstimate: number;
  whyThisModel: string;
}

export interface M2MPipelineGraph {
  pipelineTitle: string;
  nodes: M2MPipelineNode[];
  totalPipelineJoules: number;
  monolithicSingleCallJoules: number;
  pipelineSavingsPercent: number;
  orchestrationProtocol: string;
}

export interface MultiTurnDistillation {
  turnsAnalyzed: number;
  totalChatTokens: number;
  distilledM2MTokens: number;
  compressionRatio: number;
  convergedIntent: string;
  finalMachineInstruction: string;
  preventedConversationLoops: number;
  wastedChatJoulesSaved: number;
}
