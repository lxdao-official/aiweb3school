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
    <section class="roadmap-shell">
      <section class="roadmap-section roadmap-intro">
        <div class="roadmap-intro-stack">
          <div class="roadmap-center-stack">
            <div class="roadmap-node roadmap-node-stage">{{ content.roadmap.intro.stageTag }}</div>
            <div class="roadmap-node roadmap-node-core">{{ content.roadmap.intro.centerTitle }}</div>
            <div class="roadmap-label">{{ content.roadmap.intro.centerLabel }}</div>
          </div>
          <div class="roadmap-panel roadmap-intro-panel roadmap-panel-plain">
            <div class="roadmap-intro-grid">
              <div class="roadmap-intro-block">
                <div class="roadmap-panel-head">
                  <span></span>
                  <h4>{{ content.roadmap.intro.leftTitle }}</h4>
                  <span></span>
                </div>
                <div class="roadmap-panel-list">
                  <div v-for="item in content.roadmap.intro.leftItems" :key="item" class="roadmap-panel-item">{{ item }}</div>
                </div>
              </div>
              <div class="roadmap-intro-block">
                <div class="roadmap-panel-head">
                  <span></span>
                  <h4>{{ content.roadmap.intro.rightTitle }}</h4>
                  <span></span>
                </div>
                <div class="roadmap-panel-list">
                  <div v-for="item in content.roadmap.intro.rightItems" :key="item" class="roadmap-panel-item">{{ item }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="roadmap-section roadmap-foundation">
        <div class="roadmap-section-head">
          <div class="roadmap-node roadmap-node-stage">{{ content.roadmap.foundation.stageTag }}</div>
          <div class="roadmap-node roadmap-node-core">{{ content.roadmap.foundation.centerTitle }}</div>
          <div class="roadmap-label roadmap-label-inline">{{ content.roadmap.foundation.centerLabel }}</div>
        </div>
        <div class="roadmap-foundation-grid">
          <div class="roadmap-foundation-lane roadmap-foundation-lane-left">
            <div class="roadmap-foundation-mini">
              <div class="roadmap-foundation-rail"></div>
              <div class="roadmap-foundation-branch-list">
                <div class="roadmap-foundation-branch-title-wrap">
                  <div class="roadmap-node roadmap-node-branch-title">{{ content.roadmap.foundation.leftTitle }}</div>
                </div>
                <div
                  v-for="(item, index) in content.roadmap.foundation.leftItems"
                  :key="item"
                  class="roadmap-foundation-branch"
                  :class="index % 2 === 0 ? 'is-left' : 'is-right'"
                >
                  <div class="roadmap-node roadmap-node-branch">{{ item }}</div>
                </div>
              </div>
              <div class="roadmap-foundation-arrow"></div>
            </div>
          </div>

          <div class="roadmap-foundation-spacer" aria-hidden="true"></div>

          <div class="roadmap-foundation-lane roadmap-foundation-lane-right">
            <div class="roadmap-foundation-mini">
              <div class="roadmap-foundation-rail"></div>
              <div class="roadmap-foundation-branch-list">
                <div class="roadmap-foundation-branch-title-wrap">
                  <div class="roadmap-node roadmap-node-branch-title">{{ content.roadmap.foundation.rightTitle }}</div>
                </div>
                <div
                  v-for="(item, index) in content.roadmap.foundation.rightItems"
                  :key="item"
                  class="roadmap-foundation-branch"
                  :class="index % 2 === 0 ? 'is-left' : 'is-right'"
                >
                  <div class="roadmap-node roadmap-node-branch">{{ item }}</div>
                </div>
              </div>
              <div class="roadmap-foundation-arrow"></div>
            </div>
          </div>
        </div>
      </section>

      <section class="roadmap-section roadmap-core">
        <div class="roadmap-section-head">
          <div class="roadmap-node roadmap-node-stage">{{ content.roadmap.core.stageTag }}</div>
          <div class="roadmap-node roadmap-node-core roadmap-node-core-main">{{ content.roadmap.core.centerTitle }}</div>
          <div class="roadmap-label roadmap-label-inline">{{ content.roadmap.core.centerLabel }}</div>
        </div>
        <div class="roadmap-cluster-grid">
          <div v-for="cluster in content.roadmap.core.clusters" :key="cluster.title" class="roadmap-cluster roadmap-cluster-plain">
            <div class="roadmap-cluster-head">{{ cluster.title }}</div>
            <div class="roadmap-cluster-list">
              <div v-for="item in cluster.items" :key="item" class="roadmap-cluster-item">{{ item }}</div>
            </div>
          </div>
        </div>
      </section>

      <section class="roadmap-section roadmap-support">
        <div class="roadmap-section-head">
          <div class="roadmap-node roadmap-node-stage">{{ content.roadmap.support.stageTag }}</div>
          <div class="roadmap-label roadmap-label-inline">{{ content.roadmap.support.centerLabel }}</div>
        </div>
        <div class="roadmap-support-grid">
          <div class="roadmap-panel roadmap-panel-wide roadmap-panel-plain">
            <div class="roadmap-panel-head">
              <span></span>
              <h4>{{ content.roadmap.support.leftTitle }}</h4>
              <span></span>
            </div>
            <div class="roadmap-panel-list">
              <div v-for="item in content.roadmap.support.leftItems" :key="item" class="roadmap-panel-item">{{ item }}</div>
            </div>
          </div>

          <div class="roadmap-panel roadmap-panel-wide roadmap-panel-plain">
            <div class="roadmap-panel-head">
              <span></span>
              <h4>{{ content.roadmap.support.rightTitle }}</h4>
              <span></span>
            </div>
            <div class="roadmap-panel-list">
              <div v-for="item in content.roadmap.support.rightItems" :key="item" class="roadmap-panel-item">{{ item }}</div>
            </div>
          </div>
        </div>
      </section>

      <section class="roadmap-section roadmap-practice">
        <div class="roadmap-section-head">
          <div class="roadmap-node roadmap-node-stage">{{ content.roadmap.practice.stageTag }}</div>
          <div class="roadmap-node roadmap-node-core roadmap-node-core-main">{{ content.roadmap.practice.centerTitle }}</div>
          <div class="roadmap-label roadmap-label-inline">{{ content.roadmap.practice.centerLabel }}</div>
        </div>
        <div class="roadmap-project-grid">
          <div v-for="project in content.roadmap.practice.projects" :key="project" class="roadmap-project-card">
            {{ project }}
          </div>
        </div>
      </section>
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

.roadmap-shell {
  position: relative;
  width: min(1080px, calc(100vw - 40px));
  margin: 0 auto;
  padding: 72px 0 88px;
}

.roadmap-shell::before {
  content: '';
  position: absolute;
  top: 124px;
  bottom: 152px;
  left: 50%;
  transform: translateX(-50%);
  width: 1.5px;
  background: linear-gradient(180deg, rgba(233, 166, 255, 0.78) 0%, rgba(203, 140, 255, 0.88) 100%);
  box-shadow: 0 0 12px rgba(184, 112, 255, 0.14);
  z-index: 0;
}

html[data-theme='dark'] .roadmap-shell::before {
  background: linear-gradient(180deg, rgba(166, 112, 255, 0.88) 0%, rgba(104, 80, 212, 0.94) 100%);
  box-shadow: 0 0 16px rgba(140, 95, 255, 0.22);
}

.roadmap-section {
  position: relative;
  z-index: 1;
}

.roadmap-section + .roadmap-section {
  margin-top: 52px;
}

.roadmap-foundation-grid,
.roadmap-support-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 260px minmax(0, 1fr);
  align-items: start;
  gap: 36px;
}

