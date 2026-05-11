<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'

defineProps<{ data?: unknown }>()
</script>

<template>
  <div class="pg-anchor">
    <Handle id="top" type="target" :position="Position.Top" class="pg-handle" />
    <Handle id="bottom" type="source" :position="Position.Bottom" class="pg-handle" />
  </div>
</template>

<style scoped>
.pg-anchor {
  width: 1px;
  height: 1px;
  pointer-events: none;
  background: transparent;
}

.pg-handle {
  opacity: 0;
  pointer-events: none;
  background: transparent;
  border: none;
  width: 1px;
  height: 1px;
  min-width: 1px;
  min-height: 1px;
}
</style>
