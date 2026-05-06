/**
 * Roadmap Playground · 数据 Schema
 * ─────────────────────────────────────────────────────────────────
 * 本文件只描述 WHAT（内容），不描述 HOW（布局/样式）。
 * 所有视觉规则（节点宽、间距、配色、连线类型、hover 效果等）都已
 * 在 RoadmapPlayground.vue 中固化，更新本文件不会影响排版规则。
 *
 * 已固化的布局规则（仅供参考，不要在数据里覆盖）：
 *   • 节点宽 220 / sub-card 宽 260 (top) / 280 (fusion)
 *   • AI 全部 sub-card 留在画布左半区，Web3 全部 sub-card 留在右半区
 *     - 在各自半区内，sub-card 按节点 index 自动左右交替挂在主列两侧
 *     - 主线保持紧凑固定节奏；sub-card 在各自 lane 内有空就向上贴合，只避免同 lane 重叠
 *   • 融合 card 自动排成 4 列，中线左右各 2 列；每列向上贴合，只避免同列重叠
 *   • Hackathon tracks 列等宽（250px）等距（28px gap）
 *   • 主节点的 link 会让节点亮起、cursor 变 pointer，并新窗口打开
 *   • sub-card item 的 link 同上，作用范围限于 item 本身
 *
 * 添加 / 删除节点 / card / 分支列时，layout 会自动按规则重排，
 * 无需修改 RoadmapPlayground.vue。
 */

export interface RoadmapItem {
  title: string
  link?: string
}

/** 单张 sub-card：一个 title + 一组 items */
export interface RoadmapSubCard {
  title: string
  items: RoadmapItem[]
}

/** 主节点：一个 group / topic 节点，可带一张 sub-card */
export interface RoadmapMainNode {
  /** 唯一 id，用于内部连边 */
  id: string
  title: string
  /** 点击节点后新窗口打开的链接 */
  link?: string
  /** 可选的旁挂 sub-card（按所在列的固定方向排列） */
  subCard?: RoadmapSubCard
}

/** 顶部主线列（AI / Web3 任一） */
export interface RoadmapTopColumn {
  /** 列上方 label 文本 */
  label: string
  /** 主线节点，自上而下 */
  nodes: RoadmapMainNode[]
}

/** 中间融合 section：N 张 card 平行排列，与主线无连线 */
export interface RoadmapFusionSection {
  label: string
  cards: RoadmapSubCard[]
}

/** 底部 4 路分支中的一列 */
export interface RoadmapSplitColumn {
  label: string
  nodes: RoadmapMainNode[]
}

/** Roadmap 完整数据 */
export interface RoadmapData {
  /** 顶部左列（tone 固定 ai） */
  topLeft: RoadmapTopColumn
  /** 顶部右列（tone 固定 web3） */
  topRight: RoadmapTopColumn
  /** 中间融合 section */
  fusion: RoadmapFusionSection
  /** 底部 N 路分支（推荐 3-5 列） */
  splits: RoadmapSplitColumn[]
}

const DEMO_LINK = '/zh/part1/'

