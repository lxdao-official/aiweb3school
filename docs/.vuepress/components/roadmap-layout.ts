import {
  MarkerType,
  type Edge,
  type Node,
} from '@vue-flow/core'
import type { HomepageRoadmapChapter, HomepageRoadmapGroup } from '../content/handbook-roadmap'
import type { RoadmapFlowNodeData } from './roadmap-types'

export type RoadmapNode = Node<RoadmapFlowNodeData>

export const ROADMAP_MIN_HEIGHT = 760
export const ROADMAP_MAX_WIDTH = 1180

const nodeWidth = {
  sectionTitle: 420,
  group: 260,
  topic: 230,
}

const layout = {
  centerX: 540,
  leftLaneX: 330,
  rightLaneX: 750,
  topicOffset: 330,
  introLeftLaneX: 300,
  introRightLaneX: 780,
  introTopicOffset: 320,
  firstY: 6,
  sectionTitleGap: 82,
  introSectionTitleGap: 178,
  groupGap: 86,
  alternatingGroupGap: 126,
  topicGap: 50,
  sectionGap: 140,
}

export function createRoadmapViewport(viewportWidth: number) {
  const shellWidth = Math.min(ROADMAP_MAX_WIDTH, Math.max(320, viewportWidth - 40))
  const graphMinX = layout.introLeftLaneX - layout.introTopicOffset - nodeWidth.topic / 2
  const graphMaxX = layout.introRightLaneX + layout.introTopicOffset + nodeWidth.topic / 2
  const graphWidth = graphMaxX - graphMinX
  const zoom = Math.min(0.95, Math.max(0.28, (shellWidth - 32) / graphWidth))

  return {
    x: (shellWidth - graphWidth * zoom) / 2 - graphMinX * zoom,
    y: 28,
    zoom,
  }
}

function makeNode(
  id: string,
  title: string,
  tone: RoadmapFlowNodeData['tone'],
  variant: RoadmapFlowNodeData['variant'],
  centerX: number,
  y: number,
  width: number,
  link?: string,
): RoadmapNode {
  const isReservedInteractive = variant === 'topic' || variant === 'section-title' || Boolean(link)

  return {
    id,
    type: 'roadmap',
    position: { x: centerX - width / 2, y },
    width,
    draggable: false,
    selectable: isReservedInteractive,
    connectable: false,
    focusable: isReservedInteractive,
    data: {
      title,
      tone,
      variant,
      isInteractive: isReservedInteractive,
      link,
    },
  }
}

function makeEdge(source: string, target: string, variant: 'main' | 'topic'): Edge {
  const isTopic = variant === 'topic'
  return {
    id: `${source}-${target}`,
    source,
    target,
    type: 'smoothstep',
    selectable: false,
    focusable: false,
    updatable: false,
    markerEnd: isTopic ? undefined : {
      type: MarkerType.ArrowClosed,
      color: 'rgba(203, 140, 255, 0.9)',
      width: 13,
      height: 13,
    },
    class: isTopic
      ? 'roadmap-flow-edge roadmap-flow-edge-topic'
      : 'roadmap-flow-edge roadmap-flow-edge-mainline',
    sourceHandle: isTopic ? undefined : 'bottom',
    targetHandle: isTopic ? undefined : 'top',
  }
}

function makeTopicEdge(source: string, target: string, side: 'left' | 'right'): Edge {
  return {
    ...makeEdge(source, target, 'topic'),
    sourceHandle: side === 'left' ? 'left-source' : 'right-source',
    targetHandle: side === 'left' ? 'right-target' : 'left-target',
  }
}

function makeIntroEdge(source: string, target: string): Edge {
  return {
    ...makeEdge(source, target, 'main'),
    type: 'smoothstep',
    pathOptions: {
      borderRadius: 0,
    },
    class: 'roadmap-flow-edge roadmap-flow-edge-mainline roadmap-flow-edge-intro',
  }
}

function groupNodeId(chapter: HomepageRoadmapChapter, group: HomepageRoadmapGroup): string {
  return `${chapter.id}-${group.id}`
}

