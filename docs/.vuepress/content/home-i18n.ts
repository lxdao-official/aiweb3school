export type HomeLocale = 'zh' | 'en'

export const homeI18n = {
  zh: {
    roadmap: {
      stages: [
        {
          stageTag: '基础能力层',
          leftPanelTitle: 'AI 基础',
          leftPanel: ['AI 概念', '机器学习', '深度学习', '工具与安全'],
          centerTop: '基础能力层',
          centerCore: 'AI × Web3 预备知识',
          centerLabel: 'Foundation',
          centerBottom: '融合主轴',
          rightPanelTitle: 'Web3 基础',
          rightPanel: ['区块链', '智能合约', 'DeFi', 'Web3 工具', 'EIP 基础'],
        },
        {
          stageTag: '融合主轴',
          leftPanelTitle: '核心方向',
          leftPanel: ['AI Agent', 'AI + DeFi', 'AI + NFT', '去中心化 AI'],
          centerTop: '融合主轴',
          centerCore: 'AI × Web3 核心路线',
          centerLabel: 'Core',
          centerBottom: '开发与交付',
          rightPanelTitle: '四大核心概念',
          rightPanel: ['Agent 商业生态', 'AI 原生钱包', '跨链行动层', '主权 / 隐私 AI'],
        },
        {
          stageTag: '开发与交付',
          leftPanelTitle: '项目过程',
          leftPanel: ['开发基础', '案例拆解', '项目指南', '交付与安全'],
          centerTop: '开发与实战',
          centerCore: '从想法到交付',
          centerLabel: 'Build',
          centerBottom: '项目成果',
          rightPanelTitle: '案例与交付',
          rightPanel: ['治理助手', '理财助手', 'NFT 上链', '项目指南'],
        },
      ],
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
      stages: [
        {
          stageTag: 'Foundation Layer',
          leftPanelTitle: 'AI Foundations',
          leftPanel: ['AI Concepts', 'Machine Learning', 'Deep Learning', 'Tools & Safety'],
          centerTop: 'Foundation Layer',
          centerCore: 'AI × Web3 Prerequisites',
          centerLabel: 'Foundation',
          centerBottom: 'Core Layer',
          rightPanelTitle: 'Web3 Foundations',
          rightPanel: ['Blockchain', 'Smart Contracts', 'DeFi', 'Web3 Tools', 'EIP Basics'],
        },
        {
          stageTag: 'Core Layer',
          leftPanelTitle: 'Core Directions',
          leftPanel: ['AI Agents', 'AI + DeFi', 'AI + NFT', 'Decentralized AI'],
          centerTop: 'Core Layer',
          centerCore: 'AI × Web3 Core Track',
          centerLabel: 'Core',
          centerBottom: 'Build & Ship',
          rightPanelTitle: 'Core Concepts',
          rightPanel: ['Agent Commerce', 'AI-native Wallets', 'Cross-chain Layer', 'Private / Sovereign AI'],
        },
        {
          stageTag: 'Build & Ship',
          leftPanelTitle: 'Build Process',
          leftPanel: ['Dev Basics', 'Case Studies', 'Project Guide', 'Safety & Delivery'],
          centerTop: 'Build & Ship',
          centerCore: 'From Idea to Delivery',
          centerLabel: 'Build',
          centerBottom: 'Outcomes',
          rightPanelTitle: 'Cases & Delivery',
          rightPanel: ['Governance Agent', 'Wealth Assistant', 'AI NFT Minting', 'Project Guide'],
        },
      ],
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
