import { viteBundler } from '@vuepress/bundler-vite';
import type { HeadConfig } from 'vuepress/shared';
import { defineUserConfig } from 'vuepress';
import { plumeTheme } from 'vuepress-theme-plume';

const hostname = 'https://aiweb3.school';
const siteName = 'AI x Web3 School';
const zhDescription =
  'AI x Web3 School 是面向 builders 的双语开源学习平台，系统学习 AI、区块链、智能合约、AI Agent 与去中心化 AI，并通过 Bootcamp 和项目实践连接真实协作。';
const enDescription =
  'AI x Web3 School is a bilingual open learning platform for builders to learn AI, blockchain, smart contracts, AI agents, decentralized AI, and build through bootcamps and practical projects.';
const zhKeywords =
  'AI x Web3 School, AI Web3, AI, Web3, 区块链, 智能合约, AI Agent, 去中心化 AI, DeFi, NFT, Bootcamp, LXDAO, ETHPanda';
const enKeywords =
  'AI x Web3 School, AI Web3, artificial intelligence, Web3, blockchain, smart contracts, AI agents, decentralized AI, DeFi, NFT, bootcamp, LXDAO, ETHPanda';

const sharedHead: HeadConfig[] = [
  ['meta', { name: 'application-name', content: siteName }],
  ['meta', { name: 'apple-mobile-web-app-title', content: siteName }],
  ['meta', { name: 'mobile-web-app-capable', content: 'yes' }],
  ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
  ['meta', { name: 'format-detection', content: 'telephone=no' }],
  ['meta', { name: 'referrer', content: 'strict-origin-when-cross-origin' }],
  ['meta', { name: 'color-scheme', content: 'light dark' }],
  ['meta', { name: 'theme-color', content: '#0d1117' }],
  ['link', { rel: 'icon', href: '/favicon.ico', sizes: 'any' }],
  ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
  ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
  ['link', { rel: 'manifest', href: '/site.webmanifest' }],
];

const appendPageMeta = (head: HeadConfig[], isEnglish: boolean): void => {
  const keywords = isEnglish ? enKeywords : zhKeywords;

  head.unshift(
    ['meta', { name: 'keywords', content: keywords }],
    ['meta', { name: 'author', content: 'AI x Web3 School' }],
    ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large' }],
    ['meta', { property: 'og:image:width', content: '2400' }],
    ['meta', { property: 'og:image:height', content: '1234' }],
    ['meta', { property: 'og:image:alt', content: siteName }],
    ['meta', { name: 'twitter:site', content: '@aiweb3school' }],
    ['meta', { name: 'twitter:image', content: `${hostname}/images/homepage-hero-bg.jpg` }],
    ['meta', { name: 'twitter:image:alt', content: siteName }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  );
};

const getPageMetaTitle = (page: { title?: string; path: string }): string => {
  if (page.path === '/') {
    return 'AI x Web3 School｜AI × Web3 开源学习平台';
  }

  if (page.path === '/en/') {
    return 'AI x Web3 School | Open AI × Web3 Learning Platform';
  }

  return page.title ? `${page.title} | ${siteName}` : siteName;
};

export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  locales: {
    '/': {
      title: siteName,
      lang: 'zh-CN',
      description: zhDescription,
      head: sharedHead,
    },
    '/en/': {
      title: siteName,
      lang: 'en-US',
      description: enDescription,
      head: sharedHead,
    },
  },

  bundler: viteBundler(),
  shouldPrefetch: false,

  theme: plumeTheme({
    hostname,

    docsRepo: 'https://github.com/lxdao-official/aiweb3school',
    docsDir: 'docs',

    lastUpdated: false,
    changelog: false,

    plugins: {
      git: true,
      sitemap: {
        hostname,
      },
      seo: {
        hostname,
        author: {
          name: siteName,
          url: hostname,
        },
        fallBackImage: `${hostname}/images/homepage-hero-bg.jpg`,
        twitterID: '@aiweb3school',
        canonical: (page) => `${hostname}${page.path}`,
        isArticle: (page) => Boolean(page.filePathRelative && page.frontmatter.pageLayout !== 'home'),
        ogp: (ogp, page) => ({
          ...ogp,
          'og:title': getPageMetaTitle(page),
        }),
        jsonLd: (jsonLd, page) =>
          page.frontmatter.pageLayout === 'home'
            ? {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: siteName,
                url: `${hostname}${page.path}`,
                description: page.frontmatter.description,
                inLanguage: page.lang,
                publisher: {
                  '@type': 'Organization',
                  name: siteName,
                  url: hostname,
                },
              }
            : jsonLd,
        customHead: (head, page) => {
          const title = getPageMetaTitle(page);

          head.unshift(
            ['meta', { name: 'twitter:title', content: title }],
            ['meta', { name: 'twitter:description', content: page.frontmatter.description || '' }],
          );
          appendPageMeta(head, page.path.startsWith('/en/'));
        },
      },
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
