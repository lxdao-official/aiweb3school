<script setup lang="ts">
import { computed, markRaw } from 'vue'
import { ClientOnly, useRouteLocale, withBase } from 'vuepress/client'
import {
  MarkerType,
  VueFlow,
  type Edge,
  type Node,
  type NodeMouseEvent,
} from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import RoadmapFlowNode, { type RoadmapFlowNodeData } from './RoadmapFlowNode.vue'
import { homeI18n, type HomeLocale } from '../content/home-i18n'
import { getRoadmapEntries, handbookRoadmap, type HandbookRoadmapEntry } from '../content/handbook-roadmap'

type RoadmapNode = Node<RoadmapFlowNodeData>

const routeLocale = useRouteLocale()
const localeKey = computed<HomeLocale>(() => routeLocale.value === '/en/' ? 'en' : 'zh')
const content = computed(() => homeI18n[localeKey.value])
const roadmapContent = computed(() => handbookRoadmap[localeKey.value])
const sponsorSlots = Array.from({ length: 6 }, (_, index) => ({ id: `slot-${index + 1}` }))
const nodeTypes = { roadmap: markRaw(RoadmapFlowNode) }

const nodeWidth = {
  stage: 260,
  branch: 220,
  lesson: 190,
  product: 228,
  challenge: 210,
  junction: 10,
}

const layout = {
  centerX: 540,
  aiLaneX: 240,
  web3LaneX: 840,
  branchY: 36,
  firstFoundationY: 132,
  foundationGap: 78,
  mergeGap: 104,
  productGap: 76,
  challengeGap: 128,
}

function makeNode(
  id: string,
  title: string,
  tone: RoadmapFlowNodeData['tone'],
  variant: RoadmapFlowNodeData['variant'],
  x: number,
  y: number,
  width: number,
  link?: string,
): RoadmapNode {
  return {
    id,
    type: 'roadmap',
    position: { x, y },
    width,
    draggable: false,
    selectable: Boolean(link),
    connectable: false,
    focusable: Boolean(link),
    data: { title, tone, variant, link },
  }
}

function makeEdge(source: string, target: string, extra: Partial<Edge> = {}): Edge {
  return {
    id: `${source}-${target}`,
    source,
    target,
    type: 'smoothstep',
    selectable: false,
    focusable: false,
    updatable: false,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: 'rgba(203, 140, 255, 0.92)',
      width: 14,
      height: 14,
    },
    class: 'roadmap-flow-edge',
    ...extra,
  }
}

function foundationLane(
  branch: 'ai' | 'web3',
  title: string,
  entries: HandbookRoadmapEntry[],
  laneCenterX: number,
  branchY: number,
): { nodes: RoadmapNode[], edges: Edge[], lastJunctionId: string, lastY: number } {
  const tone = branch === 'ai' ? 'ai' : 'web3'
  const nodes: RoadmapNode[] = []
  const edges: Edge[] = []
  const branchTitleId = `${branch}-title`
  const branchLink = entries[0]?.link

  nodes.push(makeNode(
    branchTitleId,
    title,
    tone,
    'branch-title',
    laneCenterX - nodeWidth.branch / 2,
    branchY,
    nodeWidth.branch,
    branchLink,
  ))

  let previousMainId = branchTitleId
  let lastJunctionId = branchTitleId
  let lastY = branchY

  entries.forEach((entry, index) => {
    const y = layout.firstFoundationY + index * layout.foundationGap
    const junctionId = `${branch}-junction-${entry.id}`
    const side = branch === 'ai'
      ? (index % 2 === 0 ? -1 : 1)
      : (index % 2 === 0 ? 1 : -1)
    const x = laneCenterX + side * 156 - nodeWidth.lesson / 2

    nodes.push(makeNode(
      junctionId,
      '',
      'junction',
      'junction',
      laneCenterX - nodeWidth.junction / 2,
      y + 16,
      nodeWidth.junction,
    ))
    nodes.push(makeNode(
      `${branch}-${entry.id}`,
      entry.title,
      tone,
      'lesson',
      x,
      y,
      nodeWidth.lesson,
      entry.link,
    ))

    edges.push(makeEdge(previousMainId, junctionId, { class: 'roadmap-flow-edge roadmap-flow-edge-main' }))
    edges.push(makeEdge(junctionId, `${branch}-${entry.id}`, { class: 'roadmap-flow-edge roadmap-flow-edge-dashed' }))
    previousMainId = junctionId
    lastJunctionId = junctionId
    lastY = y
  })

  return { nodes, edges, lastJunctionId, lastY }
}

