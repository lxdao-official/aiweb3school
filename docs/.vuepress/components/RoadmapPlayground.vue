<script setup lang="ts">
import { computed, markRaw, onBeforeUnmount, onMounted, ref } from 'vue'
import { ClientOnly } from 'vuepress/client'
import {
  MarkerType,
  VueFlow,
  type Edge,
  type Node,
  type NodeMouseEvent,
} from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import RoadmapFlowNode from './RoadmapFlowNode.vue'
import PlaygroundFrame from './PlaygroundFrame.vue'
import PlaygroundLabel from './PlaygroundLabel.vue'
import PlaygroundAnchor from './PlaygroundAnchor.vue'
import PlaygroundSectionCard, { type SectionBlock } from './PlaygroundSectionCard.vue'
import type { RoadmapNode } from './roadmap-layout'
import {
  playgroundRoadmap,
  type RoadmapData,
  type RoadmapSubCard,
} from '../content/playground-roadmap-data'

/**
 * Roadmap Playground · 样式与布局规则（已固化，请勿因数据而修改）
 * ─────────────────────────────────────────────────────────────────
 * 数据来源：docs/.vuepress/content/playground-roadmap-data.ts
 * 本组件只负责把数据按下面规则排到画布上：
 *
 *  1. 节点：宽 200，渲染由 RoadmapFlowNode 决定，自带 hover 提亮 + cursor pointer
 *  2. Sub-card：宽 220 (top) / 240 (fusion)，高度按 items 数量自动算
 *  3. 顶部 AI / Web3：
 *     - AI 主列固定 X=330（sub 全部留在左半区），Web3 主列 X=990（sub 全部留在右半区）
 *     - 在自身半区内，sub-card 按节点 index 左右交替挂在主列两侧
 *     - 中央保持 ≥44px 留白，AI / Web3 的 sub-card 永不交织
 *  4. 中央融合 section：
 *     - 主线由 anchor 上下贯穿中央
 *     - cards 自动按顺序左右交替，行高 130px
 *     - frame 宽 800、padding 40 包住所有 cards
 *  5. 4 路分支：
 *     - 每列独立 frame，宽 260、列间距 32
 *     - 推荐 3-5 列；超过 5 列会溢出 graphWidth
 *  6. 主线连边 = smoothstep + 箭头；side 连边 = straight
 *  7. 节点 / sub-card item 的 link 控制 hover 提亮与 cursor，新窗口打开
 */

// ============================================================
// LAYOUT RULES（锁定，不要因数据改动）
// ============================================================
const layout = {
  // 中心 = 660；AI 半区 0-660，Web3 半区 660-1320
  graphWidth: 1320,
  graphPaddingY: 60,

  nodeWidth: 200,
  nodeHeight: 56,

  // 顶部 AI / Web3（每侧 sub-card 在主列左右交替，但永远不跨过中心）
  topLabelY: 16,
  topLabelHeight: 30,
  topNodeStartY: 80,
  topNodeStepY: 120,           // 因为 alternating，行高可压缩
  topSubCardWidth: 180,        // 减小宽度让交替时左右两侧都能容下
  topSubCardGapX: 28,
  aiNodeX: 330,                // 中点：左半区中央（128+180=308 ≤ X ≤ 532-180=352）
  web3NodeX: 990,              // = graphWidth - aiNodeX 镜像

  // 融合 section（trunk 居中 660，frame 对称包住 cards）
  fusionTopGap: 110,
  fusionLabelHeight: 30,
  fusionLabelGap: 8,
  fusionFrameLeftX: 270,
  fusionFrameWidth: 780,       // 中心 = 660
  fusionPadX: 40,
  fusionPadY: 40,
  fusionTopAnchorOffset: 24,
  fusionBottomAnchorOffset: 24,
  fusionCardStartOffset: 40,
  fusionCardStepY: 130,
  fusionCardWidth: 240,
  fusionCardCenterGap: 110,

  // 4 路分支（4×260 + 3×32 = 1136，居中放在 1320 内 leftX=92）
  splitTopGap: 100,
  splitLabelHeight: 30,
  splitLabelGap: 8,
  splitFrameWidth: 260,
  splitPadX: 30,
  splitPadY: 36,
  splitColGap: 32,
  splitNodeStartOffset: 30,
  splitStepY: 100,
}