export const playgroundRoadmap: RoadmapData = {
  topLeft: {
    label: 'AI',
    nodes: [
      {
        id: 'A1',
        title: 'LLM',
        link: DEMO_LINK,
        subCard: {
          title: 'LLM',
          items: [
            { title: 'Token', link: DEMO_LINK },
            { title: 'Embedding', link: DEMO_LINK },
            { title: 'Transformer', link: DEMO_LINK },
            { title: 'Hallucination', link: DEMO_LINK },
            { title: 'Multimodal', link: DEMO_LINK },
          ],
        },
      },
      {
        id: 'A2',
        title: 'Prompt',
        link: DEMO_LINK,
        subCard: {
          title: 'Prompt',
          items: [
            { title: 'Instruction', link: DEMO_LINK },
            { title: 'Few-shot', link: DEMO_LINK },
            { title: 'Structured Output', link: DEMO_LINK },
            { title: 'Prompt Injection', link: DEMO_LINK },
          ],
        },
      },
      {
        id: 'A3',
        title: 'Context',
        link: DEMO_LINK,
        subCard: {
          title: 'Context',
          items: [
            { title: 'Context Window', link: DEMO_LINK },
            { title: 'Context Engineering', link: DEMO_LINK },
            { title: 'Memory', link: DEMO_LINK },
            { title: 'Knowledge Base', link: DEMO_LINK },
          ],
        },
      },
      {
        id: 'A4',
        title: 'RAG',
        link: DEMO_LINK,
        subCard: {
          title: 'RAG',
          items: [
            { title: 'Chunking', link: DEMO_LINK },
            { title: 'Vector DB', link: DEMO_LINK },
            { title: 'Retriever', link: DEMO_LINK },
            { title: 'Rerank', link: DEMO_LINK },
            { title: 'Citation', link: DEMO_LINK },
          ],
        },
      },
      {
        id: 'A5',
        title: 'Agent',
        link: DEMO_LINK,
        subCard: {
          title: 'Agent',
          items: [
            { title: 'Tool Use', link: DEMO_LINK },
            { title: 'Planning', link: DEMO_LINK },
            { title: 'State', link: DEMO_LINK },
            { title: 'Reflection', link: DEMO_LINK },
            { title: 'Multi-Agent', link: DEMO_LINK },
          ],
        },
      },
      {
        id: 'A6',
        title: 'Frameworks',
        link: DEMO_LINK,
        subCard: {
          title: 'Frameworks',
          items: [
            { title: 'LangChain', link: DEMO_LINK },
            { title: 'LangGraph', link: DEMO_LINK },
            { title: 'OpenAI Agents SDK', link: DEMO_LINK },
            { title: 'DSPy', link: DEMO_LINK },
            { title: 'Hermes', link: DEMO_LINK },
            { title: 'Learning Agent', link: DEMO_LINK },
          ],
        },
      },
      {
        id: 'A7',
        title: 'Vibe Coding',
        link: DEMO_LINK,
        subCard: {
          title: 'Vibe Coding',
          items: [
            { title: 'Vibe Coding', link: DEMO_LINK },
            { title: 'Claude Code / Codex CLI', link: DEMO_LINK },
            { title: 'Model / API Config', link: DEMO_LINK },
            { title: 'GitHub / gh', link: DEMO_LINK },
            { title: 'CLI / Script', link: DEMO_LINK },
            { title: 'Repo Workflow', link: DEMO_LINK },
          ],
        },
      },
      {
        id: 'A8',
        title: 'MCP',
        link: DEMO_LINK,
        subCard: {
          title: 'MCP',
          items: [
            { title: 'Server', link: DEMO_LINK },
            { title: 'Client', link: DEMO_LINK },
            { title: 'Tool Schema', link: DEMO_LINK },
            { title: 'Permission', link: DEMO_LINK },
          ],
        },
      },
      {
        id: 'A9',
        title: 'Evaluation',
        link: DEMO_LINK,
        subCard: {
          title: 'Evaluation',
          items: [
            { title: 'Harness', link: DEMO_LINK },
            { title: 'Golden Set', link: DEMO_LINK },
            { title: 'LLM-as-Judge', link: DEMO_LINK },
            { title: 'Regression', link: DEMO_LINK },
            { title: 'Observability', link: DEMO_LINK },
          ],
        },
      },
      {
        id: 'A10',
        title: 'Fine-tuning',
        link: DEMO_LINK,
        subCard: {
          title: 'Fine-tuning',
          items: [
            { title: 'SFT', link: DEMO_LINK },
            { title: 'LoRA', link: DEMO_LINK },
            { title: 'PEFT', link: DEMO_LINK },
            { title: 'Dataset', link: DEMO_LINK },
            { title: 'Overfitting', link: DEMO_LINK },
          ],
        },
      },
      {
        id: 'A11',
        title: 'Inference',
        link: DEMO_LINK,
        subCard: {
          title: 'Inference',
          items: [
            { title: 'API Model', link: DEMO_LINK },
            { title: 'Local Model', link: DEMO_LINK },
            { title: 'Quantization', link: DEMO_LINK },
            { title: 'Serving', link: DEMO_LINK },
          ],
        },
      },
    ],
  },
  topRight: {
    label: 'Web3',
    nodes: [
      {
        id: 'B1',
        title: 'Cryptography',
        link: DEMO_LINK,
        subCard: {
          title: 'Cryptography',
          items: [
            { title: 'Hash', link: DEMO_LINK },
            { title: 'Public Key', link: DEMO_LINK },
            { title: 'Private Key', link: DEMO_LINK },
            { title: 'Signature', link: DEMO_LINK },
            { title: 'Merkle Tree', link: DEMO_LINK },
          ],
        },
      },
      {
        id: 'B2',
        title: 'Wallet',
        link: DEMO_LINK,
        subCard: {
          title: 'Wallet',
          items: [
            { title: 'EOA', link: DEMO_LINK },
            { title: 'Mnemonic', link: DEMO_LINK },
            { title: 'Transaction', link: DEMO_LINK },
            { title: 'Gas', link: DEMO_LINK },
            { title: 'Explorer', link: DEMO_LINK },
          ],
        },
      },
      {
        id: 'B3',
        title: 'Smart Contract',
        link: DEMO_LINK,
        subCard: {
          title: 'Smart Contract',
          items: [
            { title: 'Solidity', link: DEMO_LINK },
            { title: 'EVM', link: DEMO_LINK },
            { title: 'ABI', link: DEMO_LINK },
            { title: 'Event', link: DEMO_LINK },
            { title: 'Upgrade', link: DEMO_LINK },
          ],
        },
      },
      {
        id: 'B4',
        title: 'Dev Stack',
        link: DEMO_LINK,
        subCard: {
          title: 'Dev Stack',
          items: [
            { title: 'Remix', link: DEMO_LINK },
            { title: 'Hardhat', link: DEMO_LINK },
            { title: 'Foundry', link: DEMO_LINK },
            { title: 'OpenZeppelin', link: DEMO_LINK },
            { title: 'viem / wagmi', link: DEMO_LINK },
          ],
        },
      },
      {
        id: 'B5',
        title: 'Network',
        link: DEMO_LINK,
        subCard: {
          title: 'Network',
          items: [
            { title: 'Block', link: DEMO_LINK },
            { title: 'Consensus', link: DEMO_LINK },
            { title: 'PoS', link: DEMO_LINK },
            { title: 'Testnet', link: DEMO_LINK },
            { title: 'L2', link: DEMO_LINK },
            { title: 'Rollup', link: DEMO_LINK },
          ],
        },
      },
      {
        id: 'B6',
        title: 'Account Abstraction',
        link: DEMO_LINK,
        subCard: {
          title: 'Account Abstraction',
          items: [
            { title: 'ERC-4337', link: DEMO_LINK },
            { title: 'Smart Account', link: DEMO_LINK },
            { title: 'Bundler', link: DEMO_LINK },
            { title: 'Paymaster', link: DEMO_LINK },
            { title: 'Session Key', link: DEMO_LINK },
          ],
        },
      },
      {
        id: 'B7',
        title: 'DeFi',
        link: DEMO_LINK,
        subCard: {
          title: 'DeFi',
          items: [
            { title: 'Token', link: DEMO_LINK },
            { title: 'AMM', link: DEMO_LINK },
            { title: 'Lending', link: DEMO_LINK },
            { title: 'Stablecoin', link: DEMO_LINK },
            { title: 'Liquidity', link: DEMO_LINK },
          ],
        },
      },
      {
        id: 'B8',
        title: 'Oracle',
        link: DEMO_LINK,
        subCard: {
          title: 'Oracle',
          items: [
            { title: 'Price Feed', link: DEMO_LINK },
            { title: 'Data Feed', link: DEMO_LINK },
            { title: 'Oracle Risk', link: DEMO_LINK },
            { title: 'AI Oracle', link: DEMO_LINK },
          ],
        },
      },
      {
        id: 'B9',
        title: 'Indexing',
        link: DEMO_LINK,
        subCard: {
          title: 'Indexing',
          items: [
            { title: 'Event Indexing', link: DEMO_LINK },
            { title: 'Subgraph', link: DEMO_LINK },
            { title: 'RPC', link: DEMO_LINK },
            { title: 'Data Pipeline', link: DEMO_LINK },
          ],
        },
      },
      {
        id: 'B10',
        title: 'Security',
        link: DEMO_LINK,
        subCard: {
          title: 'Security',
          items: [
            { title: 'Reentrancy', link: DEMO_LINK },
            { title: 'Access Control', link: DEMO_LINK },
            { title: 'Audit', link: DEMO_LINK },
            { title: 'Simulation', link: DEMO_LINK },
            { title: 'Monitoring', link: DEMO_LINK },
          ],
        },
      },
    ],
  },
  fusion: {
    label: 'AI × Web3 Bridge',
    cards: [
      {
        title: 'Chain-aware Context',
        items: [
          { title: 'On-chain Data', link: DEMO_LINK },
          { title: 'Contract Docs', link: DEMO_LINK },
          { title: 'ABI / Event', link: DEMO_LINK },
          { title: 'Transaction History', link: DEMO_LINK },
          { title: 'Explorer Context', link: DEMO_LINK },
          { title: 'Indexing Context', link: DEMO_LINK },
          { title: 'Citation', link: DEMO_LINK },
        ],
      },
      {
        title: 'Web3 Tool Use',
        items: [
          { title: 'RPC Tool', link: DEMO_LINK },
          { title: 'Contract Read', link: DEMO_LINK },
          { title: 'Contract Write', link: DEMO_LINK },
          { title: 'Wallet Tool', link: DEMO_LINK },
          { title: 'Explorer Tool', link: DEMO_LINK },
          { title: 'DeFi Tool', link: DEMO_LINK },
          { title: 'Tool Permission', link: DEMO_LINK },
          { title: 'Tool Log', link: DEMO_LINK },
        ],
      },
      {
        title: 'Agent Workflow',
        items: [
          { title: 'Task Graph', link: DEMO_LINK },
          { title: 'State Machine', link: DEMO_LINK },
          { title: 'Human-in-the-loop', link: DEMO_LINK },
          { title: 'Retry / Fallback', link: DEMO_LINK },
          { title: 'Trace', link: DEMO_LINK },
          { title: 'Evaluation Harness', link: DEMO_LINK },
          { title: 'Regression Set', link: DEMO_LINK },
        ],
      },
      {
        title: 'Agent Wallet',
        items: [
          { title: 'AA Wallet', link: DEMO_LINK },
          { title: 'Smart Account', link: DEMO_LINK },
          { title: 'Safe', link: DEMO_LINK },
          { title: 'Session Key', link: DEMO_LINK },
          { title: 'Policy', link: DEMO_LINK },
          { title: 'Guard', link: DEMO_LINK },
          { title: 'Simulation', link: DEMO_LINK },
          { title: 'Revocation', link: DEMO_LINK },
          { title: 'Human Check', link: DEMO_LINK },
        ],
      },
      {
        title: 'Machine Payment',
        items: [
          { title: 'Stablecoin Payment', link: DEMO_LINK },
          { title: 'Budget', link: DEMO_LINK },
          { title: 'Quote', link: DEMO_LINK },
          { title: 'Payment Intent', link: DEMO_LINK },
          { title: 'x402', link: DEMO_LINK },
          { title: 'MPP', link: DEMO_LINK },
          { title: 'Subscription', link: DEMO_LINK },
          { title: 'Micropayment', link: DEMO_LINK },
        ],
      },
      {
        title: 'Settlement & Escrow',
        items: [
          { title: 'Escrow', link: DEMO_LINK },
          { title: 'Receipt', link: DEMO_LINK },
          { title: 'Delivery Proof', link: DEMO_LINK },
          { title: 'Acceptance', link: DEMO_LINK },
          { title: 'Refund', link: DEMO_LINK },
          { title: 'Dispute', link: DEMO_LINK },
          { title: 'Evaluator', link: DEMO_LINK },
          { title: 'ERC-8183', link: DEMO_LINK },
        ],
      },
      {
        title: 'Agent Identity',
        items: [
          { title: 'Agent Profile', link: DEMO_LINK },
          { title: 'Capability', link: DEMO_LINK },
          { title: 'Service Endpoint', link: DEMO_LINK },
          { title: 'Registry', link: DEMO_LINK },
          { title: 'DID / VC', link: DEMO_LINK },
          { title: 'A2A', link: DEMO_LINK },
          { title: 'Ownership', link: DEMO_LINK },
        ],
      },
      {
        title: 'Agent Trust & Reputation',
        items: [
          { title: 'Reputation', link: DEMO_LINK },
          { title: 'Review', link: DEMO_LINK },
          { title: 'Attestation', link: DEMO_LINK },
          { title: 'Stake', link: DEMO_LINK },
          { title: 'Slashing', link: DEMO_LINK },
          { title: 'Validation', link: DEMO_LINK },
          { title: 'ERC-8004', link: DEMO_LINK },
        ],
      },
      {
        title: 'AI Oracle',
        items: [
          { title: 'AI Output', link: DEMO_LINK },
          { title: 'Data Feed', link: DEMO_LINK },
          { title: 'Model Result', link: DEMO_LINK },
          { title: 'Oracle Risk', link: DEMO_LINK },
          { title: 'Attestation', link: DEMO_LINK },
          { title: 'Proof of Inference', link: DEMO_LINK },
          { title: 'Dispute / Challenge', link: DEMO_LINK },
        ],
      },
      {
        title: 'Verifiable AI',
        items: [
          { title: 'TEE', link: DEMO_LINK },
          { title: 'ZK', link: DEMO_LINK },
          { title: 'zkML', link: DEMO_LINK },
          { title: 'Proof of Inference', link: DEMO_LINK },
          { title: 'Verifiable Compute', link: DEMO_LINK },
          { title: 'Benchmark', link: DEMO_LINK },
          { title: 'Audit Trail', link: DEMO_LINK },
        ],
      },
      {
        title: 'AI Security',
        items: [
          { title: 'Prompt Injection', link: DEMO_LINK },
          { title: 'Tool Abuse', link: DEMO_LINK },
          { title: 'Malicious Context', link: DEMO_LINK },
          { title: 'Key Safety', link: DEMO_LINK },
          { title: 'Permission Isolation', link: DEMO_LINK },
          { title: 'Sandbox', link: DEMO_LINK },
          { title: 'Audit Log', link: DEMO_LINK },
          { title: 'Alert', link: DEMO_LINK },
        ],
      },
      {
        title: 'AI Privacy',
        items: [
          { title: 'Data Boundary', link: DEMO_LINK },
          { title: 'Local AI', link: DEMO_LINK },
          { title: 'Private Memory', link: DEMO_LINK },
          { title: 'Secret Management', link: DEMO_LINK },
          { title: 'Minimal Disclosure', link: DEMO_LINK },
          { title: 'Encrypted Data', link: DEMO_LINK },
          { title: 'User Consent', link: DEMO_LINK },
        ],
      },
      {
        title: 'AI Sovereignty',
        items: [
          { title: 'User Control', link: DEMO_LINK },
          { title: 'Data Portability', link: DEMO_LINK },
          { title: 'Model Choice', link: DEMO_LINK },
          { title: 'Local-first AI', link: DEMO_LINK },
          { title: 'Censorship Resistance', link: DEMO_LINK },
          { title: 'd/acc', link: DEMO_LINK },
          { title: 'CROPS', link: DEMO_LINK },
        ],
      },
      {
        title: 'Governance AI',
        items: [
          { title: 'Proposal Summary', link: DEMO_LINK },
          { title: 'Meeting Action', link: DEMO_LINK },
          { title: 'Contribution Graph', link: DEMO_LINK },
          { title: 'Budget Check', link: DEMO_LINK },
          { title: 'Source Traceability', link: DEMO_LINK },
          { title: 'Deep Funding', link: DEMO_LINK },
          { title: 'Plurality', link: DEMO_LINK },
        ],
      },
      {
        title: 'Decentralized AI',
        items: [
          { title: 'Model Market', link: DEMO_LINK },
          { title: 'Data Market', link: DEMO_LINK },
          { title: 'Compute Market', link: DEMO_LINK },
          { title: 'Inference Network', link: DEMO_LINK },
          { title: 'Model Routing', link: DEMO_LINK },
          { title: 'Quality Benchmark', link: DEMO_LINK },
          { title: 'Settlement', link: DEMO_LINK },
        ],
      },
    ],
  },
  splits: [
    {
      label: 'Agentic Commerce',
      nodes: [
        { id: 'S1-1', title: 'Agents Purchasing APIs', link: DEMO_LINK },
        { id: 'S1-2', title: 'Payment Intent', link: DEMO_LINK },
        { id: 'S1-3', title: 'Budget Control', link: DEMO_LINK },
        { id: 'S1-4', title: 'Proof of Task Completion', link: DEMO_LINK },
        { id: 'S1-5', title: 'On-chain Receipt', link: DEMO_LINK },
        { id: 'S1-6', title: 'Escrow Flow', link: DEMO_LINK },
      ],
    },
    {
      label: 'Dev Tooling',
      nodes: [
        { id: 'S2-1', title: 'Docs-to-Agent', link: DEMO_LINK },
        { id: 'S2-2', title: 'Contract Reading Assistant', link: DEMO_LINK },
        { id: 'S2-3', title: 'Transaction Interpreter', link: DEMO_LINK },
        { id: 'S2-4', title: 'Test Generator', link: DEMO_LINK },
        { id: 'S2-5', title: 'Deployment Checklist', link: DEMO_LINK },
        { id: 'S2-6', title: 'SDK Integration Assistant', link: DEMO_LINK },
      ],
    },
    {
      label: 'Wallet / Permission',
      nodes: [
        { id: 'S3-1', title: 'AI Wallet UX', link: DEMO_LINK },
        { id: 'S3-2', title: 'Permission Policy', link: DEMO_LINK },
        { id: 'S3-3', title: 'Session Key Flow', link: DEMO_LINK },
        { id: 'S3-4', title: 'Safe Guard', link: DEMO_LINK },
        { id: 'S3-5', title: 'ERC-4337 Workflow', link: DEMO_LINK },
        { id: 'S3-6', title: 'Pre-transaction Simulation', link: DEMO_LINK },
        { id: 'S3-7', title: 'Recovery / Revocation', link: DEMO_LINK },
      ],
    },
    {
      label: 'AI Security',
      nodes: [
        { id: 'S4-1', title: 'Agent Threat Model', link: DEMO_LINK },
        { id: 'S4-2', title: 'Prompt Injection Defense', link: DEMO_LINK },
        { id: 'S4-3', title: 'Tool Permission Isolation', link: DEMO_LINK },
        { id: 'S4-4', title: 'Malicious Document Demo', link: DEMO_LINK },
        { id: 'S4-5', title: 'Key / Secret Isolation', link: DEMO_LINK },
        { id: 'S4-6', title: 'Privacy-preserving Workflow', link: DEMO_LINK },
        { id: 'S4-7', title: 'AI Behavior Audit', link: DEMO_LINK },
      ],
    },
    {
      label: 'Governance',
      nodes: [
        { id: 'S5-1', title: 'Proposal Summarizer', link: DEMO_LINK },
        { id: 'S5-2', title: 'Meeting-to-Action Workflow', link: DEMO_LINK },
        { id: 'S5-3', title: 'Contribution Tracker', link: DEMO_LINK },
        { id: 'S5-4', title: 'Budget Checklist', link: DEMO_LINK },
        { id: 'S5-5', title: 'Public-goods Impact Dashboard', link: DEMO_LINK },
        { id: 'S5-6', title: 'Source-preserving Summary', link: DEMO_LINK },
      ],
    },
    {
      label: 'Open Track',
      nodes: [
        { id: 'S6-1', title: 'AI-native Wallet', link: DEMO_LINK },
        { id: 'S6-2', title: 'Creator / Content Collaboration', link: DEMO_LINK },
        { id: 'S6-3', title: 'On-chain Data Analysis Agent', link: DEMO_LINK },
        { id: 'S6-4', title: 'Cross-track Combination', link: DEMO_LINK },
        { id: 'S6-5', title: 'New Protocol / New Scenario', link: DEMO_LINK },
        { id: 'S6-6', title: 'Research Visualization', link: DEMO_LINK },
      ],
    },
  ],
}
