<script setup lang="ts">
const leftPanel = ['账户模型', '交易生命周期', 'Gas 与费用', '共识机制']
const rightTopPanel = ['监督学习', '无监督学习', '训练集', '验证集']
const rightBottomPanel = ['Agent Payments', 'Onchain Agent', 'Identity', 'AI × DeFi']
const sponsorSlots = Array.from({ length: 6 }, (_, index) => ({ id: `slot-${index + 1}` }))
</script>

<template>
  <section class="timeline-wrap">
    <section class="roadmap-stage">
      <div class="roadmap-stage-frame">
        <div class="roadmap-panel left-panel">
          <div class="roadmap-panel-head">
            <span></span>
            <h4>Web3 基础</h4>
            <span></span>
          </div>
          <div class="roadmap-panel-list">
            <div v-for="item in leftPanel" :key="item" class="roadmap-panel-item">{{ item }}</div>
          </div>
        </div>

        <div class="roadmap-center">
          <div class="roadmap-node roadmap-node-top">基础课程</div>
          <div class="roadmap-node roadmap-node-core">AI × Web3 路线图</div>
          <div class="roadmap-line road-line-vertical-top"></div>
          <div class="roadmap-label">AI × Web3</div>
          <div class="roadmap-node roadmap-node-bottom">赛道实践</div>
          <div class="roadmap-line road-line-vertical-bottom"></div>
        </div>

        <div class="roadmap-panel right-panel right-top">
          <div class="roadmap-panel-head">
            <span></span>
            <h4>AI 基础</h4>
            <span></span>
          </div>
          <div class="roadmap-panel-list">
            <div v-for="item in rightTopPanel" :key="item" class="roadmap-panel-item">{{ item }}</div>
          </div>
        </div>

        <div class="roadmap-panel right-panel right-bottom">
          <div class="roadmap-panel-head">
            <span></span>
            <h4>热门方向</h4>
            <span></span>
          </div>
          <div class="roadmap-panel-list">
            <div v-for="item in rightBottomPanel" :key="item" class="roadmap-panel-item">{{ item }}</div>
          </div>
        </div>

        <div class="roadmap-dash road-dash-left"></div>
        <div class="roadmap-dash road-dash-right-top"></div>
        <div class="roadmap-dash road-dash-right-bottom"></div>
      </div>
    </section>

    <section class="homepage-board signup-board">
      <div class="board-head">
        <span></span>
        <h3>共学营</h3>
        <span></span>
      </div>
      <div class="board-card signup-card">
        <p class="signup-title">AI x Web3 共学营</p>
        <a class="banner-btn" href="./zh/README.md">报名</a>
      </div>
    </section>

    <section class="homepage-board sponsor-board">
      <div class="board-head">
        <span></span>
        <h3>合作伙伴</h3>
        <span></span>
      </div>
      <div class="sponsor-grid">
        <div v-for="slot in sponsorSlots" :key="slot.id" class="board-card sponsor-card">
          <div class="logo-placeholder" aria-label="合作伙伴 Logo 占位" />
        </div>
      </div>
    </section>
  </section>
</template>

<style scoped>
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

