export type HomeLocale = 'zh' | 'en'

export const homeI18n = {
  zh: {
    roadmap: {
      intro: {
        stageTag: '问题定义层',
        centerTitle: 'AI × Web3 问题空间',
        centerLabel: 'Problem Space',
        columns: [
          {
            title: '为什么会有 AI × Web3',
            items: ['AI 的执行边界', '开放网络协作', '真实任务与责任'],
          },
          {
            title: '核心张力',
            items: ['自动化与可控性', '开放性与安全性', '执行与授权', '效率与验证'],
          },
          {
            title: '分析框架',
            items: ['谁参与', '谁执行', '谁支付', '谁验证', '谁担风险'],
          },
        ],
      },
      foundation: {
        stageTag: '基础能力层',
        centerTitle: 'AI / Web3 双侧能力',
        centerLabel: 'Foundation',
        leftTitle: 'AI 系统基础',
        leftGroups: [
          {
            title: 'LLM 基础',
            items: ['上下文', '提示词', '工具调用', '不确定性'],
          },
          {
            title: '系统演进',
            items: ['Prompt', 'Workflow', 'Harness', 'Agent'],
          },
          {
            title: '可控性',
            items: ['微调与适配', 'Guardrails', 'Tracing', '人工确认'],
          },
        ],
        rightTitle: 'Web3 系统基础',
        rightGroups: [
          {
            title: '账户与钱包',
            items: ['账户与地址', '钱包', '签名', '授权'],
          },
          {
            title: '链上执行',
            items: ['交易', 'Gas', '智能合约', '状态变化'],
          },
          {
            title: '权限结构',
            items: ['EOA', '智能账户', '多签', '账户抽象'],
          },
        ],
      },
      core: {
        stageTag: '交叉领域',
        centerTitle: 'AI × Web3 交叉问题域',
        centerLabel: 'Core',
        clusters: [
          { title: '支付与结算', items: ['Agent Payment', 'Escrow / Receipt', 'Delivery Proof', 'Settlement'] },
          { title: '身份与能力', items: ['Identity', 'Capability', 'Reputation', 'Registry'] },
          { title: '协作与接口', items: ['MCP', 'A2A', 'ERC-8004', '链上 / 链下协同'] },
          { title: '开发与基础设施', items: ['Dev Tooling', 'AI for Web3', 'Web3 for AI', 'Context Systems'] },
        ],
      },
      support: {
        stageTag: '信任与标准',
        centerLabel: 'Trust Layer',
        columns: [
          {
            title: 'Safe Execution',
            items: ['Policy', 'Budget', 'Allowlist', 'Human-in-the-loop'],
          },
          {
            title: 'Security',
            items: ['Prompt Injection', 'Tool Abuse', 'Key Management', 'Contract Risk'],
          },
          {
            title: '标准 / 协议参与',
            items: ['MCP / A2A', 'ERC-4337', 'ERC-8004 / ERC-8183', '如何参与标准'],
          },
        ],
      },
      frontier: {
        stageTag: '前沿方向与开放问题',
        centerLabel: 'Frontier',
        columns: [
          {
            title: 'Frontier Themes',
            items: ['Agentic Commerce', 'AI-native Wallet', 'Permission Systems', 'Protocol Design'],
          },
          {
            title: '为什么还不成熟',
            items: ['缺标准', '缺安全前提', '缺需求密度', '缺验证路径'],
          },
          {
            title: 'Open Questions',
            items: ['Coordination', 'Verifiability', 'Trust', 'Incentives'],
          },
        ],
      },
      practice: {
        stageTag: '实践赛道',
        centerTitle: '从最小 Demo 到 Hackathon',
        centerLabel: 'Build',
        projects: ['交易解释器 / 合约 Copilot', 'Agent Payment / Escrow', 'AI-native Wallet / Policy Engine', 'MCP / A2A / Protocol Prototype'],
      },
      appendix: {
        stageTag: '案例、术语与索引',
        centerLabel: 'Appendix',
        columns: [
          {
            title: '典型案例',
            items: ['Payment Case', 'Safe Execution Case', 'Protocol Interface Case'],
          },
          {
            title: '参考索引',
            items: ['官方文档', '标准协议', 'Reference Implementations'],
          },
        ],
      },
    },
    signup: {
      boardTitle: '共学营',
      title: 'AI x Web3 共学营',
      cta: '报名',
      href: '/zh/',
    },
    sponsors: {
      title: '合作伙伴',
      ariaLabel: '合作伙伴 Logo 占位',
    },
  },
  en: {
    roadmap: {
      intro: {
        stageTag: 'Problem Layer',
        centerTitle: 'AI × Web3 Problem Space',
        centerLabel: 'Problem Space',
        columns: [
          {
            title: 'Why AI × Web3',
            items: ['Execution Boundaries of AI', 'Open Network Coordination', 'Real Tasks & Responsibility'],
          },
          {
            title: 'Core Tensions',
            items: ['Automation & Control', 'Openness & Security', 'Execution & Authorization', 'Efficiency & Verification'],
          },
          {
            title: 'Analysis Framework',
            items: ['Who participates', 'Who executes', 'Who pays', 'Who verifies', 'Who bears risk'],
          },
        ],
      },
      foundation: {
        stageTag: 'Foundation Layer',
        centerTitle: 'AI / Web3 Dual Foundations',
        centerLabel: 'Foundation',
        leftTitle: 'AI System Basics',
        leftGroups: [
          {
            title: 'LLM Basics',
            items: ['Context', 'Prompting', 'Tool Calling', 'Uncertainty'],
          },
          {
            title: 'System Evolution',
            items: ['Prompt', 'Workflow', 'Harness', 'Agent'],
          },
          {
            title: 'Controllability',
            items: ['Fine-tuning & Adaptation', 'Guardrails', 'Tracing', 'Human Confirmation'],
          },
        ],
        rightTitle: 'Web3 System Basics',
        rightGroups: [
          {
            title: 'Accounts & Wallets',
            items: ['Accounts & Addresses', 'Wallets', 'Signatures', 'Authorization'],
          },
          {
            title: 'Onchain Execution',
            items: ['Transactions', 'Gas', 'Smart Contracts', 'State Changes'],
          },
          {
            title: 'Permission Structure',
            items: ['EOA', 'Smart Accounts', 'Multisig', 'Account Abstraction'],
          },
        ],
      },
      core: {
        stageTag: 'Cross Domain',
        centerTitle: 'AI × Web3 Problem Domain',
        centerLabel: 'Core',
        clusters: [
          { title: 'Payments & Settlement', items: ['Agent Payment', 'Escrow / Receipt', 'Delivery Proof', 'Settlement'] },
          { title: 'Identity & Capability', items: ['Identity', 'Capability', 'Reputation', 'Registry'] },
          { title: 'Coordination & Interfaces', items: ['MCP', 'A2A', 'ERC-8004', 'Onchain / Offchain Coordination'] },
          { title: 'Development & Infrastructure', items: ['Dev Tooling', 'AI for Web3', 'Web3 for AI', 'Context Systems'] },
        ],
      },
      support: {
        stageTag: 'Trust & Standards',
        centerLabel: 'Trust Layer',
        columns: [
          {
            title: 'Safe Execution',
            items: ['Policy', 'Budget', 'Allowlist', 'Human-in-the-loop'],
          },
          {
            title: 'Security',
            items: ['Prompt Injection', 'Tool Abuse', 'Key Management', 'Contract Risk'],
          },
          {
            title: 'Standards / Participation',
            items: ['MCP / A2A', 'ERC-4337', 'ERC-8004 / ERC-8183', 'How to Join Standards Work'],
          },
        ],
      },
      frontier: {
        stageTag: 'Frontier & Open Questions',
        centerLabel: 'Frontier',
        columns: [
          {
            title: 'Frontier Themes',
            items: ['Agentic Commerce', 'AI-native Wallet', 'Permission Systems', 'Protocol Design'],
          },
          {
            title: 'Why It Is Still Early',
            items: ['Lack of Standards', 'Missing Security Assumptions', 'Lack of Demand Density', 'Missing Validation Paths'],
          },
          {
            title: 'Open Questions',
            items: ['Coordination', 'Verifiability', 'Trust', 'Incentives'],
          },
        ],
      },
      practice: {
        stageTag: 'Practice Tracks',
        centerTitle: 'From Minimum Demo to Hackathon',
        centerLabel: 'Build',
        projects: ['Transaction Explainer / Contract Copilot', 'Agent Payment / Escrow', 'AI-native Wallet / Policy Engine', 'MCP / A2A / Protocol Prototype'],
      },
      appendix: {
        stageTag: 'Cases, Terms & Index',
        centerLabel: 'Appendix',
        columns: [
          {
            title: 'Typical Cases',
            items: ['Payment Case', 'Safe Execution Case', 'Protocol Interface Case'],
          },
          {
            title: 'Reference Index',
            items: ['Official Docs', 'Standards', 'Reference Implementations'],
          },
        ],
      },
    },
    signup: {
      boardTitle: 'Cohort',
      title: 'AI x Web3 Cohort',
      cta: 'Join',
      href: '/en/',
    },
    sponsors: {
      title: 'Partners',
      ariaLabel: 'Partner logo placeholder',
    },
  },
} as const
