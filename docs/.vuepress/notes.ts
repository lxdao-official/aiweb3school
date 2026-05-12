import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume';
import { handbookRoadmap } from './content/handbook-roadmap';
import { displayRoadmapTitle, playgroundRoadmap } from './content/playground-roadmap-data';

const zhSidebar = handbookRoadmap.zh.sidebar;
const enSidebar = handbookRoadmap.en.sidebar;

function slugifyRoadmapTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/×/g, 'x')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function zhHandbookLink(section: 'ai' | 'web3' | 'bridge' | 'tracks', title: string): string {
  return `/zh/handbook/${section}/${slugifyRoadmapTitle(title)}/`;
}

function enHandbookLink(section: 'ai' | 'web3' | 'bridge' | 'tracks', title: string): string {
  return `/en/handbook/${section}/${slugifyRoadmapTitle(title)}/`;
}

const zhRoadmapSidebar = [
  { text: zhSidebar.rootTitle, link: '/zh/handbook/' },
  {
    text: 'AI 基础',
    collapsed: false,
    items: playgroundRoadmap.topLeft.nodes.map((node) => ({
      text: displayRoadmapTitle(node.title, 'zh'),
      link: zhHandbookLink('ai', node.title),
    })),
  },
  {
    text: 'Web3 基础',
    collapsed: false,
    items: playgroundRoadmap.topRight.nodes.map((node) => ({
      text: displayRoadmapTitle(node.title, 'zh'),
      link: zhHandbookLink('web3', node.title),
    })),
  },
  {
    text: 'AI × Web3 Bridge',
    collapsed: false,
    items: playgroundRoadmap.fusion.cards.map((card) => ({
      text: displayRoadmapTitle(card.title, 'zh'),
      link: zhHandbookLink('bridge', card.title),
    })),
  },
  {
    text: '前沿探索',
    collapsed: false,
    items: playgroundRoadmap.splits.map((split) => ({
      text: displayRoadmapTitle(split.label, 'zh'),
      link: zhHandbookLink('tracks', split.label),
    })),
  },
];

const enRoadmapSidebar = [
  { text: enSidebar.rootTitle, link: '/en/handbook/' },
  {
    text: 'AI Foundations',
    collapsed: false,
    items: playgroundRoadmap.topLeft.nodes.map((node) => ({
      text: displayRoadmapTitle(node.title, 'en'),
      link: enHandbookLink('ai', node.title),
    })),
  },
  {
    text: 'Web3 Foundations',
    collapsed: false,
    items: playgroundRoadmap.topRight.nodes.map((node) => ({
      text: displayRoadmapTitle(node.title, 'en'),
      link: enHandbookLink('web3', node.title),
    })),
  },
  {
    text: 'AI × Web3 Bridge',
    collapsed: false,
    items: playgroundRoadmap.fusion.cards.map((card) => ({
      text: displayRoadmapTitle(card.title, 'en'),
      link: enHandbookLink('bridge', card.title),
    })),
  },
  {
    text: 'Frontier Exploration',
    collapsed: false,
    items: playgroundRoadmap.splits.map((split) => ({
      text: displayRoadmapTitle(split.label, 'en'),
      link: enHandbookLink('tracks', split.label),
    })),
  },
];

const schoolNote = defineNoteConfig({
  dir: 'zh',
  link: '/zh',
  sidebar: zhRoadmapSidebar,
});

export const zhNotes = defineNotesConfig({
  dir: '/',
  link: '/',
  notes: [schoolNote],
});

const schoolNoteEn = defineNoteConfig({
  dir: '',
  link: '/',
  sidebar: enRoadmapSidebar,
});

export const enNotes = defineNotesConfig({
  dir: '/',
  link: '/',
  notes: [schoolNoteEn],
});
