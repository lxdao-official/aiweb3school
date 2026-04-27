<script setup lang="ts">
import { Handle, Position, type NodeProps } from '@vue-flow/core'

export interface RoadmapFlowNodeData {
  title: string
  tone: 'stage' | 'ai' | 'web3' | 'fusion' | 'challenge' | 'junction'
  variant: 'stage' | 'branch-title' | 'lesson' | 'product' | 'challenge' | 'junction'
  link?: string
}

defineProps<NodeProps<RoadmapFlowNodeData>>()
</script>

<template>
  <div
    class="roadmap-flow-card"
    :class="[
      `is-${data.tone}`,
      `is-${data.variant}`,
      { 'is-clickable': Boolean(data.link) },
    ]"
  >
    <template v-if="data.variant !== 'junction'">
      {{ data.title }}
    </template>
    <Handle class="roadmap-flow-handle" type="target" :position="Position.Top" />
    <Handle class="roadmap-flow-handle" type="source" :position="Position.Bottom" />
  </div>
</template>
