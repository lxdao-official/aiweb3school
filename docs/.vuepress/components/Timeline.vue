<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import TimelineCard from './TimelineCard.vue'

interface TimelineItem {
  title: string
  description: string
  link: string
  icon: string
  color: 'web3' | 'ai'
}

interface ParallelRow {
  left: TimelineItem
  right: TimelineItem
}

const parallelItems: ParallelRow[] = [
  {
    left: { title: '区块链基础', description: '理解区块链核心概念、共识机制与分布式账本', link: '/zh/blockchain-basics/', icon: '🔗', color: 'web3' },
    right: { title: 'AI 基础概念', description: '人工智能发展历程、核心思想与应用场景', link: '/zh/ai-fundamentals/', icon: '🧠', color: 'ai' },
  },
  {
    left: { title: '智能合约入门', description: 'Solidity 语言基础与合约开发实践', link: '/zh/smart-contracts/', icon: '📜', color: 'web3' },
    right: { title: '机器学习入门', description: '监督学习、无监督学习与常用算法', link: '/zh/machine-learning-basics/', icon: '📊', color: 'ai' },
  },
  {
    left: { title: 'DeFi 概览', description: '去中心化金融协议、DEX 与借贷机制', link: '/zh/defi-intro/', icon: '💰', color: 'web3' },
    right: { title: '深度学习简介', description: '神经网络、Transformer 与大语言模型', link: '/zh/deep-learning-intro/', icon: '🔬', color: 'ai' },
  },
  {
    left: { title: 'Web3 开发工具', description: 'Hardhat、Foundry、Ethers.js 等工具链', link: '/zh/web3-tools/', icon: '🛠️', color: 'web3' },
    right: { title: 'AI 工具与平台', description: 'ChatGPT、Claude、开源模型与 API 实践', link: '/zh/ai-tools/', icon: '⚙️', color: 'ai' },
  },
]

const timelineRef = ref<HTMLElement | null>(null)

onMounted(() => {
  nextTick(() => {
    if (!timelineRef.value) return
    const cards = timelineRef.value.querySelectorAll('.timeline-card')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    cards.forEach((card) => observer.observe(card))
  })
})
</script>

<template>
  <div class="timeline-section" ref="timelineRef">
    <div class="timeline-wrapper">
      <!-- Section Title -->
      <div class="section-header">
        <h2 class="section-title">学习路线</h2>
        <p class="section-subtitle">左手 Web3，右手 AI —— 双线并进，融合创新</p>
      </div>

      <!-- Track Labels -->
      <div class="track-labels">
        <span class="track-label label-web3">Web3</span>
        <span class="track-label label-ai">AI</span>
      </div>

      <!-- Parallel Phase -->
      <div class="timeline-phase parallel-phase">
        <div class="timeline-line" />
        <div
          v-for="(pair, i) in parallelItems"
          :key="i"
          class="timeline-row"
        >
          <TimelineCard
            v-bind="pair.left"
            side="left"
          />
          <div class="timeline-dot" />
          <TimelineCard
            v-bind="pair.right"
            side="right"
          />
        </div>
      </div>

      <!-- End Dot -->
      <div class="timeline-end">
        <div class="end-dot" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.timeline-section {
  min-height: 100vh;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.timeline-wrapper {
  position: relative;
  width: 100%;
  padding: 64px 0;
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 56px;
}

.section-title {
  font-size: 40px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 16px;
  letter-spacing: -0.02em;
}

.section-subtitle {
  font-size: 18px;
  color: var(--vp-c-text-2);
  margin: 0;
}

/* Track Labels */
.track-labels {
  display: flex;
  justify-content: space-between;
  max-width: 900px;
  margin: 0 auto 40px;
  padding: 0 80px;
}

.track-label {
  font-size: 15px;
  font-weight: 600;
  padding: 6px 20px;
  border-radius: 20px;
}

.label-web3 {
  background: rgba(139, 92, 246, 0.1);
  color: #8b5cf6;
}

.label-ai {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

/* Timeline Phase */
.timeline-phase {
  position: relative;
}

/* Vertical Line */
.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--vp-c-divider);
  transform: translateX(-50%);
}

.parallel-phase .timeline-line {
  background: linear-gradient(to bottom, #8b5cf6, #3b82f6, #10b981);
}

/* Timeline Row */
.timeline-row {
  display: flex;
  align-items: center;
  position: relative;
  padding: 20px 0;
  gap: 32px;
}

.timeline-row .timeline-card {
  flex: 1;
  opacity: 0;
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.timeline-row .timeline-card.side-left {
  transform: translateX(-24px);
}

.timeline-row .timeline-card.side-right {
  transform: translateX(24px);
}

.timeline-row .timeline-card.visible {
  opacity: 1;
  transform: translate(0);
}

/* Timeline Dot */
.timeline-dot {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--vp-c-bg);
  border: 3px solid #3b82f6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.12);
  z-index: 1;
}

/* End Dot */
.timeline-end {
  display: flex;
  justify-content: center;
  padding-top: 24px;
}

.end-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--vp-c-divider);
}

/* ========== Mobile ========== */
@media (max-width: 768px) {
  .timeline-section {
    padding: 0 16px;
    min-height: auto;
  }

  .timeline-wrapper {
    padding: 40px 0 60px;
  }

  .section-title {
    font-size: 28px;
  }

  .track-labels {
    padding: 0 16px;
  }

  .timeline-line,
  .parallel-phase .timeline-line {
    left: 24px;
  }

  .timeline-row {
    flex-direction: column;
    padding: 8px 0 8px 48px;
    gap: 12px;
  }

  .timeline-dot {
    position: absolute;
    left: 18px;
    top: 20px;
  }

  .timeline-row .timeline-card.side-left,
  .timeline-row .timeline-card.side-right {
    transform: translateX(16px);
  }

  .timeline-row .timeline-card.visible {
    transform: translate(0);
  }
}
</style>
