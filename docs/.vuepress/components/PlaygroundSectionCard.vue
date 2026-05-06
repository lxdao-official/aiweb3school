<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'

export interface SectionItem {
  title: string
  link?: string
}

export interface SectionBlock {
  title: string
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
  window.open(item.link, '_blank')
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
        <span class="pg-section-title">{{ section.title }}</span>
        <span class="pg-divider" />
      </div>
      <div
        v-for="(item, ii) in section.items"
        :key="ii"
        class="pg-section-item"
        :class="{ 'is-clickable': !!item.link }"
        @click="handleItemClick(item, $event)"
      >
        {{ item.title }}
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
  min-width: 0;
  font-size: 15px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 6px 10px;
  border: 1.2px solid rgba(186, 153, 255, 0.5);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.32);
  color: rgba(63, 56, 86, 0.92);
  font-size: 13px;
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
