<script setup lang="ts">
defineProps<{
  data: {
    title: string
    tone?: 'intro' | 'ai' | 'web3' | 'fusion'
    width: number
    height: number
  }
}>()
</script>

<template>
  <div
    class="pg-label"
    :class="data.tone ? `is-${data.tone}` : ''"
    :style="{ width: `${data.width}px`, height: `${data.height}px` }"
  >
    <span class="pg-label-text">{{ data.title }}</span>
  </div>
</template>

<style scoped>
.pg-label {
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  /* 半透明渐变底，确保覆盖到下方边线时仍能看清 */
  background:
    radial-gradient(60% 80% at 50% 50%,
      rgba(255, 255, 255, 0.92) 0%,
      rgba(255, 255, 255, 0.78) 60%,
      rgba(255, 255, 255, 0) 100%);
  border-radius: 12px;
}

html[data-theme='dark'] .pg-label {
  background:
    radial-gradient(60% 80% at 50% 50%,
      rgba(34, 24, 48, 0.95) 0%,
      rgba(34, 24, 48, 0.85) 60%,
      rgba(34, 24, 48, 0) 100%);
}

.pg-label-text {
  max-width: 100%;
  padding: 0 8px;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 1.18;
  color: rgba(170, 104, 255, 0.95);
  text-align: center;
  white-space: normal;
  overflow-wrap: anywhere;
}

html[data-theme='dark'] .pg-label-text {
  color: rgba(196, 158, 255, 0.96);
}

.pg-label.is-ai .pg-label-text {
  color: rgba(56, 130, 220, 0.95);
}
html[data-theme='dark'] .pg-label.is-ai .pg-label-text {
  color: rgba(120, 182, 255, 0.96);
}

.pg-label.is-web3 .pg-label-text {
  color: rgba(220, 86, 168, 0.95);
}
html[data-theme='dark'] .pg-label.is-web3 .pg-label-text {
  color: rgba(255, 142, 210, 0.96);
}
</style>
