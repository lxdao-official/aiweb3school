<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import TimelineCard from './TimelineCard.vue'
import { roadmapData } from '../content/roadmap-data'

type RoadmapNode = (typeof roadmapData.modules.web3.nodes)[number]

interface FoundationRow {
  left?: RoadmapNode
  right?: RoadmapNode
}

const web3Module = roadmapData.modules.web3
const aiModule = roadmapData.modules.ai
const fusionModule = roadmapData.modules.fusion
const practiceModule = roadmapData.modules.practice

const foundationRows = computed<FoundationRow[]>(() => {
  const rowCount = Math.max(web3Module.nodes.length, aiModule.nodes.length)
  return Array.from({ length: rowCount }, (_, index) => ({
    left: web3Module.nodes[index],
    right: aiModule.nodes[index],
  }))
})

const fusionNodes = fusionModule.nodes
const practiceNodes = practiceModule.nodes
const timelineRef = ref<HTMLElement | null>(null)

function foundationOffset(side: 'left' | 'right', index: number) {
  const leftPattern = ['-10px', '18px', '-6px', '22px', '-8px', '16px', '-4px', '20px']
  const rightPattern = ['14px', '-12px', '20px', '-6px', '18px', '-8px', '22px', '-4px']
  return side === 'left' ? leftPattern[index % leftPattern.length] : rightPattern[index % rightPattern.length]
}

onMounted(() => {
  nextTick(() => {
    if (!timelineRef.value) return

    const nodes = timelineRef.value.querySelectorAll('.roadmap-reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.12 },
    )

    nodes.forEach((node) => observer.observe(node))
  })
})
</script>

<template>
  <section class="timeline-section" ref="timelineRef">
    <div class="timeline-shell">
      <section class="phase phase-foundation">
        <div class="phase-header roadmap-reveal">
          <h3 class="phase-title">{{ roadmapData.foundationTitle }}</h3>
        </div>

        <div class="track-headings roadmap-reveal">
          <span class="track-pill track-pill-web3">{{ web3Module.label }}</span>
          <span class="track-pill track-pill-ai">{{ aiModule.label }}</span>
        </div>

        <div class="foundation-roadmap">
          <div class="foundation-spine" />

          <div
            v-for="(row, index) in foundationRows"
            :key="row.left?.id ?? row.right?.id ?? index"
            class="foundation-row"
          >
            <TimelineCard
              v-if="row.left"
              class="roadmap-reveal"
              :style="{ transitionDelay: `${index * 60}ms`, marginTop: foundationOffset('left', index) }"
              v-bind="row.left"
              side="left"
            />
            <div v-else class="foundation-gap" />

            <span class="foundation-link foundation-link-left roadmap-reveal" />

            <div class="foundation-node roadmap-reveal" :style="{ transitionDelay: `${index * 60 + 20}ms` }">
              <span />
            </div>

            <span class="foundation-link foundation-link-right roadmap-reveal" />

            <TimelineCard
              v-if="row.right"
              class="roadmap-reveal"
              :style="{ transitionDelay: `${index * 60 + 40}ms`, marginTop: foundationOffset('right', index) }"
              v-bind="row.right"
              side="right"
            />
            <div v-else class="foundation-gap" />
          </div>
        </div>
      </section>

      <section class="phase phase-merge">
        <div class="phase-header roadmap-reveal">
          <h3 class="phase-title phase-pill">{{ roadmapData.fusionTitle }}</h3>
        </div>

        <div class="merge-bridge roadmap-reveal">
          <span class="merge-line merge-line-left" />
          <span class="merge-core" />
          <span class="merge-line merge-line-right" />
        </div>

        <div class="merge-stack">
          <div
            v-for="(card, index) in fusionNodes"
            :key="card.id"
            class="merge-row roadmap-reveal"
            :style="{ transitionDelay: `${index * 70}ms` }"
          >
            <TimelineCard v-bind="card" side="center" />
          </div>
        </div>
      </section>

      <section class="phase phase-branch">
        <div class="phase-header roadmap-reveal">
          <h3 class="phase-title">{{ roadmapData.practiceTitle }}</h3>
        </div>

        <div class="branch-network roadmap-reveal">
          <div class="branch-core">
            <span />
          </div>
          <div class="branch-rail" />
          <div class="branch-drop-lines">
            <span v-for="card in practiceNodes" :key="card.id" />
          </div>
        </div>

        <div class="branch-grid">
          <TimelineCard
            v-for="(card, index) in practiceNodes"
            :key="card.id"
            class="roadmap-reveal"
            :style="{ transitionDelay: `${index * 50}ms` }"
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
  padding: 56px 0 72px;
  overflow: clip;
  background: #fbfbf8;
}

