import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume';
import { getSidebarEntries, handbookRoadmap } from './content/handbook-roadmap';
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

const zhRoadmapSidebar = [
  { text: zhSidebar.rootTitle, link: '/zh/' },
  {
    text: 'AI',
    collapsed: false,
    items: playgroundRoadmap.topLeft.nodes.map((node) => ({
      text: displayRoadmapTitle(node.title, 'zh'),
      link: zhHandbookLink('ai', node.title),
    })),
  },
  {
    text: 'Web3',
    collapsed: false,
    items: playgroundRoadmap.topRight.nodes.map((node) => ({
      text: displayRoadmapTitle(node.title, 'zh'),
      link: zhHandbookLink('web3', node.title),
    })),
  },
  {
    text: displayRoadmapTitle(playgroundRoadmap.fusion.label, 'zh'),
    collapsed: false,
    items: playgroundRoadmap.fusion.cards.map((card) => ({
      text: displayRoadmapTitle(card.title, 'zh'),
      link: zhHandbookLink('bridge', card.title),
    })),
  },
  {
    text: '黑客松赛道（Hackathon Tracks）',
    collapsed: false,
    items: playgroundRoadmap.splits.map((split) => ({
      text: displayRoadmapTitle(split.label, 'zh'),
      link: zhHandbookLink('tracks', split.label),
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
  dir: 'en',
  link: '/en',
  sidebar: [
    { text: enSidebar.rootTitle, link: '/en/' },
    ...enSidebar.groups.map((group) => ({
      text: group.text,
      collapsed: false,
      items: getSidebarEntries('en', group.bucket),
    })),
  ],
});

export const enNotes = defineNotesConfig({
  dir: '/',
  link: '/',
  notes: [schoolNoteEn],
});