function topicNodeId(chapter: HomepageRoadmapChapter, group: HomepageRoadmapGroup, topicId: string): string {
  return `${chapter.id}-${group.id}-${topicId}`
}

function topicColumnX(groupCenterX: number, side: 'left' | 'right'): number {
  return side === 'left' ? groupCenterX - layout.topicOffset : groupCenterX + layout.topicOffset
}

function introTopicColumnX(groupCenterX: number, side: 'left' | 'right'): number {
  return side === 'left' ? groupCenterX - layout.introTopicOffset : groupCenterX + layout.introTopicOffset
}

function addSection(
  nodes: RoadmapNode[],
  edges: Edge[],
  chapter: HomepageRoadmapChapter,
  y: number,
  centerX: number,
  side: 'left' | 'right',
): number {
  const titleId = `section-${chapter.id}`
  nodes.push(makeNode(
    titleId,
    chapter.title,
    chapter.tone,
    'section-title',
    centerX,
    y,
    nodeWidth.sectionTitle,
  ))

  const groupStartY = y + layout.sectionTitleGap
  let previousGroupId = ''
  let nextGroupY = groupStartY
  let previousTopicBottom = groupStartY
  let sectionEndY = groupStartY

  chapter.groups.forEach((group, index) => {
    const groupId = groupNodeId(chapter, group)
    const topicHalfSpan = Math.max(0, group.topics.length - 1) * layout.topicGap / 2
    const minGroupY = index === 0
      ? groupStartY
      : previousTopicBottom + 42 + topicHalfSpan
    const groupY = Math.max(nextGroupY, minGroupY)
    nodes.push(makeNode(
      groupId,
      group.title,
      chapter.tone,
      'group',
      centerX,
      groupY,
      nodeWidth.group,
    ))

    if (previousGroupId) {
      edges.push(makeEdge(previousGroupId, groupId, 'main'))
    }
    previousGroupId = groupId

    const topicX = topicColumnX(centerX, side)
    const topicStartY = groupY - topicHalfSpan
    group.topics.forEach((topic, topicIndex) => {
      const topicId = topicNodeId(chapter, group, topic.id)
      nodes.push(makeNode(
        topicId,
        topic.title,
        chapter.tone,
        'topic',
        topicX,
        topicStartY + topicIndex * layout.topicGap,
        nodeWidth.topic,
        topic.link,
      ))
      edges.push(makeTopicEdge(groupId, topicId, side))
    })

    const topicBottom = topicStartY + Math.max(0, group.topics.length - 1) * layout.topicGap
    previousTopicBottom = Math.max(groupY, topicBottom)
    nextGroupY = groupY + layout.groupGap
    sectionEndY = Math.max(sectionEndY, previousTopicBottom)
  })

  return sectionEndY + layout.sectionGap
}

function addAlternatingTopicSection(
  nodes: RoadmapNode[],
  edges: Edge[],
  chapter: HomepageRoadmapChapter,
  y: number,
  centerX: number,
): number {
  const titleId = `section-${chapter.id}`
  nodes.push(makeNode(
    titleId,
    chapter.title,
    chapter.tone,
    'section-title',
    centerX,
    y,
    nodeWidth.sectionTitle,
  ))

  const minTopicTop = y + 74
  const groupStartY = y + layout.sectionTitleGap
  const maxTopicHalfSpan = Math.max(
    0,
    ...chapter.groups.map((group) => Math.max(0, group.topics.length - 1) * layout.topicGap / 2),
  )
  const baseGroupY = Math.max(groupStartY, minTopicTop + maxTopicHalfSpan)
  let previousGroupId = ''
  let sectionEndY = baseGroupY

  chapter.groups.forEach((group, index) => {
    const side: 'left' | 'right' = index % 2 === 0 ? 'left' : 'right'
    const groupId = groupNodeId(chapter, group)
    const topicHalfSpan = Math.max(0, group.topics.length - 1) * layout.topicGap / 2
    const groupY = baseGroupY + index * layout.alternatingGroupGap

    nodes.push(makeNode(
      groupId,
      group.title,
      chapter.tone,
      'group',
      centerX,
      groupY,
      nodeWidth.group,
    ))

    if (previousGroupId) {
      edges.push(makeEdge(previousGroupId, groupId, 'main'))
    }
    previousGroupId = groupId

    const topicX = topicColumnX(centerX, side)
    const topicStartY = Math.max(minTopicTop, groupY - topicHalfSpan)
    group.topics.forEach((topic, topicIndex) => {
      const topicId = topicNodeId(chapter, group, topic.id)
      const topicY = topicStartY + topicIndex * layout.topicGap
      nodes.push(makeNode(
        topicId,
        topic.title,
        chapter.tone,
        'topic',
        topicX,
        topicY,
        nodeWidth.topic,
        topic.link,
      ))
      edges.push(makeTopicEdge(groupId, topicId, side))
    })

    const topicBottom = topicStartY + Math.max(0, group.topics.length - 1) * layout.topicGap
    sectionEndY = Math.max(sectionEndY, groupY, topicBottom)
  })

  return sectionEndY + layout.sectionGap
}

