<script setup lang="ts">
defineProps<{
  data: {
    tone: 'intro' | 'ai' | 'web3' | 'fusion'
    width: number
    height: number
  }
}>()
</script>

<template>
  <div
    class="pg-frame"
    :class="`is-${data.tone}`"
    :style="{ width: `${data.width}px`, height: `${data.height}px` }"
  />
</template>

<style scoped>
.pg-frame {
  position: relative;
  border: 1.4px solid rgba(186, 153, 255, 0.5);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.18);
  box-shadow:
    0 0 18px rgba(170, 104, 255, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  pointer-events: none;
}

html[data-theme='dark'] .pg-frame {
  border-color: rgba(132, 92, 235, 0.62);
  background: rgba(34, 24, 48, 0.32);
  box-shadow:
    0 0 28px rgba(126, 85, 255, 0.1),
    inset 0 1px 0 rgba(213, 194, 255, 0.06);
}

.pg-frame.is-ai {
  border-color: rgba(122, 196, 255, 0.5);
}
html[data-theme='dark'] .pg-frame.is-ai {
  border-color: rgba(96, 168, 240, 0.55);
}

.pg-frame.is-web3 {
  border-color: rgba(255, 168, 215, 0.5);
}
html[data-theme='dark'] .pg-frame.is-web3 {
  border-color: rgba(225, 138, 196, 0.55);
}

.pg-frame.is-fusion {
  border-color: rgba(170, 104, 255, 0.6);
}
</style>
