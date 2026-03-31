import { defineThemeConfig } from 'vuepress-theme-plume';
import { zhNavbar } from './navbar';
import { zhNotes } from './notes';

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
    page: true,
    postList: true,
    appearance: 'fade',
  },

  locales: {
    '/': {
      profile: {
        avatar: '/images/logo.png',
        name: 'AI Web3 School',
        description: 'AI × Web3 学习平台',
      },

      navbar: zhNavbar,
      notes: zhNotes,
    },
  },
});
