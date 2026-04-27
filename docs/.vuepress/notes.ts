import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume';
import { getSidebarEntries, handbookRoadmap } from './content/handbook-roadmap';

const zhSidebar = handbookRoadmap.zh.sidebar;
const enSidebar = handbookRoadmap.en.sidebar;

const schoolNote = defineNoteConfig({
  dir: 'zh',
  link: '/zh',
  sidebar: [
    { text: zhSidebar.rootTitle, link: '/zh/' },
    ...zhSidebar.groups.map((group) => ({
      text: group.text,
      collapsed: false,
      items: getSidebarEntries('zh', group.bucket),
    })),
  ],
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
