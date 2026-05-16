<template>
  <q-page class="alerts-page">
    <div class="bg-orb orb-one"></div>
    <div class="bg-orb orb-two"></div>
    <div class="bg-orb orb-three"></div>
    <div class="bg-orb orb-four"></div>

    <div class="alerts-shell">
      <section class="alerts-hero">
        <div>
          <div class="eyebrow">
            Monitoramento
          </div>

          <h1>
            Alertas de risco
          </h1>

          <p>
            Conversas e sinais que precisam da atenção do responsável.
          </p>
        </div>

        <div class="hero-icon">
          <q-icon name="warning_amber" size="28px" />
        </div>
      </section>

      <q-card flat class="summary-card">
        <q-card-section class="summary-section">
          <div class="glass-highlight"></div>

          <div class="summary-top">
            <div>
              <div class="summary-label">
                Alertas recentes
              </div>

              <div class="summary-title">
                {{ alerts.length }} registros
              </div>
            </div>

            <div class="summary-badge">
              {{ pendingCount }} pendentes
            </div>
          </div>

          <p>
            {{ summaryMessage }}
          </p>
        </q-card-section>
      </q-card>

      <div class="filter-card">
        <q-btn
          v-for="option in filterOptions"
          :key="option.value"
          flat
          dense
          no-caps
          class="filter-btn"
          :class="{ active: selectedFilter === option.value }"
          @click="selectedFilter = option.value"
        >
          {{ option.label }}
        </q-btn>
      </div>

      <div class="alerts-list">
        <q-card
          v-for="alert in filteredAlerts"
          :key="alert.id"
          flat
          class="alert-card"
          @click="openAlert(alert)"
        >
          <q-card-section class="alert-section">
            <div class="alert-top">
              <div
                class="alert-icon"
                :class="alert.risk"
              >
                <q-icon :name="getRiskIcon(alert.risk)" size="24px" />
              </div>

              <div class="alert-main">
                <div class="alert-title-row">
                  <div>
                    <strong>{{ alert.platform }}</strong>
                    <span>{{ alert.child }}</span>
                  </div>

                  <div
                    class="risk-pill"
                    :class="alert.risk"
                  >
                    {{ getRiskLabel(alert.risk) }}
                  </div>
                </div>

                <p>
                  {{ alert.summary }}
                </p>
              </div>
            </div>

            <div class="alert-meta">
              <div>
                <q-icon name="schedule" size="16px" />
                {{ alert.date }}
              </div>

              <div>
                <q-icon name="psychology" size="16px" />
                Confiança {{ alert.confidence }}%
              </div>
            </div>

            <div class="alert-reason">
              <q-icon name="info" size="18px" />

              <span>
                {{ alert.reason }}
              </span>
            </div>

            <div class="alert-footer">
              <div class="status-chip" :class="alert.status">
                {{ getStatusLabel(alert.status) }}
              </div>

              <q-btn
                flat
                dense
                no-caps
                icon-right="arrow_forward"
                label="Ver detalhes"
                class="details-btn"
                @click.stop="openAlert(alert)"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div
        v-if="filteredAlerts.length === 0"
        class="empty-state"
      >
        <q-icon name="shield" size="42px" />

        <strong>Nenhum alerta encontrado</strong>

        <span>
          Não há registros para o filtro selecionado.
        </span>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const selectedFilter = ref('todos')

const filterOptions = [
  {
    label: 'Todos',
    value: 'todos'
  },
  {
    label: 'Alto',
    value: 'alto'
  },
  {
    label: 'Médio',
    value: 'medio'
  },
  {
    label: 'Baixo',
    value: 'baixo'
  },
  {
    label: 'Pendentes',
    value: 'pendente'
  }
]

const alerts = [
  {
    id: 1,
    child: 'Ana Clara',
    platform: 'Instagram',
    date: 'Hoje, 14:30',
    risk: 'medio',
    status: 'pendente',
    confidence: 84,
    reason: 'Possível tentativa de migrar a conversa para outro aplicativo.',
    summary: 'A IA identificou insistência e tentativa de levar a conversa para outro ambiente digital.'
  },
  {
    id: 2,
    child: 'Lucas',
    platform: 'Discord',
    date: 'Ontem, 21:14',
    risk: 'alto',
    status: 'pendente',
    confidence: 91,
    reason: 'Pedido para manter conversa em segredo.',
    summary: 'Foram detectados sinais de manipulação emocional e pedido de sigilo.'
  },
  {
    id: 3,
    child: 'Ana Clara',
    platform: 'WhatsApp Web',
    date: 'Ontem, 18:02',
    risk: 'baixo',
    status: 'analisado',
    confidence: 62,
    reason: 'Linguagem incomum, mas sem elementos críticos.',
    summary: 'A conversa foi sinalizada por mudança de padrão, mas não apresentou risco alto.'
  },
  {
    id: 4,
    child: 'Lucas',
    platform: 'Navegador',
    date: 'Segunda, 16:48',
    risk: 'medio',
    status: 'analisado',
    confidence: 77,
    reason: 'Contato desconhecido com abordagem insistente.',
    summary: 'A IA detectou repetição de mensagens e tentativa de aproximação constante.'
  }
]

const filteredAlerts = computed(() => {
  if (selectedFilter.value === 'todos') {
    return alerts
  }

  if (selectedFilter.value === 'pendente') {
    return alerts.filter((alert) => alert.status === 'pendente')
  }

  return alerts.filter((alert) => alert.risk === selectedFilter.value)
})

const pendingCount = computed(() => {
  return alerts.filter((alert) => alert.status === 'pendente').length
})

