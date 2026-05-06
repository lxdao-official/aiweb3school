<script setup lang="ts">
import { computed, markRaw, onBeforeUnmount, onMounted, ref } from 'vue'
import { ClientOnly, useRouteLocale } from 'vuepress/client'
import {
  VueFlow,
  type NodeMouseEvent,
} from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import RoadmapFlowNode from './RoadmapFlowNode.vue'
import RoadmapMobile from './RoadmapMobile.vue'
import { homeI18n, type HomeLocale } from '../content/home-i18n'
import { homepageRoadmap } from '../content/handbook-roadmap'
import {
  ROADMAP_MIN_HEIGHT,
  createRoadmapFlow,
  createRoadmapViewport,
  type RoadmapNode,
} from './roadmap-layout'

const routeLocale = useRouteLocale()
const localeKey = computed<HomeLocale>(() => routeLocale.value === '/en/' ? 'en' : 'zh')
const content = computed(() => homeI18n[localeKey.value])
const roadmapChapters = computed(() => {
  const localized = homepageRoadmap[localeKey.value]
  if (!localized.length) {
    throw new Error(`Missing homepage roadmap chapters for locale: ${localeKey.value}`)
  }
  return localized
})
const nodeTypes = { roadmap: markRaw(RoadmapFlowNode) }
const viewportWidth = ref(1180)
const activeRoadmapNodeId = ref('')
let roadmapFeedbackTimer: ReturnType<typeof setTimeout> | undefined

const roadmapViewport = computed(() => createRoadmapViewport(viewportWidth.value))
const isMobileViewport = computed(() => viewportWidth.value <= 768)
const wipMessage = computed(() => (
  localeKey.value === 'en'
    ? 'Working in progress. Content is being written.'
    : '正在编写中，内容即将上线。'
))
const mapDemoGraph = {
  width: 760,
  titleWidth: 500,
  itemWidth: 620,
  titleHeight: 72,
  itemHeight: 88,
  itemGap: 26,
  titleY: 28,
  firstItemY: 138,
}

const mapDemoFlow = computed(() => {
  const isCompact = viewportWidth.value <= 768
  const graph = isCompact
    ? {
        width: 350,
        titleWidth: 300,
        itemWidth: 292,
        titleHeight: 52,
        itemHeight: 68,
        itemGap: 16,
        titleY: 18,
        firstItemY: 88,
      }
    : mapDemoGraph
  const shellWidth = Math.min(820, Math.max(320, viewportWidth.value - (viewportWidth.value <= 768 ? 24 : 40)))
  const zoom = isCompact ? 1 : Math.min(1, Math.max(0.42, (shellWidth - 40) / graph.width))
  const graphHeight = graph.firstItemY
    + content.value.mapDemo.items.length * graph.itemHeight
    + Math.max(0, content.value.mapDemo.items.length - 1) * graph.itemGap
    + 34
  const centerX = graph.width / 2

  return {
    height: Math.ceil(graphHeight * zoom + (isCompact ? 30 : 48)),
    viewport: {
      x: (shellWidth - graph.width * zoom) / 2,
      y: isCompact ? 12 : 24,
      zoom,
    },
    nodes: [
      {
        id: 'map-demo-title',
        type: 'roadmap',
        position: { x: centerX - graph.titleWidth / 2, y: graph.titleY },
        width: graph.titleWidth,
        height: graph.titleHeight,
        draggable: false,
        selectable: false,
        connectable: false,
        focusable: false,
        data: {
          title: content.value.mapDemo.title,
          tone: 'intro',
          variant: 'section-title',
          isInteractive: false,
        },
      },
      ...content.value.mapDemo.items.map((item, index) => ({
        id: `map-demo-item-${index}`,
        type: 'roadmap',
        position: {
          x: centerX - graph.itemWidth / 2,
          y: graph.firstItemY + index * (graph.itemHeight + graph.itemGap),
        },
        width: graph.itemWidth,
        height: graph.itemHeight,
        draggable: false,
        selectable: false,
        connectable: false,
        focusable: false,
        data: {
          title: item,
          tone: 'intro',
          variant: 'topic',
          isInteractive: false,
        },
      })),
    ] satisfies RoadmapNode[],
    edges: [],
  }
})

function updateViewportWidth() {
  viewportWidth.value = window.innerWidth
}

onMounted(() => {
  updateViewportWidth()
  window.addEventListener('resize', updateViewportWidth)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateViewportWidth)
  if (roadmapFeedbackTimer) {
    clearTimeout(roadmapFeedbackTimer)
  }
})