:global(html[data-theme='dark']) .timeline-wrap {
  background:
    radial-gradient(34% 30% at 10% 92%, rgba(95, 226, 255, 0.26), transparent 72%),
    radial-gradient(38% 44% at 92% 68%, rgba(204, 92, 255, 0.24), transparent 72%),
    radial-gradient(26% 22% at 50% 28%, rgba(136, 74, 255, 0.14), transparent 76%),
    linear-gradient(180deg, #1c0f1e 0%, #110d18 36%, #0d111a 100%);
}

.roadmap-stage {
  position: relative;
  overflow: hidden;
  padding: 72px 0 96px;
  background: transparent;
}

.roadmap-stage-frame {
  position: relative;
  width: min(1120px, calc(100vw - 40px));
  margin: 0 auto;
  min-height: 640px;
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

:global(html[data-theme='dark']) .roadmap-panel {
  border-color: rgba(132, 92, 235, 0.72);
  background: rgba(42, 29, 57, 0.42);
  box-shadow:
    0 0 28px rgba(126, 85, 255, 0.12),
    inset 0 1px 0 rgba(213, 194, 255, 0.08);
}

.left-panel {
  top: 58px;
  left: 36px;
}

.right-top {
  top: 58px;
  right: 36px;
}

.right-bottom {
  top: 398px;
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
}

:global(html[data-theme='dark']) .roadmap-panel-head h4,
:global(html[data-theme='dark']) .board-head h3 {
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

:global(html[data-theme='dark']) .roadmap-panel-item,
:global(html[data-theme='dark']) .board-card {
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

:global(html[data-theme='dark']) .roadmap-panel-item {
  color: rgba(244, 240, 255, 0.86);
}

.roadmap-center {
  position: relative;
  width: 100%;
  min-height: 640px;
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

:global(html[data-theme='dark']) .roadmap-node {
  border-color: rgba(125, 84, 233, 0.9);
  background: rgba(55, 32, 88, 0.88);
  color: rgba(249, 245, 255, 0.95);
  box-shadow:
    0 0 18px rgba(118, 76, 226, 0.28),
    inset 0 1px 0 rgba(217, 197, 255, 0.1);
}

.roadmap-node-core {
  top: 158px;
  border-color: rgba(129, 222, 255, 0.96);
  background: rgba(237, 251, 255, 0.88);
  color: rgba(56, 87, 106, 0.96);
  box-shadow: 0 0 28px rgba(130, 222, 255, 0.22);
}

:global(html[data-theme='dark']) .roadmap-node-core {
  border-color: rgba(24, 198, 255, 0.84);
  background: rgba(16, 39, 63, 0.9);
  color: rgba(226, 249, 255, 0.96);
  box-shadow:
    0 0 24px rgba(0, 195, 255, 0.22),
    0 0 48px rgba(0, 195, 255, 0.12);
}

.roadmap-node-top {
  top: 70px;
}

.roadmap-node-bottom {
  top: 438px;
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

:global(html[data-theme='dark']) .roadmap-label {
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

:global(html[data-theme='dark']) .roadmap-line {
  background: linear-gradient(180deg, rgba(166, 112, 255, 0.88) 0%, rgba(104, 80, 212, 0.94) 100%);
  box-shadow: 0 0 16px rgba(140, 95, 255, 0.22);
}

.road-line-vertical-top {
  top: 108px;
  height: 92px;
}

.road-line-vertical-bottom {
  top: 327px;
  height: 112px;
}

.roadmap-dash {
  position: absolute;
  height: 1px;
  border-top: 1.5px dashed rgba(228, 173, 255, 0.82);
}

:global(html[data-theme='dark']) .roadmap-dash {
  border-top-color: rgba(154, 117, 245, 0.58);
}

.road-dash-left {
  top: 88px;
  left: 280px;
  width: calc(50% - 368px);
}

.road-dash-right-top {
  top: 88px;
  right: 280px;
  width: calc(50% - 368px);
}

.road-dash-right-bottom {
  top: 457px;
  right: 280px;
  width: calc(50% - 368px);
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

:global(html[data-theme='dark']) .homepage-board {
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

:global(html[data-theme='dark']) .signup-title {
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
}

:global(html[data-theme='dark']) .banner-btn {
  border-color: rgba(133, 102, 220, 0.88);
  background: rgba(33, 22, 49, 0.78);
  color: rgba(244, 239, 255, 0.95);
  box-shadow:
    0 0 18px rgba(126, 85, 255, 0.14),
    inset 0 1px 0 rgba(214, 196, 255, 0.08);
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

:global(html[data-theme='dark']) .logo-placeholder {
  border-color: rgba(130, 98, 220, 0.46);
  background: rgba(54, 40, 70, 0.4);
}

@media (max-width: 1100px) {
  .roadmap-stage-frame {
    min-height: auto;
    display: grid;
    gap: 22px;
  }

  .roadmap-panel,
  .roadmap-node,
  .roadmap-label,
  .roadmap-line,
  .roadmap-dash {
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

  .roadmap-line {
    width: 1.5px;
    height: 34px;
  }

  .roadmap-dash {
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
    padding: 44px 0 60px;
  }

  .roadmap-stage-frame {
    width: min(100vw - 24px, 1120px);
  }

  .homepage-board {
    width: min(100vw - 24px, 1120px);
  }

  .roadmap-panel-head h4,
  .board-head h3 {
    font-size: 22px;
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
