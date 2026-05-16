<script setup lang="ts">
import { computed, markRaw, onBeforeUnmount, onMounted, ref } from 'vue'
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
import RoadmapFlowNode from './RoadmapFlowNode.vue'
import PlaygroundFrame from './PlaygroundFrame.vue'
import PlaygroundLabel from './PlaygroundLabel.vue'
import PlaygroundAnchor from './PlaygroundAnchor.vue'
import PlaygroundSectionCard, { type SectionBlock } from './PlaygroundSectionCard.vue'
import type { RoadmapNode } from './roadmap-layout'
import {
  describeRoadmapTitle,
  displayRoadmapTitle,
  playgroundRoadmap,
  type RoadmapData,
  type RoadmapMainNode,
  type RoadmapSubCard,
} from '../content/playground-roadmap-data'

/**
 * Roadmap Playground · 样式与布局规则（已固化，请勿因数据而修改）
 * ─────────────────────────────────────────────────────────────────
 * 数据来源：docs/.vuepress/content/playground-roadmap-data.ts
 * 本组件只负责把数据按下面规则排到画布上：
 *
 *  1. 节点：宽 220，渲染由 RoadmapFlowNode 决定，自带 hover 提亮 + cursor pointer
 *  2. Sub-card：宽 260 (top) / 340 (fusion)，高度按 items 数量自动算
 *  3. 顶部 AI / Web3：
 *     - AI 主列固定 X=410，Web3 主列固定 X=1230
 *     - AI sub-card 按节点 index 右 / 左交替，Web3 sub-card 使用显式左右位置配置
 *     - 主线保持紧凑固定节奏；sub-card 在各自 lane 内有空就向上贴合，只避免同 lane 重叠
 *  4. 中央融合 section：
 *     - 主线由 anchor 上下贯穿中央
 *     - cards 自动排成 4 列，中线左右各 2 列；每列向上贴合，只避免同列重叠
 *     - frame 宽 1320、padding 44 包住所有 cards
 *  5. 多路分支：
 *     - 每列独立 frame，宽 250、列间距 28
 *     - 画布按 6 个 Hackathon tracks 扩展
 *  6. 主线连边 = smoothstep + 箭头；side 连边 = straight
 *  7. 节点 / sub-card item 的 link 控制 hover 提亮与 cursor，新窗口打开
 */

// ============================================================
// LAYOUT RULES（锁定，不要因数据改动）
// ============================================================
const layout = {
  // 中心 = 820；AI 半区 0-820，Web3 半区 820-1640
  graphWidth: 1640,
  graphPaddingY: 60,

  nodeWidth: 220,
  nodeHeight: 70,

  // 顶部 AI / Web3（每侧 sub-card 在主列左右交替，但永远不跨过中心）
  topLabelY: 16,
  topLabelHeight: 30,
  topNodeStartY: 80,
  topNodeStepY: 150,
  topSubCardGapY: 22,
  topSubCardWidth: 260,
  topSubCardGapX: 20,
  aiNodeX: 410,
  web3NodeX: 1230,

  // 融合 section（trunk 居中 820，frame 对称包住 cards）
  fusionTopGap: 82,
  fusionLabelHeight: 30,
  fusionLabelGap: 8,
  fusionFrameLeftX: 160,
  fusionFrameWidth: 1320,
  fusionPadX: 44,
  fusionPadY: 44,
  fusionTopAnchorOffset: 24,
  fusionBottomAnchorOffset: 24,
  fusionCardStartOffset: 36,
  fusionCardGapY: 18,
  fusionCardWidth: 280,
  fusionCardColGap: 24,
  fusionCardCenterGap: 34,

  // Hackathon tracks（6 张 sub-card，6×250 + 5×28 = 1640，填满 1640 宽画布）
  splitTopGap: 82,
  splitLabelHeight: 30,
  splitSectionLabelGap: 18,
  splitLabelGap: 8,
  splitFrameWidth: 250,
  splitPadX: 24,
  splitPadY: 32,
  splitColGap: 28,
  splitCardStartOffset: 30,
}

const web3SubCardSideByTitle: Record<string, 'left' | 'right'> = {
  Cryptography: 'left',
  'Smart Contract': 'right',
  'Account Abstraction': 'left',
  Security: 'right',
}

