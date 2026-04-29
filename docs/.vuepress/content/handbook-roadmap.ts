export type HomeLocale = 'zh' | 'en'

export type RoadmapBucket = 'foundation-ai' | 'foundation-web3' | 'product' | 'challenge'

export interface HandbookRoadmapEntry {
  id: string
  title: string
  link?: string
  bucket: RoadmapBucket
  sidebarTitle?: string
  showInSidebar?: boolean
}

export interface HandbookRoadmapLocale {
  stages: {
    foundation: string
    product: string
    challenge: string
  }
  branches: {
    ai: string
    web3: string
  }
  sidebar: {
    rootTitle: string
    groups: Array<{
      bucket: RoadmapBucket
      text: string
    }>
  }
  entries: HandbookRoadmapEntry[]
}

export interface HomepageRoadmapTopic {
  id: string
  title: string
  link?: string
}

export interface HomepageRoadmapGroup {
  id: string
  title: string
  topics: HomepageRoadmapTopic[]
}

export interface HomepageRoadmapChapter {
  id: string
  title: string
  tone: 'intro' | 'ai' | 'web3' | 'fusion' | 'security' | 'standard' | 'practice'
  groups: HomepageRoadmapGroup[]
}

export const homepageRoadmap: Record<HomeLocale, HomepageRoadmapChapter[]> = {
  zh: [
    {
      id: 'intro-map',
      title: 'AI × Web3 入门地图',
      tone: 'intro',
      groups: [
        {
          id: 'discussion',
          title: 'AI × Web3 在讨论什么',
          topics: [
            { id: 'agent-payment', title: 'Agent Payment' },
            { id: 'ai-wallet', title: 'AI Wallet' },
            { id: 'open-coordination', title: 'Open Coordination' },
            { id: 'protocol-agent', title: 'Protocol + Agent' },
          ],
        },
        {
          id: 'first-principles',
          title: '第一性原理拆解',
          topics: [
            { id: 'model-layer', title: '模型层' },
            { id: 'inference-layer', title: '推理层' },
            { id: 'orchestration-layer', title: '编排层' },
            { id: 'protocol-layer', title: '协议层' },
            { id: 'account-layer', title: '账户层' },
            { id: 'payment-layer', title: '支付层' },
          ],
        },
      ],
    },
    {
      id: 'ai-stack',
      title: 'AI 技术栈',
      tone: 'ai',
      groups: [
        {
          id: 'model-principles',
          title: '模型原理',
          topics: [
            { id: 'transformer', title: 'Transformer' },
            { id: 'attention', title: 'Attention' },
            { id: 'context-window', title: 'Context Window' },
            { id: 'token', title: 'Token' },
          ],
        },
        {
          id: 'application-forms',
          title: '应用形态',
          topics: [
            { id: 'chat', title: 'Chat' },
            { id: 'search-rag', title: 'Search / RAG' },
            { id: 'ai-coding', title: 'AI Coding' },
            { id: 'automation', title: 'Automation' },
            { id: 'multi-agent', title: 'Multi-Agent' },
          ],
        },
        {
          id: 'system-organization',
          title: '系统组织',
          topics: [
            { id: 'prompt', title: 'Prompt' },
            { id: 'workflow', title: 'Workflow' },
            { id: 'harness', title: 'Harness' },
            { id: 'agent', title: 'Agent' },
          ],
        },
        {
          id: 'ai-tools',
          title: '实践工具',
          topics: [
            { id: 'ollama', title: 'Ollama' },
            { id: 'vllm', title: 'vLLM' },
            { id: 'openai-agents-sdk', title: 'OpenAI Agents SDK' },
            { id: 'langgraph', title: 'LangGraph' },
            { id: 'mcp', title: 'MCP' },
          ],
        },
      ],
    },
    {
      id: 'web3-stack',
      title: 'Web3 技术栈',
      tone: 'web3',
      groups: [
        {
          id: 'ethereum-protocol',
          title: '以太坊协议',
          topics: [
            { id: 'pos', title: 'PoS' },
            { id: 'evm', title: 'EVM' },
            { id: 'gas', title: 'Gas' },
            { id: 'rollup', title: 'Rollup' },
          ],
        },
        {
          id: 'accounts-permissions',
          title: '账户与权限',
          topics: [
            { id: 'eoa', title: 'EOA' },
            { id: 'smart-account', title: 'Smart Account' },
            { id: 'erc-4337', title: 'ERC-4337' },
            { id: 'session-key', title: 'Session Key' },
            { id: 'safe', title: 'Safe' },
          ],
        },
        {
          id: 'web3-development',
          title: '开发实践',
          topics: [
            { id: 'metamask', title: 'MetaMask' },
            { id: 'remix', title: 'Remix' },
            { id: 'hardhat', title: 'Hardhat' },
            { id: 'foundry', title: 'Foundry' },
            { id: 'etherscan', title: 'Etherscan' },
          ],
        },
      ],
    },
    {
      id: 'cross-domain',
      title: '交叉领域',
      tone: 'fusion',
      groups: [
        {
          id: 'payment-settlement',
          title: '支付与结算',
          topics: [
            { id: 'x402', title: 'x402' },
            { id: 'erc-8004', title: 'ERC-8004' },
            { id: 'erc-8183', title: 'ERC-8183' },
            { id: 'escrow', title: 'Escrow' },
            { id: 'receipt', title: 'Receipt' },
          ],
        },
        {
          id: 'identity-capability',
          title: '身份与能力',
          topics: [
            { id: 'identity', title: 'Identity' },
            { id: 'capability', title: 'Capability' },
            { id: 'reputation', title: 'Reputation' },
            { id: 'registry', title: 'Registry' },
          ],
        },
        {
          id: 'coordination-protocols',
          title: '协作协议',
          topics: [
            { id: 'mcp', title: 'MCP' },
            { id: 'a2a', title: 'A2A' },
            { id: 'tool-schema', title: 'Tool Schema' },
            { id: 'agent-handoff', title: 'Agent Handoff' },
          ],
        },
        {
          id: 'development-product',
          title: '开发与产品',
          topics: [
            { id: 'web3-copilot', title: 'Web3 Copilot' },
            { id: 'research-agent', title: 'Research Agent' },
            { id: 'ai-wallet', title: 'AI Wallet' },
            { id: 'policy-engine', title: 'Policy Engine' },
          ],
        },
      ],
    },
    {
      id: 'safety-privacy-sovereignty',
      title: '安全、隐私、主权',
      tone: 'security',
      groups: [
        {
          id: 'safe-execution',
          title: 'Safe Execution',
          topics: [
            { id: 'budget-cap', title: 'Budget Cap' },
            { id: 'allowlist', title: 'Allowlist' },
            { id: 'human-approval', title: 'Human Approval' },
            { id: 'audit-log', title: 'Audit Log' },
          ],
        },
        {
          id: 'security',
          title: 'Security',
          topics: [
            { id: 'prompt-injection', title: 'Prompt Injection' },
            { id: 'tool-abuse', title: 'Tool Abuse' },
            { id: 'key-management', title: 'Key Management' },
            { id: 'contract-risk', title: 'Contract Risk' },
          ],
        },
        {
          id: 'privacy-crops',
          title: 'Privacy / CROPS',
          topics: [
            { id: 'crops', title: 'CROPS' },
            { id: 'tee', title: 'TEE' },
            { id: 'zk', title: 'ZK' },
            { id: 'local-model', title: 'Local Model' },
            { id: 'selective-disclosure', title: 'Selective Disclosure' },
          ],
        },
      ],
    },
    {
      id: 'standards-protocols',
      title: '标准与协议参与',
      tone: 'standard',
      groups: [
        {
          id: 'existing-standards',
          title: '现有标准速览',
          topics: [
            { id: 'erc-20', title: 'ERC-20' },
            { id: 'erc-4337', title: 'ERC-4337' },
            { id: 'erc-8004', title: 'ERC-8004' },
            { id: 'a2a', title: 'A2A' },
            { id: 'mcp', title: 'MCP' },
          ],
        },
        {
          id: 'join-standards',
          title: '如何参与标准',
          topics: [
            { id: 'read-eip-erc', title: '读 EIP / ERC' },
            { id: 'write-draft', title: '写 Draft' },
            { id: 'reference-impl', title: '做 Reference Impl' },
            { id: 'forum-discussion', title: '提论坛讨论' },
          ],
        },
      ],
    },
    {
      id: 'practice-projects',
      title: '实践与项目',
      tone: 'practice',
      groups: [
        {
          id: 'minimum-demos',
          title: '最小可做 Demo',
          topics: [
            { id: 'tx-explainer', title: '交易解释器' },
            { id: 'contract-copilot', title: '合约 Copilot' },
            { id: 'agent-payment-demo', title: 'Agent Payment Demo' },
            { id: 'ai-wallet-demo', title: 'AI Wallet Demo' },
          ],
        },
        {
          id: 'hackathon-directions',
          title: 'Hackathon 方向',
          topics: [
            { id: 'dev-tooling', title: 'Dev Tooling' },
            { id: 'protocol-design', title: 'Protocol Design' },
            { id: 'agent-commerce', title: 'Agent Commerce' },
            { id: 'ai-security', title: 'AI Security' },
          ],
        },
      ],
    },
  ],
  en: [
    {
      id: 'intro-map',
      title: 'AI × Web3 Entry Map',
      tone: 'intro',
      groups: [
        {
          id: 'discussion',
          title: 'What AI × Web3 Discusses',
          topics: [
            { id: 'agent-payment', title: 'Agent Payment' },
            { id: 'ai-wallet', title: 'AI Wallet' },
            { id: 'open-coordination', title: 'Open Coordination' },
            { id: 'protocol-agent', title: 'Protocol + Agent' },
          ],
        },
        {
          id: 'first-principles',
          title: 'First-Principles Breakdown',
          topics: [
            { id: 'model-layer', title: 'Model Layer' },
            { id: 'inference-layer', title: 'Inference Layer' },
            { id: 'orchestration-layer', title: 'Orchestration Layer' },
            { id: 'protocol-layer', title: 'Protocol Layer' },
            { id: 'account-layer', title: 'Account Layer' },
            { id: 'payment-layer', title: 'Payment Layer' },
          ],
        },
      ],
    },
    {
      id: 'ai-stack',
      title: 'AI Stack',
      tone: 'ai',
      groups: [
        {
          id: 'model-principles',
          title: 'Model Principles',
          topics: [
            { id: 'transformer', title: 'Transformer' },
            { id: 'attention', title: 'Attention' },
            { id: 'context-window', title: 'Context Window' },
            { id: 'token', title: 'Token' },
          ],
        },
        {
          id: 'application-forms',
          title: 'Application Forms',
          topics: [
            { id: 'chat', title: 'Chat' },
            { id: 'search-rag', title: 'Search / RAG' },
            { id: 'ai-coding', title: 'AI Coding' },
            { id: 'automation', title: 'Automation' },
            { id: 'multi-agent', title: 'Multi-Agent' },
          ],
        },
        {
          id: 'system-organization',
          title: 'System Organization',
          topics: [
            { id: 'prompt', title: 'Prompt' },
            { id: 'workflow', title: 'Workflow' },
            { id: 'harness', title: 'Harness' },
            { id: 'agent', title: 'Agent' },
          ],
        },
        {
          id: 'ai-tools',
          title: 'Practice Tools',
          topics: [
            { id: 'ollama', title: 'Ollama' },
            { id: 'vllm', title: 'vLLM' },
            { id: 'openai-agents-sdk', title: 'OpenAI Agents SDK' },
            { id: 'langgraph', title: 'LangGraph' },
            { id: 'mcp', title: 'MCP' },
          ],
        },
      ],
    },
    {
      id: 'web3-stack',
      title: 'Web3 Stack',
      tone: 'web3',
      groups: [
        {
          id: 'ethereum-protocol',
          title: 'Ethereum Protocol',
          topics: [
            { id: 'pos', title: 'PoS' },
            { id: 'evm', title: 'EVM' },
            { id: 'gas', title: 'Gas' },
            { id: 'rollup', title: 'Rollup' },
          ],
        },
        {
          id: 'accounts-permissions',
          title: 'Accounts & Permissions',
          topics: [
            { id: 'eoa', title: 'EOA' },
            { id: 'smart-account', title: 'Smart Account' },
            { id: 'erc-4337', title: 'ERC-4337' },
            { id: 'session-key', title: 'Session Key' },
            { id: 'safe', title: 'Safe' },
          ],
        },
        {
          id: 'web3-development',
          title: 'Development Practice',
          topics: [
            { id: 'metamask', title: 'MetaMask' },
            { id: 'remix', title: 'Remix' },
            { id: 'hardhat', title: 'Hardhat' },
            { id: 'foundry', title: 'Foundry' },
            { id: 'etherscan', title: 'Etherscan' },
          ],
        },
      ],
    },
    {
      id: 'cross-domain',
      title: 'Cross-Domain Areas',
      tone: 'fusion',
      groups: [
        {
          id: 'payment-settlement',
          title: 'Payment & Settlement',
          topics: [
            { id: 'x402', title: 'x402' },
            { id: 'erc-8004', title: 'ERC-8004' },
            { id: 'erc-8183', title: 'ERC-8183' },
            { id: 'escrow', title: 'Escrow' },
            { id: 'receipt', title: 'Receipt' },
          ],
        },
        {
          id: 'identity-capability',
          title: 'Identity & Capability',
          topics: [
            { id: 'identity', title: 'Identity' },
            { id: 'capability', title: 'Capability' },
            { id: 'reputation', title: 'Reputation' },
            { id: 'registry', title: 'Registry' },
          ],
        },
        {
          id: 'coordination-protocols',
          title: 'Coordination Protocols',
          topics: [
            { id: 'mcp', title: 'MCP' },
            { id: 'a2a', title: 'A2A' },
            { id: 'tool-schema', title: 'Tool Schema' },
            { id: 'agent-handoff', title: 'Agent Handoff' },
          ],
        },
        {
          id: 'development-product',
          title: 'Development & Product',
          topics: [
            { id: 'web3-copilot', title: 'Web3 Copilot' },
            { id: 'research-agent', title: 'Research Agent' },
            { id: 'ai-wallet', title: 'AI Wallet' },
            { id: 'policy-engine', title: 'Policy Engine' },
          ],
        },
      ],
    },
    {
      id: 'safety-privacy-sovereignty',
      title: 'Safety, Privacy & Sovereignty',
      tone: 'security',
      groups: [
        {
          id: 'safe-execution',
          title: 'Safe Execution',
          topics: [
            { id: 'budget-cap', title: 'Budget Cap' },
            { id: 'allowlist', title: 'Allowlist' },
            { id: 'human-approval', title: 'Human Approval' },
            { id: 'audit-log', title: 'Audit Log' },
          ],
        },
        {
          id: 'security',
          title: 'Security',
          topics: [
            { id: 'prompt-injection', title: 'Prompt Injection' },
            { id: 'tool-abuse', title: 'Tool Abuse' },
            { id: 'key-management', title: 'Key Management' },
            { id: 'contract-risk', title: 'Contract Risk' },
          ],
        },
        {
          id: 'privacy-crops',
          title: 'Privacy / CROPS',
          topics: [
            { id: 'crops', title: 'CROPS' },
            { id: 'tee', title: 'TEE' },
            { id: 'zk', title: 'ZK' },
            { id: 'local-model', title: 'Local Model' },
            { id: 'selective-disclosure', title: 'Selective Disclosure' },
          ],
        },
      ],
    },
    {
      id: 'standards-protocols',
      title: 'Standards & Protocol Participation',
      tone: 'standard',
      groups: [
        {
          id: 'existing-standards',
          title: 'Existing Standards Overview',
          topics: [
            { id: 'erc-20', title: 'ERC-20' },
            { id: 'erc-4337', title: 'ERC-4337' },
            { id: 'erc-8004', title: 'ERC-8004' },
            { id: 'a2a', title: 'A2A' },
            { id: 'mcp', title: 'MCP' },
          ],
        },
        {
          id: 'join-standards',
          title: 'How to Join Standards Work',
          topics: [
            { id: 'read-eip-erc', title: 'Read EIP / ERC' },
            { id: 'write-draft', title: 'Write a Draft' },
            { id: 'reference-impl', title: 'Build a Reference Impl' },
            { id: 'forum-discussion', title: 'Start a Forum Discussion' },
          ],
        },
      ],
    },
    {
      id: 'practice-projects',
      title: 'Practice & Projects',
      tone: 'practice',
      groups: [
        {
          id: 'minimum-demos',
          title: 'Minimum Viable Demos',
          topics: [
            { id: 'tx-explainer', title: 'Transaction Explainer' },
            { id: 'contract-copilot', title: 'Contract Copilot' },
            { id: 'agent-payment-demo', title: 'Agent Payment Demo' },
            { id: 'ai-wallet-demo', title: 'AI Wallet Demo' },
          ],
        },
        {
          id: 'hackathon-directions',
          title: 'Hackathon Directions',
          topics: [
            { id: 'dev-tooling', title: 'Dev Tooling' },
            { id: 'protocol-design', title: 'Protocol Design' },
            { id: 'agent-commerce', title: 'Agent Commerce' },
            { id: 'ai-security', title: 'AI Security' },
          ],
        },
      ],
    },
  ],
}

