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

/**
 * Playground · 概念定义
 *  Section = label + (可选 frame) + 主节点 + sub-node card
 *
 * 当前布局（已按反馈调整）：
 *  - AI / Web3 没有 frame border，仅 label
 *  - 每个 A/B/C 主节点都挂一张 sub-node card
 *  - 融合主轴 trunk 在 graphWidth/2 居中
 *  - 融合 sub-card 左右交替（C1 右 / C2 左 / C3 右），frame 对称包住整体
 *  - 4 路分支每列一个 frame + label，节点不重叠
 */

// ---------- 几何参数 ----------
const layout = {
  graphWidth: 1240,
  graphPaddingY: 60,

  nodeWidth: 200,
  nodeHeight: 56,

  // ─── 顶部 AI / Web3（无 frame border，AI sub 全在右、Web3 sub 全在左，中间留分界） ───
  topLabelY: 16,
  topLabelHeight: 30,
  topNodeStartY: 80,
  topNodeStepY: 220,         // 留足空间避免同侧 sub-card 重叠
  topNodeCount: 3,
  topSubCardWidth: 220,
  topSubCardGapX: 28,

  // 主列向外贴近，让 A 全部 sub 留在左半区、B 全部 sub 留在右半区
  aiNodeX: 200,
  web3NodeX: 1040,

  // ─── 融合 section（主线贯穿中央，3 张 sub-card 平行排列） ───
  fusionTopGap: 110,
  fusionLabelHeight: 30,
  fusionLabelGap: 8,
  fusionFrameLeftX: 220,
  fusionFrameWidth: 800,     // 左右对称，中心 = graphWidth/2 = 620
  fusionPadX: 40,
  fusionPadY: 40,
  fusionTopAnchorOffset: 24,  // 主线上端到 frame 顶
  fusionBottomAnchorOffset: 24, // 主线下端到 frame 底
  fusionCardStartOffset: 40,  // 第一张 card 距 frame 顶
  fusionCardStepY: 130,       // card 之间的垂直步长（alternating）
  fusionCardWidth: 240,
  fusionCardCenterGap: 110,   // card 内侧到中心主线的水平距离

  // ─── 4 路分支 sections ───
  splitTopGap: 100,
  splitLabelHeight: 30,
  splitLabelGap: 8,
  splitColumns: 4,
  splitFrameWidth: 260,
  splitPadX: 30,
  splitPadY: 36,
  splitColGap: 32,
  splitNodeStartOffset: 30,
  splitNodesPerCol: 3,
  splitStepY: 100,
}

// ---------- 占位 sub-node 数据（每节点一张，items 支持可选 link） ----------
// 占位用同一个测试 link，后面替换为真实 handbook 路径
const DEMO_LINK = '/zh/part1/'
const L = (title: string) => ({ title, link: DEMO_LINK })

const subDemos: Record<string, SectionBlock[]> = {
  A1: [{ title: 'AI 分类', items: [L('弱人工智能'), L('强人工智能')] }],
  A2: [{ title: 'AI 模型', items: [L('LLM'), L('多模态')] }],
  A3: [{ title: 'AI 应用', items: [L('Agent'), L('AIGC')] }],
  B1: [{ title: 'Web3 基础', items: [L('公链'), L('DApp')] }],
  B2: [{ title: 'Web3 协议', items: [L('DeFi'), L('NFT')] }],
  B3: [{ title: 'Web3 工具', items: [L('钱包'), L('IDE')] }],
  C1: [{ title: '融合价值', items: [L('自动化'), L('智能化')] }],
  C2: [{ title: '融合场景', items: [L('链上交易'), L('内容协作')] }],
  C3: [{ title: '融合风险', items: [L('安全合规'), L('可解释')] }],
}

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

// ---------- 节点 / 连线工厂 ----------
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
    id,
    type: 'anchor',
    position: { x: cx - 0.5, y: cy - 0.5 },
    width: 1,
    height: 1,
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
    type: 'straight', // 直线，避免 smoothstep 在短水平连接上产生奇怪弧线
    sourceHandle: side === 'right' ? 'right-source' : 'left-source',
    targetHandle: side === 'right' ? 'left-target' : 'right-target',
    selectable: false, focusable: false, updatable: false,
    class: 'roadmap-flow-edge roadmap-flow-edge-topic',
  }
}