.roadmap-foundation-grid {
  position: relative;
  grid-template-columns: minmax(300px, 360px) 220px minmax(300px, 360px);
  justify-content: center;
  gap: 20px;
}

.roadmap-section-head {
  display: grid;
  justify-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.roadmap-intro-stack {
  display: grid;
  justify-items: center;
  gap: 24px;
}

.roadmap-center-stack {
  display: grid;
  justify-items: center;
  align-content: start;
  gap: 16px;
  padding-top: 10px;
}

.roadmap-intro-panel {
  width: min(620px, 100%);
  padding: 0;
}

.roadmap-foundation-spacer {
  min-height: 1px;
}

.roadmap-intro-panel .roadmap-panel-list {
  justify-items: center;
  gap: 8px;
}

.roadmap-intro-panel .roadmap-panel-item {
  width: auto;
  max-width: 100%;
  min-width: 172px;
  padding: 0 16px;
}

.roadmap-intro-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 14px;
}

.roadmap-intro-block {
  display: grid;
  justify-items: center;
  gap: 12px;
}

.roadmap-panel,
.roadmap-cluster,
.roadmap-project-card,
.board-card {
  border: 1px solid rgba(190, 147, 255, 0.8);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.34);
  box-shadow:
    0 0 18px rgba(170, 104, 255, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.82);
}