// ============================================================
// 高度计算（与 PlaygroundSectionCard.vue 内部尺寸一致）
// ============================================================
function computeSectionCardHeight(sections: SectionBlock[]): number {
  const padTop = 28, padBottom = 28
  const titleRowH = 26, titleGap = 10
  const itemH = 46, itemGap = 10
  const blockGap = 18
  let h = padTop
  sections.forEach((s, i) => {
    if (i > 0) h += blockGap
    h += titleRowH + titleGap
    h += s.items.length * itemH + Math.max(0, s.items.length - 1) * itemGap
  })
  h += padBottom
  return h
}

function asSectionBlocks(card: RoadmapSubCard): SectionBlock[] {
  return [{ title: card.title, items: card.items }]
}

// ============================================================
// 节点 / 连线工厂
// ============================================================
type AnyNode = Node | RoadmapNode

function makeRoadmapNode(
  id: string, title: string, variant: 'section-title' | 'group' | 'topic',
  centerX: number, y: number, tone: 'intro' | 'ai' | 'web3' | 'fusion',
  link?: string,
): RoadmapNode {
  const interactive = !!link
  return {
    id,
    type: 'roadmap',
    position: { x: centerX - layout.nodeWidth / 2, y },
    width: layout.nodeWidth,
    draggable: false,
    selectable: interactive,
    connectable: false,
    focusable: interactive,
    zIndex: 5,
    data: { title, tone, variant, isInteractive: interactive, link },
  }
}

function makeFrameNode(
  id: string, x: number, y: number, width: number, height: number,
  tone: 'intro' | 'ai' | 'web3' | 'fusion',
): AnyNode {
  return {
    id, type: 'frame',
    position: { x, y }, width, height,
    draggable: false, selectable: false, connectable: false, focusable: false,
    zIndex: -1,
    data: { tone, width, height },
  }
}

function makeAnchorNode(id: string, cx: number, cy: number): AnyNode {
  return {
    id, type: 'anchor',
    position: { x: cx - 0.5, y: cy - 0.5 },
    width: 1, height: 1,
    draggable: false, selectable: false, connectable: false, focusable: false,
    zIndex: 5,
    data: {},
  }
}

function makeLabelNode(
  id: string, x: number, y: number, width: number, height: number,
  title: string, tone?: 'intro' | 'ai' | 'web3' | 'fusion',
): AnyNode {
  return {
    id, type: 'label',
    position: { x, y }, width, height,
    draggable: false, selectable: false, connectable: false, focusable: false,
    zIndex: 20,
    data: { title, tone, width, height },
  }
}

function makeSectionCardNode(
  id: string, x: number, y: number, width: number, sections: SectionBlock[],
): { node: AnyNode; height: number } {
  const height = computeSectionCardHeight(sections)
  return {
    node: {
      id, type: 'section-card',
      position: { x, y }, width, height,
      draggable: false, selectable: false, connectable: false, focusable: false,
      zIndex: 5,
      data: { sections, width, height },
    },
    height,
  }
}

function makeMainEdge(source: string, target: string): Edge {
  return {
    id: `${source}->${target}`, source, target,
    type: 'smoothstep',
    sourceHandle: 'bottom', targetHandle: 'top',
    selectable: false, focusable: false, updatable: false,
    class: 'roadmap-flow-edge roadmap-flow-edge-mainline',
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: 'rgba(203, 140, 255, 0.9)',
      width: 13, height: 13,
    },
  }
}

