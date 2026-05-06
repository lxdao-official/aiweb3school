import { defineThemeConfig } from 'vuepress-theme-plume';
import { enNavbar, zhNavbar } from './navbar';
import { enNotes, zhNotes } from './notes';

const applyZhUrl = 'https://web3career.build/zh/programs/AI-Web3-School?tab=apply';
const applyEnUrl = 'https://web3career.build/en/programs/AI-Web3-School?tab=apply';

const footerZh = `
<section class="aiw3-footer" aria-label="AI x Web3 School 页脚">
  <div class="aiw3-footer-main">
    <div class="aiw3-footer-brand">
      <p class="aiw3-footer-name">AI x Web3 School</p>
      <p>面向 builders 的开源学习手册、Bootcamp 与协作网络。</p>
      <a class="aiw3-footer-cta" href="${applyZhUrl}" target="_blank" rel="noopener noreferrer">加入 Bootcamp</a>
    </div>
    <nav class="aiw3-footer-links" aria-label="Footer navigation">
      <section>
        <h3>学习</h3>
        <a href="/zh/ai-fundamentals/">AI 基础</a>
        <a href="/zh/blockchain-basics/">Web3 基础</a>
        <a href="/zh/ai-agents/">AI Agent</a>
      </section>
      <section>
        <h3>实践</h3>
        <a href="/zh/project-guide/">项目指南</a>
        <a href="/zh/case-studies/">案例分析</a>
        <a href="/zh/resources/">学习资源</a>
      </section>
      <section>
        <h3>社区</h3>
        <a href="https://github.com/lxdao-official/aiweb3school" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://lxdao.io/" target="_blank" rel="noopener noreferrer">LXDAO</a>
        <a href="https://ethpanda.org/" target="_blank" rel="noopener noreferrer">ETHPanda</a>
      </section>
    </nav>
  </div>
  <div class="aiw3-footer-bottom">
    <span>© 2026 AI x Web3 School</span>
    <span>Open learning for autonomous builders.</span>
  </div>
</section>
`;

const footerEn = `
<section class="aiw3-footer" aria-label="AI x Web3 School footer">
  <div class="aiw3-footer-main">
    <div class="aiw3-footer-brand">
      <p class="aiw3-footer-name">AI x Web3 School</p>
      <p>An open handbook, bootcamp, and collaboration network for builders.</p>
      <a class="aiw3-footer-cta" href="${applyEnUrl}" target="_blank" rel="noopener noreferrer">Join Bootcamp</a>
    </div>
    <nav class="aiw3-footer-links" aria-label="Footer navigation">
      <section>
        <h3>Learn</h3>
        <a href="/en/ai-fundamentals/">AI Fundamentals</a>
        <a href="/en/blockchain-basics/">Web3 Basics</a>
        <a href="/en/ai-agents/">AI Agents</a>
      </section>
      <section>
        <h3>Build</h3>
        <a href="/en/project-guide/">Project Guide</a>
        <a href="/en/case-studies/">Case Studies</a>
        <a href="/en/resources/">Resources</a>
      </section>
      <section>
        <h3>Community</h3>
        <a href="https://github.com/lxdao-official/aiweb3school" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://lxdao.io/" target="_blank" rel="noopener noreferrer">LXDAO</a>
        <a href="https://ethpanda.org/" target="_blank" rel="noopener noreferrer">ETHPanda</a>
      </section>
    </nav>
  </div>
  <div class="aiw3-footer-bottom">
    <span>© 2026 AI x Web3 School</span>
    <span>Open learning for autonomous builders.</span>
  </div>
</section>
`;

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
    message: footerZh,
  },

  transition: {
    page: false,
    postList: true,
    appearance: 'fade',
  },

  locales: {
    '/': {
      selectLanguageName: '简体中文',
      selectLanguageText: '选择语言',
      profile: {
        avatar: '/images/logo.svg',
        name: 'AI x Web3 School',
        description: 'AI × Web3 学习平台',
      },

      navbar: zhNavbar,
      notes: zhNotes,
      footer: {
        message: footerZh,
      },
    },
    '/en/': {
      selectLanguageName: 'English',
      selectLanguageText: 'Languages',
      profile: {
        avatar: '/images/logo.svg',
        name: 'AI x Web3 School',
        description: 'AI × Web3 learning platform',
      },

      navbar: enNavbar,
      notes: enNotes,
      footer: {
        message: footerEn,
      },
    },
  },
});
