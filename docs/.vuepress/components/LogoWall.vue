<script setup lang="ts">
import { computed } from 'vue'
import { useRouteLocale, withBase } from 'vuepress/client'

type LogoItem = {
  name: string
  href: string
  lightSrc: string
  darkSrc: string
}

type LogoWallSection = {
  eyebrow: string
  title: string
  items: LogoItem[]
}

const props = withDefaults(defineProps<{
  variant?: 'default' | 'compact'
}>(), {
  variant: 'default',
})

const routeLocale = useRouteLocale()
const localeKey = computed(() => routeLocale.value === '/en/' ? 'en' : 'zh')

const sharedLogos: LogoItem[] = [
  {
    name: 'LXDAO',
    href: 'https://lxdao.io/',
    lightSrc: '/images/logos/lxdao-light.png',
    darkSrc: '/images/logos/lxdao-dark.png',
  },
  {
    name: 'ETHPanda',
    href: 'https://ethpanda.org/',
    lightSrc: '/images/logos/ethpanda-light.png',
    darkSrc: '/images/logos/ethpanda-dark.png',
  },
  {
    name: 'Z.AI',
    href: 'https://z.ai/',
    lightSrc: '/images/logos/zai-light.svg',
    darkSrc: '/images/logos/zai-dark.svg',
  },
  {
    name: 'Cobo Agentic Wallet',
    href: 'https://www.cobo.com/agentic-wallet',
    lightSrc: '/images/logos/cobo-agentic-wallet-light.png',
    darkSrc: '/images/logos/cobo-agentic-wallet-dark.png',
  },
  {
    name: 'Elytro',
    href: 'https://elytro.com/',
    lightSrc: '/images/logos/elytro-light.png',
    darkSrc: '/images/logos/elytro-dark.png',
  },
  {
    name: 'LI.FI',
    href: 'https://li.fi/',
    lightSrc: '/images/logos/lifi-light.svg',
    darkSrc: '/images/logos/lifi-dark.svg',
  },
  {
    name: 'AltLayer',
    href: 'https://altlayer.io/',
    lightSrc: '/images/logos/altlayer-light.png',
    darkSrc: '/images/logos/altlayer-dark.png',
  },
  {
    name: 'PHALA',
    href: 'https://phala.com/',
    lightSrc: '/images/logos/phala-light.png',
    darkSrc: '/images/logos/phala-dark.png',
  },
  {
    name: 'Ethereum Foundation Dev Growth',
    href: 'https://ethereum.foundation/',
    lightSrc: '/images/logos/ethereum-foundation-dev-growth-light.png',
    darkSrc: '/images/logos/ethereum-foundation-dev-growth-dark.png',
  },
  {
    name: 'Web3Privacy Now',
    href: 'https://web3privacy.info/',
    lightSrc: '/images/logos/web3privacy-now-light.svg',
    darkSrc: '/images/logos/web3privacy-now-dark.svg',
  },
  {
    name: 'Waterdrip Capital',
    href: 'https://www.waterdripcapital.com/',
    lightSrc: '/images/logos/waterdrip-capital-light.png',
    darkSrc: '/images/logos/waterdrip-capital-dark.png',
  },
  {
    name: 'ETHVIETNAM',
    href: 'https://www.eth-vietnam.com/',
    lightSrc: '/images/logos/ethvietnam-light.png',
    darkSrc: '/images/logos/ethvietnam-dark.png',
  },
  {
    name: 'Ethereum Singapore',
    href: 'https://ethereumsingapore.com/',
    lightSrc: '/images/logos/ethereum-singapore-light.png',
    darkSrc: '/images/logos/ethereum-singapore-dark.png',
  },
  {
    name: 'base中文台',
    href: 'https://www.base.org/',
    lightSrc: '/images/logos/base-chinese-light.png',
    darkSrc: '/images/logos/base-chinese-dark.png',
  },
  {
    name: 'APAC DAO',
    href: 'https://www.linkedin.com/company/apac-dao/',
    lightSrc: '/images/logos/apac-dao-light.png',
    darkSrc: '/images/logos/apac-dao-dark.png',
  },
  {
    name: 'OpenCSG',
    href: 'https://opencsg.com/',
    lightSrc: '/images/logos/opencsg-light.svg',
    darkSrc: '/images/logos/opencsg-dark.svg',
  },
  {
    name: 'Napul.ETH',
    href: 'https://www.napuleth.org/',
    lightSrc: '/images/logos/napul-eth-light.png',
    darkSrc: '/images/logos/napul-eth-dark.png',
  },
  {
    name: 'DEV3PACK',
    href: 'https://dev3pack.xyz/',
    lightSrc: '/images/logos/dev3pack-light.png',
    darkSrc: '/images/logos/dev3pack-dark.png',
  },
  {
    name: 'NOVA',
    href: 'https://thenova.world/',
    lightSrc: '/images/logos/nova-light.png',
    darkSrc: '/images/logos/nova-dark.png',
  },
  {
    name: 'Deep Funding',
    href: 'https://www.deepfunding.org/',
    lightSrc: '/images/logos/deep-funding-light.svg',
    darkSrc: '/images/logos/deep-funding-dark.svg',
  },
  {
    name: 'TechFlow 深潮',
    href: 'https://www.techflowpost.com/',
    lightSrc: '/images/logos/techflow-light.svg',
    darkSrc: '/images/logos/techflow-dark.svg',
  },
  {
    name: 'WU BLOCKCHAIN',
    href: 'https://www.wublockchain.xyz/',
    lightSrc: '/images/logos/wu-blockchain-light.png',
    darkSrc: '/images/logos/wu-blockchain-dark.png',
  },
  {
    name: 'PANews',
    href: 'https://www.panewslab.com/en',
    lightSrc: '/images/logos/panews-light.png',
    darkSrc: '/images/logos/panews-dark.png',
  },
  {
    name: 'Ethereum News',
    href: 'https://ethereum.news/',
    lightSrc: '/images/logos/ethereum-news-light.png',
    darkSrc: '/images/logos/ethereum-news-dark.png',
  },
]

