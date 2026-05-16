<template>
  <q-page class="devices-page">
    <div class="bg-orb orb-one"></div>
    <div class="bg-orb orb-two"></div>
    <div class="bg-orb orb-three"></div>
    <div class="bg-orb orb-four"></div>

    <div class="devices-shell">
      <section class="devices-hero">
        <div>
          <div class="eyebrow">
            Aparelhos monitorados
          </div>

          <h1>
            Dispositivos
          </h1>

          <p>
            Veja os aparelhos conectados ao monitoramento de segurança digital.
          </p>
        </div>

        <div class="hero-icon">
          <q-icon name="devices" size="28px" />
        </div>
      </section>

      <q-card flat class="summary-card">
        <q-card-section class="summary-section">
          <div class="glass-highlight"></div>

          <div class="summary-top">
            <div>
              <div class="summary-label">
                Dispositivos conectados
              </div>

              <div class="summary-title">
                {{ devices.length }} aparelhos
              </div>
            </div>

            <div class="summary-badge">
              {{ onlineCount }} online
            </div>
          </div>

          <p>
            {{ summaryMessage }}
          </p>
        </q-card-section>
      </q-card>

      <div class="devices-list">
        <q-card
          v-for="device in devices"
          :key="device.id"
          flat
          class="device-card"
        >
          <q-card-section class="device-section">
            <div class="device-top">
              <div
                class="device-icon"
                :class="device.status"
              >
                <q-icon :name="getDeviceIcon(device.type)" size="25px" />
              </div>

              <div class="device-main">
                <div class="device-title-row">
                  <div>
                    <strong>{{ device.name }}</strong>
                    <span>{{ device.owner }}</span>
                  </div>

                  <div
                    class="status-pill"
                    :class="device.status"
                  >
                    <span class="status-dot"></span>
                    {{ getStatusLabel(device.status) }}
                  </div>
                </div>

                <p>
                  {{ device.description }}
                </p>
              </div>
            </div>

            <div class="device-details">
              <div class="detail-item">
                <q-icon name="sync" size="18px" />

                <div>
                  <strong>{{ device.lastSync }}</strong>
                  <span>última sync</span>
                </div>
              </div>

              <div class="detail-item">
                <q-icon name="memory" size="18px" />

                <div>
                  <strong>{{ device.agentVersion }}</strong>
                  <span>versão</span>
                </div>
              </div>

              <div class="detail-item">
                <q-icon name="verified_user" size="18px" />

                <div>
                  <strong>{{ device.protectionStatus }}</strong>
                  <span>proteção</span>
                </div>
              </div>
            </div>

            <div class="permissions-area">
              <div class="permissions-title">
                Permissões ativas
              </div>

              <div class="permissions-list">
                <span
                  v-for="permission in device.permissions"
                  :key="permission"
                  class="permission-chip"
                >
                  <q-icon name="check_circle" size="14px" />
                  {{ permission }}
                </span>
              </div>
            </div>

            <div class="device-footer">
              <div class="device-type">
                <q-icon :name="getDeviceIcon(device.type)" size="16px" />
                {{ getDeviceTypeLabel(device.type) }}
              </div>

              <q-btn
                flat
                dense
                no-caps
                icon-right="arrow_forward"
                label="Detalhes"
                class="details-btn"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <q-btn
        label="Vincular novo dispositivo"
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

const devices = [
  {
    id: 1,
    name: 'Notebook da Ana',
    owner: 'Ana Clara',
    type: 'notebook',
    status: 'online',
    lastSync: 'há 5 min',
    agentVersion: '1.0.2',
    protectionStatus: 'Ativa',
    description: 'Monitoramento em tempo real ativo para conversas e navegador.',
    permissions: [
      'Análise de texto',
      'Alertas em tempo real',
      'Navegador'
    ]
  },
  {
    id: 2,
    name: 'Celular da Ana',
    owner: 'Ana Clara',
    type: 'phone',
    status: 'online',
    lastSync: 'há 12 min',
    agentVersion: '1.0.1',
    protectionStatus: 'Ativa',
    description: 'Dispositivo conectado e sincronizando alertas normalmente.',
    permissions: [
      'Notificações',
      'Análise de texto',
      'Evidências'
    ]
  },
  {
    id: 3,
    name: 'Tablet do Lucas',
    owner: 'Lucas',
    type: 'tablet',
    status: 'offline',
    lastSync: 'ontem',
    agentVersion: '0.9.8',
    protectionStatus: 'Atenção',
    description: 'O aparelho está offline. A última análise foi feita ontem.',
    permissions: [
      'Análise de texto',
      'Navegador'
    ]
  }
]