const roadmapFlow = computed(() => {
  const labels = roadmapContent.value
  const aiEntries = getRoadmapEntries(localeKey.value, 'foundation-ai')
  const web3Entries = getRoadmapEntries(localeKey.value, 'foundation-web3')
  const productEntries = getRoadmapEntries(localeKey.value, 'product')
  const challengeEntries = getRoadmapEntries(localeKey.value, 'challenge')
  const nodes: RoadmapNode[] = []
  const edges: Edge[] = []

  const aiLane = foundationLane('ai', labels.branches.ai, aiEntries, layout.aiLaneX, layout.branchY)
  const web3Lane = foundationLane('web3', labels.branches.web3, web3Entries, layout.web3LaneX, layout.branchY)
  nodes.push(...aiLane.nodes, ...web3Lane.nodes)
  edges.push(
    ...aiLane.edges,
    ...web3Lane.edges,
  )

  const mergeY = Math.max(aiLane.lastY, web3Lane.lastY) + layout.mergeGap
  nodes.push(makeNode(
    'foundation-merge',
    labels.stages.product,
    'fusion',
    'stage',
    layout.centerX - nodeWidth.stage / 2,
    mergeY,
    nodeWidth.stage,
    productEntries[0]?.link,
  ))
  edges.push(
    makeEdge(aiLane.lastJunctionId, 'foundation-merge', { class: 'roadmap-flow-edge roadmap-flow-edge-main' }),
    makeEdge(web3Lane.lastJunctionId, 'foundation-merge', { class: 'roadmap-flow-edge roadmap-flow-edge-main' }),
  )

  const productStartY = mergeY + 92
  let previousProductId = 'foundation-merge'
  productEntries.forEach((entry, index) => {
    const id = `product-${entry.id}`
    nodes.push(makeNode(
      id,
      entry.title,
      'fusion',
      'product',
      layout.centerX - nodeWidth.product / 2,
      productStartY + index * layout.productGap,
      nodeWidth.product,
      entry.link,
    ))
    edges.push(makeEdge(previousProductId, id, { class: 'roadmap-flow-edge roadmap-flow-edge-main' }))
    previousProductId = id
  })

  const challengeStageY = productStartY + productEntries.length * layout.productGap + 42
  nodes.push(makeNode(
    'stage-challenge',
    labels.stages.challenge,
    'stage',
    'stage',
    layout.centerX - nodeWidth.stage / 2,
    challengeStageY,
    nodeWidth.stage,
    challengeEntries[0]?.link,
  ))
  edges.push(makeEdge(previousProductId, 'stage-challenge', { class: 'roadmap-flow-edge roadmap-flow-edge-main' }))

  const challengeY = challengeStageY + layout.challengeGap
  const challengeSlots = [-300, 0, 300, -150, 150]
  challengeEntries.forEach((entry, index) => {
    const id = `challenge-${entry.id}`
    const row = Math.floor(index / 3)
    const offset = challengeSlots[index % challengeSlots.length] ?? 0
    nodes.push(makeNode(
      id,
      entry.title,
      'challenge',
      'challenge',
      layout.centerX + offset - nodeWidth.challenge / 2,
      challengeY + row * 88,
      nodeWidth.challenge,
      entry.link,
    ))
    edges.push(makeEdge('stage-challenge', id, { class: 'roadmap-flow-edge roadmap-flow-edge-main' }))
  })

  const height = challengeY + Math.max(1, Math.ceil(challengeEntries.length / 3)) * 110

  return { nodes, edges, height }
})

function handleNodeClick({ node }: NodeMouseEvent<RoadmapNode>) {
  const link = node.data?.link
  if (!link) return
  window.location.href = withBase(link)
}
</script>