function addIntroSection(
  nodes: RoadmapNode[],
  edges: Edge[],
  chapter: HomepageRoadmapChapter,
  y: number,
): number {
  const titleId = `section-${chapter.id}`
  nodes.push(makeNode(
    titleId,
    chapter.title,
    chapter.tone,
    'section-title',
    layout.centerX,
    y,
    nodeWidth.sectionTitle,
  ))

  const groupY = y + layout.introSectionTitleGap
  const groupCenters = [layout.introLeftLaneX, layout.introRightLaneX]
  const groupSides: Array<'left' | 'right'> = ['left', 'right']
  let endY = groupY

  chapter.groups.forEach((group, index) => {
    const side = groupSides[index] ?? (index % 2 === 0 ? 'left' : 'right')
    const centerX = groupCenters[index] ?? layout.centerX
    const groupId = groupNodeId(chapter, group)
    nodes.push(makeNode(
      groupId,
      group.title,
      chapter.tone,
      'group',
      centerX,
      groupY,
      nodeWidth.group,
    ))
    edges.push(makeIntroEdge(titleId, groupId))

    const topicX = introTopicColumnX(centerX, side)
    const topicStartY = groupY - Math.max(0, group.topics.length - 1) * layout.topicGap / 2
    group.topics.forEach((topic, topicIndex) => {
      const topicId = topicNodeId(chapter, group, topic.id)
      const topicY = topicStartY + topicIndex * layout.topicGap
      nodes.push(makeNode(
        topicId,
        topic.title,
        chapter.tone,
        'topic',
        topicX,
        topicY,
        nodeWidth.topic,
        topic.link,
      ))
      edges.push(makeTopicEdge(groupId, topicId, side))
      endY = Math.max(endY, topicY)
    })
  })

  return endY + layout.sectionGap
}

function addDualSection(
  nodes: RoadmapNode[],
  edges: Edge[],
  left: HomepageRoadmapChapter,
  right: HomepageRoadmapChapter,
  y: number,
): number {
  const leftEnd = addSection(nodes, edges, left, y, layout.leftLaneX, 'left')
  const rightEnd = addSection(nodes, edges, right, y, layout.rightLaneX, 'right')
  return Math.max(leftEnd, rightEnd)
}

export function createRoadmapFlow(chapters: HomepageRoadmapChapter[]) {
  const intro = chapters.find((chapter) => chapter.id === 'intro-map')
  const aiStack = chapters.find((chapter) => chapter.id === 'ai-stack')
  const web3Stack = chapters.find((chapter) => chapter.id === 'web3-stack')
  const rest = chapters.filter((chapter) => !['intro-map', 'ai-stack', 'web3-stack'].includes(chapter.id))

  if (!intro || !aiStack || !web3Stack) {
    throw new Error('Missing required homepage roadmap chapters')
  }

  const nodes: RoadmapNode[] = []
  const edges: Edge[] = []
  let y = layout.firstY

  y = addIntroSection(nodes, edges, intro, y)
  y = addDualSection(nodes, edges, aiStack, web3Stack, y)

  rest.forEach((chapter) => {
    y = addAlternatingTopicSection(nodes, edges, chapter, y, layout.centerX)
  })

  return { nodes, edges, height: y + 80 }
}
