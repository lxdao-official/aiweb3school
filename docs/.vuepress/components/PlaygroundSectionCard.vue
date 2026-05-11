<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import { withBase } from 'vuepress/client'

export interface SectionItem {
  title: string
  link?: string
  description?: string
}

export interface SectionBlock {
  title: string
  description?: string
  items: SectionItem[]
}

defineProps<{
  data: {
    sections: SectionBlock[]
    width: number
    height: number
  }
}>()

function handleItemClick(item: SectionItem, e: MouseEvent) {
  if (!item.link) return
  e.stopPropagation()
  window.location.href = withBase(item.link)
}
</script>

<template>
  <div
    class="pg-section-card"
    :style="{ width: `${data.width}px`, height: `${data.height}px` }"
  >
    <div v-for="(section, si) in data.sections" :key="si" class="pg-section-block">
      <div class="pg-section-title-row">
        <span class="pg-divider" />
        <span class="pg-section-title" :aria-label="section.description">
          {{ section.title }}
          <span v-if="section.description" class="pg-tooltip" role="tooltip">{{ section.description }}</span>
        </span>
        <span class="pg-divider" />
      </div>
      <div
        v-for="(item, ii) in section.items"
        :key="ii"
        class="pg-section-item"
        :class="{ 'is-clickable': !!item.link }"
        :aria-label="item.description"
        @click="handleItemClick(item, $event)"
      >
        {{ item.title }}
        <span v-if="item.description" class="pg-tooltip" role="tooltip">{{ item.description }}</span>
      </div>
    </div>
    <Handle id="left-target" type="target" :position="Position.Left" class="pg-handle" />
    <Handle id="right-target" type="target" :position="Position.Right" class="pg-handle" />
    <Handle id="top" type="target" :position="Position.Top" class="pg-handle" />
  </div>
</template>

<style scoped>
.pg-section-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px 22px;
  border: 1.4px solid rgba(186, 153, 255, 0.5);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.42);
  box-shadow:
    0 0 18px rgba(170, 104, 255, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);
}

html[data-theme='dark'] .pg-section-card {
  border-color: rgba(132, 92, 235, 0.62);
  background: rgba(34, 24, 48, 0.45);
  box-shadow:
    0 0 28px rgba(126, 85, 255, 0.12),
    inset 0 1px 0 rgba(213, 194, 255, 0.08);
}

.pg-section-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pg-section-title-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.pg-divider {
  width: 28px;
  height: 1px;
  background: linear-gradient(90deg, rgba(167, 139, 250, 0) 0%, rgba(167, 139, 250, 0.6) 100%);
}

.pg-divider:last-child {
  background: linear-gradient(90deg, rgba(167, 139, 250, 0.6) 0%, rgba(167, 139, 250, 0) 100%);
}

.pg-section-title {
  position: relative;
  min-width: 0;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0;
  color: rgba(170, 104, 255, 0.95);
  line-height: 1.2;
  overflow-wrap: anywhere;
  text-align: center;
}

html[data-theme='dark'] .pg-section-title {
  color: rgba(196, 158, 255, 0.96);
}

.pg-section-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 54px;
  padding: 6px 10px;
  border: 1.2px solid rgba(186, 153, 255, 0.5);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.32);
  color: rgba(63, 56, 86, 0.92);
  font-size: 12px;
  font-weight: 600;
  line-height: 1.18;
  text-align: center;
  overflow-wrap: anywhere;
  transition:
    transform 0.18s ease,
    border-color 0.18s ease,
    background-color 0.18s ease,
    box-shadow 0.18s ease,
    color 0.18s ease;
}

.pg-tooltip {
  position: absolute;
  z-index: 50;
  left: 50%;
  bottom: calc(100% + 10px);
  width: max-content;
  max-width: 260px;
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

.pg-tooltip::after {
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

.pg-section-title:hover .pg-tooltip,
.pg-section-title:focus-within .pg-tooltip,
.pg-section-item:hover .pg-tooltip,
.pg-section-item:focus-within .pg-tooltip {
  opacity: 1;
  transform: translate(-50%, 0);
}

html[data-theme='dark'] .pg-tooltip {
  border-color: rgba(154, 117, 245, 0.48);
  background: rgba(32, 23, 48, 0.97);
  color: rgba(249, 245, 255, 0.92);
  box-shadow: 0 12px 26px rgba(0, 0, 0, 0.38);
}

html[data-theme='dark'] .pg-section-item {
  border-color: rgba(132, 92, 235, 0.6);
  background: rgba(42, 29, 57, 0.5);
  color: rgba(232, 222, 250, 0.94);
}

.pg-section-item.is-clickable {
  cursor: pointer;
}

.pg-section-item.is-clickable:hover {
  transform: translateY(-1px);
  border-color: rgba(125, 84, 233, 0.92);
  background: rgba(255, 255, 255, 0.6);
  color: rgba(63, 32, 122, 1);
  box-shadow:
    0 6px 16px rgba(170, 104, 255, 0.18),
    0 0 14px rgba(170, 104, 255, 0.12);
}

html[data-theme='dark'] .pg-section-item.is-clickable:hover {
  border-color: rgba(168, 134, 255, 0.98);
  background: rgba(62, 42, 92, 0.78);
  color: rgba(244, 240, 255, 1);
  box-shadow:
    0 6px 18px rgba(0, 0, 0, 0.4),
    0 0 18px rgba(170, 104, 255, 0.28);
}

.pg-handle {
  opacity: 0;
  pointer-events: none;
  background: transparent;
  border: none;
}
</style>
