<script setup lang="ts">
import type { HomepageRoadmapChapter } from '../content/handbook-roadmap'

defineProps<{
  chapters: HomepageRoadmapChapter[]
  activeNodeId: string
}>()

const emit = defineEmits<{
  nodeClick: [nodeId: string]
}>()

function topicNodeId(chapter: HomepageRoadmapChapter, groupId: string, topicId: string) {
  return `${chapter.id}-${groupId}-${topicId}`
}
</script>

<template>
  <div class="roadmap-mobile">
    <section
      v-for="(chapter, chapterIndex) in chapters"
      :key="chapter.id"
      class="roadmap-mobile-section"
      :class="`is-${chapter.tone}`"
    >
      <div class="roadmap-mobile-marker" aria-hidden="true">
        {{ String(chapterIndex + 1).padStart(2, '0') }}
      </div>

      <div class="roadmap-mobile-content">
        <h2 class="roadmap-mobile-title">{{ chapter.title }}</h2>

        <div class="roadmap-mobile-groups">
          <article
            v-for="group in chapter.groups"
            :key="group.id"
            class="roadmap-mobile-group"
          >
            <h3 class="roadmap-mobile-group-title">{{ group.title }}</h3>

            <div class="roadmap-mobile-topics">
              <button
                v-for="topic in group.topics"
                :key="topic.id"
                type="button"
                class="roadmap-mobile-topic"
                :class="{ 'is-active': activeNodeId === topicNodeId(chapter, group.id, topic.id) }"
                @click="emit('nodeClick', topicNodeId(chapter, group.id, topic.id))"
              >
                {{ topic.title }}
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.roadmap-mobile {
  display: none;
}

