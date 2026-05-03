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
  },
} as const