.timeline-section::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(rgba(38, 63, 72, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(38, 63, 72, 0.05) 1px, transparent 1px);
  background-size: 28px 28px;
  opacity: 0.55;
}

.timeline-shell {
  position: relative;
  z-index: 1;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 24px;
}

.phase + .phase {
  margin-top: 56px;
}

.phase-header {
  text-align: center;
}

.phase-title {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  color: #1f3141;
  font-size: 30px;
  font-weight: 800;
  line-height: 1.05;
}

.phase-pill {
  padding: 0 22px;
  min-height: 54px;
  border: 2px solid #263f48;
  border-radius: 999px;
  background: #f6fbff;
  box-shadow: 0 3px 0 rgba(38, 63, 72, 0.12);
}

.track-headings {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 64px minmax(0, 1fr);
  gap: 18px;
  align-items: center;
  margin: 18px auto 22px;
}

.track-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 54px;
  padding: 0 24px;
  border: 2px solid #263f48;
  border-radius: 20px;
  background: #fff0b4;
  box-shadow: 0 3px 0 rgba(38, 63, 72, 0.12);
  font-size: 22px;
  font-weight: 700;
}

.track-pill-web3 {
  grid-column: 1;
  color: #2d6cdf;
}

.track-pill-ai {
  grid-column: 3;
  color: #26936c;
}

.foundation-roadmap {
  position: relative;
  max-width: 1180px;
  margin: 0 auto;
}

.foundation-spine {
  position: absolute;
  left: 50%;
  top: 22px;
  bottom: 22px;
  width: 4px;
  transform: translateX(-50%);
  background: #2d4048;
  border-radius: 999px;
}

.foundation-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 28px 46px 28px minmax(0, 1fr);
  align-items: center;
  gap: 0;
}

.foundation-row + .foundation-row {
  margin-top: 26px;
}

.foundation-gap {
  min-height: 1px;
}

.foundation-link {
  display: block;
  width: 100%;
  height: 4px;
  background: #2d4048;
  border-radius: 999px;
}

.foundation-link-left {
  grid-column: 2;
}

.foundation-link-right {
  grid-column: 4;
}

.foundation-node,
.branch-core {
  display: flex;
  align-items: center;
  justify-content: center;
}

.foundation-node span,
.branch-core span,
.merge-core {
  display: inline-flex;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 4px solid #2d4048;
  background: #fbfbf8;
}

.merge-bridge {
  position: relative;
  width: min(560px, 72%);
  height: 34px;
  margin: 10px auto 24px;
}

.merge-line {
  position: absolute;
  top: 15px;
  width: calc(50% - 22px);
  height: 4px;
  background: #2d4048;
  border-radius: 999px;
}

.merge-line-left {
  left: 0;
}

.merge-line-right {
  right: 0;
}

.merge-core {
  position: absolute;
  left: 50%;
  top: 7px;
  transform: translateX(-50%);
}

.merge-stack {
  display: grid;
  gap: 24px;
  max-width: 1040px;
  margin: 0 auto;
}

.merge-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
}

.branch-network {
  position: relative;
  max-width: 1120px;
  margin: 0 auto 24px;
  padding-top: 6px;
}

.branch-core {
  margin-bottom: 14px;
}

.branch-rail {
  width: 100%;
  height: 4px;
  margin: 0 auto;
  border-radius: 999px;
  background: #2d4048;
}

.branch-drop-lines {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 28px;
  width: 100%;
  margin-top: 0;
  padding: 0 64px;
}

.branch-drop-lines span {
  justify-self: center;
  width: 4px;
  height: 28px;
  border-radius: 999px;
  background: #2d4048;
}

.branch-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px 22px;
  max-width: 1120px;
  margin: 0 auto;
}

.roadmap-reveal {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 0.45s ease,
    transform 0.45s ease;
}

.roadmap-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 1080px) {
  .timeline-shell {
    padding: 0 18px;
  }

  .track-headings {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .track-pill-web3,
  .track-pill-ai {
    grid-column: auto;
  }

  .foundation-roadmap {
    max-width: 980px;
  }

  .foundation-row {
    grid-template-columns: minmax(0, 1fr) 18px 38px 18px minmax(0, 1fr);
  }

  .branch-grid,
  .branch-drop-lines {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 860px) {
  .phase-title {
    font-size: 26px;
  }

  .track-pill {
    font-size: 20px;
  }

  .foundation-spine {
    display: none;
  }

  .foundation-row {
    grid-template-columns: minmax(0, 1fr);
    gap: 12px;
  }

  .foundation-link,
  .foundation-node {
    display: none;
  }

  .foundation-row + .foundation-row {
    margin-top: 20px;
  }

  .merge-bridge,
  .branch-network {
    display: none;
  }

  .branch-grid {
    grid-template-columns: 1fr;
  }
}
</style>
