<script setup lang="ts">
import { useRouter } from 'vuepress/client'
import TimelineCard from './TimelineCard.vue'
import { roadmapData } from '../content/roadmap-data'

type ThemeNode = {
  id: string
  title: string
  x: number
  y: number
  width: number
  link?: string
}

type AtomNode = {
  id: string
  title: string
  x: number
  y: number
  width: number
}

type DiagramEdge = {
  id: string
  d: string
  tone: 'solid' | 'dashed'
  label?: string
  labelX?: number
  labelY?: number
}

const router = useRouter()
const web3Module = roadmapData.modules.web3
const aiModule = roadmapData.modules.ai
const fusionNodes = roadmapData.modules.fusion.nodes
const practiceNodes = roadmapData.modules.practice.nodes

const web3Nodes = web3Module.nodes.slice(0, 4)

const themeNodes: ThemeNode[] = [
  {
    id: 'theme-chain',
    title: web3Nodes[0]?.title ?? '区块链原理',
    x: 158,
    y: 126,
    width: 126,
    link: web3Nodes[0]?.link,
  },
  {
    id: 'theme-wallet',
    title: web3Nodes[1]?.title ?? '账户与钱包',
    x: 430,
    y: 302,
    width: 134,
    link: web3Nodes[1]?.link,
  },
  {
    id: 'theme-contract',
    title: web3Nodes[2]?.title ?? '智能合约',
    x: 684,
    y: 446,
    width: 118,
    link: web3Nodes[2]?.link,
  },
  {
    id: 'theme-token',
    title: web3Nodes[3]?.title ?? 'Token 与标准',
    x: 936,
    y: 634,
    width: 138,
    link: web3Nodes[3]?.link,
  },
]

const chainTodos = web3Nodes[0]?.todos ?? ['账户模型', '交易生命周期', 'Gas 与费用', 'EVM', '共识机制']
const walletTodos = web3Nodes[1]?.todos ?? ['EOA', 'Smart Account', '签名', 'Nonce', 'Session Key']
const contractTodos = web3Nodes[2]?.todos ?? ['状态变量', '事件', '权限设计', '合约调用']
const tokenTodos = web3Nodes[3]?.todos ?? ['ERC-20', 'ERC-721', 'ERC-1155']

const atomNodes: AtomNode[] = [
  { id: 'atom-chain-0', title: chainTodos[0] ?? '账户模型', x: 16, y: 18, width: 98 },
  { id: 'atom-chain-1', title: chainTodos[1] ?? '交易生命周期', x: 162, y: 18, width: 124 },
  { id: 'atom-chain-2', title: chainTodos[2] ?? 'Gas 与费用', x: 326, y: 18, width: 116 },
  { id: 'atom-chain-3', title: chainTodos[3] ?? 'EVM', x: 482, y: 18, width: 78 },
  { id: 'atom-chain-4', title: chainTodos[4] ?? '共识机制', x: 612, y: 18, width: 94 },

  { id: 'atom-wallet-0', title: walletTodos[0] ?? 'EOA', x: 404, y: 126, width: 60 },
  { id: 'atom-wallet-1', title: walletTodos[1] ?? 'Smart Account', x: 500, y: 126, width: 132 },
  { id: 'atom-wallet-2', title: walletTodos[2] ?? '签名', x: 718, y: 126, width: 60 },
  { id: 'atom-wallet-3', title: walletTodos[3] ?? 'Nonce', x: 826, y: 126, width: 74 },
  { id: 'atom-wallet-4', title: walletTodos[4] ?? 'Session Key', x: 956, y: 126, width: 98 },

  { id: 'atom-contract-0', title: contractTodos[0] ?? '状态变量', x: 566, y: 286, width: 92 },
  { id: 'atom-contract-1', title: contractTodos[1] ?? '事件', x: 694, y: 286, width: 58 },
  { id: 'atom-contract-2', title: contractTodos[2] ?? '权限设计', x: 844, y: 286, width: 96 },
  { id: 'atom-contract-3', title: contractTodos[3] ?? '合约调用', x: 980, y: 286, width: 96 },

  { id: 'atom-token-0', title: tokenTodos[0] ?? 'ERC-20', x: 776, y: 444, width: 74 },
  { id: 'atom-token-1', title: tokenTodos[1] ?? 'ERC-721', x: 906, y: 444, width: 82 },
  { id: 'atom-token-2', title: tokenTodos[2] ?? 'ERC-1155', x: 1032, y: 444, width: 94 },
]

