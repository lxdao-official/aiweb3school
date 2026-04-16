export type HomeLocale = 'zh' | 'en'

export const homeI18n = {
  zh: {
    roadmap: {
      leftPanelTitle: 'Web3 基础',
      leftPanel: ['账户模型', '交易生命周期', 'Gas 与费用', '共识机制'],
      centerTop: '基础课程',
      centerCore: 'AI × Web3 路线图',
      centerLabel: 'AI × Web3',
      centerBottom: '赛道实践',
      rightTopTitle: 'AI 基础',
      rightTopPanel: ['监督学习', '无监督学习', '训练集', '验证集'],
      rightBottomTitle: '热门方向',
      rightBottomPanel: ['Agent Payments', 'Onchain Agent', 'Identity', 'AI × DeFi'],
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
      leftPanelTitle: 'Web3 Foundations',
      leftPanel: ['Account Model', 'Transaction Lifecycle', 'Gas & Fees', 'Consensus'],
      centerTop: 'Core Courses',
      centerCore: 'AI × Web3 Roadmap',
      centerLabel: 'AI × Web3',
      centerBottom: 'Tracks in Practice',
      rightTopTitle: 'AI Foundations',
      rightTopPanel: ['Supervised Learning', 'Unsupervised Learning', 'Training Set', 'Validation Set'],
      rightBottomTitle: 'Hot Tracks',
      rightBottomPanel: ['Agent Payments', 'Onchain Agent', 'Identity', 'AI × DeFi'],
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
