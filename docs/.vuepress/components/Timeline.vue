<script setup lang="ts">
const sponsorSlots = Array.from({ length: 6 }, (_, index) => ({ id: `slot-${index + 1}` }))
</script>

<template>
  <section class="timeline-wrap">
    <div class="timeline-shell">
      <section class="roadmap-reserved">
        <h3 class="section-title">Roadmap</h3>
        <div class="roadmap-blank" aria-label="Roadmap 区域预留" />
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

.roadmap-blank {
  min-height: 360px;
  border: 1.5px dashed rgba(47, 84, 151, 0.28);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.58);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.52),
    0 16px 36px rgba(27, 55, 97, 0.08);
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
  .sponsor-grid {
    grid-template-columns: 1fr;
  }
}
</style>
