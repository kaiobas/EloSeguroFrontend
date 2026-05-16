<template>
  <q-page class="children-page">
    <div class="bg-orb orb-one"></div>
    <div class="bg-orb orb-two"></div>
    <div class="bg-orb orb-three"></div>
    <div class="bg-orb orb-four"></div>

    <div class="children-shell">
      <section class="children-hero">
        <div>
          <div class="eyebrow">
            Perfis protegidos
          </div>

          <h1>
            Crianças
          </h1>

          <p>
            Acompanhe os perfis cadastrados e o nível de proteção de cada criança.
          </p>
        </div>

        <div class="hero-icon">
          <q-icon name="family_restroom" size="28px" />
        </div>
      </section>

      <q-card flat class="summary-card">
        <q-card-section class="summary-section">
          <div class="glass-highlight"></div>

          <div class="summary-top">
            <div>
              <div class="summary-label">
                Perfis cadastrados
              </div>

              <div class="summary-title">
                {{ children.length }} crianças
              </div>
            </div>

            <div class="summary-badge">
              {{ activeMonitoringCount }} ativos
            </div>
          </div>

          <p>
            {{ summaryMessage }}
          </p>
        </q-card-section>
      </q-card>

      <div class="children-list">
        <q-card
          v-for="child in children"
          :key="child.id"
          flat
          class="child-card"
        >
          <q-card-section class="child-section">
            <div class="child-top">
              <div class="child-avatar">
                {{ getInitials(child.name) }}
              </div>

              <div class="child-main">
                <div class="child-title-row">
                  <div>
                    <strong>{{ child.name }}</strong>
                    <span>{{ child.age }} anos</span>
                  </div>

                  <div
                    class="risk-pill"
                    :class="child.risk"
                  >
                    {{ getRiskLabel(child.risk) }}
                  </div>
                </div>

                <p>
                  {{ child.description }}
                </p>
              </div>
            </div>

            <div class="child-details">
              <div class="detail-item">
                <q-icon name="devices" size="18px" />
                <div>
                  <strong>{{ child.devices.length }}</strong>
                  <span>aparelhos</span>
                </div>
              </div>

              <div class="detail-item">
                <q-icon name="notifications_active" size="18px" />
                <div>
                  <strong>{{ child.alerts }}</strong>
                  <span>alertas</span>
                </div>
              </div>

              <div class="detail-item">
                <q-icon name="verified_user" size="18px" />
                <div>
                  <strong>{{ child.protectionLevel }}</strong>
                  <span>proteção</span>
                </div>
              </div>
            </div>

            <div class="platforms-area">
              <span
                v-for="platform in child.platforms"
                :key="platform"
                class="platform-chip"
              >
                {{ platform }}
              </span>
            </div>

            <div class="child-footer">
              <div class="monitoring-status" :class="child.status">
                <span class="status-dot"></span>
                {{ getStatusLabel(child.status) }}
              </div>

              <q-btn
                flat
                dense
                no-caps
                icon-right="arrow_forward"
                label="Ver perfil"
                class="details-btn"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <q-btn
        label="Adicionar novo perfil"
        icon="add"
        unelevated
        no-caps
        class="full-width main-action-btn"
      />
    </div>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'

const children = [
  {
    id: 1,
    name: 'Ana Clara',
    age: 13,
    risk: 'baixo',
    status: 'ativo',
    protectionLevel: 'Alta',
    alerts: 1,
    devices: ['Notebook', 'Celular'],
    platforms: ['Instagram', 'WhatsApp Web', 'Navegador'],
    description: 'Monitoramento ativo e sem ocorrências críticas nas últimas 24 horas.'
  },
  {
    id: 2,
    name: 'Lucas',
    age: 10,
    risk: 'medio',
    status: 'ativo',
    protectionLevel: 'Alta',
    alerts: 2,
    devices: ['Tablet'],
    platforms: ['Discord', 'Navegador', 'YouTube'],
    description: 'Possui alertas recentes que ainda precisam de revisão do responsável.'
  },
  {
    id: 3,
    name: 'Marina',
    age: 15,
    risk: 'baixo',
    status: 'pausado',
    protectionLevel: 'Média',
    alerts: 0,
    devices: ['Celular'],
    platforms: ['Instagram', 'TikTok'],
    description: 'Monitoramento pausado temporariamente pelo responsável.'
  }
]

const activeMonitoringCount = computed(() => {
  return children.filter((child) => child.status === 'ativo').length
})

const summaryMessage = computed(() => {
  return `${activeMonitoringCount.value} perfis estão com monitoramento ativo no momento.`
})

