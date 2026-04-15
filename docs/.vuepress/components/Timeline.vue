<script setup lang="ts">
const sponsorSlots = Array.from({ length: 6 }, (_, index) => ({ id: `slot-${index + 1}` }))
const roadmapPanels = {
  left: {
    title: 'Web3 基础',
    items: ['区块链原理', '账户与钱包', '智能合约', 'Token 标准'],
  },
  rightTop: {
    title: 'AI 基础',
    items: ['机器学习基础', '深度学习与 Transformer', 'LLM 基础', 'Prompt 与工作流'],
  },
  rightBottom: {
    title: '热门方向',
    items: ['Agent Wallet', '链上数据反馈', '身份与上下文', '支付与订阅'],
  },
}
</script>

<template>
  <section class="timeline-wrap">
    <div class="timeline-shell">
      <section class="roadmap-reserved">
        <div class="roadmap-stage" aria-label="Roadmap 展示区">
          <div class="roadmap-stage-frame">
            <div class="roadmap-panel roadmap-panel-left">
              <div class="roadmap-panel-head">
                <span></span>
                <h4>{{ roadmapPanels.left.title }}</h4>
                <span></span>
              </div>
              <div class="roadmap-panel-list">
                <div v-for="item in roadmapPanels.left.items" :key="item" class="roadmap-chip">{{ item }}</div>
              </div>
            </div>

            <div class="roadmap-center roadmap-center-top">基础课程</div>
            <div class="roadmap-center roadmap-center-core">AI × Web3 路线图</div>
            <div class="roadmap-core-label">交叉能力</div>
            <div class="roadmap-center roadmap-center-bottom">赛道实践</div>

            <div class="roadmap-panel roadmap-panel-right-top">
              <div class="roadmap-panel-head">
                <span></span>
                <h4>{{ roadmapPanels.rightTop.title }}</h4>
                <span></span>
              </div>
              <div class="roadmap-panel-list">
                <div v-for="item in roadmapPanels.rightTop.items" :key="item" class="roadmap-chip">{{ item }}</div>
              </div>
            </div>

            <div class="roadmap-panel roadmap-panel-right-bottom">
              <div class="roadmap-panel-head">
                <span></span>
                <h4>{{ roadmapPanels.rightBottom.title }}</h4>
                <span></span>
              </div>
              <div class="roadmap-panel-list">
                <div v-for="item in roadmapPanels.rightBottom.items" :key="item" class="roadmap-chip">{{ item }}</div>
              </div>
            </div>

            <div class="roadmap-line roadmap-line-left" />
            <div class="roadmap-line roadmap-line-right-top" />
            <div class="roadmap-line roadmap-line-right-bottom" />
            <div class="roadmap-line roadmap-line-vertical-top" />
            <div class="roadmap-line roadmap-line-vertical-bottom" />
          </div>
        </div>
      </section>

      <section class="signup-banner">
        <div class="banner-copy">
          <p class="banner-title">AI x Web3 共学营</p>
        </div>
        <a class="banner-btn" href="./zh/README.md">报名</a>
      </section>

      <section class="sponsors">
        <h3 class="section-title">合作伙伴</h3>
        <div class="sponsor-grid">
          <div v-for="slot in sponsorSlots" :key="slot.id" class="sponsor-tile">
            <div class="logo-placeholder" aria-label="合作伙伴 Logo 占位" />
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.timeline-wrap {
  padding: 44px 0 86px;
  background:
    radial-gradient(58% 72% at 4% 0%, rgba(45, 108, 223, 0.08), transparent 70%),
    radial-gradient(52% 68% at 96% 0%, rgba(38, 147, 108, 0.1), transparent 72%),
    linear-gradient(180deg, rgba(248, 251, 255, 0.98) 0%, rgba(244, 248, 253, 0.96) 100%);
}

.timeline-shell {
  width: min(1120px, calc(100vw - 40px));
  margin: 0 auto;
  display: grid;
  gap: 38px;
}

