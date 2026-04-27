export type HomeLocale = 'zh' | 'en'

export type RoadmapBucket = 'foundation-ai' | 'foundation-web3' | 'product' | 'challenge'

export interface HandbookRoadmapEntry {
  id: string
  title: string
  link?: string
  bucket: RoadmapBucket
  sidebarTitle?: string
  showInSidebar?: boolean
}

export interface HandbookRoadmapLocale {
  stages: {
    foundation: string
    product: string
    challenge: string
  }
  branches: {
    ai: string
    web3: string
  }
  sidebar: {
    rootTitle: string
    groups: Array<{
      bucket: RoadmapBucket
      text: string
    }>
  }
  entries: HandbookRoadmapEntry[]
}

export const handbookRoadmap: Record<HomeLocale, HandbookRoadmapLocale> = {
  zh: {
    stages: {
      foundation: 'AI × Web3 的基础',
      product: 'AI × Web3 融合',
      challenge: 'AI × Web3 的挑战',
    },
    branches: {
      ai: 'AI 的基础',
      web3: 'Web3 的基础',
    },
    sidebar: {
      rootTitle: 'AI Web3 School',
      groups: [
        { bucket: 'foundation-ai', text: 'Part 1: AI 基础' },
        { bucket: 'foundation-web3', text: 'Part 2: Web3 基础' },
        { bucket: 'product', text: 'Part 3: AI × Web3 融合' },
        { bucket: 'challenge', text: 'Part 4: 实战与资源' },
      ],
    },
    entries: [
      { id: 'ai-fundamentals', title: 'AI 基础概念', link: '/zh/ai-fundamentals/', bucket: 'foundation-ai' },
      { id: 'machine-learning-basics', title: '机器学习入门', link: '/zh/machine-learning-basics/', bucket: 'foundation-ai' },
      { id: 'deep-learning-intro', title: '深度学习简介', link: '/zh/deep-learning-intro/', bucket: 'foundation-ai' },
      { id: 'ai-tools', title: 'AI 工具与平台', link: '/zh/ai-tools/', bucket: 'foundation-ai' },
      { id: 'blockchain-basics', title: '区块链基础', link: '/zh/blockchain-basics/', bucket: 'foundation-web3' },
      { id: 'smart-contracts', title: '智能合约入门', link: '/zh/smart-contracts/', bucket: 'foundation-web3' },
      { id: 'defi-intro', title: 'DeFi 概览', link: '/zh/defi-intro/', bucket: 'foundation-web3' },
      { id: 'web3-tools', title: 'Web3 开发工具', link: '/zh/web3-tools/', bucket: 'foundation-web3' },
      { id: 'ai-agents', title: 'AI Agent 与区块链', link: '/zh/ai-agents/', bucket: 'product' },
      { id: 'ai-defi', title: 'AI + DeFi', link: '/zh/ai-defi/', bucket: 'product' },
      { id: 'ai-nft', title: 'AI + NFT', link: '/zh/ai-nft/', bucket: 'product' },
      { id: 'decentralized-ai', title: '去中心化 AI', link: '/zh/decentralized-ai/', bucket: 'product' },
      { id: 'project-guide', title: '项目落地挑战', sidebarTitle: '项目实战指南', link: '/zh/project-guide/', bucket: 'challenge' },
      { id: 'case-studies', title: '真实案例判断', sidebarTitle: '案例分析', link: '/zh/case-studies/', bucket: 'challenge' },
      { id: 'resources', title: '持续学习与更新', sidebarTitle: '学习资源', link: '/zh/resources/', bucket: 'challenge' },
    ],
  },
  en: {
    stages: {
      foundation: 'AI × Web3 Foundations',
      product: 'AI × Web3 Fusion',
      challenge: 'AI × Web3 Challenges',
    },
    branches: {
      ai: 'AI Foundations',
      web3: 'Web3 Foundations',
    },
    sidebar: {
      rootTitle: 'AI Web3 School',
      groups: [
        { bucket: 'foundation-ai', text: 'Part 1: AI Foundations' },
        { bucket: 'foundation-web3', text: 'Part 2: Web3 Foundations' },
        { bucket: 'product', text: 'Part 3: AI × Web3' },
        { bucket: 'challenge', text: 'Part 4: Practice & Resources' },
      ],
    },
    entries: [
      { id: 'ai-fundamentals', title: 'AI Fundamentals', link: '/en/ai-fundamentals/', bucket: 'foundation-ai' },
      { id: 'machine-learning-basics', title: 'Machine Learning Basics', link: '/en/machine-learning-basics/', bucket: 'foundation-ai' },
      { id: 'deep-learning-intro', title: 'Deep Learning Intro', link: '/en/deep-learning-intro/', bucket: 'foundation-ai' },
      { id: 'ai-tools', title: 'AI Tools & Platforms', link: '/en/ai-tools/', bucket: 'foundation-ai' },
      { id: 'blockchain-basics', title: 'Blockchain Basics', link: '/en/blockchain-basics/', bucket: 'foundation-web3' },
      { id: 'smart-contracts', title: 'Smart Contracts', link: '/en/smart-contracts/', bucket: 'foundation-web3' },
      { id: 'defi-intro', title: 'DeFi Intro', link: '/en/defi-intro/', bucket: 'foundation-web3' },
      { id: 'web3-tools', title: 'Web3 Tooling', link: '/en/web3-tools/', bucket: 'foundation-web3' },
      { id: 'ai-agents', title: 'AI Agents on Blockchain', link: '/en/ai-agents/', bucket: 'product' },
      { id: 'ai-defi', title: 'AI + DeFi', link: '/en/ai-defi/', bucket: 'product' },
      { id: 'ai-nft', title: 'AI + NFT', link: '/en/ai-nft/', bucket: 'product' },
      { id: 'decentralized-ai', title: 'Decentralized AI', link: '/en/decentralized-ai/', bucket: 'product' },
      { id: 'project-guide', title: 'Project Execution', sidebarTitle: 'Project Guide', link: '/en/project-guide/', bucket: 'challenge' },
      { id: 'case-studies', title: 'Case Judgment', sidebarTitle: 'Case Studies', link: '/en/case-studies/', bucket: 'challenge' },
      { id: 'resources', title: 'Ongoing Updates', sidebarTitle: 'Resources', link: '/en/resources/', bucket: 'challenge' },
    ],
  },
}

export function getRoadmapEntries(locale: HomeLocale, bucket: RoadmapBucket): HandbookRoadmapEntry[] {
  return handbookRoadmap[locale].entries.filter((entry) => entry.bucket === bucket)
}

export function getSidebarEntries(locale: HomeLocale, bucket: RoadmapBucket) {
  return getRoadmapEntries(locale, bucket)
    .filter((entry) => entry.showInSidebar !== false && entry.link)
    .map((entry) => ({
      text: entry.sidebarTitle ?? entry.title,
      link: entry.link as string,
    }))
}
