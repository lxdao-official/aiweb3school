<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import TimelineCard from './TimelineCard.vue'
import roadmapSource from '../content/roadmap.md?raw'

interface RoadmapCard {
  title: string
  description: string
  icon: string
  kicker: string
  tone: 'web3' | 'ai' | 'fusion' | 'future'
  variant: 'foundation' | 'fusion' | 'branch'
  link?: string
}

interface FoundationRow {
  left: RoadmapCard
  right: RoadmapCard
}

function extractJsonBlock(section: string) {
  const escapedSection = section.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const pattern = new RegExp(`##\\s+${escapedSection}[\\s\\S]*?\\\`\\\`\\\`json\\n([\\s\\S]*?)\\n\\\`\\\`\\\``, 'm')
  const match = roadmapSource.match(pattern)

  if (!match?.[1]) {
    throw new Error(`Missing roadmap section: ${section}`)
  }

  return match[1]
}

function parseRoadmapSection<T>(section: string): T {
  return JSON.parse(extractJsonBlock(section)) as T
}

const foundationRows = parseRoadmapSection<FoundationRow[]>('foundation')
const mergeCards = parseRoadmapSection<RoadmapCard[]>('merge')
const branchCards = parseRoadmapSection<RoadmapCard[]>('branch')

const timelineRef = ref<HTMLElement | null>(null)

onMounted(() => {
  nextTick(() => {
    if (!timelineRef.value) return

    const nodes = timelineRef.value.querySelectorAll('.roadmap-reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )

    nodes.forEach((node) => observer.observe(node))
  })
})
</script>

<template>
  <section class="timeline-section" ref="timelineRef">
    <div class="timeline-shell">
      <section class="phase phase-foundation">
        <div class="phase-header phase-header-major roadmap-reveal">
          <h3 class="phase-title phase-title-major">基础课程</h3>
        </div>

        <div class="track-headings roadmap-reveal">
          <span class="track-pill track-pill-web3">Web3</span>
          <span class="track-pill track-pill-ai">AI</span>
        </div>

        <div class="foundation-roadmap">
          <div class="foundation-spine" />

          <div
            v-for="(row, index) in foundationRows"
            :key="row.left.title"
            class="foundation-row"
          >
            <TimelineCard
              class="roadmap-reveal"
              :style="{ transitionDelay: `${index * 70}ms` }"
              v-bind="row.left"
              side="left"
            />

            <div
              class="foundation-node roadmap-reveal"
              :style="{ transitionDelay: `${index * 70 + 40}ms` }"
            >
              <span />
            </div>

            <TimelineCard
              class="roadmap-reveal"
              :style="{ transitionDelay: `${index * 70 + 80}ms` }"
              v-bind="row.right"
              side="right"
            />
          </div>
        </div>
      </section>

      <section class="phase phase-merge">
        <div class="phase-header phase-header-minor roadmap-reveal">
          <h3 class="phase-title phase-pill phase-pill-fusion">AI × Web3</h3>
        </div>

        <div class="merge-bridge roadmap-reveal">
          <span class="merge-line merge-line-left" />
          <span class="merge-core" />
          <span class="merge-line merge-line-right" />
        </div>

        <div class="merge-stack">
          <div class="merge-spine" />

          <div
            v-for="(card, index) in mergeCards"
            :key="card.title"
            class="merge-row roadmap-reveal"
            :style="{ transitionDelay: `${index * 90}ms` }"
          >
            <div class="merge-node">
              <span />
            </div>

            <TimelineCard v-bind="card" side="center" />
          </div>
        </div>
      </section>

      <section class="phase phase-branch">
        <div class="phase-header phase-header-major roadmap-reveal">
          <h3 class="phase-title phase-title-major">赛道实践</h3>
        </div>

        <div class="branch-network roadmap-reveal">
          <div class="branch-core">
            <span />
          </div>
          <div class="branch-rail" />
          <div class="branch-drop-lines">
            <span v-for="card in branchCards" :key="card.title" />
          </div>
        </div>

        <div class="branch-grid">
          <TimelineCard
            v-for="(card, index) in branchCards"
            :key="card.title"
            class="roadmap-reveal"
            :style="{ transitionDelay: `${index * 80}ms` }"
            v-bind="card"
            side="center"
          />
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.timeline-section {
  position: relative;
  margin-top: 0;
  padding: 64px 0 72px;
  overflow: clip;
  isolation: isolate;
}

.timeline-section::before {
  content: '';
  position: absolute;
  top: -120px;
  bottom: -48px;
  left: calc(50% - 50vw);
  right: calc(50% - 50vw);
  pointer-events: none;
  z-index: -2;
  background:
    radial-gradient(circle at 16% 22%, rgba(141, 118, 255, 0.14), transparent 28%),
    radial-gradient(circle at 84% 18%, rgba(80, 220, 185, 0.12), transparent 24%),
    radial-gradient(circle at 52% 52%, rgba(106, 164, 255, 0.1), transparent 30%),
    linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.9) 18%, rgba(255, 255, 255, 0.96) 100%);
  animation: drift-halo 14s ease-in-out infinite;
}