const roadmapFlow = computed(() => {
  const flow = createRoadmapFlow(roadmapChapters.value)

  return {
    ...flow,
    nodes: flow.nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        isActive: node.id === activeRoadmapNodeId.value,
      },
    })),
  }
})

const roadmapDisplayHeight = computed(() => {
  return Math.max(ROADMAP_MIN_HEIGHT, Math.ceil(roadmapFlow.value.height * roadmapViewport.value.zoom + roadmapViewport.value.y + 48))
})

function handleNodeClick({ node }: NodeMouseEvent<RoadmapNode>) {
  const link = node.data?.link

  if (node.data?.variant === 'topic' || node.data?.variant === 'section-title') {
    triggerRoadmapFeedback(node.id)
    if (link) {
      window.alert(wipMessage.value)
    }
    return
  }

  if (!link) return
  window.alert(wipMessage.value)
}

function handleMobileRoadmapClick(nodeId: string) {
  triggerRoadmapFeedback(nodeId)
  window.alert(wipMessage.value)
}

function triggerRoadmapFeedback(nodeId: string) {
  activeRoadmapNodeId.value = nodeId

  if (roadmapFeedbackTimer) {
    clearTimeout(roadmapFeedbackTimer)
  }

  roadmapFeedbackTimer = setTimeout(() => {
    if (activeRoadmapNodeId.value === nodeId) {
      activeRoadmapNodeId.value = ''
    }
  }, 900)
}
</script>

<template>
  <section class="timeline-wrap">
    <section class="map-section-demo" :aria-label="content.mapDemo.title">
      <ClientOnly>
        <VueFlow
          class="map-demo-vue-flow"
          :style="{ height: `${mapDemoFlow.height}px` }"
          :nodes="mapDemoFlow.nodes"
          :edges="mapDemoFlow.edges"
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
          :fit-view-on-init="false"
          :default-viewport="mapDemoFlow.viewport"
          :min-zoom="0.42"
          :max-zoom="1"
        />
        <template #fallback>
          <div class="map-demo-vue-flow" :style="{ height: `${mapDemoFlow.height}px` }"></div>
        </template>
      </ClientOnly>
    </section>

    <section class="roadmap-shell">
      <RoadmapMobile
        v-if="isMobileViewport"
        :chapters="roadmapChapters"
        :active-node-id="activeRoadmapNodeId"
        @node-click="handleMobileRoadmapClick"
      />
      <ClientOnly v-else>
        <VueFlow
          class="roadmap-vue-flow"
          :style="{ height: `${roadmapDisplayHeight}px` }"
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
          :fit-view-on-init="false"
          :default-viewport="roadmapViewport"
          :min-zoom="0.24"
          :max-zoom="1.18"
          @node-click="handleNodeClick"
        />
        <template #fallback>
          <div class="roadmap-vue-flow roadmap-flow-loading" :style="{ height: `${roadmapDisplayHeight}px` }"></div>
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

.map-section-demo {
  width: min(820px, calc(100vw - 40px));
  margin: 0 auto 42px;
  padding: 0;
  overflow: hidden;
  border: 2px solid rgba(178, 139, 255, 0.76);
  border-radius: 34px;
  background:
    radial-gradient(70% 92% at 50% 0%, rgba(178, 139, 255, 0.12), transparent 72%),
    rgba(255, 255, 255, 0.3);
  box-shadow:
    0 20px 54px rgba(158, 126, 245, 0.13),
    inset 0 1px 0 rgba(255, 255, 255, 0.82);
}

.map-demo-vue-flow {
  width: 100%;
  cursor: default;
}

.map-demo-vue-flow .vue-flow__pane {
  touch-action: auto;
}

.map-demo-vue-flow .vue-flow__attribution {
  display: none;
}

.map-demo-vue-flow .vue-flow__node {
  border: none;
  background: transparent;
  box-shadow: none;
}

.map-demo-vue-flow .roadmap-flow-card.is-section-title {
  min-height: 72px;
  display: flex;
  flex-direction: row;
  gap: 28px;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  background: transparent;
  box-shadow: none;
  color: rgba(160, 103, 255, 0.94);
  font-size: 44px;
  font-weight: 900;
  line-height: 1.1;
}

.map-demo-vue-flow .roadmap-flow-card.is-section-title::before,
.map-demo-vue-flow .roadmap-flow-card.is-section-title::after {
  content: '';
  flex: 1;
  height: 2px;
  min-width: 80px;
  background: linear-gradient(90deg, transparent, rgba(178, 139, 255, 0.42));
}

.map-demo-vue-flow .roadmap-flow-card.is-section-title::after {
  background: linear-gradient(90deg, rgba(178, 139, 255, 0.42), transparent);
}