const edges: DiagramEdge[] = [
  {
    id: 'edge-chain-wallet',
    d: 'M 250 158 C 298 188, 350 226, 430 324',
    tone: 'solid',
    label: '基础',
    labelX: 294,
    labelY: 214,
  },
  {
    id: 'edge-wallet-contract',
    d: 'M 498 334 C 550 370, 614 408, 684 468',
    tone: 'solid',
    label: '进阶',
    labelX: 552,
    labelY: 388,
  },
  {
    id: 'edge-contract-token',
    d: 'M 744 476 C 812 522, 872 570, 936 654',
    tone: 'solid',
    label: '标准',
    labelX: 820,
    labelY: 566,
  },

  { id: 'edge-chain-0', d: 'M 64 48 C 92 88, 120 114, 158 144', tone: 'dashed' },
  { id: 'edge-chain-1', d: 'M 224 48 L 224 106 L 190 144', tone: 'dashed' },
  { id: 'edge-chain-2', d: 'M 384 48 C 376 92, 304 124, 218 146', tone: 'dashed' },
  { id: 'edge-chain-3', d: 'M 520 48 C 510 94, 394 128, 244 148', tone: 'dashed' },
  { id: 'edge-chain-4', d: 'M 660 48 C 634 102, 452 136, 270 150', tone: 'dashed' },

  { id: 'edge-wallet-0', d: 'M 434 156 C 434 210, 438 252, 446 302', tone: 'dashed' },
  { id: 'edge-wallet-1', d: 'M 566 156 C 564 216, 538 258, 490 304', tone: 'dashed' },
  { id: 'edge-wallet-2', d: 'M 748 156 C 736 232, 628 276, 520 308', tone: 'dashed' },
  { id: 'edge-wallet-3', d: 'M 864 156 C 848 236, 694 282, 536 312', tone: 'dashed' },
  { id: 'edge-wallet-4', d: 'M 1006 156 C 986 246, 792 288, 556 316', tone: 'dashed' },

  { id: 'edge-contract-0', d: 'M 614 316 C 624 364, 650 410, 694 446', tone: 'dashed' },
  { id: 'edge-contract-1', d: 'M 724 316 L 724 392 L 718 446', tone: 'dashed' },
  { id: 'edge-contract-2', d: 'M 892 316 C 890 374, 808 418, 744 450', tone: 'dashed' },
  { id: 'edge-contract-3', d: 'M 1028 316 C 1022 388, 884 430, 770 454', tone: 'dashed' },

  { id: 'edge-token-0', d: 'M 814 474 C 838 540, 888 594, 946 636', tone: 'dashed' },
  { id: 'edge-token-1', d: 'M 948 474 C 964 534, 984 586, 992 636', tone: 'dashed' },
  { id: 'edge-token-2', d: 'M 1080 474 C 1078 534, 1048 590, 1034 638', tone: 'dashed' },
]

const openLink = (link?: string) => {
  if (link) router.push(link)
}

const nodeStyle = (node: ThemeNode | AtomNode) => ({
  left: `${node.x}px`,
  top: `${node.y}px`,
  width: `${node.width}px`,
})

const labelStyle = (edge: DiagramEdge) => ({
  left: `${edge.labelX}px`,
  top: `${edge.labelY}px`,
})
</script>