html[data-theme='dark'] .roadmap-panel,
html[data-theme='dark'] .roadmap-cluster,
html[data-theme='dark'] .roadmap-project-card,
html[data-theme='dark'] .board-card {
  border-color: rgba(132, 92, 235, 0.72);
  background: rgba(42, 29, 57, 0.42);
  box-shadow:
    0 0 28px rgba(126, 85, 255, 0.12),
    inset 0 1px 0 rgba(213, 194, 255, 0.08);
}

.roadmap-panel-plain {
  border: none;
  background: transparent;
  box-shadow: none;
}

html[data-theme='dark'] .roadmap-panel-plain {
  border: none;
  background: transparent;
  box-shadow: none;
}

.roadmap-cluster-plain {
  border: none;
  background: transparent;
  box-shadow: none;
}

html[data-theme='dark'] .roadmap-cluster-plain {
  border: none;
  background: transparent;
  box-shadow: none;
}

.roadmap-panel {
  padding: 16px 14px 14px;
}

.roadmap-panel-tall {
  min-height: 286px;
}

.roadmap-panel-wide {
  min-height: 238px;
}

.roadmap-foundation-grid {
  align-items: center;
}

.roadmap-foundation-lane {
  position: relative;
  width: 100%;
  min-height: 390px;
  display: grid;
  align-items: center;
  justify-self: center;
}

.roadmap-foundation-mini {
  position: relative;
  min-height: 432px;
  padding-bottom: 56px;
}

.roadmap-foundation-rail {
  position: absolute;
  top: 16px;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 1.5px;
  background: linear-gradient(180deg, rgba(233, 166, 255, 0.72) 0%, rgba(203, 140, 255, 0.84) 100%);
  box-shadow: 0 0 10px rgba(184, 112, 255, 0.14);
}

html[data-theme='dark'] .roadmap-foundation-rail {
  background: linear-gradient(180deg, rgba(166, 112, 255, 0.82) 0%, rgba(104, 80, 212, 0.92) 100%);
  box-shadow: 0 0 16px rgba(140, 95, 255, 0.22);
}

.roadmap-foundation-branch-list {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 12px;
}

.roadmap-foundation-branch-title-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
}

.roadmap-foundation-branch {
  position: relative;
  display: grid;
  align-items: center;
  width: 100%;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
}

.roadmap-foundation-branch.is-left {
  justify-items: stretch;
}

.roadmap-foundation-branch.is-right {
  justify-items: stretch;
}

.roadmap-foundation-branch::after {
  content: '';
  grid-row: 1;
  width: 28px;
  border-top: 1.5px dashed rgba(228, 173, 255, 0.82);
}