.timeline-section::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: -1;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.18) 24%, rgba(255, 255, 255, 0) 100%);
}

.timeline-shell {
  --rail-web3: rgba(140, 118, 255, 0.85);
  --rail-ai: rgba(62, 214, 177, 0.82);
  --rail-fusion: rgba(114, 161, 255, 0.84);
  position: relative;
  max-width: 1240px;
  margin: 0 auto;
  padding: 18px 18px 34px;
}

.phase + .phase {
  margin-top: 30px;
}

.phase-header {
  width: 100%;
  text-align: center;
}

.phase-header-major {
  margin-bottom: 14px;
}

.phase-header-minor {
  margin-bottom: 10px;
}

.phase-title {
  margin: 0;
  color: rgba(26, 39, 61, 0.94);
  text-align: center;
}

.phase-title-major {
  font-size: 30px;
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.05em;
}

.phase-title-minor {
  font-size: 21px;
  font-weight: 700;
  line-height: 1.14;
  letter-spacing: -0.04em;
}

.phase-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 18px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.9);
  background: rgba(255, 255, 255, 0.64);
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.02em;
  box-shadow:
    10px 10px 24px rgba(148, 163, 184, 0.14),
    -8px -8px 20px rgba(255, 255, 255, 0.92),
    inset 1px 1px 0 rgba(255, 255, 255, 0.76);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.phase-pill-fusion {
  color: transparent;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.78), rgba(247, 250, 255, 0.56)),
    rgba(255, 255, 255, 0.64);
  box-shadow:
    10px 10px 24px rgba(148, 163, 184, 0.14),
    -8px -8px 20px rgba(255, 255, 255, 0.92),
    inset 1px 1px 0 rgba(255, 255, 255, 0.76),
    inset 0 0 0 1px rgba(126, 171, 235, 0.08);
  background-clip: padding-box;
  position: relative;
}

.phase-pill-fusion::before {
  content: 'AI × Web3';
  position: absolute;
  inset: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, rgba(97, 74, 186, 0.94), rgba(114, 161, 255, 0.94), rgba(30, 147, 114, 0.9));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.track-headings {
  display: grid;
  grid-template-columns: minmax(0, 364px) 42px minmax(0, 364px);
  justify-content: center;
  align-items: center;
  max-width: 870px;
  margin: 0 auto 20px;
  gap: 12px;
  padding: 0;
}

.track-pill {
  display: inline-flex;
  font-family: inherit;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 18px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.9);
  background: rgba(255, 255, 255, 0.64);
  color: rgba(72, 92, 126, 0.88);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.02em;
  box-shadow:
    10px 10px 24px rgba(148, 163, 184, 0.14),
    -8px -8px 20px rgba(255, 255, 255, 0.92),
    inset 1px 1px 0 rgba(255, 255, 255, 0.76);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  justify-self: center;
}

.track-pill-web3 {
  grid-column: 1;
  color: rgba(97, 74, 186, 0.9);
}

.track-pill-ai {
  grid-column: 3;
  color: rgba(30, 147, 114, 0.88);
}

.foundation-roadmap {
  position: relative;
  max-width: 870px;
  margin: 0 auto;
}

.foundation-roadmap::before,
.foundation-roadmap::after {
  content: '';
  position: absolute;
  top: 12px;
  bottom: 12px;
  width: 188px;
  pointer-events: none;
  filter: blur(28px);
  opacity: 0.26;
}

