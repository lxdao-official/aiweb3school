import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume';

const schoolNote = defineNoteConfig({
  dir: 'zh',
  link: '/zh',
  sidebar: [
    { text: 'AI Web3 School', link: '/zh/' },
    {
      text: 'Part 1: AI 基础',
      collapsed: false,
      items: [
        { text: 'AI 基础概念', link: '/zh/ai-fundamentals/' },
        { text: '机器学习入门', link: '/zh/machine-learning-basics/' },
        { text: '深度学习简介', link: '/zh/deep-learning-intro/' },
        { text: 'AI 工具与平台', link: '/zh/ai-tools/' },
      ],
    },
    {
      text: 'Part 2: Web3 基础',
      collapsed: false,
      items: [
        { text: '区块链基础', link: '/zh/blockchain-basics/' },
        { text: '智能合约入门', link: '/zh/smart-contracts/' },
        { text: 'DeFi 概览', link: '/zh/defi-intro/' },
        { text: 'Web3 开发工具', link: '/zh/web3-tools/' },
      ],
    },
    {
      text: 'Part 3: AI × Web3 融合',
      collapsed: false,
      items: [
        { text: 'AI Agent 与区块链', link: '/zh/ai-agents/' },
        { text: 'AI + DeFi', link: '/zh/ai-defi/' },
        { text: 'AI + NFT', link: '/zh/ai-nft/' },
        { text: '去中心化 AI', link: '/zh/decentralized-ai/' },
      ],
    },
    {
      text: 'Part 4: 实战与资源',
      collapsed: false,
      items: [
        { text: '项目实战指南', link: '/zh/project-guide/' },
        { text: '案例分析', link: '/zh/case-studies/' },
        { text: '学习资源', link: '/zh/resources/' },
      ],
    },
  ],
});

export const zhNotes = defineNotesConfig({
  dir: '/',
  link: '/',
  notes: [schoolNote],
});
