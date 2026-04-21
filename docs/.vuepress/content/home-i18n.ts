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
