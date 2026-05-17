import { defineNavbarConfig } from 'vuepress-theme-plume';

export const zhNavbar = defineNavbarConfig([
  { text: '开始学习', link: '/zh/handbook/' },
  { text: 'AI 基础', link: '/zh/handbook/ai/llm/' },
  { text: 'Web3 基础', link: '/zh/handbook/web3/network/' },
  { text: 'AI × Web3 Bridge', link: '/zh/handbook/bridge/chain-aware-context/' },
  { text: '前沿探索', link: '/zh/handbook/tracks/agentic-commerce/' },
]);

export const enNavbar = defineNavbarConfig([
  { text: 'Start Learning', link: '/en/handbook/' },
  { text: 'AI Foundations', link: '/en/handbook/ai/llm/' },
  { text: 'Web3 Foundations', link: '/en/handbook/web3/network/' },
  { text: 'AI × Web3 Bridge', link: '/en/handbook/bridge/chain-aware-context/' },
  { text: 'Frontier Exploration', link: '/en/handbook/tracks/agentic-commerce/' },
]);