.map-demo-vue-flow .roadmap-flow-card.is-topic {
  min-height: 88px;
  padding: 0 22px;
  border: 2px solid rgba(178, 139, 255, 0.82);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.18);
  box-shadow: none;
  color: rgba(105, 113, 122, 0.96);
  font-size: 38px;
  font-weight: 900;
  line-height: 1.16;
  text-align: center;
  overflow-wrap: anywhere;
}

html[data-theme='dark'] .map-section-demo {
  border-color: rgba(132, 104, 219, 0.62);
  background:
    radial-gradient(80% 100% at 8% 0%, rgba(119, 191, 217, 0.18), transparent 72%),
    radial-gradient(70% 92% at 50% 0%, rgba(178, 139, 255, 0.1), transparent 72%),
    rgba(33, 42, 51, 0.56);
  box-shadow:
    0 24px 68px rgba(11, 18, 28, 0.34),
    inset 0 1px 0 rgba(212, 193, 255, 0.08);
}

html[data-theme='dark'] .map-demo-vue-flow .roadmap-flow-card.is-section-title {
  color: rgba(186, 168, 255, 0.96);
}

html[data-theme='dark'] .map-demo-vue-flow .roadmap-flow-card.is-section-title::before {
  background: linear-gradient(90deg, transparent, rgba(178, 139, 255, 0.44));
}

html[data-theme='dark'] .map-demo-vue-flow .roadmap-flow-card.is-section-title::after {
  background: linear-gradient(90deg, rgba(178, 139, 255, 0.44), transparent);
}

html[data-theme='dark'] .map-demo-vue-flow .roadmap-flow-card.is-topic {
  border-color: rgba(132, 104, 219, 0.62);
  background: rgba(35, 43, 52, 0.28);
  color: rgba(225, 234, 242, 0.9);
}