const logoWallContent = {
  zh: [
    {
      eyebrow: 'COLLABORATE',
      title: '合作伙伴与支持方',
      items: sharedLogos,
    },
  ],
  en: [
    {
      eyebrow: 'COLLABORATE',
      title: 'Partners & Supporters',
      items: sharedLogos,
    },
  ],
} satisfies Record<'zh' | 'en', LogoWallSection[]>

const sections = computed(() => logoWallContent[localeKey.value])
</script>

<template>
  <section
    class="logo-wall"
    :class="{ 'logo-wall-compact': props.variant === 'compact' }"
    aria-label="AI x Web3 School partners"
  >
    <section
      v-for="section in sections"
      :key="section.eyebrow"
      class="logo-wall-section"
    >
      <header class="logo-wall-head">
        <p class="logo-wall-eyebrow">{{ section.eyebrow }}</p>
        <h2>{{ section.title }}</h2>
      </header>

      <div class="logo-wall-grid">
        <a
          v-for="item in section.items"
          :key="`${section.eyebrow}-${item.name}`"
          class="logo-wall-card"
          :href="item.href"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="item.name"
        >
          <img
            class="logo-wall-logo logo-wall-logo-light"
            :src="withBase(item.lightSrc)"
            :alt="item.name"
            loading="lazy"
          >
          <img
            class="logo-wall-logo logo-wall-logo-dark"
            :src="withBase(item.darkSrc)"
            :alt="item.name"
            loading="lazy"
          >
        </a>
      </div>
    </section>
  </section>
</template>

<style scoped>
.logo-wall {
  position: relative;
  left: 50%;
  width: 100vw;
  margin-left: -50vw;
  padding: clamp(64px, 8vw, 112px) 20px clamp(80px, 9vw, 128px);
}

.logo-wall-section {
  width: min(1180px, 100%);
  margin: 0 auto;
}

.logo-wall-section + .logo-wall-section {
  margin-top: clamp(72px, 8vw, 116px);
}

.logo-wall-head {
  text-align: center;
  margin-bottom: clamp(34px, 5vw, 70px);
}

.logo-wall-eyebrow {
  display: inline-flex;
  min-height: 40px;
  align-items: center;
  justify-content: center;
  margin: 0 0 clamp(24px, 3vw, 38px);
  padding: 0 26px;
  border: 1px solid rgba(148, 95, 255, 0.24);
  border-radius: 999px;
  background: rgba(247, 241, 255, 0.72);
  color: #6d3ee0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  font-size: clamp(13px, 1.05vw, 17px);
  font-weight: 850;
  letter-spacing: 0;
}

.logo-wall-head h2 {
  margin: 0;
  color: #25183f;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  font-size: clamp(34px, 4.6vw, 66px);
  font-weight: 900;
  line-height: 1.08;
  letter-spacing: 0;
}

.logo-wall-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(14px, 2vw, 22px);
}

.logo-wall-card {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: clamp(108px, 10vw, 132px);
  padding: 28px;
  border: 1px solid rgba(181, 145, 255, 0.34);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.42);
  box-shadow:
    0 20px 54px rgba(108, 85, 154, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);
  transition:
    transform 0.22s ease,
    border-color 0.22s ease,
    box-shadow 0.22s ease,
    background-color 0.22s ease;
}

.logo-wall-card:hover,
.logo-wall-card:focus-visible {
  transform: translateY(-2px);
  border-color: rgba(125, 84, 233, 0.58);
  box-shadow:
    0 22px 58px rgba(108, 85, 154, 0.13),
    0 0 18px rgba(170, 104, 255, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.84);
}

.logo-wall-card:focus-visible {
  outline: 2px solid rgba(116, 67, 224, 0.36);
  outline-offset: 4px;
}

