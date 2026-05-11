import { defineNavbarConfig } from 'vuepress-theme-plume';

export const zhNavbar = defineNavbarConfig([
  { text: '开始学习', link: '/zh/' },
  { text: 'AI 基础', link: '/zh/ai-fundamentals/' },
  { text: 'Web3 基础', link: '/zh/blockchain-basics/' },
  { text: 'AI × Web3', link: '/zh/ai-agents/' },
]);

export const enNavbar = defineNavbarConfig([
  { text: 'Start Learning', link: '/en/' },
  { text: 'AI Foundations', link: '/en/ai-fundamentals/' },
  { text: 'Web3 Foundations', link: '/en/blockchain-basics/' },
  { text: 'AI × Web3', link: '/en/ai-agents/' },
]);
