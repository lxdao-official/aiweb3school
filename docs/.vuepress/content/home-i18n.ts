export type HomeLocale = 'zh' | 'en'

export const homeI18n = {
  zh: {
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
    mapDemo: {
      title: 'AI 分类',
      items: ['弱人工智能', '强人工智能', '自动化', '智能化', '隐私保护'],
    },
  },
  en: {
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
    mapDemo: {
      title: 'AI Categories',
      items: ['Narrow AI', 'General AI', 'Automation', 'Intelligence', 'Privacy Protection'],
    },
  },
} as const
