export type HomeLocale = 'zh' | 'en'

export const homeI18n = {
  zh: {
    wip: {
      label: 'WIP · 开发中',
      title: '网站内容与界面仍在持续完善',
      description: '当前版本用于阶段性展示，课程内容、学习路径和页面体验还会继续更新。',
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
    wip: {
      label: 'WIP · In progress',
      title: 'The website content and interface are still being improved',
      description: 'This version is a work-in-progress preview. Course content, learning paths, and page experience will continue to evolve.',
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
