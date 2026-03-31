<script setup lang="ts">
import { useRouter } from 'vuepress/client'

const props = defineProps<{
  title: string
  description: string
  link: string
  icon: string
  color: 'web3' | 'ai'
  side: 'left' | 'right'
}>()

const router = useRouter()

function navigate() {
  router.push(props.link)
}
</script>

<template>
  <div
    class="timeline-card"
    :class="[`side-${side}`, `color-${color}`]"
    @click="navigate"
  >
    <div class="card-inner">
      <div class="card-header">
        <span class="card-icon">{{ icon }}</span>
        <h4 class="card-title">{{ title }}</h4>
      </div>
      <p class="card-desc">{{ description }}</p>
      <span class="card-arrow">→</span>
    </div>
  </div>
</template>

<style scoped>
.timeline-card {
  cursor: pointer;
}

.card-inner {
  position: relative;
  padding: 28px 32px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.card-inner:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
}

.color-web3 .card-inner {
  border-left: 3px solid #8b5cf6;
}
.color-web3 .card-inner:hover {
  border-color: #8b5cf6;
}

.color-ai .card-inner {
  border-left: 3px solid #10b981;
}
.color-ai .card-inner:hover {
  border-color: #10b981;
}

.side-right .card-inner {
  border-left: none;
  border-right-width: 3px;
  border-right-style: solid;
}
.side-right.color-ai .card-inner {
  border-right-color: #10b981;
}
.side-right.color-web3 .card-inner {
  border-right-color: #8b5cf6;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.card-icon {
  font-size: 28px;
  line-height: 1;
}

.card-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.card-desc {
  margin: 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

.card-arrow {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: var(--vp-c-text-3);
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.card-inner:hover .card-arrow {
  opacity: 1;
  transform: translateY(-50%) translateX(2px);
}

.side-right .card-arrow {
  right: auto;
  left: 16px;
}

@media (max-width: 768px) {
  .side-right .card-inner {
    border-right: none;
    border-left-width: 3px;
    border-left-style: solid;
  }
  .side-right.color-ai .card-inner {
    border-left-color: #10b981;
    border-right-color: transparent;
  }
  .side-right.color-web3 .card-inner {
    border-left-color: #8b5cf6;
    border-right-color: transparent;
  }
  .side-right .card-arrow {
    left: auto;
    right: 16px;
  }
}
</style>