.foundation-roadmap::before {
  left: 8px;
  background: linear-gradient(180deg, rgba(157, 126, 255, 0.18), rgba(157, 126, 255, 0.04));
}

.foundation-roadmap::after {
  right: 8px;
  background: linear-gradient(180deg, rgba(70, 221, 182, 0.18), rgba(70, 221, 182, 0.04));
}

.foundation-spine {
  position: absolute;
  left: 50%;
  top: 14px;
  bottom: 14px;
  width: 2px;
  transform: translateX(-50%);
  background: linear-gradient(180deg, var(--rail-web3), var(--rail-fusion), var(--rail-ai));
  box-shadow: 0 0 22px rgba(114, 161, 255, 0.18);
  animation: pulse-rail 5.2s ease-in-out infinite;
}

.foundation-row {
  display: grid;
  grid-template-columns: minmax(0, 364px) 42px minmax(0, 364px);
  justify-content: center;
  gap: 12px;
  align-items: center;
}

.foundation-row + .foundation-row {
  margin-top: 14px;
}

.foundation-node,
.merge-node,
.branch-core {
  display: flex;
  align-items: center;
  justify-content: center;
}

.foundation-node span,
.merge-node span,
.branch-core span {
  display: inline-flex;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.95);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.94), rgba(224, 233, 247, 0.72));
  box-shadow:
    8px 8px 18px rgba(148, 163, 184, 0.18),
    -6px -6px 16px rgba(255, 255, 255, 0.98),
    inset 1px 1px 0 rgba(255, 255, 255, 0.88),
    inset -1px -1px 0 rgba(171, 195, 240, 0.3);
  animation: pulse-node 4.6s ease-in-out infinite;
}

.merge-bridge {
  position: relative;
  width: min(404px, 64%);
  height: 36px;
  margin: 0 auto 6px;
}

.merge-line {
  position: absolute;
  top: 18px;
  width: calc(50% - 18px);
  height: 1px;
}

.merge-line-left {
  left: 0;
  background: linear-gradient(90deg, rgba(140, 118, 255, 0.16), rgba(114, 161, 255, 1));
  box-shadow: 0 0 14px rgba(114, 161, 255, 0.16);
}

.merge-line-right {
  right: 0;
  background: linear-gradient(90deg, rgba(62, 214, 177, 0.16), rgba(114, 161, 255, 1));
  box-shadow: 0 0 14px rgba(114, 161, 255, 0.16);
  transform: scaleX(-1);
}

.merge-core {
  position: absolute;
  left: 50%;
  top: 9px;
  width: 18px;
  height: 18px;
  transform: translateX(-50%);
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.98);
  background:
    radial-gradient(circle at 50% 34%, rgba(174, 208, 255, 0.28), transparent 46%),
    linear-gradient(145deg, rgba(255, 255, 255, 0.98), rgba(223, 235, 249, 0.82));
  box-shadow:
    10px 10px 22px rgba(148, 163, 184, 0.18),
    -8px -8px 18px rgba(255, 255, 255, 0.98),
    0 0 18px rgba(126, 171, 235, 0.18),
    inset 1px 1px 0 rgba(255, 255, 255, 0.88);
  animation: pulse-node 4.4s ease-in-out infinite;
}

.merge-stack {
  position: relative;
  max-width: 446px;
  margin: 0 auto;
}

.merge-stack::before {
  content: '';
  position: absolute;
  inset: 14px 24px;
  pointer-events: none;
  border-radius: 999px;
  background:
    radial-gradient(circle at 18% 16%, rgba(157, 126, 255, 0.12), transparent 34%),
    radial-gradient(circle at 82% 18%, rgba(70, 221, 182, 0.11), transparent 32%),
    radial-gradient(circle at 50% 0%, rgba(126, 171, 235, 0.14), transparent 46%),
    linear-gradient(180deg, rgba(126, 171, 235, 0.12), rgba(126, 171, 235, 0.02));
  filter: blur(20px);
  opacity: 0.3;
}

.merge-spine {
  display: none;
}

.merge-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.merge-row + .merge-row {
  margin-top: 12px;
}

.branch-network {
  max-width: 870px;
  margin: 0 auto 14px;
}

.branch-core {
  margin-bottom: 12px;
}

