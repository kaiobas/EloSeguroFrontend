<template>
  <q-page class="more-page">
    <div class="bg-orb orb-one"></div>
    <div class="bg-orb orb-two"></div>
    <div class="bg-orb orb-three"></div>
    <div class="bg-orb orb-four"></div>

    <div class="more-shell">
      <section class="more-hero">
        <div>
          <div class="eyebrow">
            Central de apoio
          </div>

          <h1>
            Mais opções
          </h1>

          <p>
            Acesse recursos de orientação, privacidade e revisão dos alertas.
          </p>
        </div>

        <div class="hero-icon">
          <q-icon name="more_horiz" size="28px" />
        </div>
      </section>

      <q-card flat class="profile-card">
        <q-card-section class="profile-section">
          <div class="glass-highlight"></div>

          <div class="profile-top">
            <div class="profile-avatar">
              RS
            </div>

            <div class="profile-info">
              <strong>Responsável Demo</strong>
              <span>responsavel@email.com</span>
            </div>

            <div class="profile-badge">
              Ativo
            </div>
          </div>

          <p>
            Conta protegida com verificação em duas etapas e aceite de termos confirmado.
          </p>
        </q-card-section>
      </q-card>

      <div class="options-list">
        <q-card
          v-for="option in options"
          :key="option.title"
          flat
          class="option-card"
          clickable
          @click="handleOption(option)"
        >
          <q-card-section class="option-section">
            <div class="option-icon" :class="option.type">
              <q-icon :name="option.icon" size="24px" />
            </div>

            <div class="option-content">
              <strong>{{ option.title }}</strong>
              <span>{{ option.description }}</span>
            </div>

            <q-icon
              name="chevron_right"
              size="24px"
              class="option-arrow"
            />
          </q-card-section>
        </q-card>
      </div>

      <q-card flat class="support-card">
        <q-card-section class="support-section">
          <div class="support-icon">
            <q-icon name="support_agent" size="24px" />
          </div>

          <div>
            <strong>Precisa de ajuda?</strong>
            <span>
              Em situações de risco, preserve evidências e procure canais oficiais de apoio.
            </span>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const options = [
  {
    title: 'Orientações para os pais',
    description: 'Guias para agir com segurança após um alerta.',
    icon: 'menu_book',
    type: 'guidance',
    route: { name: 'guidance' }
  },
  {
    title: 'Conversa segura',
    description: 'Frases e abordagens acolhedoras para conversar.',
    icon: 'chat',
    type: 'conversation',
    route: { name: 'safe-conversation' }
  },
  {
    title: 'Privacidade e permissões',
    description: 'Dados analisados, consentimentos e termos aceitos.',
    icon: 'privacy_tip',
    type: 'privacy',
    route: { name: 'privacy' }
  }
]

function handleOption(option) {
  if (option.route) {
    router.push(option.route)
  }
}
</script>

<style lang="scss" scoped>
.more-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  padding-bottom: 92px;
  background:
    radial-gradient(circle at 18% 16%, rgba(168, 218, 220, 0.38), transparent 28%),
    radial-gradient(circle at 78% 22%, rgba(205, 180, 219, 0.34), transparent 30%),
    radial-gradient(circle at 50% 100%, rgba(123, 175, 212, 0.30), transparent 36%),
    linear-gradient(135deg, #dbeaf0 0%, #d7e1ea 42%, #e7e1ef 100%);
}

.more-page::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(120deg, rgba(255, 255, 255, 0.34), transparent 42%),
    radial-gradient(circle at center, rgba(255, 255, 255, 0.18), transparent 54%);
  pointer-events: none;
  z-index: 0;
}

.bg-orb {
  position: absolute;
  border-radius: 999px;
  pointer-events: none;
  z-index: 1;
}

.orb-one {
  width: 180px;
  height: 180px;
  top: 8%;
  left: -48px;
  background: rgba(168, 218, 220, 0.44);
  box-shadow: 0 35px 90px rgba(168, 218, 220, 0.34);
}

.orb-two {
  width: 128px;
  height: 128px;
  top: 26%;
  right: -34px;
  background: rgba(205, 180, 219, 0.38);
  box-shadow: 0 35px 90px rgba(205, 180, 219, 0.30);
}

.orb-three {
  width: 92px;
  height: 92px;
  bottom: 24%;
  left: -18px;
  background: rgba(123, 175, 212, 0.30);
  box-shadow: 0 28px 78px rgba(123, 175, 212, 0.26);
}

.orb-four {
  width: 72px;
  height: 72px;
  bottom: 14%;
  right: 28px;
  background: rgba(184, 224, 210, 0.32);
  box-shadow: 0 26px 70px rgba(184, 224, 210, 0.26);
}

.more-shell {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
  padding: 20px 18px 24px;
}

.more-hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.eyebrow {
  color: rgba(36, 59, 83, 0.62);
  font-size: 13px;
  font-weight: 800;
}

.more-hero h1 {
  margin: 3px 0 4px;
  color: #20344b;
  font-size: 28px;
  line-height: 1.08;
  font-weight: 900;
  letter-spacing: -0.05em;
}

.more-hero p {
  margin: 0;
  color: rgba(36, 59, 83, 0.70);
  font-size: 14px;
  line-height: 1.4;
  font-weight: 600;
}