export const handbookRoadmap: Record<HomeLocale, HandbookRoadmapLocale> = {
  zh: {
    stages: {
      foundation: 'AI × Web3 的基础',
      product: 'AI × Web3 融合',
      challenge: 'AI × Web3 的挑战',
    },
    branches: {
      ai: 'AI 的基础',
      web3: 'Web3 的基础',
    },
    sidebar: {
      rootTitle: 'AI Web3 School',
      groups: [
        { bucket: 'foundation-ai', text: 'Part 1: AI 基础' },
        { bucket: 'foundation-web3', text: 'Part 2: Web3 基础' },
        { bucket: 'product', text: 'Part 3: AI × Web3 融合' },
        { bucket: 'challenge', text: 'Part 4: 实战与资源' },
      ],
    },
    entries: [
      { id: 'ai-fundamentals', title: 'AI 基础概念', link: '/zh/ai-fundamentals/', bucket: 'foundation-ai' },
      { id: 'machine-learning-basics', title: '机器学习入门', link: '/zh/machine-learning-basics/', bucket: 'foundation-ai' },
      { id: 'deep-learning-intro', title: '深度学习简介', link: '/zh/deep-learning-intro/', bucket: 'foundation-ai' },
      { id: 'ai-tools', title: 'AI 工具与平台', link: '/zh/ai-tools/', bucket: 'foundation-ai' },
      { id: 'blockchain-basics', title: '区块链基础', link: '/zh/blockchain-basics/', bucket: 'foundation-web3' },
      { id: 'smart-contracts', title: '智能合约入门', link: '/zh/smart-contracts/', bucket: 'foundation-web3' },
      { id: 'defi-intro', title: 'DeFi 概览', link: '/zh/defi-intro/', bucket: 'foundation-web3' },
      { id: 'web3-tools', title: 'Web3 开发工具', link: '/zh/web3-tools/', bucket: 'foundation-web3' },
      { id: 'ai-agents', title: 'AI Agent 与区块链', link: '/zh/ai-agents/', bucket: 'product' },
      { id: 'ai-defi', title: 'AI + DeFi', link: '/zh/ai-defi/', bucket: 'product' },
      { id: 'ai-nft', title: 'AI + NFT', link: '/zh/ai-nft/', bucket: 'product' },
      { id: 'decentralized-ai', title: '去中心化 AI', link: '/zh/decentralized-ai/', bucket: 'product' },
      { id: 'project-guide', title: '项目落地挑战', sidebarTitle: '项目实战指南', link: '/zh/project-guide/', bucket: 'challenge' },
      { id: 'case-studies', title: '真实案例判断', sidebarTitle: '案例分析', link: '/zh/case-studies/', bucket: 'challenge' },
      { id: 'resources', title: '持续学习与更新', sidebarTitle: '学习资源', link: '/zh/resources/', bucket: 'challenge' },
    ],
  },
  en: {
    stages: {
      foundation: 'AI × Web3 Foundations',
      product: 'AI × Web3 Fusion',
      challenge: 'AI × Web3 Challenges',
    },
    branches: {
      ai: 'AI Foundations',
      web3: 'Web3 Foundations',
    },
    sidebar: {
      rootTitle: 'AI Web3 School',
      groups: [
        { bucket: 'foundation-ai', text: 'Part 1: AI Foundations' },
        { bucket: 'foundation-web3', text: 'Part 2: Web3 Foundations' },
        { bucket: 'product', text: 'Part 3: AI × Web3' },
        { bucket: 'challenge', text: 'Part 4: Practice & Resources' },
      ],
    },
    entries: [
      { id: 'ai-fundamentals', title: 'AI Fundamentals', link: '/en/ai-fundamentals/', bucket: 'foundation-ai' },
      { id: 'machine-learning-basics', title: 'Machine Learning Basics', link: '/en/machine-learning-basics/', bucket: 'foundation-ai' },
      { id: 'deep-learning-intro', title: 'Deep Learning Intro', link: '/en/deep-learning-intro/', bucket: 'foundation-ai' },
      { id: 'ai-tools', title: 'AI Tools & Platforms', link: '/en/ai-tools/', bucket: 'foundation-ai' },
      { id: 'blockchain-basics', title: 'Blockchain Basics', link: '/en/blockchain-basics/', bucket: 'foundation-web3' },
      { id: 'smart-contracts', title: 'Smart Contracts', link: '/en/smart-contracts/', bucket: 'foundation-web3' },
      { id: 'defi-intro', title: 'DeFi Intro', link: '/en/defi-intro/', bucket: 'foundation-web3' },
      { id: 'web3-tools', title: 'Web3 Tooling', link: '/en/web3-tools/', bucket: 'foundation-web3' },
      { id: 'ai-agents', title: 'AI Agents on Blockchain', link: '/en/ai-agents/', bucket: 'product' },
      { id: 'ai-defi', title: 'AI + DeFi', link: '/en/ai-defi/', bucket: 'product' },
      { id: 'ai-nft', title: 'AI + NFT', link: '/en/ai-nft/', bucket: 'product' },
      { id: 'decentralized-ai', title: 'Decentralized AI', link: '/en/decentralized-ai/', bucket: 'product' },
      { id: 'project-guide', title: 'Project Execution', sidebarTitle: 'Project Guide', link: '/en/project-guide/', bucket: 'challenge' },
      { id: 'case-studies', title: 'Case Judgment', sidebarTitle: 'Case Studies', link: '/en/case-studies/', bucket: 'challenge' },
      { id: 'resources', title: 'Ongoing Updates', sidebarTitle: 'Resources', link: '/en/resources/', bucket: 'challenge' },
    ],
  },
}

export function getRoadmapEntries(locale: HomeLocale, bucket: RoadmapBucket): HandbookRoadmapEntry[] {
  return handbookRoadmap[locale].entries.filter((entry) => entry.bucket === bucket)
}

export function getSidebarEntries(locale: HomeLocale, bucket: RoadmapBucket) {
  return getRoadmapEntries(locale, bucket)
    .filter((entry) => entry.showInSidebar !== false && entry.link)
    .map((entry) => ({
      text: entry.sidebarTitle ?? entry.title,
      link: entry.link as string,
    }))
}
