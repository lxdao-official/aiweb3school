<script setup lang="ts">
import { computed } from 'vue'
import { useRouteLocale } from 'vuepress/client'
import { homeI18n, type HomeLocale } from '../content/home-i18n'

const routeLocale = useRouteLocale()
const localeKey = computed<HomeLocale>(() => routeLocale.value === '/en/' ? 'en' : 'zh')
const content = computed(() => homeI18n[localeKey.value])
const sponsorSlots = Array.from({ length: 6 }, (_, index) => ({ id: `slot-${index + 1}` }))
</script>

<template>
  <section class="timeline-wrap">
    <section v-for="(stage, index) in content.roadmap.stages" :key="stage.stageTag" class="roadmap-stage" :class="{ 'roadmap-stage-continued': index > 0 }">
      <div v-if="index > 0" class="roadmap-stage-connector roadmap-stage-connector-top"></div>
      <div v-if="index < content.roadmap.stages.length - 1" class="roadmap-stage-connector roadmap-stage-connector-bottom"></div>
      <div class="roadmap-stage-frame">
        <div v-if="index === 0" class="roadmap-stage-tag">{{ stage.stageTag }}</div>
        <div v-if="index === 0" class="roadmap-stage-line"></div>

        <div class="roadmap-panel left-panel">
          <div class="roadmap-panel-head">
            <span></span>
            <h4>{{ stage.leftPanelTitle }}</h4>
            <span></span>
          </div>
          <div class="roadmap-panel-list">
            <div v-for="item in stage.leftPanel" :key="item" class="roadmap-panel-item">{{ item }}</div>
          </div>
        </div>

        <div class="roadmap-center">
          <div v-if="index === 0" class="roadmap-node roadmap-node-top">{{ stage.centerTop }}</div>
          <div class="roadmap-node roadmap-node-core">{{ stage.centerCore }}</div>
          <div v-if="index === 0" class="roadmap-line road-line-vertical-top"></div>
          <div class="roadmap-line road-line-vertical-middle"></div>
          <div class="roadmap-label">{{ stage.centerLabel }}</div>
          <div class="roadmap-node roadmap-node-bottom">{{ stage.centerBottom }}</div>
          <div class="roadmap-line road-line-vertical-bottom"></div>
        </div>

        <div class="roadmap-panel right-panel">
          <div class="roadmap-panel-head">
            <span></span>
            <h4>{{ stage.rightPanelTitle }}</h4>
            <span></span>
          </div>
          <div class="roadmap-panel-list">
            <div v-for="item in stage.rightPanel" :key="item" class="roadmap-panel-item">{{ item }}</div>
          </div>
        </div>

        <div class="roadmap-dash road-dash-left"></div>
        <div class="roadmap-dash road-dash-right"></div>
      </div>
    </section>

    <section class="homepage-board signup-board">
      <div class="board-head">
        <span></span>
        <h3>{{ content.signup.boardTitle }}</h3>
        <span></span>
      </div>
      <div class="board-card signup-card">
        <p class="signup-title">{{ content.signup.title }}</p>
        <a class="banner-btn" :href="content.signup.href">{{ content.signup.cta }}</a>
      </div>
    </section>

    <section class="homepage-board sponsor-board">
      <div class="board-head">
        <span></span>
        <h3>{{ content.sponsors.title }}</h3>
        <span></span>
      </div>
      <div class="sponsor-grid">
        <div v-for="slot in sponsorSlots" :key="slot.id" class="board-card sponsor-card">
          <div class="logo-placeholder" :aria-label="content.sponsors.ariaLabel" />
        </div>
      </div>
    </section>
  </section>
</template>