<template>
  <section class="timeline-wrap">
    <section class="roadmap-shell">
      <ClientOnly>
        <VueFlow
          class="roadmap-vue-flow"
          :style="{ height: `${roadmapFlow.height}px` }"
          :nodes="roadmapFlow.nodes"
          :edges="roadmapFlow.edges"
          :node-types="nodeTypes"
          :nodes-draggable="false"
          :nodes-connectable="false"
          :edges-updatable="false"
          :elements-selectable="false"
          :pan-on-drag="false"
          :pan-on-scroll="false"
          :zoom-on-scroll="false"
          :zoom-on-pinch="false"
          :zoom-on-double-click="false"
          :prevent-scrolling="false"
          :fit-view-on-init="true"
          :min-zoom="0.24"
          :max-zoom="1.18"
          @node-click="handleNodeClick"
        />
        <template #fallback>
          <div class="roadmap-vue-flow roadmap-flow-loading" :style="{ height: `${roadmapFlow.height}px` }"></div>
        </template>
      </ClientOnly>
    </section>

    <section class="homepage-board signup-board">
      <div class="board-head">
        <span></span>
        <h3>{{ content.signup.boardTitle }}</h3>
        <span></span>
      </div>
      <div class="board-card signup-card">
        <p class="signup-title">{{ content.signup.title }}</p>
        <a class="banner-btn" :href="content.signup.href">{{ content.signup.cta }}</a>
      </div>
    </section>

    <section class="homepage-board sponsor-board">
      <div class="board-head">
        <span></span>
        <h3>{{ content.sponsors.title }}</h3>
        <span></span>
      </div>
      <div class="sponsor-grid">
        <div v-for="slot in sponsorSlots" :key="slot.id" class="board-card sponsor-card">
          <div class="logo-placeholder" :aria-label="content.sponsors.ariaLabel" />
        </div>
      </div>
    </section>
  </section>
</template>

