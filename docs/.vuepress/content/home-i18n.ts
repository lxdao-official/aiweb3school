export type HomeLocale = 'zh' | 'en'

export const homeI18n = {
  zh: {
    roadmap: {
      leftPanelTitle: '核心方向',
      leftPanel: ['AI Agent', 'AI + DeFi', 'AI + NFT', '去中心化 AI'],
      centerTop: '主体模块',
      centerCore: 'AI × Web3 路线图',
      centerLabel: 'AI × Web3',
      centerBottom: '案例与项目',
      rightTopTitle: '四大核心概念',
      rightTopPanel: ['Agent 商业生态', 'AI 原生钱包', '跨链 Agent 行动层', '主权 / 隐私 AI'],
      rightBottomTitle: '落地实践',
      rightBottomPanel: ['链上治理助手', 'AI 理财助手', 'NFT 生成与上链', '项目指南'],
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
      leftPanelTitle: 'Core Directions',
      leftPanel: ['AI Agents', 'AI + DeFi', 'AI + NFT', 'Decentralized AI'],
      centerTop: 'Main Track',
      centerCore: 'AI × Web3 Roadmap',
      centerLabel: 'AI × Web3',
      centerBottom: 'Cases & Projects',
      rightTopTitle: 'Core Concepts',
      rightTopPanel: ['Agent Commerce', 'AI-native Wallets', 'Cross-chain Actions', 'Sovereign / Private AI'],
      rightBottomTitle: 'Applied Practice',
      rightBottomPanel: ['Governance Assistant', 'AI Wealth Assistant', 'AI NFT Minting', 'Project Guide'],
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