<style>
.timeline-wrap {
  position: relative;
  left: 50%;
  right: 50%;
  width: 100vw;
  margin-left: -50vw;
  margin-right: -50vw;
  padding: 28px 0 96px;
  background:
    radial-gradient(46% 54% at 6% 92%, rgba(148, 214, 255, 0.26), transparent 72%),
    radial-gradient(42% 50% at 94% 78%, rgba(255, 192, 232, 0.24), transparent 74%),
    radial-gradient(28% 24% at 50% 46%, rgba(227, 204, 255, 0.12), transparent 80%),
    linear-gradient(180deg, #fffefe 0%, #fffdfd 100%);
}

html[data-theme='dark'] .timeline-wrap {
  background:
    radial-gradient(34% 30% at 10% 92%, rgba(95, 226, 255, 0.26), transparent 72%),
    radial-gradient(38% 44% at 92% 68%, rgba(204, 92, 255, 0.24), transparent 72%),
    radial-gradient(26% 22% at 50% 28%, rgba(136, 74, 255, 0.14), transparent 76%),
    linear-gradient(180deg, #1c0f1e 0%, #110d18 36%, #0d111a 100%);
}

.roadmap-stage {
  position: relative;
  overflow: hidden;
  padding: 56px 0 48px;
  background: transparent;
}

.roadmap-stage:first-of-type {
  padding-top: 72px;
}

.roadmap-stage-continued {
  margin-top: -224px;
}

.roadmap-stage:last-of-type {
  padding-bottom: 88px;
}

.roadmap-stage-connector {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 1.5px;
  background: linear-gradient(180deg, rgba(233, 166, 255, 0.86) 0%, rgba(203, 140, 255, 0.88) 100%);
  box-shadow: 0 0 10px rgba(184, 112, 255, 0.14);
  z-index: 1;
}

html[data-theme='dark'] .roadmap-stage-connector {
  background: linear-gradient(180deg, rgba(166, 112, 255, 0.88) 0%, rgba(104, 80, 212, 0.94) 100%);
  box-shadow: 0 0 16px rgba(140, 95, 255, 0.22);
}

.roadmap-stage-connector-top {
  top: 0;
  height: 56px;
}

.roadmap-stage-connector-bottom {
  top: 514px;
  bottom: 0;
}

.roadmap-stage-frame {
  position: relative;
  width: min(1120px, calc(100vw - 40px));
  margin: 0 auto;
  min-height: 560px;
}

.roadmap-stage-tag {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(87, 67, 112, 0.94);
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.04em;
  z-index: 2;
}

html[data-theme='dark'] .roadmap-stage-tag {
  color: rgba(244, 240, 255, 0.94);
}

.roadmap-stage-line {
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 1.5px;
  height: 44px;
  background: linear-gradient(180deg, rgba(233, 166, 255, 0.86) 0%, rgba(203, 140, 255, 0.88) 100%);
  box-shadow: 0 0 10px rgba(184, 112, 255, 0.14);
}

html[data-theme='dark'] .roadmap-stage-line {
  background: linear-gradient(180deg, rgba(166, 112, 255, 0.88) 0%, rgba(104, 80, 212, 0.94) 100%);
  box-shadow: 0 0 16px rgba(140, 95, 255, 0.22);
}

.roadmap-panel {
  position: absolute;
  width: 244px;
  padding: 18px 18px 16px;
  border-radius: 18px;
  border: 1px solid rgba(190, 147, 255, 0.8);
  background: rgba(255, 255, 255, 0.34);
  box-shadow:
    0 0 18px rgba(170, 104, 255, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.82);
}

html[data-theme='dark'] .roadmap-panel {
  border-color: rgba(132, 92, 235, 0.72);
  background: rgba(42, 29, 57, 0.42);
  box-shadow:
    0 0 28px rgba(126, 85, 255, 0.12),
    inset 0 1px 0 rgba(213, 194, 255, 0.08);
}

.left-panel {
  top: 74px;
  left: 36px;
}

.right-panel {
  top: 74px;
  right: 36px;
}

.roadmap-panel-head,
.board-head {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.roadmap-panel-head {
  margin-bottom: 16px;
}

.roadmap-panel-head span,
.board-head span {
  width: 54px;
  height: 1px;
  background: linear-gradient(90deg, rgba(167, 139, 250, 0) 0%, rgba(167, 139, 250, 0.52) 100%);
}

.roadmap-panel-head span:last-child,
.board-head span:last-child {
  background: linear-gradient(90deg, rgba(167, 139, 250, 0.52) 0%, rgba(167, 139, 250, 0) 100%);
}

.roadmap-panel-head h4,
.board-head h3 {
  margin: 0;
  color: rgba(170, 104, 255, 0.9);
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

html[data-theme='dark'] .roadmap-panel-head h4,
html[data-theme='dark'] .board-head h3 {
  color: rgba(186, 144, 255, 0.96);
}

.roadmap-panel-list {
  display: grid;
  gap: 10px;
}

.roadmap-panel-item,
.board-card {
  border: 1px solid rgba(186, 153, 255, 0.72);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.42);
  box-shadow: 0 0 8px rgba(170, 104, 255, 0.08);
}

html[data-theme='dark'] .roadmap-panel-item,
html[data-theme='dark'] .board-card {
  border-color: rgba(121, 90, 214, 0.82);
  background: rgba(50, 37, 66, 0.4);
  box-shadow: 0 0 14px rgba(126, 85, 255, 0.1);
}

.roadmap-panel-item {
  min-height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  color: rgba(114, 119, 124, 0.96);
  font-size: 14px;
  font-weight: 600;
}

html[data-theme='dark'] .roadmap-panel-item {
  color: rgba(244, 240, 255, 0.86);
}

.roadmap-center {
  position: relative;
  width: 100%;
  min-height: 560px;
}

.roadmap-node {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  min-width: 174px;
  min-height: 38px;
  padding: 0 28px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(218, 172, 255, 0.92);
  background: rgba(255, 246, 255, 0.65);
  color: rgba(87, 67, 112, 0.94);
  font-size: 15px;
  font-weight: 700;
  box-shadow: 0 0 16px rgba(205, 126, 255, 0.1);
  z-index: 2;
}

html[data-theme='dark'] .roadmap-node {
  border-color: rgba(125, 84, 233, 0.9);
  background: rgba(55, 32, 88, 0.88);
  color: rgba(249, 245, 255, 0.95);
  box-shadow:
    0 0 18px rgba(118, 76, 226, 0.28),
    inset 0 1px 0 rgba(217, 197, 255, 0.1);
}

.roadmap-node-core {
  top: 174px;
  border-color: rgba(129, 222, 255, 0.96);
  background: rgba(237, 251, 255, 0.88);
  color: rgba(56, 87, 106, 0.96);
  box-shadow: 0 0 28px rgba(130, 222, 255, 0.22);
}

html[data-theme='dark'] .roadmap-node-core {
  border-color: rgba(24, 198, 255, 0.84);
  background: rgba(16, 39, 63, 0.9);
  color: rgba(226, 249, 255, 0.96);
  box-shadow:
    0 0 24px rgba(0, 195, 255, 0.22),
    0 0 48px rgba(0, 195, 255, 0.12);
}

.roadmap-node-top {
  top: 86px;
}

.roadmap-node-bottom {
  top: 420px;
}

.roadmap-label {
  position: absolute;
  left: 50%;
  top: 302px;
  transform: translateX(-50%);
  color: rgba(114, 119, 124, 0.92);
  font-size: 15px;
  font-weight: 600;
}

html[data-theme='dark'] .roadmap-label {
  color: rgba(240, 232, 255, 0.82);
}

.roadmap-line {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 1.5px;
  background: linear-gradient(180deg, rgba(233, 166, 255, 0.86) 0%, rgba(203, 140, 255, 0.88) 100%);
  box-shadow: 0 0 10px rgba(184, 112, 255, 0.14);
}

html[data-theme='dark'] .roadmap-line {
  background: linear-gradient(180deg, rgba(166, 112, 255, 0.88) 0%, rgba(104, 80, 212, 0.94) 100%);
  box-shadow: 0 0 16px rgba(140, 95, 255, 0.22);
}

.road-line-vertical-top {
  top: 124px;
  height: 50px;
}

.road-line-vertical-middle {
  top: 212px;
  height: 74px;
}

.road-line-vertical-bottom {
  top: 327px;
  height: 94px;
}

.roadmap-dash {
  position: absolute;
  height: 1px;
  border-top: 1.5px dashed rgba(228, 173, 255, 0.82);
}

html[data-theme='dark'] .roadmap-dash {
  border-top-color: rgba(154, 117, 245, 0.58);
}

.road-dash-left {
  top: 104px;
  left: 280px;
  width: calc(50% - 368px);
}

.road-dash-right {
  top: 104px;
  right: 280px;
  width: calc(50% - 368px);
}

.roadmap-stage-continued .roadmap-stage-frame {
  min-height: 560px;
}

.roadmap-stage-continued .roadmap-stage-connector-top {
  height: 56px;
}

.roadmap-stage-continued .roadmap-stage-connector-bottom {
  top: 514px;
}

.roadmap-stage-continued .left-panel,
.roadmap-stage-continued .right-panel {
  top: 74px;
}

.roadmap-stage-continued .roadmap-center {
  min-height: 560px;
}

.roadmap-stage-continued .roadmap-node-core {
  top: 174px;
}

.roadmap-stage-continued .roadmap-label {
  top: 302px;
}

.roadmap-stage-continued .roadmap-node-bottom {
  top: 420px;
}

.roadmap-stage-continued .road-line-vertical-middle {
  top: 212px;
  height: 74px;
}

.roadmap-stage-continued .road-line-vertical-bottom {
  top: 327px;
  height: 94px;
}

.roadmap-stage-continued .road-dash-left,
.roadmap-stage-continued .road-dash-right {
  top: 104px;
}

.homepage-board {
  width: min(1120px, calc(100vw - 40px));
  margin: 28px auto 0;
  padding: 18px 20px 20px;
  border: 1px solid rgba(186, 153, 255, 0.26);
  border-radius: 28px;
  background:
    radial-gradient(42% 60% at 4% 100%, rgba(123, 203, 255, 0.18), transparent 72%),
    radial-gradient(40% 60% at 95% 76%, rgba(255, 177, 228, 0.14), transparent 74%),
    rgba(255, 255, 255, 0.45);
  box-shadow:
    0 0 20px rgba(170, 104, 255, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

html[data-theme='dark'] .homepage-board {
  border-color: rgba(127, 93, 214, 0.58);
  background:
    radial-gradient(38% 52% at 4% 100%, rgba(74, 186, 255, 0.16), transparent 72%),
    radial-gradient(36% 56% at 96% 76%, rgba(208, 93, 255, 0.14), transparent 74%),
    rgba(34, 24, 48, 0.52);
  box-shadow:
    0 0 28px rgba(126, 85, 255, 0.12),
    inset 0 1px 0 rgba(212, 193, 255, 0.08);
}

.signup-card {
  min-height: 176px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 28px 24px;
}

.signup-title {
  margin: 0;
  color: rgba(31, 49, 65, 0.96);
  font-size: 36px;
  line-height: 1.2;
  text-align: center;
  font-family: 'Kaiti SC', 'STKaiti', 'KaiTi', 'Songti SC', serif;
  font-weight: 600;
  letter-spacing: 0.04em;
}

html[data-theme='dark'] .signup-title {
  color: rgba(244, 240, 255, 0.94);
  text-shadow: 0 0 18px rgba(164, 119, 255, 0.14);
}

.banner-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 98px;
  min-height: 44px;
  padding: 0 22px;
  border: 1.6px solid rgba(87, 67, 112, 0.76);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.72);
  color: #3f3856;
  font-size: 24px;
  text-decoration: none;
  box-shadow:
    0 0 8px rgba(170, 104, 255, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease,
    border-color 0.22s ease,
    background-color 0.22s ease,
    color 0.22s ease;
}

html[data-theme='dark'] .banner-btn {
  border-color: rgba(133, 102, 220, 0.88);
  background: rgba(33, 22, 49, 0.78);
  color: rgba(244, 239, 255, 0.95);
  box-shadow:
    0 0 18px rgba(126, 85, 255, 0.14),
    inset 0 1px 0 rgba(214, 196, 255, 0.08);
}

.banner-btn:hover,
.banner-btn:focus-visible {
  transform: translateY(-2px);
  border-color: rgba(125, 84, 233, 0.92);
  box-shadow:
    0 10px 22px rgba(170, 104, 255, 0.18),
    0 0 18px rgba(170, 104, 255, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.96);
}

html[data-theme='dark'] .banner-btn:hover,
html[data-theme='dark'] .banner-btn:focus-visible {
  border-color: rgba(158, 126, 245, 0.98);
  box-shadow:
    0 12px 26px rgba(27, 15, 47, 0.46),
    0 0 20px rgba(126, 85, 255, 0.24),
    inset 0 1px 0 rgba(221, 204, 255, 0.1);
}

.sponsor-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.sponsor-card {
  min-height: 82px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-placeholder {
  width: 74%;
  max-width: 216px;
  height: 24px;
  border: 1.4px dashed rgba(186, 153, 255, 0.36);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.32);
}

html[data-theme='dark'] .logo-placeholder {
  border-color: rgba(130, 98, 220, 0.46);
  background: rgba(54, 40, 70, 0.4);
}

@media (max-width: 1100px) {
  .roadmap-stage-continued {
    margin-top: 0;
  }

  .roadmap-stage-frame {
    min-height: auto;
    display: grid;
    gap: 22px;
  }

  .roadmap-panel,
  .roadmap-node,
  .roadmap-label,
  .roadmap-line,
  .roadmap-dash,
  .roadmap-stage-connector,
  .roadmap-stage-tag,
  .roadmap-stage-line {
    position: static;
    left: auto;
    top: auto;
    right: auto;
    transform: none;
    width: auto;
  }

  .roadmap-center {
    min-height: auto;
    display: grid;
    justify-items: center;
    gap: 18px;
  }

  .roadmap-stage-frame {
    justify-items: stretch;
  }

  .roadmap-stage-tag {
    text-align: center;
    margin-bottom: 4px;
  }

  .roadmap-line {
    width: 1.5px;
    height: 34px;
  }

  .roadmap-stage-line {
    width: 1.5px;
    height: 24px;
    justify-self: center;
  }

  .roadmap-dash {
    display: none;
  }

  .roadmap-stage-connector {
    display: none;
  }

  .roadmap-panel {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .timeline-wrap {
    padding: 20px 0 60px;
  }

  .homepage-board {
    padding: 18px 14px 20px;
    border-radius: 22px;
  }

  .roadmap-stage {
    padding: 36px 0 44px;
  }

  .roadmap-stage-frame {
    width: min(100vw - 24px, 1120px);
  }

  .homepage-board {
    width: min(100vw - 24px, 1120px);
  }

  .roadmap-panel-head,
  .board-head {
    gap: 8px;
  }

  .roadmap-panel-head span,
  .board-head span {
    width: 34px;
  }

  .roadmap-panel-head h4,
  .board-head h3 {
    font-size: 18px;
  }

  .roadmap-node {
    min-width: 156px;
    padding: 0 18px;
  }

  .signup-title {
    font-size: 28px;
  }

  .sponsor-grid {
    grid-template-columns: 1fr;
  }
}
</style>