.section-title {
  margin: 0 0 14px;
  font-size: 28px;
  line-height: 1.1;
  color: #1f3141;
  text-align: center;
}

.roadmap-stage {
  position: relative;
  min-height: 880px;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  padding: 36px 0;
  overflow: hidden;
  background:
    radial-gradient(58% 62% at 18% 92%, rgba(58, 111, 198, 0.22), transparent 72%),
    radial-gradient(42% 46% at 88% 92%, rgba(171, 69, 220, 0.18), transparent 70%),
    linear-gradient(180deg, rgba(28, 17, 38, 0.98) 0%, rgba(25, 20, 37, 0.97) 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    0 24px 64px rgba(18, 16, 31, 0.22);
}

.roadmap-stage-frame {
  position: relative;
  width: min(1120px, calc(100vw - 40px));
  min-height: 808px;
  margin: 0 auto;
}

.roadmap-stage::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 50% 34%, rgba(39, 207, 255, 0.12), transparent 18%),
    radial-gradient(circle at 21% 14%, rgba(152, 90, 255, 0.14), transparent 26%),
    radial-gradient(circle at 84% 16%, rgba(152, 90, 255, 0.12), transparent 24%);
}

.roadmap-panel {
  position: absolute;
  width: 290px;
  padding: 24px 20px 22px;
  border: 1px solid rgba(151, 103, 255, 0.42);
  border-radius: 22px;
  background: linear-gradient(180deg, rgba(53, 33, 78, 0.34) 0%, rgba(43, 27, 60, 0.2) 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.04),
    0 0 0 1px rgba(113, 67, 198, 0.08),
    0 18px 40px rgba(8, 6, 20, 0.24);
  backdrop-filter: blur(8px);
}

.roadmap-panel-left {
  top: 56px;
  left: 18px;
}

.roadmap-panel-right-top {
  top: 56px;
  right: 18px;
}

.roadmap-panel-right-bottom {
  right: 18px;
  bottom: 48px;
}

.roadmap-panel-head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}

.roadmap-panel-head span {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(159, 122, 255, 0.45) 100%);
}

.roadmap-panel-head h4 {
  margin: 0;
  color: #d7cfff;
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
}

.roadmap-panel-list {
  display: grid;
  gap: 14px;
}

.roadmap-chip {
  min-height: 62px;
  border: 1px solid rgba(135, 92, 232, 0.44);
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(65, 47, 85, 0.62) 0%, rgba(59, 42, 79, 0.44) 100%);
  color: #edf4ff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 18px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.02em;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.04),
    0 0 18px rgba(133, 92, 232, 0.08);
}

.roadmap-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 268px;
  min-height: 78px;
  padding: 0 28px;
  border-radius: 18px;
  color: #f2f7ff;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.02em;
  border: 1px solid rgba(140, 102, 244, 0.62);
  background: linear-gradient(180deg, rgba(60, 31, 106, 0.78) 0%, rgba(44, 25, 84, 0.74) 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    0 0 28px rgba(139, 94, 255, 0.22);
}

.roadmap-center-top {
  top: 56px;
}