// ---------- 构建 ----------
function buildPlayground() {
  const nodes: AnyNode[] = []
  const edges: Edge[] = []

  // ============ AI 列（无 frame） ============
  const aiLabelW = 80
  nodes.push(makeLabelNode(
    'LBL-AI',
    layout.aiNodeX - aiLabelW / 2,
    layout.topLabelY,
    aiLabelW, layout.topLabelHeight,
    'AI', 'ai',
  ))

  const aiNodeIds: string[] = []
  for (let i = 0; i < layout.topNodeCount; i++) {
    const y = layout.topNodeStartY + i * layout.topNodeStepY
    const id = `A${i + 1}`
    nodes.push(makeRoadmapNode(id, `AI 主线 · A${i + 1}`, 'group', layout.aiNodeX, y, 'ai', DEMO_LINK))
    aiNodeIds.push(id)

    // sub-card 固定在右（保持在左半区，与 Web3 区有清晰分界）
    const subId = `${id}-SUB`
    const subData = subDemos[id]
    const subH = computeSectionCardHeight(subData)
    const subY = y + layout.nodeHeight / 2 - subH / 2
    const subLeftX = layout.aiNodeX + layout.nodeWidth / 2 + layout.topSubCardGapX
    const { node } = makeSectionCardNode(subId, subLeftX, subY, layout.topSubCardWidth, subData)
    nodes.push(node)
    edges.push(makeSideEdge(id, subId, 'right'))
  }
  for (let i = 0; i < aiNodeIds.length - 1; i++) {
    edges.push(makeMainEdge(aiNodeIds[i], aiNodeIds[i + 1]))
  }

  // ============ Web3 列（无 frame） ============
  const web3LabelW = 100
  nodes.push(makeLabelNode(
    'LBL-WEB3',
    layout.web3NodeX - web3LabelW / 2,
    layout.topLabelY,
    web3LabelW, layout.topLabelHeight,
    'Web3', 'web3',
  ))

  const web3NodeIds: string[] = []
  for (let i = 0; i < layout.topNodeCount; i++) {
    const y = layout.topNodeStartY + i * layout.topNodeStepY
    const id = `B${i + 1}`
    nodes.push(makeRoadmapNode(id, `Web3 主线 · B${i + 1}`, 'group', layout.web3NodeX, y, 'web3', DEMO_LINK))
    web3NodeIds.push(id)

    // sub-card 固定在左（保持在右半区，与 AI 区有清晰分界）
    const subId = `${id}-SUB`
    const subData = subDemos[id]
    const subH = computeSectionCardHeight(subData)
    const subY = y + layout.nodeHeight / 2 - subH / 2
    const subLeftX = layout.web3NodeX - layout.nodeWidth / 2 - layout.topSubCardGapX - layout.topSubCardWidth
    const { node } = makeSectionCardNode(subId, subLeftX, subY, layout.topSubCardWidth, subData)
    nodes.push(node)
    edges.push(makeSideEdge(id, subId, 'left'))
  }
  for (let i = 0; i < web3NodeIds.length - 1; i++) {
    edges.push(makeMainEdge(web3NodeIds[i], web3NodeIds[i + 1]))
  }

  const lastTopNodeY = layout.topNodeStartY + (layout.topNodeCount - 1) * layout.topNodeStepY
  const sampleSubH = computeSectionCardHeight(subDemos.A1)
  const topAreaBottomY = Math.max(
    lastTopNodeY + layout.nodeHeight,
    lastTopNodeY + layout.nodeHeight / 2 + sampleSubH / 2,
  )

  // ============ 融合 section（主线贯穿中央 + 3 张 sub-card 平行排列） ============
  const fusionCenterX = layout.graphWidth / 2
  const fusionLabelY = topAreaBottomY + layout.fusionTopGap
  const fusionFrameTop = fusionLabelY + layout.fusionLabelHeight + layout.fusionLabelGap

  // 顶部 anchor：A3 / B3 在此汇合，作为主线起点
  const topAnchorY = fusionFrameTop + layout.fusionTopAnchorOffset
  nodes.push(makeAnchorNode('FUSION-TOP', fusionCenterX, topAnchorY))
  edges.push(makeMainEdge(aiNodeIds[aiNodeIds.length - 1], 'FUSION-TOP'))
  edges.push(makeMainEdge(web3NodeIds[web3NodeIds.length - 1], 'FUSION-TOP'))

  // 3 张交叉领域 sub-card：左右交替，平行排列（无序，无相互连线）
  const fusionCards = [
    { id: 'FUSION-CARD-1', sections: subDemos.C1 }, // 融合价值
    { id: 'FUSION-CARD-2', sections: subDemos.C2 }, // 融合场景
    { id: 'FUSION-CARD-3', sections: subDemos.C3 }, // 融合风险
  ]
  let cardsBottomY = fusionFrameTop
  fusionCards.forEach((card, i) => {
    const side: 'right' | 'left' = i % 2 === 0 ? 'right' : 'left'
    const y = fusionFrameTop + layout.fusionCardStartOffset + i * layout.fusionCardStepY
    const cardLeftX = side === 'right'
      ? fusionCenterX + layout.fusionCardCenterGap
      : fusionCenterX - layout.fusionCardCenterGap - layout.fusionCardWidth
    const { node, height } = makeSectionCardNode(card.id, cardLeftX, y, layout.fusionCardWidth, card.sections)
    nodes.push(node)
    cardsBottomY = Math.max(cardsBottomY, y + height)
  })

  // 底部 anchor：所有分支从这里分裂
  const bottomAnchorY = cardsBottomY + layout.fusionBottomAnchorOffset
  nodes.push(makeAnchorNode('FUSION-BOTTOM', fusionCenterX, bottomAnchorY))

  // 主线：top → bottom，贯穿整个融合 section
  edges.push(makeMainEdge('FUSION-TOP', 'FUSION-BOTTOM'))

  // 融合 frame
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
    'AI × Web3 融合起点', 'fusion',
  ))

  // ============ 4 路分支 sections ============
  const splitLabelY = fusionFrameTop + fusionFrameH + layout.splitTopGap
  const splitFrameTop = splitLabelY + layout.splitLabelHeight + layout.splitLabelGap

  const totalSplitW = layout.splitColumns * layout.splitFrameWidth + (layout.splitColumns - 1) * layout.splitColGap
  const splitFirstFrameLeftX = (layout.graphWidth - totalSplitW) / 2

  const splitColumnFirstIds: string[] = []
  let splitContentBottomY = splitFrameTop
  const branchLabels = ['D', 'E', 'F', 'G']

  for (let c = 0; c < layout.splitColumns; c++) {
    const frameLeftX = splitFirstFrameLeftX + c * (layout.splitFrameWidth + layout.splitColGap)
    const frameCenterX = frameLeftX + layout.splitFrameWidth / 2
    const colIds: string[] = []

    for (let r = 0; r < layout.splitNodesPerCol; r++) {
      const y = splitFrameTop + layout.splitNodeStartOffset + r * layout.splitStepY
      const id = `S${c + 1}-${r + 1}`
      nodes.push(makeRoadmapNode(id, `分支 ${branchLabels[c]}${r + 1}`, 'topic', frameCenterX, y, 'fusion', DEMO_LINK))
      colIds.push(id)
    }
    for (let r = 0; r < colIds.length - 1; r++) {
      edges.push(makeMainEdge(colIds[r], colIds[r + 1]))
    }
    splitColumnFirstIds.push(colIds[0])

    const colBottomY = splitFrameTop + layout.splitNodeStartOffset + (layout.splitNodesPerCol - 1) * layout.splitStepY + layout.nodeHeight
    const frameH = colBottomY + layout.splitPadY - splitFrameTop
    splitContentBottomY = Math.max(splitContentBottomY, splitFrameTop + frameH)
    nodes.push(makeFrameNode(`FRAME-S${c + 1}`, frameLeftX, splitFrameTop, layout.splitFrameWidth, frameH, 'fusion'))

    const labelW = 120
    nodes.push(makeLabelNode(
      `LBL-S${c + 1}`,
      frameCenterX - labelW / 2,
      splitLabelY,
      labelW, layout.splitLabelHeight,
      `分支 ${branchLabels[c]}`, 'fusion',
    ))
  }

  // 主线从融合 section 底部 anchor 分裂到 4 路分支
  splitColumnFirstIds.forEach((firstId) => {
    edges.push(makeMainEdge('FUSION-BOTTOM', firstId))
  })

  return { nodes, edges, height: splitContentBottomY + layout.graphPaddingY }
}

