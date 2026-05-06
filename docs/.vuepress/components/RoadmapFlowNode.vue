<script setup lang="ts">
import { Handle, Position, type NodeProps } from '@vue-flow/core'
import type { RoadmapFlowNodeData } from './roadmap-types'

defineProps<NodeProps<RoadmapFlowNodeData>>()
</script>

<template>
  <div
    class="roadmap-flow-card"
    :title="data.description"
    :class="[
      `is-${data.tone}`,
      `is-${data.variant}`,
      {
        'is-clickable': data.isInteractive,
        'is-active': data.isActive,
      },
    ]"
  >
    <span class="roadmap-flow-title">{{ data.title }}</span>
    <span v-if="data.description" class="roadmap-tooltip" role="tooltip">
      {{ data.description }}
    </span>
    <Handle id="top" class="roadmap-flow-handle" type="target" :position="Position.Top" />
    <Handle id="bottom" class="roadmap-flow-handle" type="source" :position="Position.Bottom" />
    <Handle id="left-target" class="roadmap-flow-handle" type="target" :position="Position.Left" />
    <Handle id="left-source" class="roadmap-flow-handle" type="source" :position="Position.Left" />
    <Handle id="right-target" class="roadmap-flow-handle" type="target" :position="Position.Right" />
    <Handle id="right-source" class="roadmap-flow-handle" type="source" :position="Position.Right" />
  </div>
</template>

<style scoped>
.roadmap-flow-card {
  position: relative;
}

.roadmap-tooltip {
  position: absolute;
  z-index: 50;
  left: 50%;
  bottom: calc(100% + 10px);
  width: max-content;
  max-width: 280px;
  padding: 8px 10px;
  border: 1px solid rgba(167, 139, 250, 0.34);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.96);
  color: rgba(45, 36, 68, 0.94);
  box-shadow: 0 10px 24px rgba(86, 55, 140, 0.16);
  font-size: 12px;
  font-weight: 600;
  line-height: 1.35;
  text-align: left;
  white-space: normal;
  overflow-wrap: anywhere;
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, 4px);
  transition: opacity 0.14s ease, transform 0.14s ease;
}

.roadmap-tooltip::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 100%;
  width: 8px;
  height: 8px;
  border-right: 1px solid rgba(167, 139, 250, 0.34);
  border-bottom: 1px solid rgba(167, 139, 250, 0.34);
  background: inherit;
  transform: translate(-50%, -4px) rotate(45deg);
}

.roadmap-flow-card:hover .roadmap-tooltip,
.roadmap-flow-card:focus-within .roadmap-tooltip {
  opacity: 1;
  transform: translate(-50%, 0);
}

html[data-theme='dark'] .roadmap-tooltip {
  border-color: rgba(154, 117, 245, 0.48);
  background: rgba(32, 23, 48, 0.97);
  color: rgba(249, 245, 255, 0.92);
  box-shadow: 0 12px 26px rgba(0, 0, 0, 0.38);
}
</style>