const onlineCount = computed(() => {
  return devices.filter((device) => device.status === 'online').length
})

const summaryMessage = computed(() => {
  if (onlineCount.value === devices.length) {
    return 'Todos os dispositivos estão conectados e protegidos.'
  }

  return `${onlineCount.value} de ${devices.length} dispositivos estão online no momento.`
})

function getDeviceIcon(type) {
  const icons = {
    notebook: 'laptop_mac',
    phone: 'smartphone',
    tablet: 'tablet_mac',
    browser: 'language'
  }

  return icons[type] || 'devices'
}

function getDeviceTypeLabel(type) {
  const labels = {
    notebook: 'Notebook',
    phone: 'Celular',
    tablet: 'Tablet',
    browser: 'Navegador'
  }

  return labels[type] || 'Dispositivo'
}

function getStatusLabel(status) {
  const labels = {
    online: 'Online',
    offline: 'Offline'
  }

  return labels[status] || 'Indefinido'
}
</script>

<style lang="scss" scoped>
.devices-page {
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

.devices-page::before {
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

.devices-shell {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
  padding: 20px 18px 24px;
}

.devices-hero {
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

.devices-hero h1 {
  margin: 3px 0 4px;
  color: #20344b;
  font-size: 28px;
  line-height: 1.08;
  font-weight: 900;
  letter-spacing: -0.05em;
}

.devices-hero p {
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
.device-card {
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
.device-card::before {
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
.device-section {
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

.devices-list {
  display: grid;
  gap: 12px;
  margin-top: 12px;
}

.device-section {
  padding: 16px;
}

.device-top {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.device-icon {
  width: 50px;
  height: 50px;
  border-radius: 19px;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.68);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.68),
    0 10px 22px rgba(36, 59, 83, 0.08);
  backdrop-filter: blur(18px) saturate(160%);
  -webkit-backdrop-filter: blur(18px) saturate(160%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.device-icon.online {
  color: #2f6f5f;
  background: rgba(184, 224, 210, 0.42);
}

.device-icon.offline {
  color: #8a6429;
  background: rgba(246, 209, 134, 0.40);
}

.device-main {
  flex: 1;
  min-width: 0;
}

.device-title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
}

.device-title-row strong {
  display: block;
  color: #20344b;
  font-size: 16px;
  line-height: 1.1;
  font-weight: 900;
}

.device-title-row span {
  display: block;
  margin-top: 3px;
  color: rgba(36, 59, 83, 0.58);
  font-size: 12.5px;
  font-weight: 700;
}

.device-main p {
  margin: 8px 0 0;
  color: rgba(36, 59, 83, 0.70);
  font-size: 13px;
  line-height: 1.42;
  font-weight: 600;
}

.status-pill {
  flex-shrink: 0;
  padding: 7px 10px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  font-weight: 900;
  border: 1px solid rgba(255, 255, 255, 0.58);
}

.status-pill.online {
  color: #2f6f5f;
  background: rgba(184, 224, 210, 0.38);
}

.status-pill.offline {
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

.device-details {
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

.permissions-area {
  margin-top: 13px;
}

.permissions-title {
  color: rgba(36, 59, 83, 0.64);
  font-size: 12px;
  font-weight: 900;
  margin-bottom: 7px;
}

.permissions-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.permission-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 9px;
  border-radius: 999px;
  color: rgba(36, 59, 83, 0.66);
  background: rgba(255, 255, 255, 0.32);
  border: 1px solid rgba(255, 255, 255, 0.58);
  font-size: 11.5px;
  font-weight: 850;
}

.permission-chip .q-icon {
  color: #2f9d75;
}

.device-footer {
  margin-top: 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.device-type {
  padding: 7px 10px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  font-weight: 900;
  color: rgba(36, 59, 83, 0.66);
  background: rgba(255, 255, 255, 0.30);
  border: 1px solid rgba(255, 255, 255, 0.58);
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
  .devices-shell {
    padding: 18px 16px 24px;
  }

  .devices-hero h1 {
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

  .device-title-row {
    flex-direction: column;
    gap: 7px;
  }

  .status-pill {
    align-self: flex-start;
  }

  .device-details {
    grid-template-columns: 1fr;
  }
}
</style>
