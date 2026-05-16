<template>
  <q-page class="dashboard-page">
    <div class="bg-orb orb-one"></div>
    <div class="bg-orb orb-two"></div>
    <div class="bg-orb orb-three"></div>
    <div class="bg-orb orb-four"></div>

    <div class="dashboard-shell">
      <section class="dashboard-hero">
        <div>
          <div class="eyebrow">
            Visão geral
          </div>

          <h1>
            Olá, {{ responsibleName }}
          </h1>

          <p>
            {{ dashboardMessage }}
          </p>
        </div>

        <div class="hero-icon">
          <q-icon name="shield" size="28px" />
        </div>
      </section>

      <q-card flat class="risk-card">
        <q-card-section class="risk-section">
          <div class="glass-highlight"></div>

          <div class="risk-top">
            <div>
              <div class="risk-label">
                Nível de risco atual
              </div>

              <div class="risk-title">
                {{ currentRisk.label }}
              </div>
            </div>

            <div
              class="risk-badge"
              :class="currentRisk.class"
            >
              {{ currentRisk.short }}
            </div>
          </div>

          <q-linear-progress
            rounded
            size="10px"
            :value="currentRisk.progress"
            class="risk-progress"
          />

          <div class="risk-description">
            {{ currentRisk.description }}
          </div>
        </q-card-section>
      </q-card>

      <div class="metrics-grid">
        <q-card
          v-for="metric in metrics"
          :key="metric.label"
          flat
          class="metric-card"
        >
          <q-card-section class="metric-section">
            <div class="metric-icon">
              <q-icon :name="metric.icon" size="22px" />
            </div>

            <div class="metric-value">
              {{ metric.value }}
            </div>

            <div class="metric-label">
              {{ metric.label }}
            </div>
          </q-card-section>
        </q-card>
      </div>

      <q-card flat class="status-card">
        <q-card-section class="status-section">
          <div class="section-header">
            <div>
              <h2>Status da IA</h2>
              <p>Monitoramento inteligente em funcionamento.</p>
            </div>

            <div class="status-pill">
              <span class="status-dot"></span>
              Ativa
            </div>
          </div>

          <div class="ai-row">
            <div class="ai-icon">
              <q-icon name="psychology" size="24px" />
            </div>

            <div>
              <strong>Análise em tempo real</strong>
              <span>Última verificação há 5 minutos.</span>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <q-card flat class="alert-card">
        <q-card-section class="alert-section">
          <div class="section-header">
            <div>
              <h2>Último alerta</h2>
              <p>Resumo do evento mais recente.</p>
            </div>

            <q-btn
              flat
              dense
              no-caps
              label="Ver todos"
              class="see-all-btn"
              @click="$router.push({ name: 'alerts' })"
            />
          </div>

          <div class="last-alert">
            <div class="alert-icon">
              <q-icon name="warning_amber" size="24px" />
            </div>

            <div class="alert-content">
              <div class="alert-title-row">
                <strong>{{ lastAlert.platform }}</strong>
                <span>{{ lastAlert.time }}</span>
              </div>

              <p>
                {{ lastAlert.summary }}
              </p>

              <div class="alert-tags">
                <span class="tag medium">
                  Risco médio
                </span>

                <span class="tag">
                  {{ lastAlert.child }}
                </span>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <q-btn
        label="Ver alertas de risco"
        icon-right="arrow_forward"
        unelevated
        no-caps
        class="full-width main-action-btn"
        @click="$router.push({ name: 'alerts' })"
      />
    </div>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'

const responsibleName = 'Maria'

const currentRisk = {
  label: 'Baixo',
  short: 'Seguro',
  class: 'risk-low',
  progress: 0.28,
  description: 'Nenhuma conversa de alto risco foi detectada nas últimas 24 horas.'
}

const dashboardMessage = computed(() => {
  return 'Acompanhamento digital ativo e sem ocorrências críticas no momento.'
})

const metrics = [
  {
    label: 'Alertas recentes',
    value: '2',
    icon: 'notifications_active'
  },
  {
    label: 'Crianças',
    value: '2',
    icon: 'family_restroom'
  },
  {
    label: 'Aparelhos',
    value: '3',
    icon: 'devices'
  },
  {
    label: 'IA ativa',
    value: 'ON',
    icon: 'verified_user'
  }
]

const lastAlert = {
  platform: 'Instagram',
  time: 'Hoje, 14:30',
  child: 'Ana Clara',
  summary: 'A IA identificou uma conversa insistente com possível tentativa de migração para outro aplicativo.'
}
</script>

