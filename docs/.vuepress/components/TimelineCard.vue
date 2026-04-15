<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vuepress/client'

type CardTone = 'web3' | 'ai' | 'fusion' | 'future'
type CardVariant = 'foundation' | 'fusion' | 'branch'
type CardSide = 'left' | 'right' | 'center'

const props = defineProps<{
  title: string
  description?: string
  link?: string
  icon?: string
  tone: CardTone
  variant: CardVariant
  side?: CardSide
  kicker?: string
  topics?: string[]
  todos?: string[]
}>()

const router = useRouter()

const topicItems = computed(() => props.topics ?? props.todos ?? [])

const leftTopics = computed(() => {
  if (props.variant === 'branch') return []
  if (props.side === 'left') return topicItems.value
  if (props.variant === 'fusion') return topicItems.value.filter((_, index) => index % 2 === 0)
  return []
})

const rightTopics = computed(() => {
  if (props.variant === 'branch') return []
  if (props.side === 'right') return topicItems.value
  if (props.variant === 'fusion') return topicItems.value.filter((_, index) => index % 2 === 1)
  return []
})

function navigate() {
  if (!props.link) return
  router.push(props.link)
}
</script>

<template>
  <article
    class="timeline-card"
    :class="[
      { clickable: Boolean(link) },
      `tone-${tone}`,
      `variant-${variant}`,
      `side-${side ?? 'center'}`,
    ]"
    @click="navigate"
  >
    <ul
      v-if="leftTopics.length"
      class="topic-branch topic-branch-left"
      aria-label="延伸知识点"
    >
      <li v-for="topic in leftTopics" :key="topic">{{ topic }}</li>
    </ul>

    <div class="card-content">
      <h4 class="card-title">{{ title }}</h4>
    </div>

    <ul
      v-if="rightTopics.length"
      class="topic-branch topic-branch-right"
      aria-label="延伸知识点"
    >
      <li v-for="topic in rightTopics" :key="topic">{{ topic }}</li>
    </ul>
  </article>
</template>

<style scoped>
.timeline-card {
  position: relative;
  display: grid;
  align-items: center;
  gap: 10px;
  overflow: visible;
  min-height: 0;
  width: 100%;
  color: #17252e;
  transition:
    transform 0.35s ease,
    filter 0.35s ease;
}

.timeline-card.clickable {
  cursor: pointer;
}

.timeline-card.clickable:hover {
  transform: translateY(-3px);
  filter: saturate(1.08);
}

.side-left {
  grid-template-columns: minmax(0, 1fr) 172px;
}

.side-right {
  grid-template-columns: 172px minmax(0, 1fr);
}

.side-center.variant-fusion {
  grid-template-columns: minmax(0, 1fr) 210px minmax(0, 1fr);
}

.variant-branch {
  grid-template-columns: minmax(0, 1fr);
}

.side-left .topic-branch-left {
  grid-column: 1;
}

.side-left .card-content {
  grid-column: 2;
}

.side-right .card-content {
  grid-column: 1;
}

.side-right .topic-branch-right {
  grid-column: 2;
}

.side-center.variant-fusion .topic-branch-left {
  grid-column: 1;
}

.side-center.variant-fusion .card-content {
  grid-column: 2;
}

.side-center.variant-fusion .topic-branch-right {
  grid-column: 3;
}

.card-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  min-height: 46px;
  padding: 8px 12px;
  border: 2px solid #263f48;
  border-radius: 6px;
  background: #f4ff00;
  text-align: center;
  box-shadow: 0 2px 0 rgba(38, 63, 72, 0.18);
  transition:
    background-color 0.25s ease,
    transform 0.25s ease;
}

.card-content::before,
.card-content::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 18px;
  border-top: 3px solid var(--branch-color, #263f48);
  transform: translateY(-50%);
}

.card-content::before {
  right: 100%;
}

.card-content::after {
  left: 100%;
}

.side-left .card-content::after,
.side-right .card-content::before,
.variant-branch .card-content::before,
.variant-branch .card-content::after {
  display: none;
}

.topic-branch {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
}

.topic-branch::before {
  content: '';
  position: absolute;
  top: 50%;
  width: 18px;
  border-top: 3px dotted var(--branch-color, #263f48);
  transform: translateY(-50%);
}

.topic-branch-left::before {
  left: 100%;
}

.topic-branch-right::before {
  right: 100%;
}

.topic-branch li {
  min-width: 76px;
  padding: 5px 8px;
  border: 2px solid #263f48;
  border-radius: 5px;
  background: #fff1a8;
  color: #1b2c34;
  font-size: 11px;
  font-weight: 700;
  line-height: 1.1;
  text-align: center;
  box-shadow: 0 1px 0 rgba(38, 63, 72, 0.16);
  transition: transform 0.25s ease;
}

.card-title {
  margin: 0;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: 0;
  color: #17252e;
  text-align: center;
  text-wrap: balance;
}

.tone-web3 {
  --branch-color: #2d6cdf;
}

.tone-web3 .card-content {
  background: #dce8ff;
}

.tone-web3 .topic-branch li {
  background: #edf3ff;
}

.tone-ai {
  --branch-color: #2a8a64;
}

.tone-ai .card-content {
  background: #dff6e9;
}

.tone-ai .topic-branch li {
  background: #effaf2;
}

.tone-fusion {
  --branch-color: #263f48;
}

.tone-fusion .card-content {
  background: #dcf4ff;
}

.tone-fusion .topic-branch li {
  background: #f3fbff;
}

.tone-future {
  --branch-color: #c98213;
}

.tone-future .card-content {
  background: #ffe7a8;
}

.timeline-card.clickable:hover .card-content,
.timeline-card.clickable:hover .topic-branch li {
  transform: translateY(-1px);
}

.variant-fusion .card-content {
  min-height: 50px;
}

.variant-fusion .card-title {
  font-size: 13px;
}

.variant-fusion .topic-branch li {
  min-width: 88px;
}

.variant-branch .card-content {
  min-height: 50px;
  padding: 8px 9px;
}

.variant-branch .card-title {
  font-size: 12.5px;
}

@media (max-width: 860px) {
  .timeline-card {
    grid-template-columns: 1fr !important;
    justify-items: stretch;
  }

  .topic-branch-left,
  .topic-branch-right,
  .side-left .card-content,
  .side-right .card-content,
  .side-center.variant-fusion .card-content {
    grid-column: 1;
  }

  .topic-branch {
    order: 2;
  }

  .card-content {
    order: 1;
  }

  .card-content::before,
  .card-content::after,
  .topic-branch::before {
    display: none;
  }

  .topic-branch li {
    min-width: 74px;
  }
}
</style>