function makeSideEdge(source: string, target: string, side: 'left' | 'right'): Edge {
  return {
    id: `${source}~${target}`, source, target,
    type: 'straight',
    sourceHandle: side === 'right' ? 'right-source' : 'left-source',
    targetHandle: side === 'right' ? 'left-target' : 'right-target',
    selectable: false, focusable: false, updatable: false,
    class: 'roadmap-flow-edge roadmap-flow-edge-topic',
  }
}

// ============================================================
// 构建：完全由 data 驱动
// ============================================================
function buildFromData(data: RoadmapData) {
  const nodes: AnyNode[] = []
  const edges: Edge[] = []

  // ─── 顶部 AI 列 ───
  const aiLabelW = 80
  nodes.push(makeLabelNode(
    'LBL-AI',
    layout.aiNodeX - aiLabelW / 2, layout.topLabelY,
    aiLabelW, layout.topLabelHeight,
    data.topLeft.label, 'ai',
  ))
  const aiNodeIds: string[] = []
  data.topLeft.nodes.forEach((n, i) => {
    const y = layout.topNodeStartY + i * layout.topNodeStepY
    nodes.push(makeRoadmapNode(n.id, n.title, 'group', layout.aiNodeX, y, 'ai', n.link))
    aiNodeIds.push(n.id)
    if (n.subCard) {
      // 在 AI 半区内左右交替（i=0 右 / i=1 左 / i=2 右 …）
      const side: 'right' | 'left' = i % 2 === 0 ? 'right' : 'left'
      const subId = `${n.id}-SUB`
      const sec = asSectionBlocks(n.subCard)
      const subH = computeSectionCardHeight(sec)
      const subY = y + layout.nodeHeight / 2 - subH / 2
      const subLeftX = side === 'right'
        ? layout.aiNodeX + layout.nodeWidth / 2 + layout.topSubCardGapX
        : layout.aiNodeX - layout.nodeWidth / 2 - layout.topSubCardGapX - layout.topSubCardWidth
      const { node } = makeSectionCardNode(subId, subLeftX, subY, layout.topSubCardWidth, sec)
      nodes.push(node)
      edges.push(makeSideEdge(n.id, subId, side))
    }
  })
  for (let i = 0; i < aiNodeIds.length - 1; i++) {
    edges.push(makeMainEdge(aiNodeIds[i], aiNodeIds[i + 1]))
  }

  // ─── 顶部 Web3 列（镜像） ───
  const web3LabelW = 100
  nodes.push(makeLabelNode(
    'LBL-WEB3',
    layout.web3NodeX - web3LabelW / 2, layout.topLabelY,
    web3LabelW, layout.topLabelHeight,
    data.topRight.label, 'web3',
  ))
  const web3NodeIds: string[] = []
  data.topRight.nodes.forEach((n, i) => {
    const y = layout.topNodeStartY + i * layout.topNodeStepY
    nodes.push(makeRoadmapNode(n.id, n.title, 'group', layout.web3NodeX, y, 'web3', n.link))
    web3NodeIds.push(n.id)
    if (n.subCard) {
      // 在 Web3 半区内左右交替（与 AI 镜像：i=0 左 / i=1 右 / i=2 左 …）
      const side: 'right' | 'left' = i % 2 === 0 ? 'left' : 'right'
      const subId = `${n.id}-SUB`
      const sec = asSectionBlocks(n.subCard)
      const subH = computeSectionCardHeight(sec)
      const subY = y + layout.nodeHeight / 2 - subH / 2
      const subLeftX = side === 'right'
        ? layout.web3NodeX + layout.nodeWidth / 2 + layout.topSubCardGapX
        : layout.web3NodeX - layout.nodeWidth / 2 - layout.topSubCardGapX - layout.topSubCardWidth
      const { node } = makeSectionCardNode(subId, subLeftX, subY, layout.topSubCardWidth, sec)
      nodes.push(node)
      edges.push(makeSideEdge(n.id, subId, side))
    }
  })
  for (let i = 0; i < web3NodeIds.length - 1; i++) {
    edges.push(makeMainEdge(web3NodeIds[i], web3NodeIds[i + 1]))
  }

  const topRowsCount = Math.max(data.topLeft.nodes.length, data.topRight.nodes.length)
  const lastTopY = layout.topNodeStartY + (topRowsCount - 1) * layout.topNodeStepY
  // 估算顶部 sub-card 最大高度（取所有顶部 sub-card 中最高的）
  let topMaxSubH = 0
  data.topLeft.nodes.concat(data.topRight.nodes).forEach((n) => {
    if (n.subCard) topMaxSubH = Math.max(topMaxSubH, computeSectionCardHeight(asSectionBlocks(n.subCard)))
  })
  const topAreaBottomY = Math.max(
    lastTopY + layout.nodeHeight,
    lastTopY + layout.nodeHeight / 2 + topMaxSubH / 2,
  )

  // ─── 融合 section ───
  const fusionCenterX = layout.graphWidth / 2
  const fusionLabelY = topAreaBottomY + layout.fusionTopGap
  const fusionFrameTop = fusionLabelY + layout.fusionLabelHeight + layout.fusionLabelGap

  const topAnchorY = fusionFrameTop + layout.fusionTopAnchorOffset
  nodes.push(makeAnchorNode('FUSION-TOP', fusionCenterX, topAnchorY))
  if (aiNodeIds.length) edges.push(makeMainEdge(aiNodeIds[aiNodeIds.length - 1], 'FUSION-TOP'))
  if (web3NodeIds.length) edges.push(makeMainEdge(web3NodeIds[web3NodeIds.length - 1], 'FUSION-TOP'))

  let cardsBottomY = fusionFrameTop
  data.fusion.cards.forEach((card, i) => {
    const side: 'right' | 'left' = i % 2 === 0 ? 'right' : 'left'
    const y = fusionFrameTop + layout.fusionCardStartOffset + i * layout.fusionCardStepY
    const sec = asSectionBlocks(card)
    const cardLeftX = side === 'right'
      ? fusionCenterX + layout.fusionCardCenterGap
      : fusionCenterX - layout.fusionCardCenterGap - layout.fusionCardWidth
    const cardId = `FUSION-CARD-${i + 1}`
    const { node, height } = makeSectionCardNode(cardId, cardLeftX, y, layout.fusionCardWidth, sec)
    nodes.push(node)
    cardsBottomY = Math.max(cardsBottomY, y + height)
  })

  const bottomAnchorY = cardsBottomY + layout.fusionBottomAnchorOffset
  nodes.push(makeAnchorNode('FUSION-BOTTOM', fusionCenterX, bottomAnchorY))
  edges.push(makeMainEdge('FUSION-TOP', 'FUSION-BOTTOM'))

  const fusionFrameH = bottomAnchorY + layout.fusionPadY - fusionFrameTop
  nodes.push(makeFrameNode(
    'FRAME-FUSION',
    layout.fusionFrameLeftX, fusionFrameTop,
    layout.fusionFrameWidth, fusionFrameH,
    'fusion',
  ))

  const fusionLabelW = 220
  nodes.push(makeLabelNode(
    'LBL-FUSION',
    layout.fusionFrameLeftX + layout.fusionFrameWidth / 2 - fusionLabelW / 2,
    fusionLabelY,
    fusionLabelW, layout.fusionLabelHeight,
    data.fusion.label, 'fusion',
  ))

  // ─── 4 路分支 ───
  const splitCount = data.splits.length
  const splitLabelY = fusionFrameTop + fusionFrameH + layout.splitTopGap
  const splitFrameTop = splitLabelY + layout.splitLabelHeight + layout.splitLabelGap
  const totalSplitW = splitCount * layout.splitFrameWidth + Math.max(0, splitCount - 1) * layout.splitColGap
  const splitFirstFrameLeftX = (layout.graphWidth - totalSplitW) / 2

  let splitContentBottomY = splitFrameTop
  const splitColumnFirstIds: string[] = []

  data.splits.forEach((col, c) => {
    const frameLeftX = splitFirstFrameLeftX + c * (layout.splitFrameWidth + layout.splitColGap)
    const frameCenterX = frameLeftX + layout.splitFrameWidth / 2
    const colIds: string[] = []

    col.nodes.forEach((n, r) => {
      const y = splitFrameTop + layout.splitNodeStartOffset + r * layout.splitStepY
      nodes.push(makeRoadmapNode(n.id, n.title, 'topic', frameCenterX, y, 'fusion', n.link))
      colIds.push(n.id)
    })
    for (let r = 0; r < colIds.length - 1; r++) {
      edges.push(makeMainEdge(colIds[r], colIds[r + 1]))
    }
    if (colIds.length) splitColumnFirstIds.push(colIds[0])

    const colBottomY = splitFrameTop + layout.splitNodeStartOffset + Math.max(0, col.nodes.length - 1) * layout.splitStepY + layout.nodeHeight
    const frameH = colBottomY + layout.splitPadY - splitFrameTop
    splitContentBottomY = Math.max(splitContentBottomY, splitFrameTop + frameH)
    nodes.push(makeFrameNode(`FRAME-S${c + 1}`, frameLeftX, splitFrameTop, layout.splitFrameWidth, frameH, 'fusion'))

    const labelW = 120
    nodes.push(makeLabelNode(
      `LBL-S${c + 1}`,
      frameCenterX - labelW / 2,
      splitLabelY,
      labelW, layout.splitLabelHeight,
      col.label, 'fusion',
    ))
  })

  splitColumnFirstIds.forEach((firstId) => {
    edges.push(makeMainEdge('FUSION-BOTTOM', firstId))
  })

  return { nodes, edges, height: splitContentBottomY + layout.graphPaddingY }
}