.roadmap-shell {
  position: relative;
  width: min(1180px, calc(100vw - 40px));
  margin: 3% auto 0;
  overflow: hidden;
  border: 0;
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

@media (max-width: 768px) {
  .timeline-wrap {
    padding-top: 32px;
  }

  .map-section-demo {
    width: calc(100vw - 24px);
    margin-bottom: 28px;
    border-radius: 24px;
  }

  .map-demo-vue-flow .roadmap-flow-card.is-section-title {
    gap: 18px;
    font-size: 32px;
  }

  .map-demo-vue-flow .roadmap-flow-card.is-section-title::before,
  .map-demo-vue-flow .roadmap-flow-card.is-section-title::after {
    min-width: 42px;
  }

  .map-demo-vue-flow .roadmap-flow-card.is-topic {
    min-height: 68px;
    border-radius: 16px;
    font-size: 28px;
  }

  .roadmap-shell {
    margin-top: 0;
  }
}

.roadmap-flow-card {
  appearance: none;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  min-height: 40px;
  padding: 0 16px;
  border: 1px solid rgba(218, 172, 255, 0.92);
  border-radius: 12px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 9px;
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

.roadmap-flow-title {
  display: block;
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

.roadmap-flow-card.is-clickable:active,
.roadmap-flow-card.is-active {
  transform: translateY(1px) scale(0.98);
  border-color: rgba(125, 84, 233, 0.94);
  background: rgba(247, 238, 255, 0.86);
  box-shadow:
    0 0 0 4px rgba(170, 104, 255, 0.12),
    0 0 18px rgba(170, 104, 255, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.roadmap-flow-card.is-section-title {
  min-height: 52px;
  padding: 0;
  border-color: transparent;
  background: transparent;
  box-shadow: none;
  color: rgba(37, 37, 46, 0.94);
  font-size: 32px;
  font-weight: 800;
  letter-spacing: 0;
}

.roadmap-flow-card.is-group {
  min-height: 46px;
  padding: 0 14px;
  border-width: 1.8px;
  border-radius: 8px;
  border-color: rgba(255, 223, 132, 0.9);
  background: rgba(255, 229, 126, 0.9);
  box-shadow: 0 0 14px rgba(255, 211, 92, 0.12);
  color: rgba(42, 35, 18, 0.96);
  font-size: 15px;
  font-weight: 800;
}

.roadmap-flow-card.is-topic {
  min-height: 36px;
  padding: 0 12px;
  border-width: 1.3px;
  border-radius: 6px;
  border-color: rgba(255, 220, 132, 0.62);
  background: rgba(255, 235, 166, 0.72);
  color: rgba(57, 45, 22, 0.92);
  box-shadow: none;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.18;
}

.roadmap-flow-card.is-ai.is-group {
  border-color: rgba(110, 209, 255, 0.78);
  background: rgba(240, 251, 255, 0.7);
  color: rgba(38, 83, 108, 0.96);
}

.roadmap-flow-card.is-web3.is-group {
  border-color: rgba(178, 153, 255, 0.76);
  background: rgba(248, 245, 255, 0.7);
  color: rgba(82, 65, 132, 0.96);
}

.roadmap-flow-card.is-fusion.is-group {
  border-color: rgba(255, 193, 129, 0.88);
  background: rgba(255, 248, 236, 0.78);
  color: rgba(128, 82, 24, 0.96);
}

.roadmap-flow-card.is-security.is-group {
  border-color: rgba(255, 151, 194, 0.82);
  background: rgba(255, 245, 250, 0.82);
  color: rgba(125, 55, 88, 0.96);
}

.roadmap-flow-card.is-standard.is-group {
  border-color: rgba(111, 211, 177, 0.82);
  background: rgba(239, 255, 249, 0.8);
  color: rgba(35, 103, 82, 0.96);
}

.roadmap-flow-card.is-practice.is-group {
  border-color: rgba(255, 186, 105, 0.9);
  background: rgba(255, 250, 238, 0.84);
  color: rgba(126, 78, 20, 0.96);
}

.roadmap-flow-card.is-ai.is-topic {
  border-color: rgba(110, 209, 255, 0.34);
  background: rgba(240, 251, 255, 0.34);
  color: rgba(45, 83, 105, 0.9);
}

.roadmap-flow-card.is-web3.is-topic {
  border-color: rgba(178, 153, 255, 0.34);
  background: rgba(248, 245, 255, 0.34);
  color: rgba(82, 66, 126, 0.9);
}

.roadmap-flow-card.is-fusion.is-topic {
  border-color: rgba(255, 193, 129, 0.38);
  background: rgba(255, 248, 236, 0.36);
  color: rgba(124, 82, 32, 0.9);
}

.roadmap-flow-card.is-security.is-topic {
  border-color: rgba(255, 151, 194, 0.36);
  background: rgba(255, 245, 250, 0.36);
  color: rgba(119, 58, 88, 0.9);
}

.roadmap-flow-card.is-standard.is-topic {
  border-color: rgba(111, 211, 177, 0.38);
  background: rgba(239, 255, 249, 0.36);
  color: rgba(39, 98, 79, 0.9);
}

.roadmap-flow-card.is-practice.is-topic {
  border-color: rgba(255, 186, 105, 0.4);
  background: rgba(255, 250, 238, 0.36);
  color: rgba(122, 80, 28, 0.9);
}

.roadmap-flow-card.is-topic.is-clickable:hover,
.vue-flow__node:focus-visible .roadmap-flow-card.is-topic {
  border-color: rgba(125, 84, 233, 0.94);
  background: rgba(247, 238, 255, 0.86);
  box-shadow:
    0 10px 22px rgba(170, 104, 255, 0.18),
    0 0 18px rgba(170, 104, 255, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.roadmap-flow-card.is-topic.is-active {
  border-color: rgba(125, 84, 233, 0.94);
  background: rgba(247, 238, 255, 0.86);
  box-shadow:
    0 0 0 4px rgba(170, 104, 255, 0.12),
    0 0 18px rgba(170, 104, 255, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
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

.roadmap-vue-flow .roadmap-flow-edge-mainline .vue-flow__edge-path {
  stroke-width: 2.4;
}

.roadmap-vue-flow .roadmap-flow-edge-topic .vue-flow__edge-path {
  stroke-width: 1.15;
  stroke-dasharray: 4 6;
  opacity: 0.52;
  filter: none;
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

html[data-theme='dark'] .roadmap-flow-card.is-clickable:active,
html[data-theme='dark'] .roadmap-flow-card.is-active {
  border-color: rgba(158, 126, 245, 0.98);
  background: rgba(62, 42, 92, 0.92);
  box-shadow:
    0 0 0 4px rgba(126, 85, 255, 0.16),
    0 0 20px rgba(126, 85, 255, 0.24),
    inset 0 1px 0 rgba(221, 204, 255, 0.1);
}

html[data-theme='dark'] .roadmap-flow-card.is-group {
  border-color: rgba(125, 84, 233, 0.78);
  background: rgba(48, 34, 72, 0.78);
  color: rgba(248, 244, 255, 0.94);
}

html[data-theme='dark'] .roadmap-flow-card.is-topic {
  border-color: rgba(154, 117, 245, 0.3);
  background: rgba(35, 25, 52, 0.52);
  color: rgba(249, 245, 255, 0.82);
  box-shadow: none;
}

html[data-theme='dark'] .roadmap-flow-card.is-ai.is-group {
  border-color: rgba(76, 201, 255, 0.78);
  background: rgba(14, 48, 74, 0.76);
  color: rgba(225, 248, 255, 0.96);
}

html[data-theme='dark'] .roadmap-flow-card.is-ai.is-topic {
  border-color: rgba(76, 201, 255, 0.3);
  background: rgba(14, 48, 74, 0.42);
  color: rgba(225, 248, 255, 0.82);
}

html[data-theme='dark'] .roadmap-flow-card.is-web3.is-group {
  border-color: rgba(141, 129, 244, 0.8);
  background: rgba(45, 37, 82, 0.78);
}

html[data-theme='dark'] .roadmap-flow-card.is-web3.is-topic {
  border-color: rgba(141, 129, 244, 0.3);
  background: rgba(45, 37, 82, 0.42);
}

html[data-theme='dark'] .roadmap-flow-card.is-fusion.is-group {
  border-color: rgba(190, 144, 82, 0.84);
  background: rgba(70, 49, 31, 0.78);
  color: rgba(255, 242, 218, 0.96);
}

html[data-theme='dark'] .roadmap-flow-card.is-fusion.is-topic {
  border-color: rgba(190, 144, 82, 0.3);
  background: rgba(70, 49, 31, 0.42);
  color: rgba(255, 242, 218, 0.82);
}

html[data-theme='dark'] .roadmap-flow-card.is-security.is-group {
  border-color: rgba(199, 113, 166, 0.82);
  background: rgba(64, 34, 58, 0.8);
  color: rgba(255, 238, 247, 0.95);
}

html[data-theme='dark'] .roadmap-flow-card.is-security.is-topic {
  border-color: rgba(199, 113, 166, 0.3);
  background: rgba(64, 34, 58, 0.42);
  color: rgba(255, 238, 247, 0.82);
}

html[data-theme='dark'] .roadmap-flow-card.is-standard.is-group {
  border-color: rgba(76, 178, 144, 0.82);
  background: rgba(21, 61, 52, 0.78);
  color: rgba(231, 255, 247, 0.95);
}

html[data-theme='dark'] .roadmap-flow-card.is-standard.is-topic {
  border-color: rgba(76, 178, 144, 0.3);
  background: rgba(21, 61, 52, 0.42);
  color: rgba(231, 255, 247, 0.82);
}

html[data-theme='dark'] .roadmap-flow-card.is-practice.is-group {
  border-color: rgba(203, 141, 72, 0.84);
  background: rgba(72, 49, 25, 0.78);
  color: rgba(255, 242, 220, 0.96);
}

html[data-theme='dark'] .roadmap-flow-card.is-practice.is-topic {
  border-color: rgba(203, 141, 72, 0.3);
  background: rgba(72, 49, 25, 0.42);
  color: rgba(255, 242, 220, 0.82);
}

html[data-theme='dark'] .roadmap-flow-card.is-topic.is-clickable:hover,
html[data-theme='dark'] .vue-flow__node:focus-visible .roadmap-flow-card.is-topic {
  border-color: rgba(158, 126, 245, 0.98);
  background: rgba(62, 42, 92, 0.92);
  box-shadow:
    0 12px 26px rgba(27, 15, 47, 0.46),
    0 0 20px rgba(126, 85, 255, 0.24),
    inset 0 1px 0 rgba(221, 204, 255, 0.1);
}

html[data-theme='dark'] .roadmap-flow-card.is-topic.is-active {
  border-color: rgba(158, 126, 245, 0.98);
  background: rgba(62, 42, 92, 0.92);
  box-shadow:
    0 0 0 4px rgba(126, 85, 255, 0.16),
    0 0 20px rgba(126, 85, 255, 0.24),
    inset 0 1px 0 rgba(221, 204, 255, 0.1);
}

html[data-theme='dark'] .roadmap-flow-card.is-section-title {
  border-color: transparent;
  background: transparent;
  color: rgba(244, 240, 255, 0.94);
  box-shadow: none;
}

html[data-theme='dark'] .roadmap-flow-card.is-web3.is-section-title,
html[data-theme='dark'] .roadmap-flow-card.is-web3.is-group,
html[data-theme='dark'] .roadmap-flow-card.is-web3.is-topic {
  color: rgba(249, 245, 255, 0.94);
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

@media (max-width: 768px) {
  .timeline-wrap {
    padding: 20px 0 60px;
  }

  .map-section-demo {
    width: calc(100vw - 24px);
  }

  .roadmap-shell {
    width: calc(100vw - 24px);
    margin-top: 0;
    border-radius: 18px;
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

}
</style>