// ---------- 视口 / 自适应 ----------
const nodeTypes = {
  roadmap: markRaw(RoadmapFlowNode),
  frame: markRaw(PlaygroundFrame),
  label: markRaw(PlaygroundLabel),
  anchor: markRaw(PlaygroundAnchor),
  'section-card': markRaw(PlaygroundSectionCard),
}
const viewportWidth = ref(1240)

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

const flow = computed(() => buildPlayground())

const viewport = computed(() => {
  const shellWidth = Math.min(1240, Math.max(320, viewportWidth.value - 40))
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
  // 仅 roadmap 节点带 link，section-card 内部 item 由 PlaygroundSectionCard 自己处理
  const link = node.data?.link
  if (!link) return
  window.open(link, '_blank')
}
</script>

<template>
  <section class="roadmap-playground">
    <header class="playground-head">
      <h3>Roadmap Playground · Section 编排测试</h3>
      <p>每个主节点都挂一张 sub-node card；融合主轴居中。</p>
    </header>

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
  width: min(1240px, calc(100vw - 40px));
  margin: 40px auto;
}

.playground-head {
  text-align: center;
  margin-bottom: 16px;
}

.playground-head h3 {
  margin: 0 0 6px;
  font-size: 20px;
  font-weight: 700;
  color: rgba(170, 104, 255, 0.95);
}

.playground-head p {
  margin: 0;
  color: rgba(63, 56, 86, 0.7);
  font-size: 14px;
}

html[data-theme='dark'] .playground-head p {
  color: rgba(214, 200, 240, 0.7);
}
</style>
