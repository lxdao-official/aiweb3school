<script setup lang="ts">
const roadmapCards = [
  {
    title: '基础课程',
    text: '从 Web3 与 AI 的共通基础开始，先建立词汇、工具和整体认知。',
  },
  {
    title: '交叉能力',
    text: '把 Prompt、Agent、链上数据和协议理解放到同一条学习脉络里。',
  },
  {
    title: '赛道实践',
    text: '围绕支付、Agent、身份、数据与协议标准展开真实场景训练。',
  },
  {
    title: '合作生态',
    text: '课程、社群与伙伴资源协同开放，方便后续持续更新内容与活动。',
  },
]

const sponsorSlots = Array.from({ length: 6 }, (_, index) => ({ id: `slot-${index + 1}` }))
</script>

<template>
  <section class="timeline-wrap">
    <section class="homepage-board">
      <div class="board-head">
        <span></span>
        <h3>Roadmap</h3>
        <span></span>
      </div>
      <div class="board-list">
        <article v-for="card in roadmapCards" :key="card.title" class="board-card roadmap-card">
          <h4>{{ card.title }}</h4>
          <p>{{ card.text }}</p>
        </article>
      </div>
    </section>

    <section class="homepage-board">
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

    <section class="homepage-board">
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
  width: min(1120px, calc(100vw - 40px));
  margin: 0 auto;
  padding: 14px 0 86px;
  background:
    radial-gradient(58% 72% at 4% 0%, rgba(91, 92, 246, 0.06), transparent 70%),
    radial-gradient(52% 68% at 96% 0%, rgba(167, 139, 250, 0.08), transparent 72%),
    linear-gradient(180deg, #f8fbff 0%, #f4f7fc 100%);
}

.homepage-board + .homepage-board {
  margin-top: 24px;
}

.homepage-board {
  padding: 18px 20px 20px;
  border: 1px solid rgba(139, 92, 246, 0.28);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.04);
  box-shadow:
    0 0 40px rgba(109, 40, 217, 0.12),
    inset 0 1px 0 rgba(196, 181, 253, 0.06);
  backdrop-filter: blur(10px);
}

.board-head {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-bottom: 14px;
}

.board-head span {
  width: 63px;
  height: 1px;
  background: linear-gradient(90deg, rgba(167, 139, 250, 0) 0%, rgba(167, 139, 250, 0.5) 100%);
}

.board-head span:last-child {
  background: linear-gradient(90deg, rgba(167, 139, 250, 0.5) 0%, rgba(167, 139, 250, 0) 100%);
}

.board-head h3 {
  margin: 0;
  color: rgba(202, 213, 226, 0.96);
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.board-list,
.sponsor-grid {
  display: grid;
  gap: 16px;
}

.board-list {
  grid-template-columns: 1fr;
}

.sponsor-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.board-card {
  border: 1px solid rgba(142, 81, 255, 0.3);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.04);
  box-shadow:
    0 0 8px rgba(139, 92, 246, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.roadmap-card {
  min-height: 88px;
  padding: 16px 18px;
}

.roadmap-card h4 {
  margin: 0 0 10px;
  color: #cad5e2;
  font-size: 18px;
  font-weight: 700;
}

.roadmap-card p {
  margin: 0;
  color: rgba(114, 119, 124, 0.96);
  font-size: 14px;
  line-height: 1.65;
}

.signup-card {
  min-height: 176px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
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

.banner-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 98px;
  min-height: 44px;
  padding: 0 22px;
  border: 1.6px solid rgba(31, 49, 65, 0.88);
  border-radius: 12px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.92) 0%, rgba(240, 246, 255, 0.92) 100%);
  color: #203247;
  font-size: 24px;
  text-decoration: none;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.86),
    inset 0 -1px 0 rgba(32, 50, 71, 0.16),
    0 4px 10px rgba(30, 56, 88, 0.15);
  transition: transform 0.22s ease;
}

.banner-btn:hover {
  transform: translateY(-1px);
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
  border: 1.4px dashed rgba(142, 81, 255, 0.26);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
}

@media (max-width: 900px) {
  .timeline-wrap {
    padding: 34px 0 62px;
  }

  .homepage-board {
    padding: 18px 18px 24px;
  }

  .board-head h3 {
    font-size: 24px;
  }

  .sponsor-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .signup-title {
    font-size: 30px;
  }
}

@media (max-width: 560px) {
  .timeline-wrap {
    width: min(100vw - 24px, 1120px);
    padding: 26px 0 48px;
  }

  .homepage-board {
    padding: 16px 14px 20px;
    border-radius: 22px;
  }

  .board-head {
    gap: 10px;
  }

  .board-head span {
    width: 38px;
  }

  .board-head h3 {
    font-size: 22px;
  }

  .sponsor-grid {
    grid-template-columns: 1fr;
  }

  .roadmap-card {
    min-height: 102px;
  }

  .signup-card {
    min-height: 150px;
    padding: 22px 18px;
  }

  .signup-title {
    font-size: 26px;
  }

  .banner-btn {
    min-width: 88px;
    min-height: 40px;
    font-size: 20px;
  }
}
</style>
