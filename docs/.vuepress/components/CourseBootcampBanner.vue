<script setup lang="ts">
import { computed } from "vue";
import { useRouteLocale, withBase } from "vuepress/client";

const routeLocale = useRouteLocale();

const bootcampContent = {
  zh: {
    eyebrow: "2026 年 5 月 17 日 - 6 月 14 日",
    title: "AI x Web3 School Bootcamp",
    description:
      "面向 builders 的 3 周 Bootcamp 加 2 周黑客松，系统探索 AI Agent、Web3 支付、AI 原生钱包、链上自动化与可验证智能体。",
    primaryCta: "加入 Bootcamp",
    secondaryCta: "查看课程",
    primaryHref: "https://web3career.build/zh/programs/AI-Web3-School?tab=apply",
    secondaryHref: "/zh/ai-agents/",
    phases: [
      { label: "Bootcamp", value: "3 周" },
      { label: "Hackathon", value: "2 周" },
      { label: "Track", value: "AI x Web3" },
    ],
    topicLabel: "核心方向",
    topics: ["Agent Payments", "AI-native Wallets", "Onchain Automation"],
  },
  en: {
    eyebrow: "May 17 - June 14, 2026",
    title: "AI x Web3 School Bootcamp",
    description:
      "A 3-week bootcamp plus 2-week hackathon for builders exploring AI agents, Web3 payments, AI-native wallets, onchain automation, and verifiable agents.",
    primaryCta: "Join Bootcamp",
    secondaryCta: "View Curriculum",
    primaryHref: "https://web3career.build/en/programs/AI-Web3-School?tab=apply",
    secondaryHref: "/en/ai-agents/",
    phases: [
      { label: "Bootcamp", value: "3 weeks" },
      { label: "Hackathon", value: "2 weeks" },
      { label: "Track", value: "AI x Web3" },
    ],
    topicLabel: "Focus",
    topics: ["Agent Payments", "AI-native Wallets", "Onchain Automation"],
  },
} as const;

const localeKey = computed(() => (routeLocale.value === "/en/" ? "en" : "zh"));
const content = computed(() => bootcampContent[localeKey.value]);
const topicSummary = computed(() => content.value.topics.join(" / "));
</script>

<template>
  <section
    class="bootcamp-banner"
    :aria-labelledby="`bootcamp-title-${localeKey}`"
  >
    <div class="bootcamp-card">
      <div class="bootcamp-copy">
        <p class="bootcamp-date">{{ content.eyebrow }}</p>
        <h2 :id="`bootcamp-title-${localeKey}`" class="bootcamp-title">
          {{ content.title }}
        </h2>
        <p class="bootcamp-description">{{ content.description }}</p>
        <div class="bootcamp-actions">
          <a
            class="bootcamp-button bootcamp-button-primary"
            :href="content.primaryHref"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ content.primaryCta }}
          </a>
          <a
            class="bootcamp-button bootcamp-button-secondary"
            :href="withBase(content.secondaryHref)"
          >
            {{ content.secondaryCta }}
          </a>
        </div>
      </div>

      <div class="bootcamp-grid" aria-label="Bootcamp highlights">
        <div
          v-for="(phase, index) in content.phases"
          :key="phase.label"
          class="bootcamp-metric"
          :class="`bootcamp-metric-${index + 1}`"
        >
          <span>{{ phase.value }}</span>
          <strong>{{ phase.label }}</strong>
        </div>
        <div class="bootcamp-metric bootcamp-topics">
          <strong>{{ content.topicLabel }}</strong>
          <span>{{ topicSummary }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bootcamp-banner {
  position: relative;
  left: 50%;
  width: 100vw;
  margin-left: -50vw;
  padding: clamp(82px, 8vw, 112px) 20px clamp(30px, 5vw, 64px);
}

.bootcamp-card {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(330px, 0.74fr);
  gap: clamp(24px, 4.8vw, 66px);
  align-items: center;
  width: min(1080px, 100%);
  margin: 0 auto;
  padding: clamp(24px, 3.6vw, 40px);
  overflow: hidden;
  border: 1px solid rgba(126, 164, 196, 0.22);
  border-radius: 18px;
  background:
    radial-gradient(
      34% 46% at 86% 16%,
      rgba(255, 192, 232, 0.16),
      transparent 72%
    ),
    radial-gradient(
      36% 42% at 8% 86%,
      rgba(148, 214, 255, 0.18),
      transparent 74%
    ),
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.68),
      rgba(255, 253, 253, 0.48)
    );
  box-shadow:
    0 22px 64px rgba(73, 85, 106, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.74);
}

.bootcamp-copy {
  position: relative;
  z-index: 2;
  max-width: 690px;
}

.bootcamp-date {
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  margin: 0 0 clamp(14px, 2vw, 22px);
  padding: 0 16px;
  border: 1px solid rgba(118, 142, 168, 0.24);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.52);
  color: #556271;
  font-family:
    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
    monospace;
  font-size: clamp(12px, 0.92vw, 14px);
  font-weight: 800;
  letter-spacing: 0;
}