.roadmap-foundation-branch.is-left::after {
  grid-column: 1;
  justify-self: end;
}

.roadmap-foundation-branch.is-right::after {
  grid-column: 2;
  justify-self: start;
}

html[data-theme='dark'] .roadmap-foundation-branch::after {
  border-top-color: rgba(154, 117, 245, 0.58);
}

.roadmap-node-branch-title {
  min-height: 40px;
  min-width: 180px;
  padding: 0 18px;
}

.roadmap-node-branch {
  grid-row: 1;
  width: auto;
  max-width: 220px;
  min-height: 30px;
  min-width: 156px;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 600;
}

.roadmap-foundation-branch.is-left .roadmap-node-branch {
  grid-column: 1;
  justify-self: end;
  margin-right: 28px;
}

.roadmap-foundation-branch.is-right .roadmap-node-branch {
  grid-column: 2;
  justify-self: start;
  margin-left: 28px;
}

.roadmap-foundation-arrow {
  position: absolute;
  bottom: 8px;
  width: 188px;
  height: 1px;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(233, 166, 255, 0.82) 0%, rgba(203, 140, 255, 0.88) 100%);
  box-shadow: 0 0 12px rgba(184, 112, 255, 0.16);
}

.roadmap-foundation-arrow::after {
  content: '';
  position: absolute;
  top: 50%;
  right: -1px;
  width: 18px;
  height: 18px;
  border-top: 3px solid rgba(203, 140, 255, 0.9);
  border-right: 3px solid rgba(203, 140, 255, 0.9);
  transform: translateY(-50%) rotate(45deg);
}

html[data-theme='dark'] .roadmap-foundation-arrow {
  background: linear-gradient(90deg, rgba(166, 112, 255, 0.82) 0%, rgba(104, 80, 212, 0.94) 100%);
  box-shadow: 0 0 14px rgba(140, 95, 255, 0.16);
}

html[data-theme='dark'] .roadmap-foundation-arrow::after {
  border-top-color: rgba(154, 117, 245, 0.88);
  border-right-color: rgba(154, 117, 245, 0.88);
}

.roadmap-foundation-lane-left .roadmap-foundation-arrow {
  left: 50%;
  transform-origin: left center;
  transform: rotate(24deg);
}

.roadmap-foundation-lane-right .roadmap-foundation-arrow {
  right: 50%;
  transform-origin: right center;
  transform: rotate(-24deg);
}

.roadmap-foundation-lane-right .roadmap-foundation-arrow::after {
  left: -1px;
  right: auto;
  border-top: none;
  border-right: none;
  border-bottom: 3px solid rgba(203, 140, 255, 0.9);
  border-left: 3px solid rgba(203, 140, 255, 0.9);
  transform: translateY(-50%) rotate(45deg);
}

html[data-theme='dark'] .roadmap-foundation-lane-right .roadmap-foundation-arrow::after {
  border-bottom-color: rgba(154, 117, 245, 0.88);
  border-left-color: rgba(154, 117, 245, 0.88);
}