.logo-wall-logo {
  display: block;
  width: min(78%, 230px);
  max-height: 74px;
  object-fit: contain;
}

.logo-wall-logo-dark {
  display: none;
}

.logo-wall-compact {
  left: auto;
  width: 100%;
  margin-left: 0;
  padding: 28px 0 36px;
}

.logo-wall-compact .logo-wall-section {
  width: 100%;
}

.logo-wall-compact .logo-wall-head {
  text-align: left;
  margin-bottom: 18px;
}

.logo-wall-compact .logo-wall-eyebrow {
  min-height: 30px;
  margin-bottom: 10px;
  padding: 0 14px;
  font-size: 12px;
}

.logo-wall-compact .logo-wall-head h2 {
  font-size: 24px;
}

.logo-wall-compact .logo-wall-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.logo-wall-compact .logo-wall-card {
  min-height: 94px;
  padding: 20px;
  border-radius: 10px;
}

.logo-wall-compact .logo-wall-logo {
  width: min(76%, 190px);
  max-height: 54px;
}

:global(html[data-theme='dark']) .logo-wall-eyebrow {
  border-color: rgba(188, 153, 255, 0.24);
  background: rgba(196, 170, 255, 0.09);
  color: rgba(208, 190, 255, 0.94);
}

:global(html[data-theme='dark']) .logo-wall-head h2 {
  color: #f3edff;
}

:global(html[data-theme='dark']) .logo-wall-card {
  border-color: rgba(149, 104, 221, 0.3);
  background: rgba(31, 24, 42, 0.58);
  box-shadow:
    0 22px 58px rgba(5, 6, 12, 0.24),
    inset 0 1px 0 rgba(225, 206, 255, 0.06);
}

:global(html[data-theme='dark']) .logo-wall-card:hover,
:global(html[data-theme='dark']) .logo-wall-card:focus-visible {
  border-color: rgba(188, 153, 255, 0.42);
  background: rgba(42, 31, 56, 0.68);
  box-shadow:
    0 24px 64px rgba(5, 6, 12, 0.3),
    0 0 20px rgba(126, 75, 255, 0.16),
    inset 0 1px 0 rgba(225, 206, 255, 0.08);
}

:global(html[data-theme='dark']) .logo-wall-logo-light {
  display: none;
}

:global(html[data-theme='dark']) .logo-wall-logo-dark {
  display: block;
}

@media (max-width: 900px) {
  .logo-wall-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .logo-wall {
    padding-right: 12px;
    padding-left: 12px;
  }

  .logo-wall-compact {
    padding-right: 0;
    padding-left: 0;
  }

  .logo-wall-grid {
    grid-template-columns: 1fr;
  }

  .logo-wall-card {
    min-height: 104px;
  }
}
</style>

<style>
html[data-theme='dark'] .logo-wall-eyebrow,
[data-theme='dark'] .logo-wall-eyebrow,
.dark .logo-wall-eyebrow {
  border-color: rgba(188, 153, 255, 0.24) !important;
  background: rgba(196, 170, 255, 0.09) !important;
  color: rgba(208, 190, 255, 0.94) !important;
}

html[data-theme='dark'] .logo-wall-head h2,
[data-theme='dark'] .logo-wall-head h2,
.dark .logo-wall-head h2 {
  color: #f3edff !important;
}

html[data-theme='dark'] .logo-wall-card,
[data-theme='dark'] .logo-wall-card,
.dark .logo-wall-card {
  border-color: rgba(149, 104, 221, 0.3) !important;
  background: rgba(31, 24, 42, 0.58) !important;
  box-shadow:
    0 22px 58px rgba(5, 6, 12, 0.24),
    inset 0 1px 0 rgba(225, 206, 255, 0.06) !important;
}

html[data-theme='dark'] .logo-wall-card:hover,
html[data-theme='dark'] .logo-wall-card:focus-visible,
[data-theme='dark'] .logo-wall-card:hover,
[data-theme='dark'] .logo-wall-card:focus-visible,
.dark .logo-wall-card:hover,
.dark .logo-wall-card:focus-visible {
  border-color: rgba(188, 153, 255, 0.42) !important;
  background: rgba(42, 31, 56, 0.68) !important;
  box-shadow:
    0 24px 64px rgba(5, 6, 12, 0.3),
    0 0 20px rgba(126, 75, 255, 0.16),
    inset 0 1px 0 rgba(225, 206, 255, 0.08) !important;
}

html[data-theme='dark'] .logo-wall-logo-light,
[data-theme='dark'] .logo-wall-logo-light,
.dark .logo-wall-logo-light {
  display: none !important;
}

html[data-theme='dark'] .logo-wall-logo-dark,
[data-theme='dark'] .logo-wall-logo-dark,
.dark .logo-wall-logo-dark {
  display: block !important;
  filter: none !important;
}
</style>