.hero-icon {
  width: 58px;
  height: 58px;
  border-radius: 22px;
  flex-shrink: 0;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.20);
  border: 1px solid rgba(255, 255, 255, 0.62);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.78),
    inset 0 -10px 20px rgba(123, 175, 212, 0.16),
    0 16px 30px rgba(36, 59, 83, 0.12);
  backdrop-filter: blur(22px) saturate(180%);
  -webkit-backdrop-filter: blur(22px) saturate(180%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-card,
.option-card,
.support-card {
  position: relative;
  overflow: hidden;
  border-radius: 30px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.68), rgba(255, 255, 255, 0.28));
  border: 1px solid rgba(255, 255, 255, 0.68);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.88),
    inset 0 -1px 0 rgba(255, 255, 255, 0.20),
    0 20px 58px rgba(36, 59, 83, 0.13);
  backdrop-filter: blur(30px) saturate(170%);
  -webkit-backdrop-filter: blur(30px) saturate(170%);
}

.profile-card::before,
.option-card::before,
.support-card::before {
  content: '';
  position: absolute;
  inset: 1px;
  border-radius: inherit;
  background:
    radial-gradient(circle at 18% 0%, rgba(255, 255, 255, 0.68), transparent 34%),
    radial-gradient(circle at 90% 12%, rgba(255, 255, 255, 0.20), transparent 30%);
  pointer-events: none;
}

.profile-section,
.option-section,
.support-section {
  position: relative;
  z-index: 2;
}

.profile-section {
  padding: 18px;
}

.glass-highlight {
  position: absolute;
  width: 160px;
  height: 40px;
  top: -18px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.20);
  filter: blur(12px);
  pointer-events: none;
}

.profile-top {
  display: flex;
  align-items: center;
  gap: 12px;
}

.profile-avatar {
  width: 52px;
  height: 52px;
  border-radius: 20px;
  flex-shrink: 0;
  color: #ffffff;
  background: rgba(123, 175, 212, 0.54);
  border: 1px solid rgba(255, 255, 255, 0.68);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.68),
    0 10px 22px rgba(36, 59, 83, 0.08);
  backdrop-filter: blur(18px) saturate(160%);
  -webkit-backdrop-filter: blur(18px) saturate(160%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 15px;
}

.profile-info {
  flex: 1;
  min-width: 0;
}

.profile-info strong {
  display: block;
  color: #20344b;
  font-size: 16px;
  line-height: 1.1;
  font-weight: 900;
}

.profile-info span {
  display: block;
  margin-top: 4px;
  color: rgba(36, 59, 83, 0.58);
  font-size: 12.5px;
  font-weight: 700;
}

.profile-badge {
  padding: 7px 10px;
  border-radius: 999px;
  color: #2f6f5f;
  background: rgba(184, 224, 210, 0.38);
  border: 1px solid rgba(255, 255, 255, 0.58);
  font-size: 12px;
  font-weight: 900;
}

.profile-section p {
  margin: 13px 0 0;
  color: rgba(36, 59, 83, 0.70);
  font-size: 13px;
  line-height: 1.42;
  font-weight: 600;
}

.options-list {
  display: grid;
  gap: 12px;
  margin-top: 12px;
}

.option-card {
  cursor: pointer;
}

.option-section {
  min-height: 82px;
  padding: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.option-icon {
  width: 48px;
  height: 48px;
  border-radius: 18px;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.62);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.62),
    0 10px 22px rgba(36, 59, 83, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
}

.option-icon.evidence {
  color: #5e9fca;
  background: rgba(123, 175, 212, 0.28);
}

.option-icon.guidance {
  color: #2f6f5f;
  background: rgba(184, 224, 210, 0.36);
}

.option-icon.conversation {
  color: #7d6295;
  background: rgba(205, 180, 219, 0.34);
}

.option-icon.review {
  color: #8a6429;
  background: rgba(246, 209, 134, 0.36);
}

.option-icon.privacy {
  color: #5e9fca;
  background: rgba(168, 218, 220, 0.36);
}

.option-content {
  flex: 1;
  min-width: 0;
}

.option-content strong {
  display: block;
  color: #20344b;
  font-size: 15px;
  line-height: 1.15;
  font-weight: 900;
}

.option-content span {
  display: block;
  margin-top: 4px;
  color: rgba(36, 59, 83, 0.62);
  font-size: 12.5px;
  line-height: 1.35;
  font-weight: 650;
}

.option-arrow {
  color: rgba(36, 59, 83, 0.40);
  flex-shrink: 0;
}

.support-card {
  margin-top: 12px;
}

.support-section {
  padding: 15px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.support-icon {
  width: 46px;
  height: 46px;
  border-radius: 18px;
  flex-shrink: 0;
  color: #5e9fca;
  background: rgba(255, 255, 255, 0.30);
  border: 1px solid rgba(255, 255, 255, 0.58);
  display: flex;
  align-items: center;
  justify-content: center;
}

.support-section strong {
  display: block;
  color: #20344b;
  font-size: 15px;
  line-height: 1.15;
  font-weight: 900;
}

.support-section span {
  display: block;
  margin-top: 4px;
  color: rgba(36, 59, 83, 0.66);
  font-size: 12.5px;
  line-height: 1.4;
  font-weight: 650;
}

@media (max-width: 420px) {
  .more-shell {
    padding: 18px 16px 24px;
  }

  .more-hero h1 {
    font-size: 25px;
  }

  .hero-icon {
    width: 52px;
    height: 52px;
    border-radius: 20px;
  }

  .profile-top {
    align-items: flex-start;
  }

  .profile-badge {
    align-self: flex-start;
  }
}
</style>