const topSubCardAlignPairs: Array<[string, string]> = [
  ['RAG', 'Smart Contract'],
  ['Evaluation', 'Security'],
]

// ============================================================
// 高度计算（与 PlaygroundSectionCard.vue 内部尺寸一致）
// ============================================================
function computeSectionCardHeight(sections: SectionBlock[]): number {
  const padTop = 24, padBottom = 24
  const titleRowH = 36, titleGap = 10
  const itemH = 54, itemGap = 8
  const blockGap = 16
  let h = padTop
  sections.forEach((s, i) => {
    if (i > 0) h += blockGap
    h += titleRowH + titleGap
    h += s.items.length * itemH + Math.max(0, s.items.length - 1) * itemGap
  })
  h += padBottom
  return h
}

type RoadmapLocale = 'zh' | 'en'

function slugifyRoadmapTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/×/g, 'x')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function handbookPath(locale: RoadmapLocale, section: 'ai' | 'web3' | 'bridge' | 'tracks', title: string): string {
  if (locale === 'en') return '/en/contribution/'
  return `/${locale}/handbook/${section}/${slugifyRoadmapTitle(title)}/`
}

function handbookAnchor(title: string): string {
  return `#${slugifyRoadmapTitle(title)}`
}

function withItemLinks(card: RoadmapSubCard, pagePath: string): RoadmapSubCard {
  return {
    ...card,
    link: pagePath,
    items: card.items.map((item) => ({
      ...item,
      link: `${pagePath}${item.anchor ?? handbookAnchor(item.title)}`,
    })),
  }
}

function asSectionBlocks(card: RoadmapSubCard, locale: RoadmapLocale): SectionBlock[] {
  return [{
    title: displayRoadmapTitle(card.title, locale),
    link: card.link,
    description: card.description ?? describeRoadmapTitle(card.title, locale),
    items: card.items.map((item) => ({
      ...item,
      title: displayRoadmapTitle(item.title, locale),
      description: item.description ?? describeRoadmapTitle(item.title, locale),
    })),
  }]
}

// ============================================================
// 节点 / 连线工厂
// ============================================================
type AnyNode = Node | RoadmapNode

interface TopSubCardPlacement {
  node: AnyNode
  height: number
  title: string
  laneKey: string
}

function alignTopSubCards(placements: Record<string, TopSubCardPlacement>) {
  topSubCardAlignPairs.forEach(([leftTitle, rightTitle]) => {
    const left = placements[leftTitle]
    const right = placements[rightTitle]
    if (!left || !right) return

    const alignedY = Math.round((left.node.position.y + right.node.position.y) / 2)
    left.node.position.y = alignedY
    right.node.position.y = alignedY
  })
}

function getAlignedTopSubCardGroups(placements: Record<string, TopSubCardPlacement>) {
  const groupedTitles = new Set<string>()
  const groups: TopSubCardPlacement[][] = []

  topSubCardAlignPairs.forEach((pair) => {
    const group = pair
      .map((title) => placements[title])
      .filter((placement): placement is TopSubCardPlacement => !!placement)

    if (group.length < 2) return

    group.forEach((placement) => groupedTitles.add(placement.title))
    groups.push(group)
  })

  Object.values(placements).forEach((placement) => {
    if (groupedTitles.has(placement.title)) return
    groups.push([placement])
  })

  return groups
}

function resolveTopSubCardCollisions(placements: Record<string, TopSubCardPlacement>) {
  const laneBottoms = new Map<string, number>()
  const groups = getAlignedTopSubCardGroups(placements).sort((a, b) => {
    const ay = Math.min(...a.map((placement) => placement.node.position.y))
    const by = Math.min(...b.map((placement) => placement.node.position.y))
    if (ay !== by) return ay - by
    return a[0].title.localeCompare(b[0].title)
  })

  groups.forEach((group) => {
    let groupY = Math.min(...group.map((placement) => placement.node.position.y))

    group.forEach((placement) => {
      const laneBottom = laneBottoms.get(placement.laneKey) ?? layout.topNodeStartY
      groupY = Math.max(groupY, laneBottom + layout.topSubCardGapY)
    })

    group.forEach((placement) => {
      placement.node.position.y = groupY
      laneBottoms.set(placement.laneKey, groupY + placement.height)
    })
  })
}

