<script setup lang="ts">
import { Handle, Position, type NodeProps } from '@vue-flow/core'
import type { RoadmapFlowNodeData } from './roadmap-types'

defineProps<NodeProps<RoadmapFlowNodeData>>()
</script>

<template>
  <div
    class="roadmap-flow-card"
    :aria-label="data.description"
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
  appearance: none;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: 40px;
  padding: 0 16px;
  border: 1px solid rgba(218, 172, 255, 0.92);
  border-radius: 12px;
  background: rgba(255, 246, 255, 0.76);
  box-shadow: 0 0 16px rgba(205, 126, 255, 0.12);
  color: rgba(87, 67, 112, 0.94);
  font-size: 15px;
  font-weight: 700;
  line-height: 1.25;
  text-align: center;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
}

.roadmap-flow-title {
  display: block;
  overflow-wrap: anywhere;
}

.roadmap-flow-card.is-clickable {
  cursor: pointer;
}

.roadmap-flow-card.is-clickable:hover {
  transform: translateY(-2px);
  border-color: rgba(125, 84, 233, 0.94);
  box-shadow:
    0 10px 22px rgba(170, 104, 255, 0.18),
    0 0 18px rgba(170, 104, 255, 0.14),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.roadmap-flow-card.is-clickable:active,
.roadmap-flow-card.is-active {
  transform: translateY(1px) scale(0.98);
  border-color: rgba(125, 84, 233, 0.94);
  background: rgba(247, 238, 255, 0.86);
  box-shadow:
    0 0 0 4px rgba(170, 104, 255, 0.12),
    0 0 18px rgba(170, 104, 255, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.roadmap-flow-card.is-group {
  min-height: 46px;
  padding: 0 12px;
  border-width: 1.8px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 800;
  line-height: 1.22;
}

.roadmap-flow-card.is-topic {
  min-height: 36px;
  padding: 0 12px;
  border-width: 1.3px;
  border-radius: 6px;
  box-shadow: none;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.18;
}

.roadmap-flow-card.is-ai.is-group {
  border-color: rgba(110, 209, 255, 0.78);
  background: rgba(240, 251, 255, 0.7);
  color: rgba(38, 83, 108, 0.96);
}

.roadmap-flow-card.is-web3.is-group {
  border-color: rgba(178, 153, 255, 0.76);
  background: rgba(248, 245, 255, 0.7);
  color: rgba(82, 65, 132, 0.96);
}

.roadmap-flow-card.is-fusion.is-group {
  border-color: rgba(255, 193, 129, 0.88);
  background: rgba(255, 248, 236, 0.78);
  color: rgba(128, 82, 24, 0.96);
}

html[data-theme='dark'] .roadmap-flow-card {
  border-color: rgba(125, 84, 233, 0.9);
  background: rgba(55, 32, 88, 0.88);
  color: rgba(249, 245, 255, 0.95);
  box-shadow:
    0 0 18px rgba(118, 76, 226, 0.28),
    inset 0 1px 0 rgba(217, 197, 255, 0.1);
}

html[data-theme='dark'] .roadmap-flow-card.is-clickable:hover {
  border-color: rgba(158, 126, 245, 0.98);
  box-shadow:
    0 12px 26px rgba(27, 15, 47, 0.46),
    0 0 20px rgba(126, 85, 255, 0.24),
    inset 0 1px 0 rgba(221, 204, 255, 0.1);
}

html[data-theme='dark'] .roadmap-flow-card.is-clickable:active,
html[data-theme='dark'] .roadmap-flow-card.is-active {
  border-color: rgba(158, 126, 245, 0.98);
  background: rgba(62, 42, 92, 0.92);
  box-shadow:
    0 0 0 4px rgba(126, 85, 255, 0.16),
    0 0 20px rgba(126, 85, 255, 0.24),
    inset 0 1px 0 rgba(221, 204, 255, 0.1);
}

html[data-theme='dark'] .roadmap-flow-card.is-ai.is-group {
  border-color: rgba(76, 201, 255, 0.78);
  background: rgba(14, 48, 74, 0.76);
  color: rgba(225, 248, 255, 0.96);
}

html[data-theme='dark'] .roadmap-flow-card.is-web3.is-group {
  border-color: rgba(141, 129, 244, 0.8);
  background: rgba(45, 37, 82, 0.78);
  color: rgba(249, 245, 255, 0.94);
}

html[data-theme='dark'] .roadmap-flow-card.is-fusion.is-group {
  border-color: rgba(190, 144, 82, 0.84);
  background: rgba(70, 49, 31, 0.78);
  color: rgba(255, 242, 218, 0.96);
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
