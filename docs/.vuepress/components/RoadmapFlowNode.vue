<script setup lang="ts">
import { Handle, Position, type NodeProps } from '@vue-flow/core'
import type { RoadmapFlowNodeData } from './roadmap-types'

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
    <span class="roadmap-flow-title">{{ data.title }}</span>
    <Handle id="top" class="roadmap-flow-handle" type="target" :position="Position.Top" />
    <Handle id="bottom" class="roadmap-flow-handle" type="source" :position="Position.Bottom" />
    <Handle id="left-target" class="roadmap-flow-handle" type="target" :position="Position.Left" />
    <Handle id="left-source" class="roadmap-flow-handle" type="source" :position="Position.Left" />
    <Handle id="right-target" class="roadmap-flow-handle" type="target" :position="Position.Right" />
    <Handle id="right-source" class="roadmap-flow-handle" type="source" :position="Position.Right" />
  </div>
</template>
