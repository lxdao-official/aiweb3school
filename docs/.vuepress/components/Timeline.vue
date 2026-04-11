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
  topics?: string[]
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
  padding: 56px 0 72px;
  overflow: clip;
  isolation: isolate;
  background: #fbfbf8;
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
    linear-gradient(rgba(42, 68, 76, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(42, 68, 76, 0.06) 1px, transparent 1px),
    linear-gradient(180deg, rgba(255, 255, 255, 0.86), rgba(250, 250, 246, 0.96));
  background-size: 28px 28px, 28px 28px, auto;
}

.timeline-section::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: -1;
  background: radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.86), transparent 34%);
}

.timeline-shell {
  --rail-web3: #2d6cdf;
  --rail-ai: #2a8a64;
  --rail-fusion: #263f48;
  position: relative;
  max-width: 1180px;
  margin: 0 auto;
  padding: 18px 22px 34px;
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
  letter-spacing: 0;
}

.phase-title-minor {
  font-size: 21px;
  font-weight: 700;
  line-height: 1.14;
  letter-spacing: 0;
}

.phase-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  padding: 0 16px;
  border-radius: 6px;
  border: 2px solid #263f48;
  background: #fff4bf;
  font-family: inherit;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0;
}

.phase-pill-fusion {
  color: #1e3440;
  background: #dcf4ff;
}

.track-headings {
  display: grid;
  grid-template-columns: minmax(0, 440px) 46px minmax(0, 440px);
  justify-content: center;
  align-items: center;
  max-width: 980px;
  margin: 0 auto 20px;
  gap: 12px;
  padding: 0;
}

.track-pill {
  display: inline-flex;
  font-family: inherit;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  padding: 0 16px;
  border-radius: 6px;
  border: 2px solid #263f48;
  background: #fff4bf;
  color: #263f48;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0;
  justify-self: center;
}

.track-pill-web3 {
  grid-column: 1;
  color: #245bb7;
}

.track-pill-ai {
  grid-column: 3;
  color: #23724f;
}

.foundation-roadmap {
  position: relative;
  max-width: 980px;
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
  opacity: 0;
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
  width: 3px;
  transform: translateX(-50%);
  background: var(--rail-fusion);
}

.foundation-row {
  display: grid;
  grid-template-columns: minmax(0, 440px) 46px minmax(0, 440px);
  justify-content: center;
  gap: 14px;
  align-items: center;
}

.foundation-row + .foundation-row {
  margin-top: 18px;
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
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 3px solid #263f48;
  background: #fbfbf8;
}

.merge-bridge {
  position: relative;
  width: min(520px, 72%);
  height: 40px;
  margin: 0 auto 10px;
}

.merge-line {
  position: absolute;
  top: 18px;
  width: calc(50% - 18px);
  height: 3px;
}

.merge-line-left {
  left: 0;
  background: #263f48;
}

.merge-line-right {
  right: 0;
  background: #263f48;
  transform: scaleX(-1);
}

.merge-core {
  position: absolute;
  left: 50%;
  top: 9px;
  width: 16px;
  height: 16px;
  transform: translateX(-50%);
  border-radius: 50%;
  border: 3px solid #263f48;
  background: #fbfbf8;
}

.merge-stack {
  position: relative;
  max-width: 760px;
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
  opacity: 0;
}

.merge-spine {
  display: none;
}

.merge-row {
  display: grid;
  grid-template-columns: minmax(0, 760px);
  justify-content: center;
  align-items: center;
}

.merge-row + .merge-row {
  margin-top: 18px;
}

.branch-network {
  max-width: 920px;
  margin: 0 auto 14px;
}

.branch-core {
  margin-bottom: 12px;
}

.branch-rail {
  width: calc(100% - 20px);
  height: 3px;
  margin: 0 auto;
  background: #263f48;
}

.branch-drop-lines {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 18px;
}

.branch-drop-lines span {
  display: block;
  justify-self: center;
  width: 3px;
  height: 28px;
  background: #263f48;
}

.branch-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 156px));
  justify-content: center;
  gap: 14px;
  max-width: 1020px;
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
  opacity: 0;
}

.roadmap-reveal {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 0.7s ease,
    transform 0.7s ease;
}

.roadmap-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 1100px) {
  .timeline-shell {
    padding: 8px 14px 28px;
  }

  .foundation-row {
    grid-template-columns: minmax(0, 1fr) 30px minmax(0, 1fr);
    gap: 10px;
  }

  .branch-grid {
    grid-template-columns: repeat(3, minmax(0, 180px));
  }

  .branch-drop-lines {
    grid-template-columns: repeat(3, minmax(0, 1fr));
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
    grid-template-columns: minmax(0, 1fr);
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