function makeRoadmapNode(
  id: string, title: string, variant: 'section-title' | 'group' | 'topic',
  centerX: number, y: number, tone: 'intro' | 'ai' | 'web3' | 'fusion',
  locale: RoadmapLocale,
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
    data: { title: displayRoadmapTitle(title, locale), tone, variant, isInteractive: interactive, link, description: describeRoadmapTitle(title, locale) },
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

function makeMainEdge(source: string, target: string, tone: 'ai' | 'web3' | 'fusion' = 'fusion'): Edge {
  const markerColor = tone === 'ai'
    ? 'rgba(160, 138, 255, 0.94)'
    : tone === 'web3'
      ? 'rgba(82, 205, 255, 0.92)'
      : 'rgba(203, 140, 255, 0.9)'

  return {
    id: `${source}->${target}`, source, target,
    type: 'smoothstep',
    sourceHandle: 'bottom', targetHandle: 'top',
    selectable: false, focusable: false, updatable: false,
    class: `roadmap-flow-edge roadmap-flow-edge-mainline roadmap-flow-edge-${tone}`,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: markerColor,
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
    class: 'roadmap-flow-edge roadmap-flow-edge-topic roadmap-flow-edge-side',
  }
}

// ============================================================
// 构建：完全由 data 驱动
// ============================================================
function buildFromData(data: RoadmapData, locale: RoadmapLocale) {
  const nodes: AnyNode[] = []
  const edges: Edge[] = []
  const topRowsCount = Math.max(data.topLeft.nodes.length, data.topRight.nodes.length)
  const topMainBottomY = topRowsCount
    ? layout.topNodeStartY + (topRowsCount - 1) * layout.topNodeStepY + layout.nodeHeight
    : layout.topNodeStartY
  let topSubCardsBottomY = layout.topNodeStartY
  const topSubCardPlacements: Record<string, TopSubCardPlacement> = {}

  // ─── 顶部 AI 列 ───
  const aiLabelW = 80
  nodes.push(makeLabelNode(
    'LBL-AI',
    layout.aiNodeX - aiLabelW / 2, layout.topLabelY,
    aiLabelW, layout.topLabelHeight,
    displayRoadmapTitle(data.topLeft.label, locale), 'ai',
  ))
  const aiNodeIds: string[] = []
  const aiLaneBottom: Record<'left' | 'right', number> = {
    left: layout.topNodeStartY,
    right: layout.topNodeStartY,
  }
  data.topLeft.nodes.forEach((n, i) => {
    const y = layout.topNodeStartY + i * layout.topNodeStepY
    const centerY = y + layout.nodeHeight / 2
    nodes.push(makeRoadmapNode(n.id, n.title, 'group', layout.aiNodeX, y, 'ai', locale, n.link))
    aiNodeIds.push(n.id)
    if (n.subCard) {
      // 在 AI 半区内左右交替（i=0 右 / i=1 左 / i=2 右 …）
      const side: 'right' | 'left' = i % 2 === 0 ? 'right' : 'left'
      const subId = `${n.id}-SUB`
      const sec = asSectionBlocks(n.subCard, locale)
      const subH = computeSectionCardHeight(sec)
      const desiredSubY = centerY - subH / 2
      const subY = Math.max(desiredSubY, aiLaneBottom[side] + layout.topSubCardGapY)
      const subLeftX = side === 'right'
        ? layout.aiNodeX + layout.nodeWidth / 2 + layout.topSubCardGapX
        : layout.aiNodeX - layout.nodeWidth / 2 - layout.topSubCardGapX - layout.topSubCardWidth
      const { node } = makeSectionCardNode(subId, subLeftX, subY, layout.topSubCardWidth, sec)
      nodes.push(node)
      topSubCardPlacements[n.title] = { node, height: subH, title: n.title, laneKey: `ai:${side}` }
      edges.push(makeSideEdge(n.id, subId, side))
      aiLaneBottom[side] = subY + subH
      topSubCardsBottomY = Math.max(topSubCardsBottomY, aiLaneBottom[side])
    }
  })
  for (let i = 0; i < aiNodeIds.length - 1; i++) {
    edges.push(makeMainEdge(aiNodeIds[i], aiNodeIds[i + 1], 'ai'))
  }

  // ─── 顶部 Web3 列（镜像） ───
  const web3LabelW = 100
  nodes.push(makeLabelNode(
    'LBL-WEB3',
    layout.web3NodeX - web3LabelW / 2, layout.topLabelY,
    web3LabelW, layout.topLabelHeight,
    displayRoadmapTitle(data.topRight.label, locale), 'web3',
  ))
  const web3NodeIds: string[] = []
  const web3LaneBottom: Record<'left' | 'right', number> = {
    left: layout.topNodeStartY,
    right: layout.topNodeStartY,
  }
  data.topRight.nodes.forEach((n, i) => {
    const y = layout.topNodeStartY + i * layout.topNodeStepY
    const centerY = y + layout.nodeHeight / 2
    nodes.push(makeRoadmapNode(n.id, n.title, 'group', layout.web3NodeX, y, 'web3', locale, n.link))
    web3NodeIds.push(n.id)
    if (n.subCard) {
      const side: 'right' | 'left' = web3SubCardSideByTitle[n.title] ?? 'left'
      const subId = `${n.id}-SUB`
      const sec = asSectionBlocks(n.subCard, locale)
      const subH = computeSectionCardHeight(sec)
      const desiredSubY = centerY - subH / 2
      const subY = Math.max(desiredSubY, web3LaneBottom[side] + layout.topSubCardGapY)
      const subLeftX = side === 'right'
        ? layout.web3NodeX + layout.nodeWidth / 2 + layout.topSubCardGapX
        : layout.web3NodeX - layout.nodeWidth / 2 - layout.topSubCardGapX - layout.topSubCardWidth
      const { node } = makeSectionCardNode(subId, subLeftX, subY, layout.topSubCardWidth, sec)
      nodes.push(node)
      topSubCardPlacements[n.title] = { node, height: subH, title: n.title, laneKey: `web3:${side}` }
      edges.push(makeSideEdge(n.id, subId, side))
      web3LaneBottom[side] = subY + subH
      topSubCardsBottomY = Math.max(topSubCardsBottomY, web3LaneBottom[side])
    }
  })
  for (let i = 0; i < web3NodeIds.length - 1; i++) {
    edges.push(makeMainEdge(web3NodeIds[i], web3NodeIds[i + 1], 'web3'))
  }

  alignTopSubCards(topSubCardPlacements)
  resolveTopSubCardCollisions(topSubCardPlacements)
  topSubCardsBottomY = Math.max(
    layout.topNodeStartY,
    ...Object.values(topSubCardPlacements).map(({ node, height }) => node.position.y + height),
  )

  const topAreaBottomY = Math.max(topMainBottomY, topSubCardsBottomY)

  // ─── 融合 section ───
  const fusionCenterX = layout.graphWidth / 2
  const fusionLabelY = topAreaBottomY + layout.fusionTopGap
  const fusionFrameTop = fusionLabelY + layout.fusionLabelHeight + layout.fusionLabelGap

  const topAnchorY = fusionFrameTop + layout.fusionTopAnchorOffset
  nodes.push(makeAnchorNode('FUSION-TOP', fusionCenterX, topAnchorY))
  if (aiNodeIds.length) edges.push(makeMainEdge(aiNodeIds[aiNodeIds.length - 1], 'FUSION-TOP'))
  if (web3NodeIds.length) edges.push(makeMainEdge(web3NodeIds[web3NodeIds.length - 1], 'FUSION-TOP'))

  let cardsBottomY = fusionFrameTop
  const fusionColumnXs = [
    fusionCenterX - layout.fusionCardCenterGap - layout.fusionCardWidth * 2 - layout.fusionCardColGap,
    fusionCenterX - layout.fusionCardCenterGap - layout.fusionCardWidth,
    fusionCenterX + layout.fusionCardCenterGap,
    fusionCenterX + layout.fusionCardCenterGap + layout.fusionCardWidth + layout.fusionCardColGap,
  ]
  const fusionColumnBottoms = fusionColumnXs.map(() => fusionFrameTop + layout.fusionCardStartOffset)
  data.fusion.cards.forEach((card, i) => {
    const col = i % fusionColumnXs.length
    const y = fusionColumnBottoms[col]
    const sec = asSectionBlocks(card, locale)
    const cardLeftX = fusionColumnXs[col]
    const cardId = `FUSION-CARD-${i + 1}`
    const { node, height } = makeSectionCardNode(cardId, cardLeftX, y, layout.fusionCardWidth, sec)
    nodes.push(node)
    cardsBottomY = Math.max(cardsBottomY, y + height)
    fusionColumnBottoms[col] = y + height + layout.fusionCardGapY
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
    displayRoadmapTitle(data.fusion.label, locale), 'fusion',
  ))

  // ─── 4 路分支 ───
  const splitCount = data.splits.length
  const splitSectionLabelY = fusionFrameTop + fusionFrameH + layout.splitTopGap
  const splitFrameTop = splitSectionLabelY + layout.splitLabelHeight + layout.splitSectionLabelGap
  const totalSplitW = splitCount * layout.splitFrameWidth + Math.max(0, splitCount - 1) * layout.splitColGap
  const splitFirstFrameLeftX = (layout.graphWidth - totalSplitW) / 2

  let splitContentBottomY = splitFrameTop
  const splitColumnFirstIds: string[] = []

  const splitSectionLabelW = 260
  nodes.push(makeLabelNode(
    'LBL-FRONTIER',
    layout.graphWidth / 2 - splitSectionLabelW / 2,
    splitSectionLabelY,
    splitSectionLabelW, layout.splitLabelHeight,
    displayRoadmapTitle('Frontier Directions', locale), 'fusion',
  ))

  data.splits.forEach((col, c) => {
    const cardLeftX = splitFirstFrameLeftX + c * (layout.splitFrameWidth + layout.splitColGap)
    const cardY = splitFrameTop + layout.splitCardStartOffset
    const cardId = `TRACK-CARD-${c + 1}`
    const sections: SectionBlock[] = [{
      title: displayRoadmapTitle(col.label, locale),
      link: handbookPath(locale, 'tracks', col.label),
      description: describeRoadmapTitle(col.label, locale),
      items: col.nodes.map((n) => ({
        title: displayRoadmapTitle(n.title, locale),
        link: n.link,
        description: n.description ?? describeRoadmapTitle(n.title, locale),
      })),
    }]
    const { node, height } = makeSectionCardNode(cardId, cardLeftX, cardY, layout.splitFrameWidth, sections)

    nodes.push(node)
    splitColumnFirstIds.push(cardId)
    splitContentBottomY = Math.max(splitContentBottomY, cardY + height + layout.splitPadY)
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
const viewportWidth = ref(typeof window === 'undefined' ? 1320 : window.innerWidth)
const routeLocale = useRouteLocale()
const localeKey = computed<RoadmapLocale>(() => routeLocale.value === '/en/' ? 'en' : 'zh')
const isMobileLayout = computed(() => viewportWidth.value <= 768)

function describeTitle(title: string): string {
  return describeRoadmapTitle(title, localeKey.value)
}

function displayTitle(title: string): string {
  return displayRoadmapTitle(title, localeKey.value)
}

const homepageAiIds = new Set(['A1', 'A2', 'A3', 'A4', 'A5', 'A9'])
const homepageWeb3Ids = new Set(['B1', 'B2', 'B3', 'B4', 'B6', 'B10'])
const homepageSubCardIds = new Set(['A1', 'A4', 'A5', 'A9', 'B1', 'B3', 'B6', 'B10'])
const homepageFusionTitles = new Set([
  'Chain-aware Context',
  'Web3 Tool Use',
  'Agent Workflow',
  'Agent Wallet',
  'Machine Payment',
  'Settlement & Escrow',
  'AI Oracle',
  'Verifiable AI',
])

function simplifyMainNode(node: RoadmapMainNode): RoadmapMainNode {
  if (!homepageSubCardIds.has(node.id) || !node.subCard) {
    const { subCard, ...mainNode } = node
    void subCard
    return mainNode
  }

  return {
    ...node,
    subCard: trimCard(node.subCard, 4),
  }
}

function trimCard(card: RoadmapSubCard, itemLimit: number): RoadmapSubCard {
  return {
    ...card,
    items: card.items.slice(0, itemLimit),
  }
}

const homepageRoadmap = computed<RoadmapData>(() => ({
  topLeft: {
    ...playgroundRoadmap.topLeft,
    nodes: playgroundRoadmap.topLeft.nodes
      .filter((node) => homepageAiIds.has(node.id))
      .map(simplifyMainNode)
      .map((node) => {
        const pagePath = handbookPath(localeKey.value, 'ai', node.title)
        return {
          ...node,
          link: pagePath,
          subCard: node.subCard ? withItemLinks(node.subCard, pagePath) : undefined,
        }
      }),
  },
  topRight: {
    ...playgroundRoadmap.topRight,
    nodes: playgroundRoadmap.topRight.nodes
      .filter((node) => homepageWeb3Ids.has(node.id))
      .map(simplifyMainNode)
      .map((node) => {
        const pagePath = handbookPath(localeKey.value, 'web3', node.title)
        return {
          ...node,
          link: pagePath,
          subCard: node.subCard ? withItemLinks(node.subCard, pagePath) : undefined,
        }
      }),
  },
  fusion: {
    ...playgroundRoadmap.fusion,
    cards: playgroundRoadmap.fusion.cards
      .filter((card) => homepageFusionTitles.has(card.title))
      .map((card) => {
        const pagePath = handbookPath(localeKey.value, 'bridge', card.title)
        return withItemLinks(trimCard(card, 4), pagePath)
      }),
  },
  splits: playgroundRoadmap.splits.map((split) => ({
    ...split,
    nodes: split.nodes.slice(0, 3).map((node) => ({
      ...node,
      link: `${handbookPath(localeKey.value, 'tracks', split.label)}${handbookAnchor(node.title)}`,
    })),
  })),
}))

const visibleMobileRoadmap = computed(() => homepageRoadmap.value)

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

const flow = computed(() => buildFromData(homepageRoadmap.value, localeKey.value))

const viewport = computed(() => {
  const shellWidth = Math.min(layout.graphWidth, Math.max(320, viewportWidth.value - 40))
  const zoom = Math.min(1, Math.max(0.4, (shellWidth - 32) / layout.graphWidth))
  return {
    x: (shellWidth - layout.graphWidth * zoom) / 2,
    y: 24,
    zoom,
  }
})

const flowKey = computed(() => `roadmap-${Math.round(viewport.value.zoom * 1000)}`)

const displayHeight = computed(() => {
  return Math.ceil(flow.value.height * viewport.value.zoom + viewport.value.y + 48)
})

function handleNodeClick({ node }: NodeMouseEvent<RoadmapNode>) {
  const link = node.data?.link
  if (!link) return
  window.location.href = withBase(link)
}

function handleMobileItemClick(link?: string) {
  if (!link) return
  window.location.href = withBase(link)
}
</script>

<template>
  <section class="roadmap-playground">
    <div v-if="isMobileLayout" class="roadmap-mobile-flat">
      <details class="roadmap-mobile-section is-ai" open>
        <summary>
          <span>{{ displayTitle(visibleMobileRoadmap.topLeft.label) }}</span>
          <small>{{ describeTitle(visibleMobileRoadmap.topLeft.label) }}</small>
        </summary>
        <article v-for="node in visibleMobileRoadmap.topLeft.nodes" :key="node.id" class="roadmap-mobile-card">
          <h3
            :title="describeTitle(node.title)"
            :class="{ 'is-clickable': !!node.link }"
            @click="handleMobileItemClick(node.link)"
          >{{ displayTitle(node.title) }}</h3>
          <p>{{ describeTitle(node.title) }}</p>
          <div v-if="node.subCard" class="roadmap-mobile-items">
            <button
              v-for="item in node.subCard.items"
              :key="item.title"
              type="button"
              :title="item.description ?? describeTitle(item.title)"
              @click="handleMobileItemClick(item.link)"
            >
              {{ displayTitle(item.title) }}
            </button>
          </div>
        </article>
      </details>

      <details class="roadmap-mobile-section is-web3" open>
        <summary>
          <span>{{ displayTitle(visibleMobileRoadmap.topRight.label) }}</span>
          <small>{{ describeTitle(visibleMobileRoadmap.topRight.label) }}</small>
        </summary>
        <article v-for="node in visibleMobileRoadmap.topRight.nodes" :key="node.id" class="roadmap-mobile-card">
          <h3
            :title="describeTitle(node.title)"
            :class="{ 'is-clickable': !!node.link }"
            @click="handleMobileItemClick(node.link)"
          >{{ displayTitle(node.title) }}</h3>
          <p>{{ describeTitle(node.title) }}</p>
          <div v-if="node.subCard" class="roadmap-mobile-items">
            <button
              v-for="item in node.subCard.items"
              :key="item.title"
              type="button"
              :title="item.description ?? describeTitle(item.title)"
              @click="handleMobileItemClick(item.link)"
            >
              {{ displayTitle(item.title) }}
            </button>
          </div>
        </article>
      </details>

      <details class="roadmap-mobile-section is-bridge" open>
        <summary>
          <span>{{ displayTitle(visibleMobileRoadmap.fusion.label) }}</span>
          <small>{{ describeTitle(visibleMobileRoadmap.fusion.label) }}</small>
        </summary>
        <article v-for="card in visibleMobileRoadmap.fusion.cards" :key="card.title" class="roadmap-mobile-card">
          <h3
            :title="describeTitle(card.title)"
            :class="{ 'is-clickable': !!card.link }"
            @click="handleMobileItemClick(card.link)"
          >{{ displayTitle(card.title) }}</h3>
          <p>{{ describeTitle(card.title) }}</p>
          <div class="roadmap-mobile-items">
            <button
              v-for="item in card.items"
              :key="item.title"
              type="button"
              :title="item.description ?? describeTitle(item.title)"
              @click="handleMobileItemClick(item.link)"
            >
              {{ displayTitle(item.title) }}
            </button>
          </div>
        </article>
      </details>

      <details class="roadmap-mobile-section is-frontier" open>
        <summary>
          <span>{{ displayTitle('Frontier Directions') }}</span>
          <small>{{ describeTitle('Frontier Directions') }}</small>
        </summary>
        <article v-for="track in visibleMobileRoadmap.splits" :key="track.label" class="roadmap-mobile-card">
          <h3
            :title="describeTitle(track.label)"
            class="is-clickable"
            @click="handleMobileItemClick(handbookPath(localeKey, 'tracks', track.label))"
          >{{ displayTitle(track.label) }}</h3>
          <p>{{ describeTitle(track.label) }}</p>
          <div class="roadmap-mobile-items">
            <button
              v-for="item in track.nodes"
              :key="item.id"
              type="button"
              :title="item.description ?? describeTitle(item.title)"
              @click="handleMobileItemClick(item.link)"
            >
              {{ displayTitle(item.title) }}
            </button>
          </div>
        </article>
      </details>
    </div>

    <div v-else class="roadmap-playground-shell">
      <ClientOnly>
        <VueFlow
          :key="flowKey"
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
  width: min(1640px, calc(100vw - 40px));
  margin: 40px auto;
}

@media (max-width: 768px) {
  .roadmap-playground {
    width: min(100%, calc(100vw - 24px));
    margin: 28px auto;
  }
}

:deep(.roadmap-vue-flow .roadmap-flow-edge-ai .vue-flow__edge-path) {
  stroke: rgba(160, 138, 255, 0.94);
  filter:
    drop-shadow(0 0 7px rgba(142, 113, 255, 0.34))
    drop-shadow(0 0 14px rgba(142, 113, 255, 0.14));
}

:deep(.roadmap-vue-flow .roadmap-flow-edge-web3 .vue-flow__edge-path) {
  stroke: rgba(82, 205, 255, 0.92);
  filter:
    drop-shadow(0 0 7px rgba(74, 195, 255, 0.34))
    drop-shadow(0 0 14px rgba(74, 195, 255, 0.14));
}

:deep(.roadmap-vue-flow .roadmap-flow-edge-fusion .vue-flow__edge-path) {
  stroke: rgba(203, 140, 255, 0.92);
  filter: none;
}

:deep(.roadmap-vue-flow .roadmap-flow-edge-ai .vue-flow__edge-path),
:deep(.roadmap-vue-flow .roadmap-flow-edge-web3 .vue-flow__edge-path) {
  stroke-dasharray: none;
}

:deep(.roadmap-vue-flow .roadmap-flow-edge-side .vue-flow__edge-path) {
  stroke-width: 1.8;
  stroke-dasharray: 7 7;
  opacity: 0.82;
  filter: drop-shadow(0 0 5px rgba(178, 138, 255, 0.22));
}

.roadmap-mobile-flat {
  display: grid;
  gap: 18px;
  width: 100%;
  min-width: 0;
  overflow: hidden;
}

.roadmap-mobile-section {
  --mobile-accent: rgba(170, 104, 255, 0.95);
  --mobile-border: rgba(186, 153, 255, 0.36);
  --mobile-soft: rgba(170, 104, 255, 0.1);
  border: 1px solid var(--mobile-border);
  border-radius: 18px;
  background:
    radial-gradient(120% 70% at 0% 0%, var(--mobile-soft), transparent 58%),
    rgba(255, 255, 255, 0.34);
  overflow: hidden;
  min-width: 0;
}

.roadmap-mobile-section.is-ai {
  --mobile-accent: rgba(138, 112, 255, 0.98);
  --mobile-border: rgba(167, 139, 250, 0.42);
  --mobile-soft: rgba(167, 139, 250, 0.14);
}

.roadmap-mobile-section.is-web3 {
  --mobile-accent: rgba(42, 157, 218, 0.98);
  --mobile-border: rgba(110, 209, 255, 0.38);
  --mobile-soft: rgba(110, 209, 255, 0.12);
}

.roadmap-mobile-section summary {
  display: grid;
  gap: 6px;
  padding: 18px 18px 16px;
  cursor: pointer;
  list-style: none;
  min-width: 0;
}

.roadmap-mobile-section summary::-webkit-details-marker {
  display: none;
}

.roadmap-mobile-section summary span {
  color: var(--mobile-accent);
  font-size: 28px;
  font-weight: 850;
  line-height: 1.08;
  overflow-wrap: anywhere;
}

.roadmap-mobile-section summary small {
  color: rgba(74, 62, 96, 0.78);
  font-size: 13px;
  font-weight: 650;
  line-height: 1.35;
  overflow-wrap: anywhere;
}

.roadmap-mobile-card {
  margin: 0 14px 14px;
  padding: 14px;
  border: 1px solid var(--mobile-border);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.42);
  min-width: 0;
  overflow: hidden;
}

.roadmap-mobile-card h3 {
  margin: 0 0 6px;
  color: var(--mobile-accent);
  font-size: 18px;
  font-weight: 800;
  line-height: 1.22;
  overflow-wrap: anywhere;
}

.roadmap-mobile-card h3.is-clickable {
  cursor: pointer;
}

.roadmap-mobile-card h3.is-clickable:hover {
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
}

.roadmap-mobile-card p {
  margin: 0 0 12px;
  color: rgba(58, 48, 76, 0.78);
  font-size: 13px;
  font-weight: 600;
  line-height: 1.42;
  overflow-wrap: anywhere;
}

.roadmap-mobile-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 132px), 1fr));
  gap: 8px;
  min-width: 0;
}

.roadmap-mobile-items button {
  min-width: 0;
  max-width: 100%;
  padding: 7px 10px;
  border: 1px solid var(--mobile-border);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.45);
  color: rgba(57, 45, 72, 0.92);
  cursor: pointer;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.18;
  overflow-wrap: anywhere;
  text-align: left;
}

html[data-theme='dark'] .roadmap-mobile-section {
  background:
    radial-gradient(120% 70% at 0% 0%, var(--mobile-soft), transparent 58%),
    rgba(33, 24, 48, 0.62);
}

html[data-theme='dark'] .roadmap-mobile-section summary small,
html[data-theme='dark'] .roadmap-mobile-card p {
  color: rgba(235, 226, 250, 0.78);
}

html[data-theme='dark'] .roadmap-mobile-card {
  background: rgba(26, 19, 38, 0.54);
}

html[data-theme='dark'] .roadmap-mobile-items button {
  background: rgba(26, 19, 38, 0.56);
  color: rgba(249, 245, 255, 0.86);
}
</style>
