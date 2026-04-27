import { defineThemeConfig } from 'vuepress-theme-plume';
import { enNavbar, zhNavbar } from './navbar';
import { enNotes, zhNotes } from './notes';

export default defineThemeConfig({
  appearance: true,

  social: [
    {
      icon: 'github',
      link: 'https://github.com/lxdao-official/aiweb3school',
    },
  ],

  prevPage: true,
  nextPage: true,

  footer: {
    message: '© AI Web3 School',
  },

  transition: {
    page: false,
    postList: true,
    appearance: 'fade',
  },

  locales: {
    '/': {
      selectLanguageName: '简体中文',
      selectLanguageText: '选择语言',
      profile: {
        avatar: '/images/logo.svg',
        name: 'AI Web3 School',
        description: 'AI × Web3 学习平台',
      },

      navbar: zhNavbar,
      notes: zhNotes,
    },
    '/en/': {
      selectLanguageName: 'English',
      selectLanguageText: 'Languages',
      profile: {
        avatar: '/images/logo.svg',
        name: 'AI Web3 School',
        description: 'AI × Web3 learning platform',
      },

      navbar: enNavbar,
      notes: enNotes,
    },
  },
});