.roadmap-center-core {
  top: 228px;
  min-width: 320px;
  min-height: 82px;
  border-color: rgba(42, 210, 255, 0.76);
  background: linear-gradient(180deg, rgba(14, 43, 71, 0.86) 0%, rgba(10, 35, 62, 0.82) 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 0 34px rgba(36, 208, 255, 0.28);
}

.roadmap-center-bottom {
  top: 584px;
}

.roadmap-core-label {
  position: absolute;
  top: 450px;
  left: 50%;
  transform: translateX(-50%);
  color: #f4f7ff;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.roadmap-line {
  position: absolute;
  pointer-events: none;
}

.roadmap-line-left,
.roadmap-line-right-top,
.roadmap-line-right-bottom {
  height: 1px;
  border-top: 2px dashed rgba(155, 110, 252, 0.5);
}

.roadmap-line-left {
  top: 96px;
  left: 306px;
  width: calc(50% - 182px);
}

.roadmap-line-right-top {
  top: 96px;
  left: calc(50% + 134px);
  width: calc(50% - 456px);
}

.roadmap-line-right-bottom {
  top: 624px;
  left: calc(50% + 134px);
  width: calc(50% - 456px);
}

.roadmap-line-vertical-top,
.roadmap-line-vertical-bottom {
  left: 50%;
  width: 2px;
  transform: translateX(-50%);
  background: linear-gradient(180deg, rgba(120, 96, 220, 0.86) 0%, rgba(122, 98, 224, 0.54) 100%);
  box-shadow: 0 0 16px rgba(114, 87, 210, 0.22);
}

.roadmap-line-vertical-top {
  top: 132px;
  height: 96px;
}

.roadmap-line-vertical-bottom {
  top: 310px;
  height: 250px;
}

.signup-banner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: min(600px, 100%);
  min-height: 188px;
  margin: 0 auto;
  padding: 28px 30px;
  border: 1.6px solid rgba(50, 75, 109, 0.56);
  border-radius: 18px;
  background:
    linear-gradient(140deg, rgba(255, 255, 255, 0.92) 0%, rgba(242, 248, 255, 0.9) 56%, rgba(241, 250, 247, 0.88) 100%);
  box-shadow:
    inset 0 2px 0 rgba(255, 255, 255, 0.68),
    inset 0 -2px 0 rgba(28, 53, 82, 0.08),
    0 14px 32px rgba(28, 53, 82, 0.12);
  backdrop-filter: blur(6px);
}

.banner-copy {
  width: 100%;
}

.banner-title {
  margin: 0;
  font-size: 36px;
  line-height: 1.2;
  color: #1f3141;
  text-align: center;
  font-family: 'Kaiti SC', 'STKaiti', 'KaiTi', 'Songti SC', serif;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
}

.banner-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 98px;
  min-height: 44px;
  padding: 0 22px;
  border: 1.6px solid #1f3141;
  border-radius: 12px;
  background: linear-gradient(180deg, #ffffff 0%, #f0f6ff 100%);
  color: #203247;
  font-size: 24px;
  text-decoration: none;
  transition: transform 0.22s ease;
  align-self: center;
  margin-top: 10px;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.86),
    inset 0 -1px 0 rgba(32, 50, 71, 0.16),
    0 4px 10px rgba(30, 56, 88, 0.15);
}

.banner-btn:hover {
  transform: translateY(-1px);
}

.sponsor-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.sponsor-tile {
  min-height: 68px;
  border: 1.4px solid rgba(53, 83, 119, 0.34);
  border-radius: 12px;
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.88) 0%, rgba(241, 248, 255, 0.8) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.72),
    0 10px 26px rgba(30, 56, 88, 0.08);
}

.logo-placeholder {
  width: 74%;
  max-width: 216px;
  height: 24px;
  border: 1.4px dashed rgba(64, 95, 133, 0.35);
  border-radius: 999px;
  background: rgba(250, 253, 255, 0.58);
}

@media (max-width: 900px) {
  .timeline-wrap {
    padding: 34px 0 62px;
  }

  .section-title {
    font-size: 24px;
  }

  .roadmap-blank {
    min-height: 260px;
  }

  .signup-banner {
    min-height: 160px;
    padding: 22px 22px;
  }

  .banner-title {
    font-size: 28px;
  }

  .banner-btn {
    min-width: 88px;
    min-height: 40px;
    font-size: 20px;
  }

  .sponsor-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .roadmap-stage {
    min-height: auto;
    padding: 22px 16px;
  }

  .roadmap-stage-frame {
    width: 100%;
    min-height: auto;
    display: grid;
    gap: 18px;
  }

  .roadmap-panel,
  .roadmap-center,
  .roadmap-core-label,
  .roadmap-line {
    position: static;
    transform: none;
    width: auto;
    min-width: 0;
  }

  .roadmap-center {
    min-height: 68px;
  }

  .roadmap-core-label {
    text-align: center;
  }

  .sponsor-grid {
    grid-template-columns: 1fr;
  }
}
</style>