// ============================================================
// 视口 / 自适应
// ============================================================
const nodeTypes = {
  roadmap: markRaw(RoadmapFlowNode),
  frame: markRaw(PlaygroundFrame),
  label: markRaw(PlaygroundLabel),
  anchor: markRaw(PlaygroundAnchor),
  'section-card': markRaw(PlaygroundSectionCard),
}
const viewportWidth = ref(1320)

function updateViewportWidth() {
  viewportWidth.value = window.innerWidth
}
onMounted(() => {
  updateViewportWidth()
  window.addEventListener('resize', updateViewportWidth)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateViewportWidth)
})

const flow = computed(() => buildFromData(playgroundRoadmap))

const viewport = computed(() => {
  const shellWidth = Math.min(1320, Math.max(320, viewportWidth.value - 40))
  const zoom = Math.min(1, Math.max(0.4, (shellWidth - 32) / layout.graphWidth))
  return {
    x: (shellWidth - layout.graphWidth * zoom) / 2,
    y: 24,
    zoom,
  }
})

const displayHeight = computed(() => {
  return Math.ceil(flow.value.height * viewport.value.zoom + viewport.value.y + 48)
})

function handleNodeClick({ node }: NodeMouseEvent<RoadmapNode>) {
  const link = node.data?.link
  if (!link) return
  window.open(link, '_blank')
}
</script>

<template>
  <section class="roadmap-playground">
    <div class="roadmap-playground-shell">
      <ClientOnly>
        <VueFlow
          class="roadmap-vue-flow"
          :style="{ height: `${displayHeight}px` }"
          :nodes="flow.nodes"
          :edges="flow.edges"
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
          :default-viewport="viewport"
          :min-zoom="0.4"
          :max-zoom="1"
          @node-click="handleNodeClick"
        />
        <template #fallback>
          <div class="roadmap-vue-flow" :style="{ height: `${displayHeight}px` }"></div>
        </template>
      </ClientOnly>
    </div>
  </section>
</template>

<style scoped>
.roadmap-playground {
  width: min(1320px, calc(100vw - 40px));
  margin: 40px auto;
}
</style>
