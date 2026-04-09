<script setup lang="ts">
import { useRouter } from 'vuepress/client'

type CardTone = 'web3' | 'ai' | 'fusion' | 'future'
type CardVariant = 'foundation' | 'fusion' | 'branch'
type CardSide = 'left' | 'right' | 'center'

const props = defineProps<{
  title: string
  description: string
  link?: string
  icon: string
  tone: CardTone
  variant: CardVariant
  side?: CardSide
  kicker?: string
}>()

const router = useRouter()

function navigate() {
  if (!props.link) return
  router.push(props.link)
}
</script>

<template>
  <article
    class="timeline-card"
    :class="[
      { clickable: Boolean(link) },
      `tone-${tone}`,
      `variant-${variant}`,
      `side-${side ?? 'center'}`,
    ]"
    @click="navigate"
  >
    <div class="card-sheen" />
    <div class="card-noise" />
    <div class="card-content">
      <div class="card-header">
        <span class="card-icon">{{ icon }}</span>
        <h4 class="card-title">{{ title }}</h4>
      </div>
      <p class="card-desc">{{ description }}</p>
    </div>
  </article>
</template>

<style scoped>
.timeline-card {
  position: relative;
  overflow: hidden;
  border-radius: 22px;
  min-height: 134px;
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.88);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.84), rgba(247, 250, 255, 0.56)),
    rgba(255, 255, 255, 0.45);
  box-shadow:
    16px 16px 34px rgba(148, 163, 184, 0.18),
    -12px -12px 28px rgba(255, 255, 255, 0.96),
    inset 1px 1px 0 rgba(255, 255, 255, 0.92),
    inset -1px -1px 0 rgba(214, 223, 237, 0.55);
  backdrop-filter: blur(24px) saturate(145%);
  -webkit-backdrop-filter: blur(24px) saturate(145%);
  transition:
    transform 0.35s ease,
    scale 0.35s ease,
    border-color 0.35s ease,
    box-shadow 0.35s ease,
    background-color 0.35s ease,
    filter 0.35s ease;
}

.timeline-card.clickable {
  cursor: pointer;
}

.timeline-card.clickable:hover {
  transform: translateY(-6px);
  filter: saturate(1.05);
}

.card-sheen {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 12% 14%, rgba(255, 255, 255, 0.92), transparent 26%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.5), transparent 42%);
  opacity: 0.9;
  transition:
    opacity 0.35s ease,
    transform 0.45s ease;
}

.card-noise {
  position: absolute;
  inset: 1px;
  border-radius: 23px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.3), transparent 18%, rgba(234, 240, 248, 0.26)),
    linear-gradient(135deg, rgba(255, 255, 255, 0.16), transparent 46%);
  opacity: 0.78;
}

.card-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 100%;
  padding: 12px 14px;
  text-align: center;
}

.card-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
  width: 100%;
}

.card-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  font-size: 17px;
  color: rgba(79, 95, 120, 0.96);
  background: rgba(255, 255, 255, 0.52);
  box-shadow:
    6px 6px 14px rgba(148, 163, 184, 0.12),
    -5px -5px 12px rgba(255, 255, 255, 0.95),
    inset 1px 1px 0 rgba(255, 255, 255, 0.74);
}

.card-title {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  line-height: 1.18;
  letter-spacing: -0.03em;
  color: rgba(24, 36, 58, 0.96);
  text-align: center;
  text-wrap: balance;
}

.card-desc {
  max-width: 24ch;
  margin: 0 auto;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.55;
  letter-spacing: -0.01em;
  color: rgba(88, 103, 128, 0.9);
  text-align: center;
  text-wrap: balance;
}

.tone-web3 {
  border-color: rgba(164, 144, 255, 0.24);
  background:
    linear-gradient(180deg, rgba(252, 250, 255, 0.92), rgba(243, 242, 255, 0.62)),
    rgba(255, 255, 255, 0.5);
  box-shadow:
    16px 16px 34px rgba(148, 163, 184, 0.18),
    -12px -12px 28px rgba(255, 255, 255, 0.96),
    inset 3px 0 0 rgba(157, 126, 255, 0.48),
    inset 1px 1px 0 rgba(255, 255, 255, 0.88);
}

.tone-web3 .card-icon {
  background: rgba(132, 111, 255, 0.12);
}

.timeline-card.clickable.tone-web3:hover {
  border-color: rgba(151, 122, 255, 0.42);
  box-shadow:
    18px 18px 36px rgba(148, 163, 184, 0.2),
    -12px -12px 28px rgba(255, 255, 255, 1),
    0 0 0 1px rgba(157, 126, 255, 0.08),
    inset 3px 0 0 rgba(157, 126, 255, 0.7),
    inset 1px 1px 0 rgba(255, 255, 255, 0.92);
}

