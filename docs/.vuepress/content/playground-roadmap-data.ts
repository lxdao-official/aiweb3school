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
 *   • Hackathon tracks 渲染为 6 张 sub-card，等宽（250px）等距（28px gap）
 *   • 主节点的 link 会让节点亮起、cursor 变 pointer，并新窗口打开
 *   • sub-card item 的 link 同上，作用范围限于 item 本身
 *
 * 添加 / 删除节点 / card / 分支列时，layout 会自动按规则重排，
 * 无需修改 RoadmapPlayground.vue。
 */

export interface RoadmapItem {
  title: string
  link?: string
  description?: string
}

/** 单张 sub-card：一个 title + 一组 items */
export interface RoadmapSubCard {
  title: string
  description?: string
  items: RoadmapItem[]
}

/** 主节点：一个 group / topic 节点，可带一张 sub-card */
export interface RoadmapMainNode {
  /** 唯一 id，用于内部连边 */
  id: string
  title: string
  /** 点击节点后新窗口打开的链接 */
  link?: string
  description?: string
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

const roadmapDescriptions: Record<string, string> = {
  AI: 'AI 基础层建立模型、上下文、工具调用和评估的共同词汇。',
  Web3: 'Web3 基础层建立钱包、合约、网络、数据和安全的共同词汇。',
  'AI × Web3 Bridge': '交叉领域层解释 AI agent 如何读取链上上下文、调用工具、管理权限并完成结算。',
  'Frontier Directions': '前沿方向面向 demo、产品原型、黑客松赛道和开放研究。',
  LLM: '大语言模型是 prompt、RAG、agent 和 evaluation 的共同基础。',
  Prompt: 'Prompt 用语言约束模型行为，是低成本但脆弱的控制方式。',
  Context: 'Context 决定模型能看见什么，以及信息如何组织、裁剪和保留。',
  RAG: 'RAG 通过检索外部知识降低幻觉，并让回答更可溯源。',
  Agent: 'Agent 让模型从回答问题进入多步执行，但需要边界、日志和失败恢复。',
  Frameworks: 'Frameworks 把模型、工具、状态和执行流组织成可维护的 AI 应用。',
  'Vibe Coding': 'Vibe Coding 用 coding agent 快速把想法做成可运行 demo。',
  MCP: 'MCP 用标准接口连接 agent 与外部工具、数据和系统。',
  Evaluation: 'Evaluation 判断 AI 系统是否可靠，而不只是 demo 能否跑通。',
  'Fine-tuning': 'Fine-tuning 用数据适配模型能力或风格，但不应作为默认解法。',
  Inference: 'Inference 决定模型部署、调用、成本、延迟和稳定性。',
  Cryptography: 'Cryptography 是账户、签名、哈希和证明系统的底层基础。',
  Wallet: 'Wallet 是用户进入链上世界的入口，也是权限、安全和 UX 的交汇点。',
  'Smart Contract': 'Smart Contract 是链上程序，公开状态和不可逆执行带来新的工程约束。',
  'Dev Stack': 'Dev Stack 覆盖 Web3 开发、测试、部署和前端交互工具链。',
  Network: 'Network 解释链如何确认状态，以及主网、测试网和 L2 如何分工。',
  'Account Abstraction': 'Account Abstraction 让账户具备可编程权限、恢复和自动化能力。',
  DeFi: 'DeFi 用智能合约组织开放金融活动，是支付和结算的重要背景。',
  Oracle: 'Oracle 把链下数据带到链上，也带来数据可信度和操纵风险。',
  Indexing: 'Indexing 把链上数据整理成应用、dashboard 和 agent 可用的数据层。',
  Security: 'Security 是链上系统的默认前提，关系到资产、权限和不可逆执行。',
  'Chain-aware Context': 'Chain-aware Context 让 AI 能理解链上状态、交易、事件和合约上下文。',
  'Web3 Tool Use': 'Web3 Tool Use 让 agent 调用链上工具，但必须限制范围并记录日志。',
  'Agent Workflow': 'Agent Workflow 把规划、状态和工具调用组织成可复查流程。',
  'Agent Wallet': 'Agent Wallet 处理 AI 接触钱包、签名和链上动作时的权限边界。',
  'Machine Payment': 'Machine Payment 支持 agent、机器或自动化系统进行支付和购买服务。',
  'Settlement & Escrow': 'Settlement & Escrow 处理交付、验收、争议和付款释放。',
  'Agent Identity': 'Agent Identity 让 agent 能被发现、描述、调用和验证。',
  'Agent Trust & Reputation': 'Agent Trust & Reputation 让历史表现和验证结果成为可使用的信任信号。',
  'AI Oracle': 'AI Oracle 把 AI 输出或链下判断接入链上系统，需要处理验证和争议。',
  'Verifiable AI': 'Verifiable AI 让 AI 相关计算、数据或执行过程具备可验证性。',
  'AI Security': 'AI Security 关注模型具备工具调用和链上执行能力后的新攻击面。',
  'AI Privacy': 'AI Privacy 管理用户数据、私密上下文和敏感凭证的使用边界。',
  'AI Sovereignty': 'AI Sovereignty 关注个人控制、可迁移性、抗审查和本地优先。',
  'Governance AI': 'Governance AI 用 AI 辅助 DAO、公共物品和开放协作，但不替代治理判断。',
  'Decentralized AI': 'Decentralized AI 把模型、数据、算力、推理和市场机制放入开放网络。',
  'Agentic Commerce': 'Agentic Commerce 关注 agent 购买服务、支付、交付证明和结算闭环。',
  'Dev Tooling': 'Dev Tooling 关注合约理解、自动测试、文档到 agent 和开发工作流。',
  'Wallet / Permission': 'Wallet / Permission 关注 AI 钱包、权限策略、交易模拟和安全执行。',
  Governance: 'Governance 关注 DAO、公共物品、会议行动和贡献追踪。',
  'Open Track': 'Open Track 保留跨赛道组合、新协议和开放研究方向。',
  Token: 'Token 是模型文本处理的基本单位，也会影响成本和上下文长度。',
  Embedding: 'Embedding 把文本或对象转为向量，用于语义搜索和相似度匹配。',
  Transformer: 'Transformer 是现代 LLM 的核心架构，依靠注意力处理上下文关系。',
  Hallucination: 'Hallucination 指模型生成无依据或不可靠内容的现象。',
  'Prompt Injection': 'Prompt Injection 是恶意或冲突指令劫持模型行为的关键风险。',
  'Context Window': 'Context Window 是模型一次可读取的信息范围。',
  'Tool Use': 'Tool Use 让模型调用 API、脚本或外部系统进入实际执行。',
  'Tool Permission': 'Tool Permission 定义工具可用范围、额度和审批条件。',
  'Session Key': 'Session Key 是有时间、额度或动作限制的临时授权密钥。',
  Simulation: 'Simulation 在执行前预演交易结果，帮助发现失败、权限和资产风险。',
  'Proof of Inference': 'Proof of Inference 用来证明某次模型推理过程或结果来源。',
  'Permission Isolation': 'Permission Isolation 隔离工具、账户和数据权限，降低失控影响。',
}

export function describeRoadmapTitle(title: string): string {
  return roadmapDescriptions[title]
    ?? `${title} 是 AI × Web3 roadmap 中的关键主题，用于定位课程内容、工具能力或项目方向。`
}

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