.roadmap-panel-head,
.board-head {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.roadmap-panel-head {
  margin-bottom: 14px;
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

.roadmap-panel-list,
.roadmap-cluster-list {
  display: grid;
  gap: 8px;
  justify-items: center;
}

.roadmap-panel-item,
.roadmap-cluster-item {
  min-height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  max-width: min(100%, 260px);
  min-width: 172px;
  padding: 0 16px;
  border: 1px solid rgba(186, 153, 255, 0.72);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.42);
  box-shadow: 0 0 8px rgba(170, 104, 255, 0.08);
  color: rgba(114, 119, 124, 0.96);
  font-size: 14px;
  font-weight: 600;
}

html[data-theme='dark'] .roadmap-panel-item,
html[data-theme='dark'] .roadmap-cluster-item {
  border-color: rgba(121, 90, 214, 0.82);
  background: rgba(50, 37, 66, 0.4);
  box-shadow: 0 0 14px rgba(126, 85, 255, 0.1);
  color: rgba(244, 240, 255, 0.86);
}

.roadmap-node {
  min-width: 180px;
  min-height: 40px;
  padding: 0 28px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 1px solid rgba(218, 172, 255, 0.92);
  background: rgba(255, 246, 255, 0.65);
  color: rgba(87, 67, 112, 0.94);
  font-size: 15px;
  font-weight: 700;
  box-shadow: 0 0 16px rgba(205, 126, 255, 0.1);
}

html[data-theme='dark'] .roadmap-node {
  border-color: rgba(125, 84, 233, 0.9);
  background: rgba(55, 32, 88, 0.88);
  color: rgba(249, 245, 255, 0.95);
  box-shadow:
    0 0 18px rgba(118, 76, 226, 0.28),
    inset 0 1px 0 rgba(217, 197, 255, 0.1);
}

.roadmap-node-stage {
  min-width: 168px;
}

.roadmap-node-core {
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

.roadmap-node-core-main {
  min-width: 228px;
}

.roadmap-label {
  color: rgba(114, 119, 124, 0.92);
  font-size: 15px;
  font-weight: 600;
}

html[data-theme='dark'] .roadmap-label {
  color: rgba(240, 232, 255, 0.82);
}

.roadmap-label-inline {
  text-align: center;
}

.roadmap-core {
  padding-top: 8px;
}

.roadmap-cluster-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  padding: 0 104px;
}

.roadmap-cluster {
  width: min(100%, 340px);
  justify-self: center;
  padding: 14px 16px 16px;
}

.roadmap-cluster-head {
  margin-bottom: 12px;
  color: rgba(170, 104, 255, 0.9);
  font-size: 17px;
  font-weight: 700;
  text-align: center;
}

html[data-theme='dark'] .roadmap-cluster-head {
  color: rgba(186, 144, 255, 0.96);
}

.roadmap-support-grid {
  gap: 18px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.roadmap-practice {
  padding-top: 12px;
}

.roadmap-project-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-top: 22px;
  padding: 0 28px;
}

.roadmap-project-card {
  min-height: 92px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 12px;
  color: rgba(87, 67, 112, 0.94);
  font-size: 15px;
  font-weight: 700;
  text-align: center;
}

html[data-theme='dark'] .roadmap-project-card {
  color: rgba(249, 245, 255, 0.95);
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
  .roadmap-shell {
    width: min(100vw - 24px, 1120px);
    padding-bottom: 60px;
  }

  .roadmap-shell::before,
  .roadmap-foundation-rail,
  .roadmap-foundation-arrow {
    display: none;
  }

  .roadmap-foundation-grid,
  .roadmap-support-grid,
  .roadmap-cluster-grid,
  .roadmap-project-grid {
    grid-template-columns: 1fr;
    padding: 0;
  }

  .roadmap-intro-grid {
    grid-template-columns: 1fr;
  }

  .roadmap-foundation-lane {
    min-height: auto;
  }

  .roadmap-foundation-mini {
    min-height: auto;
  }

  .roadmap-node-branch-title,
  .roadmap-node-branch,
  .roadmap-foundation-branch {
    width: 100%;
    margin: 0;
  }

  .roadmap-foundation-branch::after {
    display: none;
  }

  .homepage-board {
    width: min(100vw - 24px, 1120px);
  }
}

@media (max-width: 768px) {
  .timeline-wrap {
    padding: 20px 0 60px;
  }

  .roadmap-shell {
    padding-top: 36px;
  }

  .roadmap-section + .roadmap-section {
    margin-top: 36px;
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

  .roadmap-node,
  .roadmap-node-core-main {
    min-width: 156px;
    width: 100%;
    padding: 12px 18px;
  }

  .signup-title {
    font-size: 28px;
  }

  .sponsor-grid {
    grid-template-columns: 1fr;
  }
}
</style>