.branch-rail {
  width: calc(100% - 120px);
  height: 3px;
  margin: 0 auto;
  background: linear-gradient(90deg, rgba(140, 118, 255, 0.74), rgba(114, 161, 255, 0.96), rgba(240, 179, 108, 0.82));
  box-shadow:
    0 0 20px rgba(114, 161, 255, 0.16),
    0 0 32px rgba(255, 187, 96, 0.12);
}

.branch-drop-lines {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

.branch-drop-lines span {
  display: block;
  justify-self: center;
  width: 3px;
  height: 28px;
  background: linear-gradient(180deg, rgba(114, 161, 255, 0.94), rgba(240, 179, 108, 0));
}

.branch-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 264px));
  justify-content: center;
  gap: 12px;
  max-width: 820px;
  margin: 0 auto;
}

.branch-grid::before {
  content: '';
  position: absolute;
  inset: auto 8% -10px;
  height: 140px;
  pointer-events: none;
  border-radius: 999px;
  background: radial-gradient(circle at 50% 0%, rgba(255, 187, 96, 0.18), transparent 62%);
  filter: blur(26px);
  opacity: 0.64;
}

.roadmap-reveal {
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 0.7s ease,
    transform 0.7s ease;
}

.roadmap-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.foundation-row .roadmap-reveal,
.merge-row.roadmap-reveal,
.branch-grid .roadmap-reveal {
  animation: float-card 7s ease-in-out infinite;
}

.foundation-row:nth-child(2n) .roadmap-reveal,
.branch-grid .roadmap-reveal:nth-child(2n) {
  animation-delay: 1.2s;
}

.branch-grid .roadmap-reveal:nth-child(3n) {
  animation-delay: 2.2s;
}

@keyframes float-card {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

@keyframes drift-halo {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 0.92;
  }
  50% {
    transform: translate3d(0, 8px, 0);
    opacity: 1;
  }
}

@keyframes pulse-node {
  0%,
  100% {
    box-shadow:
      8px 8px 18px rgba(148, 163, 184, 0.18),
      -6px -6px 16px rgba(255, 255, 255, 0.98),
      inset 1px 1px 0 rgba(255, 255, 255, 0.88),
      inset -1px -1px 0 rgba(171, 195, 240, 0.3);
  }
  50% {
    box-shadow:
      10px 10px 22px rgba(148, 163, 184, 0.24),
      -8px -8px 18px rgba(255, 255, 255, 1),
      inset 1px 1px 0 rgba(255, 255, 255, 0.92),
      inset -1px -1px 0 rgba(141, 174, 236, 0.42);
  }
}

@keyframes pulse-rail {
  0%,
  100% {
    opacity: 0.88;
  }
  50% {
    opacity: 1;
  }
}

@media (max-width: 1100px) {
  .timeline-shell {
    padding: 8px 14px 28px;
  }

  .foundation-row {
    grid-template-columns: minmax(0, 320px) 30px minmax(0, 320px);
    gap: 10px;
  }

  .branch-grid {
    grid-template-columns: repeat(2, minmax(0, 264px));
  }

  .branch-drop-lines {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .timeline-section {
    margin-top: 0;
    padding: 42px 0 44px;
  }

  .timeline-shell {
    padding: 4px 8px 20px;
  }

  .track-headings {
    grid-template-columns: minmax(0, 320px) 30px minmax(0, 320px);
    gap: 10px;
    margin-bottom: 14px;
  }

  .phase-title-major {
    font-size: 24px;
  }

  .phase-title-minor {
    font-size: 18px;
  }

  .foundation-spine {
    left: 14px;
  }

  .foundation-row {
    grid-template-columns: 28px minmax(0, 1fr);
    gap: 12px;
  }

  .foundation-row > :first-child {
    order: 2;
  }

  .foundation-row > :last-child {
    order: 3;
  }

  .foundation-node {
    order: 1;
  }

  .merge-spine {
    left: 14px;
  }

  .merge-row {
    grid-template-columns: 28px minmax(0, 1fr);
    gap: 12px;
  }

  .branch-rail {
    width: calc(100% - 40px);
  }

  .branch-grid,
  .branch-drop-lines {
    grid-template-columns: 1fr;
  }

  .branch-drop-lines span {
    height: 22px;
  }
}

@media (max-width: 640px) {
  .track-headings {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
  }
}
</style>
