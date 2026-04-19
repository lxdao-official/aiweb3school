export type HomeLocale = 'zh' | 'en'

export const homeI18n = {
  zh: {
    roadmap: {
      intro: {
        stageTag: '问题定义层',
        leftTitle: '在讨论什么',
        leftItems: ['Agent', '支付与结算', '身份与权限', '链上执行', '开放协作'],
        centerTitle: 'AI × Web3 入门地图',
        centerLabel: 'Problem Space',
        rightTitle: '分析框架',
        rightItems: ['谁发起任务', '谁执行', '谁付钱', '谁验收', '谁承担风险'],
      },
      foundation: {
        stageTag: '基础能力层',
        centerTitle: 'AI / Web3 双侧能力',
        centerLabel: 'Foundation',
        leftTitle: 'AI 技术栈',
        leftItems: ['模型原理', '应用形态', '系统组织', '实践工具', '常见误区'],
        rightTitle: 'Web3 技术栈',
        rightItems: ['以太坊协议', '账户与权限', '钱包 / 签名 / 交易', '合约与协议设计', '开发实践'],
      },
      core: {
        stageTag: '交叉领域',
        centerTitle: 'AI × Web3 主轴',
        centerLabel: 'Core',
        clusters: [
          { title: '支付与结算', items: ['x402', 'Receipt', 'Escrow'] },
          { title: '身份与能力', items: ['Agent Identity', 'Capability', 'Reputation'] },
          { title: '协作协议', items: ['MCP', 'A2A', 'Tool Schema'] },
          { title: '开发与产品', items: ['AI for Web3', 'Web3 for AI', 'Agent UX'] },
        ],
      },
      support: {
        stageTag: '信任与标准',
        centerLabel: 'Trust Layer',
        leftTitle: '安全 / 隐私 / 主权',
        leftItems: ['Safe Execution', 'Security', 'CROPS / Privacy', 'Sovereignty'],
        rightTitle: '标准 / 协议参与',
        rightItems: ['MCP / A2A', 'ERC-4337', 'ERC-8004 / ERC-8183', '如何参与标准'],
      },
      practice: {
        stageTag: '实践赛道',
        centerTitle: '从最小 Demo 到 Hackathon',
        centerLabel: 'Build',
        projects: ['交易解释器 / 合约 Copilot', 'Agent Payment / Escrow', 'AI-native Wallet / Policy Engine', 'MCP / A2A / Protocol Prototype'],
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
        leftTitle: 'What Is Being Discussed',
        leftItems: ['Agents', 'Payments & Settlement', 'Identity & Permissions', 'Onchain Execution', 'Open Coordination'],
        centerTitle: 'AI × Web3 Entry Map',
        centerLabel: 'Problem Space',
        rightTitle: 'Analysis Framework',
        rightItems: ['Who starts the task', 'Who executes it', 'Who pays', 'Who verifies', 'Who bears the risk'],
      },
      foundation: {
        stageTag: 'Foundation Layer',
        centerTitle: 'AI / Web3 Dual Foundations',
        centerLabel: 'Foundation',
        leftTitle: 'AI Stack',
        leftItems: ['Model Basics', 'App Shapes', 'System Design', 'Tooling', 'Common Misconceptions'],
        rightTitle: 'Web3 Stack',
        rightItems: ['Ethereum Basics', 'Accounts & Permissions', 'Wallet / Signing / Transactions', 'Contracts & Protocols', 'Dev Practice'],
      },
      core: {
        stageTag: 'Cross Domain',
        centerTitle: 'AI × Web3 Core Track',
        centerLabel: 'Core',
        clusters: [
          { title: 'Payments & Settlement', items: ['x402', 'Receipt', 'Escrow'] },
          { title: 'Identity & Capability', items: ['Agent Identity', 'Capability', 'Reputation'] },
          { title: 'Coordination Protocols', items: ['MCP', 'A2A', 'Tool Schema'] },
          { title: 'Products & Dev', items: ['AI for Web3', 'Web3 for AI', 'Agent UX'] },
        ],
      },
      support: {
        stageTag: 'Trust & Standards',
        centerLabel: 'Trust Layer',
        leftTitle: 'Security / Privacy / Sovereignty',
        leftItems: ['Safe Execution', 'Security', 'CROPS / Privacy', 'Sovereignty'],
        rightTitle: 'Standards / Participation',
        rightItems: ['MCP / A2A', 'ERC-4337', 'ERC-8004 / ERC-8183', 'How to Join Standards Work'],
      },
      practice: {
        stageTag: 'Practice Tracks',
        centerTitle: 'From Minimum Demo to Hackathon',
        centerLabel: 'Build',
        projects: ['Transaction Explainer / Contract Copilot', 'Agent Payment / Escrow', 'AI-native Wallet / Policy Engine', 'MCP / A2A / Protocol Prototype'],
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