<template>
  <section class="timeline-section">
    <div class="timeline-shell">
      <section class="phase phase-foundation">
        <div class="phase-header">
          <h3 class="phase-title">{{ roadmapData.foundationTitle }}</h3>
        </div>

        <div class="track-headings">
          <span class="track-pill track-pill-web3">{{ web3Module.label }}</span>
          <span class="track-pill track-pill-ai">{{ aiModule.label }}</span>
        </div>

        <div class="foundation-layout foundation-layout--sketch">
          <section class="foundation-pane foundation-pane--web3">
            <div class="web3-sketch">
              <svg class="web3-lines" viewBox="0 0 1140 740" preserveAspectRatio="xMinYMin meet" aria-hidden="true">
                <defs>
                  <marker id="sketch-solid-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M 0 0 L 8 4 L 0 8 z" fill="#68717a" />
                  </marker>
                  <marker id="sketch-dashed-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                    <path d="M 0 0 L 7 3.5 L 0 7 z" fill="#7d848b" />
                  </marker>
                </defs>

                <path
                  v-for="edge in edges"
                  :key="edge.id"
                  :d="edge.d"
                  :class="['web3-edge', `web3-edge--${edge.tone}`]"
                  :marker-end="edge.tone === 'solid' ? 'url(#sketch-solid-arrow)' : 'url(#sketch-dashed-arrow)'"
                />
              </svg>

              <span
                v-for="edge in edges.filter((item) => item.label)"
                :key="`${edge.id}-label`"
                class="edge-label"
                :style="labelStyle(edge)"
              >
                {{ edge.label }}
              </span>

              <button
                v-for="node in themeNodes"
                :key="node.id"
                type="button"
                class="node node--theme"
                :style="nodeStyle(node)"
                @click="openLink(node.link)"
              >
                {{ node.title }}
              </button>

              <span
                v-for="node in atomNodes"
                :key="node.id"
                class="node node--atom"
                :style="nodeStyle(node)"
              >
                {{ node.title }}
              </span>
            </div>
          </section>

          <section class="foundation-pane foundation-pane--ai">
            <div class="empty-pane-header">{{ aiModule.label }}</div>
            <div class="empty-pane" />
          </section>
        </div>
      </section>

      <section class="phase phase-merge">
        <div class="phase-header">
          <h3 class="phase-title phase-pill">{{ roadmapData.fusionTitle }}</h3>
        </div>

        <div class="merge-bridge">
          <span class="merge-line merge-line-left" />
          <span class="merge-core" />
          <span class="merge-line merge-line-right" />
        </div>

        <div class="merge-stack">
          <div v-for="card in fusionNodes" :key="card.id" class="merge-row">
            <TimelineCard v-bind="card" side="center" />
          </div>
        </div>
      </section>

      <section class="phase phase-branch">
        <div class="phase-header">
          <h3 class="phase-title">{{ roadmapData.practiceTitle }}</h3>
        </div>

        <div class="branch-network">
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
            v-for="card in practiceNodes"
            :key="card.id"
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
}

.timeline-shell {
  position: relative;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 24px;
  color: #223142;
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
  grid-template-columns: minmax(0, 1fr) 280px;
  gap: 36px;
  align-items: center;
  margin: 18px auto 22px;
}

.track-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  padding: 0 24px;
  border: 2px solid #263f48;
  border-radius: 20px;
  background: #fff0b4;
  box-shadow: 0 3px 0 rgba(38, 63, 72, 0.12);
  font-size: 22px;
  font-weight: 700;
}

.track-pill-web3 {
  color: #2d6cdf;
}

.track-pill-ai {
  color: #26936c;
}

.foundation-layout--sketch {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 280px;
  gap: 36px;
  align-items: start;
}

.web3-sketch {
  position: relative;
  min-height: 740px;
}

.web3-lines {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
}

.web3-edge {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.web3-edge--solid {
  stroke: #68717a;
  stroke-width: 1.5;
}

.web3-edge--dashed {
  stroke: #7d848b;
  stroke-width: 1.2;
  stroke-dasharray: 2 5;
}

.edge-label {
  position: absolute;
  display: inline-flex;
  padding: 0 6px;
  background: rgba(255, 255, 255, 0.92);
  color: #5f6973;
  font-size: 12px;
  line-height: 1.4;
  letter-spacing: 0.02em;
}

.node {
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 14px;
  border: 1px solid #e7ebef;
  border-radius: 2px;
  background: #fff;
  color: #1f3141;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.2;
  text-align: center;
  white-space: nowrap;
  box-sizing: border-box;
}

.node--theme {
  min-height: 54px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
}

.empty-pane-header {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  width: 100%;
  border: 2px solid #263f48;
  border-radius: 20px;
  background: #fff0b4;
  box-shadow: 0 3px 0 rgba(38, 63, 72, 0.12);
  color: #26936c;
  font-size: 22px;
  font-weight: 700;
}

.empty-pane {
  min-height: 740px;
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
  display: inline-flex;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 4px solid #2d4048;
  background: #fff;
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
  display: flex;
  justify-content: center;
  margin-bottom: 14px;
}

.branch-core span {
  display: inline-flex;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 4px solid #2d4048;
  background: #fff;
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

@media (max-width: 1280px) {
  .timeline-shell {
    padding: 0 18px;
  }

  .track-headings,
  .foundation-layout--sketch {
    grid-template-columns: 1fr;
  }

  .empty-pane {
    min-height: 120px;
  }
}

@media (max-width: 860px) {
  .phase-title {
    font-size: 26px;
  }

  .track-pill,
  .empty-pane-header {
    font-size: 20px;
  }

  .web3-sketch {
    min-height: auto;
    display: grid;
    gap: 12px;
  }

  .web3-lines,
  .edge-label {
    display: none;
  }

  .node {
    position: static;
    width: auto !important;
  }

  .branch-grid,
  .branch-drop-lines {
    grid-template-columns: 1fr;
  }
}
</style>