.tone-ai {
  border-color: rgba(91, 216, 181, 0.22);
  background:
    linear-gradient(180deg, rgba(248, 255, 252, 0.9), rgba(239, 252, 247, 0.62)),
    rgba(255, 255, 255, 0.5);
  box-shadow:
    16px 16px 34px rgba(148, 163, 184, 0.18),
    -12px -12px 28px rgba(255, 255, 255, 0.96),
    inset -3px 0 0 rgba(70, 221, 182, 0.42),
    inset 1px 1px 0 rgba(255, 255, 255, 0.88);
}

.tone-ai .card-icon {
  background: rgba(56, 214, 169, 0.12);
}

.timeline-card.clickable.tone-ai:hover {
  border-color: rgba(56, 214, 169, 0.38);
  box-shadow:
    18px 18px 36px rgba(148, 163, 184, 0.2),
    -12px -12px 28px rgba(255, 255, 255, 1),
    0 0 0 1px rgba(56, 214, 169, 0.08),
    inset -3px 0 0 rgba(70, 221, 182, 0.68),
    inset 1px 1px 0 rgba(255, 255, 255, 0.92);
}

.tone-fusion {
  border-color: rgba(114, 163, 236, 0.34);
  background:
    radial-gradient(circle at 50% 12%, rgba(167, 201, 255, 0.18), transparent 34%),
    linear-gradient(180deg, rgba(251, 253, 255, 0.95), rgba(238, 245, 255, 0.72)),
    rgba(255, 255, 255, 0.56);
  box-shadow:
    18px 18px 36px rgba(148, 163, 184, 0.2),
    -12px -12px 28px rgba(255, 255, 255, 0.96),
    0 8px 24px rgba(126, 171, 235, 0.08),
    inset 0 0 0 1px rgba(173, 196, 233, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.88);
}

.tone-fusion .card-icon {
  background: rgba(126, 171, 235, 0.18);
  box-shadow:
    8px 8px 16px rgba(148, 163, 184, 0.12),
    -6px -6px 14px rgba(255, 255, 255, 0.98),
    inset 1px 1px 0 rgba(255, 255, 255, 0.76),
    inset 0 0 0 1px rgba(126, 171, 235, 0.12);
}

.timeline-card.clickable.tone-fusion:hover {
  border-color: rgba(114, 163, 236, 0.5);
  box-shadow:
    20px 20px 38px rgba(148, 163, 184, 0.22),
    -12px -12px 28px rgba(255, 255, 255, 1),
    0 0 0 1px rgba(126, 171, 235, 0.12),
    0 10px 28px rgba(126, 171, 235, 0.12),
    inset 0 0 0 1px rgba(173, 196, 233, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.92);
}

.tone-future {
  border-color: rgba(255, 187, 96, 0.26);
  background:
    radial-gradient(circle at 50% 10%, rgba(255, 204, 140, 0.18), transparent 34%),
    linear-gradient(180deg, rgba(255, 252, 246, 0.94), rgba(255, 247, 235, 0.72)),
    rgba(255, 255, 255, 0.54);
  box-shadow:
    18px 18px 36px rgba(148, 163, 184, 0.2),
    -12px -12px 28px rgba(255, 255, 255, 0.96),
    0 10px 24px rgba(255, 187, 96, 0.08),
    inset 0 0 0 1px rgba(255, 214, 158, 0.14),
    inset 0 1px 0 rgba(255, 255, 255, 0.88);
}

.tone-future .card-icon {
  background: rgba(255, 187, 96, 0.16);
  box-shadow:
    8px 8px 16px rgba(148, 163, 184, 0.12),
    -6px -6px 14px rgba(255, 255, 255, 0.98),
    inset 1px 1px 0 rgba(255, 255, 255, 0.76),
    inset 0 0 0 1px rgba(255, 187, 96, 0.1);
}

.timeline-card.clickable.tone-future:hover {
  border-color: rgba(255, 187, 96, 0.42);
  box-shadow:
    20px 20px 38px rgba(148, 163, 184, 0.22),
    -12px -12px 28px rgba(255, 255, 255, 1),
    0 0 0 1px rgba(255, 187, 96, 0.1),
    0 12px 30px rgba(255, 187, 96, 0.12),
    inset 0 0 0 1px rgba(255, 214, 158, 0.18),
    inset 1px 1px 0 rgba(255, 255, 255, 0.92);
}

.variant-foundation {
  min-height: 112px;
}

.variant-fusion {
  min-height: 104px;
}

.variant-branch {
  min-height: 118px;
}

.variant-branch .card-content {
  padding: 13px 14px 14px;
}

.variant-branch .card-title {
  font-size: 18px;
}

.variant-branch .card-desc {
  font-size: 12.5px;
  color: rgba(84, 98, 118, 0.92);
}

.timeline-card.clickable:hover .card-icon {
  transform: translateY(-1px) scale(1.04);
}

.timeline-card.clickable:hover .card-sheen {
  opacity: 1;
  transform: translateX(8px);
}

.card-icon {
  transition: transform 0.3s ease;
}

@media (max-width: 860px) {
  .timeline-card {
    min-height: auto;
  }

  .card-content {
    padding: 12px 13px 13px;
  }

  .card-title {
    font-size: 16px;
  }

  .card-desc {
    font-size: 11px;
  }
}
</style>
