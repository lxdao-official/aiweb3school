/**
 * Roadmap Playground · 数据 Schema
 * ─────────────────────────────────────────────────────────────────
 * 本文件只描述 WHAT（内容），不描述 HOW（布局/样式）。
 * 所有视觉规则（节点宽、间距、配色、连线类型、hover 效果等）都已
 * 在 RoadmapPlayground.vue 中固化，更新本文件不会影响排版规则。
 *
 * 已固化的布局规则（仅供参考，不要在数据里覆盖）：
 *   • 节点宽 200 / sub-card 宽 180 (top) / 240 (fusion)
 *   • AI 全部 sub-card 留在画布左半区，Web3 全部 sub-card 留在右半区
 *     - 在各自半区内，sub-card 按节点 index 自动左右交替挂在主列两侧
 *     - 中央 ≥44px 留白做硬分界，两侧 sub-card 永不交织
 *   • 顶部行高 120px、融合 card 行高 130px、分支节点行高 100px
 *   • 融合 card 自动按顺序左右交替
 *   • 4 路分支列等宽（260px）等距（32px gap）
 *   • 主节点的 link 会让节点亮起、cursor 变 pointer，并新窗口打开
 *   • sub-card item 的 link 同上，作用范围限于 item 本身
 *
 * 添加 / 删除节点 / card / 分支列时，layout 会自动按规则重排，
 * 无需修改 RoadmapPlayground.vue。
 */

export interface RoadmapItem {
  title: string
  link?: string
}

/** 单张 sub-card：一个 title + 一组 items */
export interface RoadmapSubCard {
  title: string
  items: RoadmapItem[]
}

/** 主节点：一个 group / topic 节点，可带一张 sub-card */
export interface RoadmapMainNode {
  /** 唯一 id，用于内部连边 */
  id: string
  title: string
  /** 点击节点后新窗口打开的链接 */
  link?: string
  /** 可选的旁挂 sub-card（按所在列的固定方向排列） */
  subCard?: RoadmapSubCard
}

/** 顶部主线列（AI / Web3 任一） */
export interface RoadmapTopColumn {
  /** 列上方 label 文本 */
  label: string
  /** 主线节点，自上而下 */
  nodes: RoadmapMainNode[]
}

/** 中间融合 section：N 张 card 平行排列，与主线无连线 */
export interface RoadmapFusionSection {
  label: string
  cards: RoadmapSubCard[]
}

/** 底部 4 路分支中的一列 */
export interface RoadmapSplitColumn {
  label: string
  nodes: RoadmapMainNode[]
}

/** Roadmap 完整数据 */
export interface RoadmapData {
  /** 顶部左列（tone 固定 ai） */
  topLeft: RoadmapTopColumn
  /** 顶部右列（tone 固定 web3） */
  topRight: RoadmapTopColumn
  /** 中间融合 section */
  fusion: RoadmapFusionSection
  /** 底部 N 路分支（推荐 3-5 列） */
  splits: RoadmapSplitColumn[]
}

// ─── 占位测试数据 ───────────────────────────────────────────
// 替换为真实数据时，保持本文件唯一来源；不要在 component 内补数据
const DEMO_LINK = '/zh/part1/'

export const playgroundRoadmap: RoadmapData = {
  topLeft: {
    label: 'AI',
    nodes: [
      {
        id: 'A1',
        title: 'AI 主线 · A1',
        link: DEMO_LINK,
        subCard: {
          title: 'AI 分类',
          items: [
            { title: '弱人工智能', link: DEMO_LINK },
            { title: '强人工智能', link: DEMO_LINK },
          ],
        },
      },
      {
        id: 'A2',
        title: 'AI 主线 · A2',
        link: DEMO_LINK,
        subCard: {
          title: 'AI 模型',
          items: [
            { title: 'LLM', link: DEMO_LINK },
            { title: '多模态', link: DEMO_LINK },
          ],
        },
      },
      {
        id: 'A3',
        title: 'AI 主线 · A3',
        link: DEMO_LINK,
        subCard: {
          title: 'AI 应用',
          items: [
            { title: 'Agent', link: DEMO_LINK },
            { title: 'AIGC', link: DEMO_LINK },
          ],
        },
      },
    ],
  },
  topRight: {
    label: 'Web3',
    nodes: [
      {
        id: 'B1',
        title: 'Web3 主线 · B1',
        link: DEMO_LINK,
        subCard: {
          title: 'Web3 基础',
          items: [
            { title: '公链', link: DEMO_LINK },
            { title: 'DApp', link: DEMO_LINK },
          ],
        },
      },
      {
        id: 'B2',
        title: 'Web3 主线 · B2',
        link: DEMO_LINK,
        subCard: {
          title: 'Web3 协议',
          items: [
            { title: 'DeFi', link: DEMO_LINK },
            { title: 'NFT', link: DEMO_LINK },
          ],
        },
      },
      {
        id: 'B3',
        title: 'Web3 主线 · B3',
        link: DEMO_LINK,
        subCard: {
          title: 'Web3 工具',
          items: [
            { title: '钱包', link: DEMO_LINK },
            { title: 'IDE', link: DEMO_LINK },
          ],
        },
      },
    ],
  },
  fusion: {
    label: 'AI × Web3 融合起点',
    cards: [
      {
        title: '融合价值',
        items: [
          { title: '自动化', link: DEMO_LINK },
          { title: '智能化', link: DEMO_LINK },
        ],
      },
      {
        title: '融合场景',
        items: [
          { title: '链上交易', link: DEMO_LINK },
          { title: '内容协作', link: DEMO_LINK },
        ],
      },
      {
        title: '融合风险',
        items: [
          { title: '安全合规', link: DEMO_LINK },
          { title: '可解释', link: DEMO_LINK },
        ],
      },
    ],
  },
  splits: [
    {
      label: '分支 D',
      nodes: [
        { id: 'S1-1', title: '分支 D1', link: DEMO_LINK },
        { id: 'S1-2', title: '分支 D2', link: DEMO_LINK },
        { id: 'S1-3', title: '分支 D3', link: DEMO_LINK },
      ],
    },
    {
      label: '分支 E',
      nodes: [
        { id: 'S2-1', title: '分支 E1', link: DEMO_LINK },
        { id: 'S2-2', title: '分支 E2', link: DEMO_LINK },
        { id: 'S2-3', title: '分支 E3', link: DEMO_LINK },
      ],
    },
    {
      label: '分支 F',
      nodes: [
        { id: 'S3-1', title: '分支 F1', link: DEMO_LINK },
        { id: 'S3-2', title: '分支 F2', link: DEMO_LINK },
        { id: 'S3-3', title: '分支 F3', link: DEMO_LINK },
      ],
    },
    {
      label: '分支 G',
      nodes: [
        { id: 'S4-1', title: '分支 G1', link: DEMO_LINK },
        { id: 'S4-2', title: '分支 G2', link: DEMO_LINK },
        { id: 'S4-3', title: '分支 G3', link: DEMO_LINK },
      ],
    },
  ],
}