.bootcamp-title {
  margin: 0;
  color: #20212b;
  font-family:
    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
    monospace;
  font-size: clamp(26px, 3.2vw, 42px);
  font-weight: 900;
  letter-spacing: 0;
  line-height: 1.08;
  text-wrap: balance;
}

.bootcamp-description {
  max-width: 620px;
  margin: clamp(14px, 2vw, 22px) 0 0;
  color: rgba(64, 72, 84, 0.84);
  font-size: clamp(14px, 1.08vw, 17px);
  font-weight: 620;
  line-height: 1.58;
}

.bootcamp-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px 18px;
  margin-top: clamp(20px, 2.6vw, 30px);
}

.bootcamp-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: clamp(136px, 11vw, 170px);
  min-height: 42px;
  padding: 0 18px;
  border: 1px solid transparent;
  border-radius: 8px;
  font-family:
    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
    monospace;
  font-size: clamp(13px, 0.95vw, 15px);
  font-weight: 900;
  letter-spacing: 0;
  text-decoration: none;
  transition:
    transform 0.22s ease,
    background-color 0.22s ease,
    border-color 0.22s ease,
    box-shadow 0.22s ease;
}

.bootcamp-button:hover,
.bootcamp-button:focus-visible {
  transform: translateY(-2px);
}

.bootcamp-button:focus-visible {
  outline: 2px solid rgba(116, 67, 224, 0.52);
  outline-offset: 3px;
}

.bootcamp-button-primary {
  color: #fff;
  background: #6f2ce2;
  box-shadow:
    0 14px 30px rgba(67, 22, 145, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.24);
}

.bootcamp-button-secondary {
  color: #5f36bf;
  border-color: rgba(95, 54, 191, 0.22);
  background: rgba(255, 255, 255, 0.54);
}

.bootcamp-grid {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.bootcamp-metric {
  display: flex;
  aspect-ratio: 1;
  min-height: 0;
  padding: clamp(14px, 1.6vw, 20px);
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid rgba(118, 142, 168, 0.2);
  border-radius: 14px;
  background:
    radial-gradient(
      76% 78% at 16% 8%,
      rgba(255, 255, 255, 0.78),
      transparent 74%
    ),
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.48),
      rgba(246, 250, 252, 0.34)
    );
  box-shadow:
    0 14px 30px rgba(73, 85, 106, 0.07),
    inset 0 1px 0 rgba(255, 255, 255, 0.68);
}

.bootcamp-metric span {
  color: #20212b;
  font-family:
    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
    monospace;
  font-size: clamp(20px, 2.35vw, 30px);
  font-weight: 900;
  line-height: 1.08;
}

.bootcamp-metric strong {
  display: block;
  color: #6b7180;
  font-size: clamp(12px, 0.92vw, 14px);
  font-weight: 850;
  line-height: 1.16;
}

.bootcamp-topics span {
  color: rgba(64, 72, 84, 0.82);
  font-family: inherit;
  font-size: clamp(12px, 1vw, 14px);
  font-weight: 800;
  line-height: 1.34;
  overflow-wrap: anywhere;
}

:global(html[data-theme="dark"]) .bootcamp-card {
  border-color: rgba(149, 104, 221, 0.34);
  background:
    radial-gradient(
      38% 54% at 96% 92%,
      rgba(111, 52, 146, 0.52),
      transparent 74%
    ),
    radial-gradient(
      38% 44% at 70% 14%,
      rgba(96, 56, 132, 0.22),
      transparent 72%
    ),
    linear-gradient(135deg, rgba(30, 22, 33, 0.96), rgba(18, 15, 25, 0.94));
  box-shadow:
    0 28px 78px rgba(7, 5, 14, 0.38),
    inset 0 1px 0 rgba(225, 206, 255, 0.07);
}

:global(html[data-theme="dark"]) .bootcamp-date {
  border-color: rgba(188, 153, 255, 0.24);
  background: rgba(196, 170, 255, 0.09);
  color: rgba(208, 190, 255, 0.94);
}

:global(html[data-theme="dark"]) .bootcamp-title {
  color: #f3edff;
}

:global(html[data-theme="dark"]) .bootcamp-description {
  color: rgba(224, 220, 236, 0.78);
}

:global(html[data-theme="dark"]) .bootcamp-button-primary {
  border-color: rgba(196, 170, 255, 0.3);
  background: #7130dd;
  box-shadow:
    0 18px 38px rgba(113, 48, 221, 0.34),
    0 0 34px rgba(126, 75, 255, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.24);
}

:global(html[data-theme="dark"]) .bootcamp-button-secondary {
  color: rgba(207, 190, 255, 0.9);
  border-color: rgba(149, 104, 221, 0.38);
  background: rgba(196, 170, 255, 0.045);
}