const summaryMessage = computed(() => {
  if (pendingCount.value > 0) {
    return `${pendingCount.value} alerta(s) ainda precisam de análise do responsável.`
  }

  return 'Todos os alertas recentes já foram analisados.'
})

function getRiskLabel(risk) {
  const labels = {
    baixo: 'Baixo',
    medio: 'Médio',
    alto: 'Alto'
  }

  return labels[risk] || 'Indefinido'
}

function getRiskIcon(risk) {
  const icons = {
    baixo: 'shield',
    medio: 'warning_amber',
    alto: 'priority_high'
  }

  return icons[risk] || 'info'
}

function getStatusLabel(status) {
  const labels = {
    pendente: 'Pendente',
    analisado: 'Analisado'
  }

  return labels[status] || 'Indefinido'
}

function openAlert(alert) {
  router.push({
    name: 'alert-details',
    params: {
      id: alert.id
    }
  })
}
</script>

<style lang="scss" scoped>
.alerts-page {
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

.alerts-page::before {
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

.alerts-shell {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
  padding: 20px 18px 24px;
}

.alerts-hero {
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

.alerts-hero h1 {
  margin: 3px 0 4px;
  color: #20344b;
  font-size: 28px;
  line-height: 1.08;
  font-weight: 900;
  letter-spacing: -0.05em;
}

.alerts-hero p {
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
.alert-card,
.filter-card,
.empty-state {
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
.alert-card::before,
.filter-card::before,
.empty-state::before {
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
.alert-section {
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
  color: #8a6429;
  background: rgba(246, 209, 134, 0.42);
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

.filter-card {
  margin-top: 12px;
  padding: 8px;
  display: flex;
  gap: 6px;
  overflow-x: auto;
}

.filter-card::-webkit-scrollbar {
  display: none;
}

.filter-btn {
  position: relative;
  z-index: 2;
  flex-shrink: 0;
  min-height: 38px;
  padding: 0 13px;
  border-radius: 999px;
  color: rgba(36, 59, 83, 0.62);
  font-size: 13px;
  font-weight: 850;
}

.filter-btn.active {
  color: #5e9fca;
  background: rgba(255, 255, 255, 0.42);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.64),
    0 8px 18px rgba(36, 59, 83, 0.05);
}

.alerts-list {
  display: grid;
  gap: 12px;
  margin-top: 12px;
}

.alert-card {
  cursor: pointer;
}

.alert-section {
  padding: 16px;
}

.alert-top {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.alert-icon {
  width: 46px;
  height: 46px;
  border-radius: 18px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.62);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.62);
}

.alert-icon.baixo {
  color: #2f6f5f;
  background: rgba(184, 224, 210, 0.38);
}

.alert-icon.medio {
  color: #8a6429;
  background: rgba(246, 209, 134, 0.38);
}

.alert-icon.alto {
  color: #8c3d44;
  background: rgba(229, 152, 155, 0.34);
}

.alert-main {
  flex: 1;
  min-width: 0;
}

.alert-title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
}

.alert-title-row strong {
  display: block;
  color: #20344b;
  font-size: 15px;
  font-weight: 900;
  line-height: 1.1;
}

.alert-title-row span {
  display: block;
  margin-top: 3px;
  color: rgba(36, 59, 83, 0.58);
  font-size: 12.5px;
  font-weight: 700;
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

.alert-main p {
  margin: 8px 0 0;
  color: rgba(36, 59, 83, 0.70);
  font-size: 13px;
  line-height: 1.42;
  font-weight: 600;
}

.alert-meta {
  margin-top: 13px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.alert-meta div {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 9px;
  border-radius: 999px;
  color: rgba(36, 59, 83, 0.62);
  background: rgba(255, 255, 255, 0.30);
  border: 1px solid rgba(255, 255, 255, 0.54);
  font-size: 12px;
  font-weight: 800;
}

.alert-reason {
  margin-top: 10px;
  padding: 10px 11px;
  border-radius: 18px;
  color: rgba(36, 59, 83, 0.70);
  background: rgba(255, 255, 255, 0.28);
  border: 1px solid rgba(255, 255, 255, 0.54);
  display: flex;
  gap: 8px;
  align-items: flex-start;
  font-size: 12.5px;
  line-height: 1.35;
  font-weight: 650;
}

.alert-reason .q-icon {
  color: #5e9fca;
  flex-shrink: 0;
  margin-top: 1px;
}

.alert-footer {
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.status-chip {
  padding: 6px 9px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 900;
  border: 1px solid rgba(255, 255, 255, 0.58);
}

.status-chip.pendente {
  color: #8a6429;
  background: rgba(246, 209, 134, 0.38);
}

.status-chip.analisado {
  color: #2f6f5f;
  background: rgba(184, 224, 210, 0.38);
}

.details-btn {
  color: #5e9fca;
  font-weight: 900;
}

.empty-state {
  margin-top: 12px;
  padding: 28px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.empty-state .q-icon,
.empty-state strong,
.empty-state span {
  position: relative;
  z-index: 2;
}

.empty-state .q-icon {
  color: #5e9fca;
}

.empty-state strong {
  margin-top: 10px;
  color: #20344b;
  font-size: 16px;
  font-weight: 900;
}

.empty-state span {
  margin-top: 4px;
  color: rgba(36, 59, 83, 0.62);
  font-size: 13px;
  font-weight: 650;
}

@media (max-width: 420px) {
  .alerts-shell {
    padding: 18px 16px 24px;
  }

  .alerts-hero h1 {
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

  .alert-title-row {
    flex-direction: column;
    gap: 7px;
  }

  .risk-pill {
    align-self: flex-start;
  }
}
</style>