function getInitials(name) {
  const parts = name.trim().split(' ').filter(Boolean)

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

function getRiskLabel(risk) {
  const labels = {
    baixo: 'Risco baixo',
    medio: 'Risco médio',
    alto: 'Risco alto'
  }

  return labels[risk] || 'Indefinido'
}

function getStatusLabel(status) {
  const labels = {
    ativo: 'Monitoramento ativo',
    pausado: 'Monitoramento pausado'
  }

  return labels[status] || 'Indefinido'
}
</script>

<style lang="scss" scoped>
.children-page {
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

.children-page::before {
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

.children-shell {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
  padding: 20px 18px 24px;
}

.children-hero {
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

.children-hero h1 {
  margin: 3px 0 4px;
  color: #20344b;
  font-size: 28px;
  line-height: 1.08;
  font-weight: 900;
  letter-spacing: -0.05em;
}

.children-hero p {
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

.summary-card,
.child-card {
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

.summary-card::before,
.child-card::before {
  content: '';
  position: absolute;
  inset: 1px;
  border-radius: inherit;
  background:
    radial-gradient(circle at 18% 0%, rgba(255, 255, 255, 0.68), transparent 34%),
    radial-gradient(circle at 90% 12%, rgba(255, 255, 255, 0.20), transparent 30%);
  pointer-events: none;
}

.summary-section,
.child-section {
  position: relative;
  z-index: 2;
}

.summary-section {
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

.summary-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
}

.summary-label {
  color: rgba(36, 59, 83, 0.62);
  font-size: 13px;
  font-weight: 800;
}

.summary-title {
  margin-top: 2px;
  color: #20344b;
  font-size: 26px;
  line-height: 1.1;
  font-weight: 900;
  letter-spacing: -0.04em;
}

.summary-badge {
  padding: 8px 12px;
  border-radius: 999px;
  color: #2f6f5f;
  background: rgba(184, 224, 210, 0.42);
  border: 1px solid rgba(255, 255, 255, 0.66);
  font-size: 12px;
  font-weight: 900;
  flex-shrink: 0;
}

.summary-section p {
  margin: 12px 0 0;
  color: rgba(36, 59, 83, 0.70);
  font-size: 14px;
  line-height: 1.45;
  font-weight: 600;
}

.children-list {
  display: grid;
  gap: 12px;
  margin-top: 12px;
}

.child-section {
  padding: 16px;
}

.child-top {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.child-avatar {
  width: 50px;
  height: 50px;
  border-radius: 19px;
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

.child-main {
  flex: 1;
  min-width: 0;
}

.child-title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
}

.child-title-row strong {
  display: block;
  color: #20344b;
  font-size: 16px;
  line-height: 1.1;
  font-weight: 900;
}

.child-title-row span {
  display: block;
  margin-top: 3px;
  color: rgba(36, 59, 83, 0.58);
  font-size: 12.5px;
  font-weight: 700;
}

.child-main p {
  margin: 8px 0 0;
  color: rgba(36, 59, 83, 0.70);
  font-size: 13px;
  line-height: 1.42;
  font-weight: 600;
}

.risk-pill {
  flex-shrink: 0;
  padding: 6px 9px;
  border-radius: 999px;
  font-size: 11.5px;
  font-weight: 900;
  border: 1px solid rgba(255, 255, 255, 0.60);
}

.risk-pill.baixo {
  color: #2f6f5f;
  background: rgba(184, 224, 210, 0.40);
}

.risk-pill.medio {
  color: #8a6429;
  background: rgba(246, 209, 134, 0.40);
}

.risk-pill.alto {
  color: #8c3d44;
  background: rgba(229, 152, 155, 0.36);
}

.child-details {
  margin-top: 13px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.detail-item {
  padding: 10px 8px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.28);
  border: 1px solid rgba(255, 255, 255, 0.54);
  display: flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
}

.detail-item .q-icon {
  color: #5e9fca;
  flex-shrink: 0;
}

.detail-item strong {
  display: block;
  color: #20344b;
  font-size: 13px;
  line-height: 1.1;
  font-weight: 900;
}

.detail-item span {
  display: block;
  color: rgba(36, 59, 83, 0.58);
  font-size: 11px;
  line-height: 1.1;
  font-weight: 700;
}

.platforms-area {
  margin-top: 12px;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.platform-chip {
  padding: 6px 9px;
  border-radius: 999px;
  color: rgba(36, 59, 83, 0.66);
  background: rgba(255, 255, 255, 0.32);
  border: 1px solid rgba(255, 255, 255, 0.58);
  font-size: 11.5px;
  font-weight: 850;
}

.child-footer {
  margin-top: 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.monitoring-status {
  padding: 7px 10px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  font-weight: 900;
  border: 1px solid rgba(255, 255, 255, 0.58);
}

.monitoring-status.ativo {
  color: #2f6f5f;
  background: rgba(184, 224, 210, 0.38);
}

.monitoring-status.pausado {
  color: #8a6429;
  background: rgba(246, 209, 134, 0.38);
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.28);
}

.details-btn {
  color: #5e9fca;
  font-weight: 900;
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
  .children-shell {
    padding: 18px 16px 24px;
  }

  .children-hero h1 {
    font-size: 25px;
  }

  .hero-icon {
    width: 52px;
    height: 52px;
    border-radius: 20px;
  }

  .summary-title {
    font-size: 24px;
  }

  .child-title-row {
    flex-direction: column;
    gap: 7px;
  }

  .risk-pill {
    align-self: flex-start;
  }

  .child-details {
    grid-template-columns: 1fr;
  }
}
</style>
