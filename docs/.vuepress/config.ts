import { viteBundler } from '@vuepress/bundler-vite';
import { defineUserConfig } from 'vuepress';
import { plumeTheme } from 'vuepress-theme-plume';

export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  locales: {
    '/': {
      title: 'AI Web3 School',
      lang: 'zh-CN',
      description: 'AI × Web3 学习平台',
    },
  },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/images/logo.svg' }],
  ],

  bundler: viteBundler(),
  shouldPrefetch: false,

  theme: plumeTheme({
    hostname: 'https://aiweb3.school',

    docsRepo: 'https://github.com/lxdao-official/aiweb3school',
    docsDir: 'docs',

    lastUpdated: false,
    changelog: false,

    plugins: {
      git: true,
    },

    cache: 'filesystem',

    search: { provider: 'local' },

    codeHighlighter: {
      lineNumbers: false,
    },

    markdown: {
      annotation: true,
      collapse: true,
      mermaid: true,
      icon: {
        provider: 'iconify',
      },
      image: {
        figure: true,
      },
    },
  }),
});
