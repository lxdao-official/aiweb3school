export type RoadmapTone = 'web3' | 'ai' | 'fusion' | 'future'
export type RoadmapVariant = 'foundation' | 'fusion' | 'branch'

export interface RoadmapNode {
  id: string
  title: string
  tone: RoadmapTone
  variant: RoadmapVariant
  link?: string
  todos?: string[]
}

export interface RoadmapModule {
  label: string
  tone: RoadmapTone
  variant: RoadmapVariant
  nodes: RoadmapNode[]
}

export const roadmapData = {
  foundationTitle: '基础课程',
  fusionTitle: 'AI × Web3',
  practiceTitle: '赛道实践',
  modules: {
    web3: {
      label: 'Web3',
      tone: 'web3',
      variant: 'foundation',
      nodes: [
        {
          id: 'web3-chain-fundamentals',
          title: '区块链原理',
          tone: 'web3',
          variant: 'foundation',
          link: '/zh/blockchain-basics/',
          todos: ['账户模型', '交易生命周期', 'Gas 与费用', 'EVM', '共识机制'],
        },
        {
          id: 'web3-wallet-accounts',
          title: '账户与钱包',
          tone: 'web3',
          variant: 'foundation',
          link: '/zh/web3-tools/',
          todos: ['EOA', 'Smart Account', '签名', 'Nonce', 'Session Key'],
        },
        {
          id: 'web3-smart-contracts',
          title: '智能合约',
          tone: 'web3',
          variant: 'foundation',
          link: '/zh/smart-contracts/',
          todos: ['状态变量', '事件', '权限设计', '合约调用'],
        },
        {
          id: 'web3-token-standards',
          title: 'Token 与标准',
          tone: 'web3',
          variant: 'foundation',
          link: '/zh/resources/',
          todos: ['ERC-20', 'ERC-721', 'ERC-1155'],
        },
        {
          id: 'web3-defi-mechanics',
          title: 'DeFi 机制',
          tone: 'web3',
          variant: 'foundation',
          link: '/zh/defi-intro/',
          todos: ['稳定币', 'DEX', '借贷协议', '清算'],
        },
        {
          id: 'web3-onchain-data',
          title: '链上数据',
          tone: 'web3',
          variant: 'foundation',
          link: '/zh/resources/',
          todos: ['Logs / Events', '索引', '预言机', '数据读取'],
        },
        {
          id: 'web3-cross-chain-aa',
          title: '跨链与账户抽象',
          tone: 'web3',
          variant: 'foundation',
          link: '/zh/resources/',
          todos: ['ERC-4337', 'Bundler', 'Paymaster', '跨链动作'],
        },
        {
          id: 'web3-security',
          title: '协议与安全',
          tone: 'web3',
          variant: 'foundation',
          link: '/zh/resources/',
          todos: ['重入', '权限边界', '审计意识'],
        },
      ],
    } satisfies RoadmapModule,
    ai: {
      label: 'AI',
      tone: 'ai',
      variant: 'foundation',
      nodes: [
        {
          id: 'ai-ml-basics',
          title: '机器学习基础',
          tone: 'ai',
          variant: 'foundation',
          link: '/zh/machine-learning-basics/',
          todos: ['监督学习', '无监督学习', '训练集', '验证集', '评估指标'],
        },
        {
          id: 'ai-deep-learning',
          title: '深度学习与 Transformer',
          tone: 'ai',
          variant: 'foundation',
          link: '/zh/deep-learning-intro/',
          todos: ['神经网络', 'Attention', '上下文窗口', '推理边界'],
        },
        {
          id: 'ai-llm-basics',
          title: 'LLM 基础',
          tone: 'ai',
          variant: 'foundation',
          link: '/zh/ai-tools/',
          todos: ['Tokenization', '预训练', '微调', '采样'],
        },
        {
          id: 'ai-prompt-workflow',
          title: 'Prompt 与工作流',
          tone: 'ai',
          variant: 'foundation',
          link: '/zh/ai-tools/',
          todos: ['Prompt 模板', '结构化输出', '工具调用'],
        },
        {
          id: 'ai-rag-retrieval',
          title: 'RAG 与检索',
          tone: 'ai',
          variant: 'foundation',
          link: '/zh/resources/',
          todos: ['Chunking', 'Embedding', '召回', '重排'],
        },
        {
          id: 'ai-agent-systems',
          title: 'Agent 系统',
          tone: 'ai',
          variant: 'foundation',
          link: '/zh/ai-agents/',
          todos: ['规划', '记忆', '工具使用', '观察'],
        },
        {
          id: 'ai-evals-observability',
          title: '评估与观测',
          tone: 'ai',
          variant: 'foundation',
          link: '/zh/resources/',
          todos: ['Evals', '回归测试', '质量监控'],
        },
        {
          id: 'ai-inference-deploy',
          title: '推理与部署',
          tone: 'ai',
          variant: 'foundation',
          link: '/zh/resources/',
          todos: ['量化', '延迟', '部署策略'],
        },
      ],
    } satisfies RoadmapModule,
    fusion: {
      label: 'AI × Web3',
      tone: 'fusion',
      variant: 'fusion',
      nodes: [
        {
          id: 'fusion-agent-wallet',
          title: 'Agent Wallet',
          tone: 'fusion',
          variant: 'fusion',
          link: '/zh/project-guide/',
          todos: ['钱包授权', '批量执行', '链上动作', 'Gas 代付'],
        },
        {
          id: 'fusion-onchain-feedback',
          title: '链上数据反馈',
          tone: 'fusion',
          variant: 'fusion',
          link: '/zh/case-studies/',
          todos: ['事件回传', '索引查询', '检索记忆', '闭环执行'],
        },
        {
          id: 'fusion-identity-context',
          title: '身份与上下文',
          tone: 'fusion',
          variant: 'fusion',
          link: '/zh/resources/',
          todos: ['DID', '信誉标签', '用户画像', '权限策略'],
        },
        {
          id: 'fusion-payments-subscriptions',
          title: '支付与订阅',
          tone: 'fusion',
          variant: 'fusion',
          link: '/zh/case-studies/',
          todos: ['稳定币支付', '机器支付', 'x402'],
        },
        {
          id: 'fusion-protocol-automation',
          title: '协议自动化',
          tone: 'fusion',
          variant: 'fusion',
          link: '/zh/project-guide/',
          todos: ['规则引擎', '触发条件', '自动执行', '人工兜底'],
        },
        {
          id: 'fusion-risk-design',
          title: '风险与产品设计',
          tone: 'fusion',
          variant: 'fusion',
          link: '/zh/resources/',
          todos: ['风险阈值', '产品判断', '防滥用'],
        },
      ],
    } satisfies RoadmapModule,
    practice: {
      label: '赛道实践',
      tone: 'future',
      variant: 'branch',
      nodes: [
        {
          id: 'practice-onchain-agent',
          title: 'Onchain Agent',
          tone: 'future',
          variant: 'branch',
          link: '/zh/ai-agents/',
        },
        {
          id: 'practice-agent-payments',
          title: 'Agent Payments',
          tone: 'future',
          variant: 'branch',
          link: '/zh/case-studies/',
        },
        {
          id: 'practice-ai-defi',
          title: 'AI × DeFi',
          tone: 'future',
          variant: 'branch',
          link: '/zh/ai-defi/',
        },
        {
          id: 'practice-deai-networks',
          title: 'DeAI Networks',
          tone: 'future',
          variant: 'branch',
          link: '/zh/decentralized-ai/',
        },
        {
          id: 'practice-consumer-dapps',
          title: 'Consumer AI dApps',
          tone: 'future',
          variant: 'branch',
          link: '/zh/project-guide/',
        },
        {
          id: 'practice-identity-risk',
          title: 'Identity & Risk Systems',
          tone: 'future',
          variant: 'branch',
          link: '/zh/resources/',
        },
        {
          id: 'practice-cross-chain-actions',
          title: 'Cross-chain Actions',
          tone: 'future',
          variant: 'branch',
          link: '/zh/resources/',
        },
        {
          id: 'practice-protocol-automation',
          title: 'Protocol Automation',
          tone: 'future',
          variant: 'branch',
          link: '/zh/project-guide/',
        },
      ],
    } satisfies RoadmapModule,
  },
} as const