<style>
.timeline-wrap {
  position: relative;
  left: 50%;
  right: 50%;
  width: 100vw;
  margin-left: -50vw;
  margin-right: -50vw;
  padding: 112px 0 96px;
  background:
    linear-gradient(180deg, #fffdfd 0%, rgba(255, 253, 253, 0.9) 44px, rgba(255, 253, 253, 0.48) 96px, rgba(255, 253, 253, 0) 176px),
    radial-gradient(46% 54% at 6% 92%, rgba(148, 214, 255, 0.26), transparent 72%),
    radial-gradient(42% 50% at 94% 78%, rgba(255, 192, 232, 0.24), transparent 74%),
    radial-gradient(42% 24% at 50% 4%, rgba(130, 222, 255, 0.14), transparent 76%),
    radial-gradient(28% 24% at 50% 46%, rgba(227, 204, 255, 0.12), transparent 80%),
    linear-gradient(180deg, #fffefe 0%, #fffdfd 100%);
}

html[data-theme='dark'] .timeline-wrap {
  background:
    linear-gradient(180deg, #1c0f1e 0%, rgba(28, 15, 30, 0.9) 46px, rgba(28, 15, 30, 0.5) 100px, rgba(28, 15, 30, 0) 180px),
    radial-gradient(34% 30% at 10% 92%, rgba(95, 226, 255, 0.26), transparent 72%),
    radial-gradient(38% 44% at 92% 68%, rgba(204, 92, 255, 0.24), transparent 72%),
    radial-gradient(46% 26% at 50% 3%, rgba(0, 195, 255, 0.16), transparent 76%),
    radial-gradient(26% 22% at 50% 28%, rgba(136, 74, 255, 0.14), transparent 76%),
    linear-gradient(180deg, #1c0f1e 0%, #110d18 36%, #0d111a 100%);
}

.roadmap-shell {
  position: relative;
  width: min(1180px, calc(100vw - 40px));
  margin: 3% auto 0;
  overflow: hidden;
  border: 1px solid rgba(186, 153, 255, 0.26);
  border-radius: 28px;
  background:
    linear-gradient(180deg, transparent 0, rgba(255, 255, 255, 0.08) 96px, rgba(255, 255, 255, 0.28) 170px),
    radial-gradient(38% 34% at 50% 7%, rgba(130, 222, 255, 0.14), transparent 72%),
    radial-gradient(34% 42% at 6% 42%, rgba(255, 177, 228, 0.12), transparent 74%),
    radial-gradient(30% 38% at 96% 54%, rgba(167, 139, 250, 0.16), transparent 74%),
    transparent;
  box-shadow:
    0 0 26px rgba(170, 104, 255, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

.roadmap-shell::before {
  content: '';
  position: absolute;
  top: -140px;
  right: 0;
  left: 0;
  height: 260px;
  pointer-events: none;
  background:
    radial-gradient(42% 70% at 50% 20%, rgba(130, 222, 255, 0.2), transparent 72%),
    radial-gradient(58% 80% at 50% 28%, rgba(167, 139, 250, 0.14), transparent 78%);
}

html[data-theme='dark'] .roadmap-shell {
  border-color: rgba(127, 93, 214, 0.58);
  background:
    linear-gradient(180deg, transparent 0, rgba(34, 24, 48, 0.1) 96px, rgba(34, 24, 48, 0.42) 170px),
    radial-gradient(36% 32% at 50% 7%, rgba(0, 195, 255, 0.13), transparent 72%),
    radial-gradient(34% 42% at 6% 42%, rgba(208, 93, 255, 0.12), transparent 74%),
    radial-gradient(30% 38% at 96% 54%, rgba(126, 85, 255, 0.16), transparent 74%),
    transparent;
  box-shadow:
    0 0 32px rgba(126, 85, 255, 0.12),
    inset 0 1px 0 rgba(212, 193, 255, 0.08);
}

html[data-theme='dark'] .roadmap-shell::before {
  background:
    radial-gradient(42% 70% at 50% 20%, rgba(0, 195, 255, 0.18), transparent 72%),
    radial-gradient(58% 80% at 50% 28%, rgba(126, 85, 255, 0.2), transparent 78%);
}

.roadmap-vue-flow {
  min-height: 760px;
  cursor: default;
}

.roadmap-vue-flow .vue-flow__pane {
  touch-action: auto;
}

.roadmap-vue-flow .vue-flow__attribution {
  display: none;
}

.roadmap-flow-card {
  width: 100%;
  min-height: 40px;
  padding: 0 16px;
  border: 1px solid rgba(218, 172, 255, 0.92);
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: rgba(255, 246, 255, 0.76);
  box-shadow: 0 0 16px rgba(205, 126, 255, 0.12);
  color: rgba(87, 67, 112, 0.94);
  font-size: 15px;
  font-weight: 700;
  line-height: 1.25;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
}

.roadmap-flow-card.is-clickable {
  cursor: pointer;
}

.roadmap-flow-card.is-clickable:hover,
.vue-flow__node:focus-visible .roadmap-flow-card {
  transform: translateY(-2px);
  border-color: rgba(125, 84, 233, 0.94);
  box-shadow:
    0 10px 22px rgba(170, 104, 255, 0.18),
    0 0 18px rgba(170, 104, 255, 0.14),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.roadmap-flow-card.is-stage,
.roadmap-flow-card.is-fusion {
  min-height: 46px;
  border-color: rgba(129, 222, 255, 0.96);
  background: rgba(237, 251, 255, 0.9);
  color: rgba(56, 87, 106, 0.96);
  box-shadow: 0 0 28px rgba(130, 222, 255, 0.22);
  font-size: 17px;
  font-weight: 800;
}

.roadmap-flow-card.is-branch-title {
  min-height: 44px;
  border-color: rgba(110, 209, 255, 0.88);
  background: rgba(235, 249, 255, 0.84);
  color: rgba(42, 90, 115, 0.96);
  font-size: 18px;
  font-weight: 800;
  box-shadow: 0 0 22px rgba(116, 210, 255, 0.16);
}

.roadmap-flow-card.is-lesson {
  min-height: 34px;
  border-color: rgba(186, 153, 255, 0.72);
  background: rgba(255, 255, 255, 0.48);
  box-shadow: 0 0 8px rgba(170, 104, 255, 0.08);
  color: rgba(114, 119, 124, 0.96);
  font-size: 14px;
  font-weight: 650;
}

.roadmap-flow-card.is-product {
  min-height: 42px;
  border-color: rgba(255, 193, 129, 0.88);
  background: rgba(255, 246, 233, 0.84);
  color: rgba(130, 84, 26, 0.94);
  box-shadow: 0 0 16px rgba(255, 187, 112, 0.12);
}

.roadmap-flow-card.is-challenge {
  min-height: 42px;
  border-color: rgba(255, 170, 214, 0.8);
  background: rgba(255, 245, 251, 0.84);
  color: rgba(120, 63, 93, 0.96);
  box-shadow: 0 0 18px rgba(255, 139, 205, 0.12);
}

.roadmap-flow-card.is-junction {
  min-height: 10px;
  width: 10px;
  padding: 0;
  border-radius: 999px;
  border-color: rgba(203, 140, 255, 0.92);
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 0 12px rgba(184, 112, 255, 0.18);
}

.roadmap-flow-handle {
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

.roadmap-vue-flow .vue-flow__node {
  border: none;
  background: transparent;
  box-shadow: none;
}

.roadmap-vue-flow .vue-flow__edge-path {
  stroke: rgba(203, 140, 255, 0.9);
  stroke-width: 1.6;
  filter: drop-shadow(0 0 5px rgba(184, 112, 255, 0.18));
}

.roadmap-vue-flow .roadmap-flow-edge-dashed .vue-flow__edge-path {
  stroke-dasharray: 5 7;
}

.roadmap-vue-flow .roadmap-flow-edge-main .vue-flow__edge-path {
  stroke-width: 1.8;
}

html[data-theme='dark'] .roadmap-flow-card {
  border-color: rgba(125, 84, 233, 0.9);
  background: rgba(55, 32, 88, 0.88);
  color: rgba(249, 245, 255, 0.95);
  box-shadow:
    0 0 18px rgba(118, 76, 226, 0.28),
    inset 0 1px 0 rgba(217, 197, 255, 0.1);
}

html[data-theme='dark'] .roadmap-flow-card.is-clickable:hover,
html[data-theme='dark'] .vue-flow__node:focus-visible .roadmap-flow-card {
  border-color: rgba(158, 126, 245, 0.98);
  box-shadow:
    0 12px 26px rgba(27, 15, 47, 0.46),
    0 0 20px rgba(126, 85, 255, 0.24),
    inset 0 1px 0 rgba(221, 204, 255, 0.1);
}

html[data-theme='dark'] .roadmap-flow-card.is-stage,
html[data-theme='dark'] .roadmap-flow-card.is-fusion {
  border-color: rgba(24, 198, 255, 0.84);
  background: rgba(16, 39, 63, 0.9);
  color: rgba(226, 249, 255, 0.96);
  box-shadow:
    0 0 24px rgba(0, 195, 255, 0.22),
    0 0 48px rgba(0, 195, 255, 0.12);
}

html[data-theme='dark'] .roadmap-flow-card.is-branch-title {
  border-color: rgba(76, 201, 255, 0.86);
  background: rgba(14, 48, 74, 0.92);
  color: rgba(225, 248, 255, 0.96);
  box-shadow:
    0 0 22px rgba(38, 198, 255, 0.2),
    inset 0 1px 0 rgba(196, 239, 255, 0.08);
}

html[data-theme='dark'] .roadmap-flow-card.is-product {
  border-color: rgba(141, 129, 244, 0.84);
  background: rgba(48, 39, 84, 0.92);
  color: rgba(241, 237, 255, 0.96);
}

html[data-theme='dark'] .roadmap-flow-card.is-challenge {
  border-color: rgba(199, 113, 212, 0.82);
  background: rgba(64, 34, 72, 0.88);
  color: rgba(255, 239, 251, 0.94);
}

html[data-theme='dark'] .roadmap-flow-card.is-junction {
  border-color: rgba(154, 117, 245, 0.88);
  background: rgba(18, 13, 30, 0.94);
}

html[data-theme='dark'] .roadmap-vue-flow .vue-flow__edge-path {
  stroke: rgba(154, 117, 245, 0.9);
  filter: drop-shadow(0 0 6px rgba(140, 95, 255, 0.28));
}

.homepage-board {
  width: min(1120px, calc(100vw - 40px));
  margin: 28px auto 0;
  padding: 18px 20px 20px;
  border: 1px solid rgba(186, 153, 255, 0.26);
  border-radius: 28px;
  background:
    radial-gradient(42% 60% at 4% 100%, rgba(123, 203, 255, 0.18), transparent 72%),
    radial-gradient(40% 60% at 95% 76%, rgba(255, 177, 228, 0.14), transparent 74%),
    rgba(255, 255, 255, 0.45);
  box-shadow:
    0 0 20px rgba(170, 104, 255, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

html[data-theme='dark'] .homepage-board {
  border-color: rgba(127, 93, 214, 0.58);
  background:
    radial-gradient(38% 52% at 4% 100%, rgba(74, 186, 255, 0.16), transparent 72%),
    radial-gradient(36% 56% at 96% 76%, rgba(208, 93, 255, 0.14), transparent 74%),
    rgba(34, 24, 48, 0.52);
  box-shadow:
    0 0 28px rgba(126, 85, 255, 0.12),
    inset 0 1px 0 rgba(212, 193, 255, 0.08);
}

.board-card {
  border: 1px solid rgba(190, 147, 255, 0.8);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.34);
  box-shadow:
    0 0 18px rgba(170, 104, 255, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.82);
}

html[data-theme='dark'] .board-card {
  border-color: rgba(132, 92, 235, 0.72);
  background: rgba(42, 29, 57, 0.42);
  box-shadow:
    0 0 28px rgba(126, 85, 255, 0.12),
    inset 0 1px 0 rgba(213, 194, 255, 0.08);
}

.board-head {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 14px;
}

.board-head span {
  width: 54px;
  height: 1px;
  background: linear-gradient(90deg, rgba(167, 139, 250, 0) 0%, rgba(167, 139, 250, 0.52) 100%);
}

.board-head span:last-child {
  background: linear-gradient(90deg, rgba(167, 139, 250, 0.52) 0%, rgba(167, 139, 250, 0) 100%);
}

.board-head h3 {
  margin: 0;
  color: rgba(170, 104, 255, 0.9);
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0;
  white-space: nowrap;
}

html[data-theme='dark'] .board-head h3 {
  color: rgba(186, 144, 255, 0.96);
}

.signup-card {
  min-height: 176px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 28px 24px;
}

.signup-title {
  margin: 0;
  color: rgba(31, 49, 65, 0.96);
  font-size: 36px;
  line-height: 1.2;
  text-align: center;
  font-family: 'Kaiti SC', 'STKaiti', 'KaiTi', 'Songti SC', serif;
  font-weight: 600;
  letter-spacing: 0.04em;
}

html[data-theme='dark'] .signup-title {
  color: rgba(244, 240, 255, 0.94);
  text-shadow: 0 0 18px rgba(164, 119, 255, 0.14);
}

.banner-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 98px;
  min-height: 44px;
  padding: 0 22px;
  border: 1.6px solid rgba(87, 67, 112, 0.76);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.72);
  color: #3f3856;
  font-size: 24px;
  text-decoration: none;
  box-shadow:
    0 0 8px rgba(170, 104, 255, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease,
    border-color 0.22s ease,
    background-color 0.22s ease,
    color 0.22s ease;
}

html[data-theme='dark'] .banner-btn {
  border-color: rgba(133, 102, 220, 0.88);
  background: rgba(33, 22, 49, 0.78);
  color: rgba(244, 239, 255, 0.95);
  box-shadow:
    0 0 18px rgba(126, 85, 255, 0.14),
    inset 0 1px 0 rgba(214, 196, 255, 0.08);
}

.banner-btn:hover,
.banner-btn:focus-visible {
  transform: translateY(-2px);
  border-color: rgba(125, 84, 233, 0.92);
  box-shadow:
    0 10px 22px rgba(170, 104, 255, 0.18),
    0 0 18px rgba(170, 104, 255, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.96);
}

html[data-theme='dark'] .banner-btn:hover,
html[data-theme='dark'] .banner-btn:focus-visible {
  border-color: rgba(158, 126, 245, 0.98);
  box-shadow:
    0 12px 26px rgba(27, 15, 47, 0.46),
    0 0 20px rgba(126, 85, 255, 0.24),
    inset 0 1px 0 rgba(221, 204, 255, 0.1);
}

.sponsor-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.sponsor-card {
  min-height: 82px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-placeholder {
  width: 74%;
  max-width: 216px;
  height: 24px;
  border: 1.4px dashed rgba(186, 153, 255, 0.36);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.32);
}

html[data-theme='dark'] .logo-placeholder {
  border-color: rgba(130, 98, 220, 0.46);
  background: rgba(54, 40, 70, 0.4);
}

@media (max-width: 768px) {
  .timeline-wrap {
    padding: 20px 0 60px;
  }

  .roadmap-shell {
    width: calc(100vw - 24px);
  }

  .roadmap-vue-flow {
    min-height: 640px;
  }

  .homepage-board {
    width: calc(100vw - 24px);
  }

  .board-head {
    gap: 8px;
  }

  .board-head span {
    width: 34px;
  }

  .signup-title {
    font-size: 28px;
  }

  .sponsor-grid {
    grid-template-columns: 1fr;
  }
}
</style>