:global(html[data-theme="dark"]) .bootcamp-metric {
  border-color: rgba(149, 104, 221, 0.26);
  background:
    radial-gradient(
      72% 74% at 18% 10%,
      rgba(91, 72, 122, 0.52),
      transparent 74%
    ),
    linear-gradient(
      135deg,
      rgba(78, 58, 102, 0.36),
      rgba(34, 27, 45, 0.36)
    );
  box-shadow:
    0 16px 38px rgba(5, 6, 12, 0.22),
    inset 0 1px 0 rgba(225, 206, 255, 0.07);
}

:global(html[data-theme="dark"]) .bootcamp-metric span {
  color: #f2ebff;
}

:global(html[data-theme="dark"]) .bootcamp-metric strong {
  color: rgba(202, 177, 255, 0.88);
}

:global(html[data-theme="dark"]) .bootcamp-topics span {
  color: rgba(224, 220, 236, 0.78);
}

@media (max-width: 920px) {
  .bootcamp-card {
    grid-template-columns: 1fr;
    min-height: 0;
  }

  .bootcamp-grid {
    max-width: 560px;
  }
}

@media (max-width: 620px) {
  .bootcamp-banner {
    padding: 34px 12px 38px;
  }

  .bootcamp-card {
    padding: 24px;
    border-radius: 18px;
  }

  .bootcamp-date {
    min-height: 34px;
    padding: 0 16px;
    font-size: 12px;
  }

  .bootcamp-actions {
    display: grid;
    grid-template-columns: 1fr;
  }

  .bootcamp-button {
    width: 100%;
    min-width: 0;
  }

  .bootcamp-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .bootcamp-metric {
    border-radius: 14px;
  }

  .bootcamp-metric span {
    font-size: 19px;
  }

  .bootcamp-topics span {
    font-size: 12px;
  }
}
</style>

<style>
html[data-theme="dark"] .bootcamp-card,
[data-theme="dark"] .bootcamp-card,
.dark .bootcamp-card {
  border-color: rgba(149, 104, 221, 0.34) !important;
  background:
    radial-gradient(38% 54% at 96% 92%, rgba(111, 52, 146, 0.52), transparent 74%),
    radial-gradient(38% 44% at 70% 14%, rgba(96, 56, 132, 0.22), transparent 72%),
    linear-gradient(135deg, rgba(30, 22, 33, 0.96), rgba(18, 15, 25, 0.94)) !important;
  box-shadow:
    0 28px 78px rgba(7, 5, 14, 0.38),
    inset 0 1px 0 rgba(225, 206, 255, 0.07) !important;
}

html[data-theme="dark"] .bootcamp-date,
[data-theme="dark"] .bootcamp-date,
.dark .bootcamp-date {
  border-color: rgba(188, 153, 255, 0.24) !important;
  background: rgba(196, 170, 255, 0.09) !important;
  color: rgba(208, 190, 255, 0.94) !important;
}

html[data-theme="dark"] .bootcamp-title,
[data-theme="dark"] .bootcamp-title,
.dark .bootcamp-title {
  color: #f3edff !important;
}

html[data-theme="dark"] .bootcamp-description,
[data-theme="dark"] .bootcamp-description,
.dark .bootcamp-description {
  color: rgba(224, 220, 236, 0.78) !important;
}

html[data-theme="dark"] .bootcamp-button-primary,
[data-theme="dark"] .bootcamp-button-primary,
.dark .bootcamp-button-primary {
  border-color: rgba(196, 170, 255, 0.3) !important;
  background: #7130dd !important;
  box-shadow:
    0 18px 38px rgba(113, 48, 221, 0.34),
    0 0 34px rgba(126, 75, 255, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.24) !important;
}

html[data-theme="dark"] .bootcamp-button-secondary,
[data-theme="dark"] .bootcamp-button-secondary,
.dark .bootcamp-button-secondary {
  color: rgba(207, 190, 255, 0.9) !important;
  border-color: rgba(149, 104, 221, 0.38) !important;
  background: rgba(196, 170, 255, 0.045) !important;
}

html[data-theme="dark"] .bootcamp-metric,
[data-theme="dark"] .bootcamp-metric,
.dark .bootcamp-metric {
  border-color: rgba(149, 104, 221, 0.26) !important;
  background:
    radial-gradient(72% 74% at 18% 10%, rgba(91, 72, 122, 0.52), transparent 74%),
    linear-gradient(135deg, rgba(78, 58, 102, 0.36), rgba(34, 27, 45, 0.36)) !important;
  box-shadow:
    0 16px 38px rgba(5, 6, 12, 0.22),
    inset 0 1px 0 rgba(225, 206, 255, 0.07) !important;
}

html[data-theme="dark"] .bootcamp-metric span,
[data-theme="dark"] .bootcamp-metric span,
.dark .bootcamp-metric span {
  color: #f2ebff !important;
}

html[data-theme="dark"] .bootcamp-metric strong,
[data-theme="dark"] .bootcamp-metric strong,
.dark .bootcamp-metric strong {
  color: rgba(202, 177, 255, 0.88) !important;
}

html[data-theme="dark"] .bootcamp-topics span,
[data-theme="dark"] .bootcamp-topics span,
.dark .bootcamp-topics span {
  color: rgba(224, 220, 236, 0.78) !important;
}
</style>