@media (max-width: 768px) {
  .roadmap-mobile {
    display: block;
    position: relative;
    padding: 24px 14px 28px;
  }

  .roadmap-mobile::before {
    content: '';
    position: absolute;
    top: 36px;
    bottom: 42px;
    left: 31px;
    width: 1px;
    background: linear-gradient(180deg, rgba(167, 139, 250, 0.12), rgba(167, 139, 250, 0.5), rgba(167, 139, 250, 0.12));
  }

  .roadmap-mobile-section {
    --roadmap-mobile-accent: rgba(170, 104, 255, 0.86);
    --roadmap-mobile-accent-soft: rgba(170, 104, 255, 0.13);
    --roadmap-mobile-border: rgba(186, 153, 255, 0.3);
    --roadmap-mobile-title: rgba(37, 37, 46, 0.94);
    position: relative;
    display: grid;
    grid-template-columns: 36px minmax(0, 1fr);
    column-gap: 10px;
    padding-bottom: 30px;
  }

  .roadmap-mobile-section:last-child {
    padding-bottom: 0;
  }

  .roadmap-mobile-section.is-ai {
    --roadmap-mobile-accent: rgba(55, 161, 212, 0.9);
    --roadmap-mobile-accent-soft: rgba(110, 209, 255, 0.13);
    --roadmap-mobile-border: rgba(110, 209, 255, 0.32);
  }

  .roadmap-mobile-section.is-web3 {
    --roadmap-mobile-accent: rgba(121, 91, 214, 0.9);
    --roadmap-mobile-accent-soft: rgba(178, 153, 255, 0.14);
    --roadmap-mobile-border: rgba(178, 153, 255, 0.34);
  }

  .roadmap-mobile-section.is-fusion {
    --roadmap-mobile-accent: rgba(193, 119, 32, 0.9);
    --roadmap-mobile-accent-soft: rgba(255, 193, 129, 0.16);
    --roadmap-mobile-border: rgba(255, 193, 129, 0.38);
  }

  .roadmap-mobile-section.is-security {
    --roadmap-mobile-accent: rgba(190, 75, 128, 0.9);
    --roadmap-mobile-accent-soft: rgba(255, 151, 194, 0.15);
    --roadmap-mobile-border: rgba(255, 151, 194, 0.36);
  }

  .roadmap-mobile-section.is-standard {
    --roadmap-mobile-accent: rgba(42, 143, 110, 0.92);
    --roadmap-mobile-accent-soft: rgba(111, 211, 177, 0.16);
    --roadmap-mobile-border: rgba(111, 211, 177, 0.38);
  }

  .roadmap-mobile-section.is-practice {
    --roadmap-mobile-accent: rgba(188, 113, 24, 0.9);
    --roadmap-mobile-accent-soft: rgba(255, 186, 105, 0.17);
    --roadmap-mobile-border: rgba(255, 186, 105, 0.4);
  }

  .roadmap-mobile-marker {
    position: relative;
    z-index: 1;
    width: 34px;
    height: 34px;
    border: 1px solid var(--roadmap-mobile-border);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.78);
    color: var(--roadmap-mobile-accent);
    font-size: 11px;
    font-weight: 800;
    line-height: 1;
    box-shadow:
      0 0 14px var(--roadmap-mobile-accent-soft),
      inset 0 1px 0 rgba(255, 255, 255, 0.86);
  }

  .roadmap-mobile-content {
    min-width: 0;
  }

  .roadmap-mobile .roadmap-mobile-title {
    margin: 2px 0 14px;
    color: var(--roadmap-mobile-title);
    font-size: 22px;
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: 0;
    overflow-wrap: anywhere;
  }

  .roadmap-mobile-groups {
    display: grid;
    gap: 12px;
  }

  .roadmap-mobile-group {
    position: relative;
    margin: 0;
    padding: 13px 13px 14px;
    border: 1px solid var(--roadmap-mobile-border);
    border-radius: 12px;
    background:
      radial-gradient(120% 120% at 0% 0%, var(--roadmap-mobile-accent-soft), transparent 58%),
      rgba(255, 255, 255, 0.52);
    box-shadow:
      0 0 18px rgba(170, 104, 255, 0.07),
      inset 0 1px 0 rgba(255, 255, 255, 0.76);
  }

  .roadmap-mobile-group::before {
    content: '';
    position: absolute;
    top: 24px;
    left: -29px;
    width: 29px;
    height: 1px;
    background: var(--roadmap-mobile-border);
  }

  .roadmap-mobile .roadmap-mobile-group-title {
    margin: 0 0 10px;
    color: var(--roadmap-mobile-accent);
    font-size: 15px;
    font-weight: 800;
    line-height: 1.28;
    letter-spacing: 0;
    overflow-wrap: anywhere;
  }

  .roadmap-mobile-topics {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .roadmap-mobile-topic {
    appearance: none;
    min-width: 0;
    max-width: 100%;
    padding: 7px 10px;
    border: 1px solid var(--roadmap-mobile-border);
    border-radius: 7px;
    background: rgba(255, 255, 255, 0.44);
    color: rgba(57, 45, 72, 0.92);
    cursor: pointer;
    font-family: inherit;
    font-size: 13px;
    font-weight: 700;
    line-height: 1.18;
    text-align: left;
    text-decoration: none;
    overflow-wrap: anywhere;
    transition:
      transform 0.2s ease,
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      background-color 0.2s ease;
  }

  .roadmap-mobile-topic:hover,
  .roadmap-mobile-topic:focus-visible {
    transform: translateY(-1px);
    border-color: var(--roadmap-mobile-accent);
    background: rgba(255, 255, 255, 0.72);
    box-shadow: 0 8px 18px rgba(170, 104, 255, 0.13);
    outline: none;
  }

  .roadmap-mobile-topic:active,
  .roadmap-mobile-topic.is-active {
    transform: translateY(1px) scale(0.98);
    border-color: var(--roadmap-mobile-accent);
    background: var(--roadmap-mobile-accent-soft);
    box-shadow:
      0 0 0 3px var(--roadmap-mobile-accent-soft),
      inset 0 1px 0 rgba(255, 255, 255, 0.72);
  }

  html[data-theme='dark'] .roadmap-mobile::before {
    background: linear-gradient(180deg, rgba(154, 117, 245, 0.16), rgba(154, 117, 245, 0.56), rgba(154, 117, 245, 0.16));
  }

  html[data-theme='dark'] .roadmap-mobile-section {
    --roadmap-mobile-title: rgba(244, 240, 255, 0.94);
  }

  html[data-theme='dark'] .roadmap-mobile-marker {
    background: rgba(24, 18, 34, 0.88);
    box-shadow:
      0 0 18px var(--roadmap-mobile-accent-soft),
      inset 0 1px 0 rgba(221, 204, 255, 0.1);
  }

  html[data-theme='dark'] .roadmap-mobile-group {
    background:
      radial-gradient(120% 120% at 0% 0%, var(--roadmap-mobile-accent-soft), transparent 58%),
      rgba(33, 24, 48, 0.62);
    box-shadow:
      0 0 22px rgba(126, 85, 255, 0.1),
      inset 0 1px 0 rgba(213, 194, 255, 0.08);
  }

  html[data-theme='dark'] .roadmap-mobile-topic {
    background: rgba(26, 19, 38, 0.56);
    color: rgba(249, 245, 255, 0.86);
  }

  html[data-theme='dark'] .roadmap-mobile-topic:hover,
  html[data-theme='dark'] .roadmap-mobile-topic:focus-visible {
    background: rgba(42, 31, 60, 0.86);
    box-shadow: 0 10px 20px rgba(27, 15, 47, 0.36);
  }

  html[data-theme='dark'] .roadmap-mobile-topic:active,
  html[data-theme='dark'] .roadmap-mobile-topic.is-active {
    background: var(--roadmap-mobile-accent-soft);
    box-shadow:
      0 0 0 3px var(--roadmap-mobile-accent-soft),
      inset 0 1px 0 rgba(221, 204, 255, 0.1);
  }
}
</style>