<style lang="scss" scoped>
.dashboard-page {
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

.dashboard-page::before {
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

.dashboard-shell {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
  padding: 20px 18px 24px;
}

.dashboard-hero {
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

.dashboard-hero h1 {
  margin: 3px 0 4px;
  color: #20344b;
  font-size: 28px;
  line-height: 1.08;
  font-weight: 900;
  letter-spacing: -0.05em;
}

.dashboard-hero p {
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

.risk-card,
.metric-card,
.status-card,
.alert-card {
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

.risk-card::before,
.metric-card::before,
.status-card::before,
.alert-card::before {
  content: '';
  position: absolute;
  inset: 1px;
  border-radius: inherit;
  background:
    radial-gradient(circle at 18% 0%, rgba(255, 255, 255, 0.68), transparent 34%),
    radial-gradient(circle at 90% 12%, rgba(255, 255, 255, 0.20), transparent 30%);
  pointer-events: none;
}

.risk-section,
.metric-section,
.status-section,
.alert-section {
  position: relative;
  z-index: 2;
}

.risk-section {
  padding: 20px;
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

.risk-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
}

.risk-label {
  color: rgba(36, 59, 83, 0.62);
  font-size: 13px;
  font-weight: 800;
}

.risk-title {
  margin-top: 2px;
  color: #20344b;
  font-size: 28px;
  line-height: 1.1;
  font-weight: 900;
  letter-spacing: -0.04em;
}

.risk-badge {
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 900;
  border: 1px solid rgba(255, 255, 255, 0.66);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.risk-low {
  color: #2f6f5f;
  background: rgba(184, 224, 210, 0.48);
}

.risk-progress {
  margin-top: 16px;
  color: rgba(123, 175, 212, 0.85);
  background: rgba(255, 255, 255, 0.32);
}

.risk-description {
  margin-top: 12px;
  color: rgba(36, 59, 83, 0.70);
  font-size: 14px;
  line-height: 1.45;
  font-weight: 600;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 12px;
}

.metric-section {
  padding: 16px;
}

.metric-icon {
  width: 40px;
  height: 40px;
  border-radius: 16px;
  color: #5e9fca;
  background: rgba(255, 255, 255, 0.28);
  border: 1px solid rgba(255, 255, 255, 0.58);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.66);
  display: flex;
  align-items: center;
  justify-content: center;
}

.metric-value {
  margin-top: 12px;
  color: #20344b;
  font-size: 24px;
  line-height: 1;
  font-weight: 900;
  letter-spacing: -0.04em;
}

.metric-label {
  margin-top: 4px;
  color: rgba(36, 59, 83, 0.66);
  font-size: 13px;
  line-height: 1.2;
  font-weight: 700;
}

.status-card,
.alert-card {
  margin-top: 12px;
}

.status-section,
.alert-section {
  padding: 18px;
}

.section-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.section-header h2 {
  margin: 0;
  color: #20344b;
  font-size: 18px;
  line-height: 1.2;
  font-weight: 900;
  letter-spacing: -0.035em;
}

.section-header p {
  margin: 3px 0 0;
  color: rgba(36, 59, 83, 0.64);
  font-size: 13px;
  line-height: 1.35;
  font-weight: 600;
}

.status-pill {
  padding: 7px 10px;
  border-radius: 999px;
  color: #2f6f5f;
  background: rgba(184, 224, 210, 0.44);
  border: 1px solid rgba(255, 255, 255, 0.64);
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 900;
  flex-shrink: 0;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #2f9d75;
  box-shadow: 0 0 0 4px rgba(47, 157, 117, 0.12);
}

.ai-row {
  margin-top: 14px;
  padding: 12px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.26);
  border: 1px solid rgba(255, 255, 255, 0.56);
  display: flex;
  align-items: center;
  gap: 12px;
}

.ai-icon,
.alert-icon {
  width: 44px;
  height: 44px;
  border-radius: 17px;
  color: #5e9fca;
  background: rgba(255, 255, 255, 0.32);
  border: 1px solid rgba(255, 255, 255, 0.58);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.ai-row strong {
  display: block;
  color: #20344b;
  font-size: 14px;
  font-weight: 900;
}

.ai-row span {
  display: block;
  margin-top: 2px;
  color: rgba(36, 59, 83, 0.62);
  font-size: 12.5px;
  font-weight: 650;
}

.see-all-btn {
  color: #5e9fca;
  font-weight: 900;
}

.last-alert {
  margin-top: 14px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.alert-icon {
  color: #b8873d;
  background: rgba(246, 209, 134, 0.30);
}

.alert-content {
  flex: 1;
  min-width: 0;
}

.alert-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.alert-title-row strong {
  color: #20344b;
  font-size: 14px;
  font-weight: 900;
}

.alert-title-row span {
  color: rgba(36, 59, 83, 0.56);
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
}

.alert-content p {
  margin: 5px 0 0;
  color: rgba(36, 59, 83, 0.68);
  font-size: 13px;
  line-height: 1.4;
  font-weight: 600;
}

.alert-tags {
  margin-top: 9px;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tag {
  padding: 5px 8px;
  border-radius: 999px;
  color: rgba(36, 59, 83, 0.66);
  background: rgba(255, 255, 255, 0.32);
  border: 1px solid rgba(255, 255, 255, 0.58);
  font-size: 11.5px;
  font-weight: 850;
}

.tag.medium {
  color: #8a6429;
  background: rgba(246, 209, 134, 0.36);
}

.main-action-btn {
  margin-top: 14px;
  min-height: 52px;
  border-radius: 20px;
  color: #ffffff;
  font-size: 15px;
  font-weight: 900;
  background: rgba(123, 175, 212, 0.66);
  border: 1px solid rgba(255, 255, 255, 0.76);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.78),
    inset 0 -12px 24px rgba(36, 59, 83, 0.08),
    0 16px 34px rgba(84, 139, 178, 0.28);
  backdrop-filter: blur(20px) saturate(170%);
  -webkit-backdrop-filter: blur(20px) saturate(170%);
}

@media (max-width: 420px) {
  .dashboard-shell {
    padding: 18px 16px 24px;
  }

  .dashboard-hero h1 {
    font-size: 25px;
  }

  .hero-icon {
    width: 52px;
    height: 52px;
    border-radius: 20px;
  }

  .risk-title {
    font-size: 25px;
  }

  .metric-value {
    font-size: 22px;
  }
}
</style>
