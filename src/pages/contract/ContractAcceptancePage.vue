<template>
  <q-page class="contract-page">
    <div class="bg-orb orb-one"></div>
    <div class="bg-orb orb-two"></div>
    <div class="bg-orb orb-three"></div>

    <div class="contract-shell">
      <section class="contract-hero">
        <div class="logo-bubble">
          <q-icon name="gavel" size="28px" />
        </div>

        <h1>
          Termos de uso
        </h1>

        <p>
          Antes de acessar o Elo Seguro, leia e aceite os termos de responsabilidade.
        </p>
      </section>

      <q-card flat class="contract-card">
        <q-card-section class="card-section">
          <div class="glass-highlight"></div>

          <div class="card-title">
            Contrato e consentimento
          </div>

          <div class="card-subtitle">
            O uso do aplicativo depende da confirmação do responsável legal.
          </div>

          <div class="contract-scroll">
            <div class="contract-title">
              {{ contractTitle }}
            </div>

            <div class="contract-version">
              Versão {{ contractVersion }}
            </div>

            <div class="contract-text">
              {{ contractText }}
            </div>
          </div>

          <div class="checks-area">
            <q-checkbox
              v-model="legalResponsibleConfirmed"
              dense
              color="primary"
              class="contract-check"
              label="Confirmo que sou responsável legal pela criança/adolescente cadastrada."
            />

            <q-checkbox
              v-model="termsAccepted"
              dense
              color="primary"
              class="contract-check"
              label="Li e aceito os Termos de Uso."
            />

            <q-checkbox
              v-model="privacyPolicyAccepted"
              dense
              color="primary"
              class="contract-check"
              label="Li e aceito a Política de Privacidade."
            />

            <q-checkbox
              v-model="monitoringConsentAccepted"
              dense
              color="primary"
              class="contract-check"
              label="Autorizo o uso da IA para análise de sinais de risco digital."
            />
          </div>

          <div class="contract-note">
            <q-icon name="shield" size="19px" />

            <span>
              O Elo Seguro é uma ferramenta de apoio. Ele não substitui diálogo familiar,
              escola, autoridades competentes, conselho tutelar ou apoio profissional.
            </span>
          </div>

          <div class="actions-column">
            <q-btn
              icon-right="arrow_forward"
              label="Aceito e desejo continuar"
              unelevated
              no-caps
              class="accept-btn"
              :disable="!canAccept"
              @click="acceptContract"
            />

            <q-btn
              outline
              no-caps
              icon="close"
              label="Não aceito"
              class="refuse-btn"
              @click="refuseContract"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'stores/authStore.js'

const router = useRouter()
const authStore = useAuthStore()

const contractVersion = ref('v1.0.0')
const contractTitle = ref('Termos de Uso e Consentimento de Monitoramento Digital')

const contractText = ref(`
1. Finalidade da plataforma

O Elo Seguro é uma plataforma de apoio aos responsáveis legais para identificação de possíveis sinais de risco digital envolvendo crianças e adolescentes.

A ferramenta utiliza inteligência artificial para analisar sinais textuais e padrões de risco em ambientes digitais autorizados pelo responsável.


2. Consentimento do responsável

Ao aceitar este termo, o responsável declara que possui autorização legal para cadastrar e acompanhar a criança ou adolescente informado na plataforma.

O responsável também declara estar ciente de que o uso do sistema envolve dados sensíveis e exige cuidado, responsabilidade e finalidade exclusiva de proteção.


3. Uso de inteligência artificial

A inteligência artificial pode identificar possíveis conversas de risco, tentativas de manipulação, pedidos de segredo, insistência inadequada, tentativa de migração para outros aplicativos ou outros padrões suspeitos.

Os alertas gerados pela IA podem conter falsos positivos e devem ser analisados pelo responsável antes de qualquer decisão.


4. Limites da plataforma

O Elo Seguro não substitui o diálogo familiar, a escola, autoridades competentes, conselho tutelar, apoio psicológico, orientação jurídica ou qualquer medida oficial de proteção.

Em situações graves ou urgentes, o responsável deve buscar os canais adequados de ajuda e denúncia.


5. Tratamento de dados

Os dados analisados devem ser tratados com confidencialidade, segurança e finalidade de proteção.

O responsável se compromete a utilizar as informações acessadas apenas para cuidado, orientação e proteção da criança ou adolescente.


6. Aceite

Ao prosseguir, o responsável confirma que leu, compreendeu e aceita estes termos.
`)

const legalResponsibleConfirmed = ref(false)
const termsAccepted = ref(false)
const privacyPolicyAccepted = ref(false)
const monitoringConsentAccepted = ref(false)

const canAccept = computed(() => {
  return (
    legalResponsibleConfirmed.value &&
    termsAccepted.value &&
    privacyPolicyAccepted.value &&
    monitoringConsentAccepted.value
  )
})

function acceptContract() {
  authStore.acceptContract({
    contractVersion: contractVersion.value,
    contractTitle: contractTitle.value,
    contractContent: contractText.value,
    legalResponsibleConfirmed: legalResponsibleConfirmed.value,
    termsAccepted: termsAccepted.value,
    privacyPolicyAccepted: privacyPolicyAccepted.value,
    monitoringConsentAccepted: monitoringConsentAccepted.value,
    contractSigned: true
  })

  router.push({ name: 'dashboard' })
}

function refuseContract() {
  authStore.refuseContract()
  router.push({ name: 'contract-blocked' })
}
</script>

<style lang="scss" scoped>
.contract-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(circle at 18% 16%, rgba(168, 218, 220, 0.34), transparent 28%),
    radial-gradient(circle at 78% 22%, rgba(205, 180, 219, 0.28), transparent 30%),
    radial-gradient(circle at 50% 100%, rgba(123, 175, 212, 0.26), transparent 36%),
    linear-gradient(135deg, #dbeaf0 0%, #d7e1ea 42%, #e7e1ef 100%);
}

.contract-page::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(120deg, rgba(255, 255, 255, 0.30), transparent 42%),
    radial-gradient(circle at center, rgba(255, 255, 255, 0.18), transparent 54%);
  pointer-events: none;
  z-index: 0;
}

.contract-page::after {
  content: '';
  position: absolute;
  width: 520px;
  height: 520px;
  top: 50%;
  left: 50%;
  border-radius: 999px;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.10);
  filter: blur(18px);
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
  top: 11%;
  left: calc(50% - 260px);
  background: rgba(168, 218, 220, 0.42);
  box-shadow:
    0 35px 90px rgba(168, 218, 220, 0.32),
    inset 0 0 28px rgba(255, 255, 255, 0.16);
}

.orb-two {
  width: 128px;
  height: 128px;
  top: 27%;
  right: calc(50% - 235px);
  background: rgba(205, 180, 219, 0.36);
  box-shadow:
    0 35px 90px rgba(205, 180, 219, 0.28),
    inset 0 0 24px rgba(255, 255, 255, 0.16);
}

.orb-three {
  width: 92px;
  height: 92px;
  bottom: 20%;
  left: calc(50% - 210px);
  background: rgba(123, 175, 212, 0.30);
  box-shadow:
    0 28px 78px rgba(123, 175, 212, 0.26),
    inset 0 0 20px rgba(255, 255, 255, 0.14);
}

.contract-shell {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
  padding: 20px;
}

.contract-hero {
  text-align: center;
  margin-bottom: 14px;
}

.logo-bubble {
  position: relative;
  width: 58px;
  height: 58px;
  border-radius: 22px;
  margin: 0 auto;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.20);
  border: 1px solid rgba(255, 255, 255, 0.60);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.76),
    inset 0 -10px 20px rgba(123, 175, 212, 0.16),
    0 16px 30px rgba(36, 59, 83, 0.12);
  backdrop-filter: blur(22px) saturate(180%);
  -webkit-backdrop-filter: blur(22px) saturate(180%);
}

.logo-bubble::before {
  content: '';
  position: absolute;
  width: 26px;
  height: 8px;
  top: 9px;
  left: 15px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.42);
  filter: blur(2px);
}

.contract-hero h1 {
  margin: 10px 0 4px;
  font-size: 27px;
  line-height: 1.08;
  font-weight: 900;
  color: #20344b;
  letter-spacing: -0.045em;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.42);
}

.contract-hero p {
  margin: 0 auto;
  max-width: 390px;
  color: rgba(36, 59, 83, 0.72);
  font-size: 14px;
  line-height: 1.45;
  font-weight: 600;
}

.contract-card {
  position: relative;
  overflow: hidden;
  border-radius: 32px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0.34));
  border: 1px solid rgba(255, 255, 255, 0.70);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.90),
    inset 0 -1px 0 rgba(255, 255, 255, 0.24),
    0 24px 70px rgba(36, 59, 83, 0.17);
  backdrop-filter: blur(34px) saturate(170%);
  -webkit-backdrop-filter: blur(34px) saturate(170%);
}

.contract-card::before {
  content: '';
  position: absolute;
  inset: 1px;
  border-radius: inherit;
  background:
    radial-gradient(circle at 18% 0%, rgba(255, 255, 255, 0.72), transparent 34%),
    radial-gradient(circle at 90% 12%, rgba(255, 255, 255, 0.22), transparent 30%);
  pointer-events: none;
  opacity: 0.75;
}

.contract-card::after {
  content: '';
  position: absolute;
  left: 24px;
  right: 24px;
  top: 12px;
  height: 1px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.80);
  pointer-events: none;
}

.card-section {
  position: relative;
  z-index: 2;
  padding: 22px 20px 20px;
}

.glass-highlight {
  position: absolute;
  width: 180px;
  height: 40px;
  top: -18px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  filter: blur(12px);
  pointer-events: none;
}

.card-title {
  text-align: center;
  font-size: 21px;
  line-height: 1.2;
  font-weight: 900;
  color: #20344b;
  letter-spacing: -0.035em;
}

.card-subtitle {
  text-align: center;
  color: rgba(36, 59, 83, 0.68);
  font-size: 13.5px;
  line-height: 1.45;
  margin-top: 5px;
  margin-bottom: 16px;
  font-weight: 600;
}

.contract-scroll {
  height: 280px;
  overflow-y: auto;
  padding: 18px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.58);
  color: rgba(36, 59, 83, 0.82);
  border: 1px solid rgba(255, 255, 255, 0.72);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.70),
    inset 0 -8px 18px rgba(36, 59, 83, 0.02),
    0 8px 18px rgba(36, 59, 83, 0.04);
  backdrop-filter: blur(18px) saturate(150%);
  -webkit-backdrop-filter: blur(18px) saturate(150%);
}

.contract-scroll::-webkit-scrollbar {
  width: 5px;
}

.contract-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.contract-scroll::-webkit-scrollbar-thumb {
  background: rgba(123, 175, 212, 0.54);
  border-radius: 999px;
}

.contract-title {
  font-size: 16px;
  line-height: 1.35;
  font-weight: 900;
  color: #20344b;
  margin-bottom: 4px;
}

.contract-version {
  display: inline-flex;
  margin-bottom: 14px;
  padding: 4px 9px;
  border-radius: 999px;
  background: rgba(123, 175, 212, 0.16);
  color: rgba(36, 59, 83, 0.70);
  font-size: 12px;
  font-weight: 800;
}

.contract-text {
  white-space: pre-line;
  font-size: 14px;
  line-height: 1.68;
  font-weight: 500;
  color: rgba(36, 59, 83, 0.82);
}

.checks-area {
  margin-top: 14px;
  display: grid;
  gap: 8px;
}

.contract-check {
  padding: 9px 10px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.42);
  border: 1px solid rgba(255, 255, 255, 0.62);
  color: rgba(36, 59, 83, 0.78);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.52),
    0 6px 14px rgba(36, 59, 83, 0.03);
  backdrop-filter: blur(12px) saturate(145%);
  -webkit-backdrop-filter: blur(12px) saturate(145%);
}

.contract-note {
  margin-top: 12px;
  padding: 12px 13px;
  border-radius: 18px;
  background: rgba(123, 175, 212, 0.14);
  color: rgba(36, 59, 83, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.66);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.58),
    0 8px 18px rgba(36, 59, 83, 0.04);
  backdrop-filter: blur(14px) saturate(150%);
  -webkit-backdrop-filter: blur(14px) saturate(150%);
  display: flex;
  align-items: flex-start;
  gap: 9px;
  font-size: 13px;
  line-height: 1.42;
  font-weight: 650;
}

.contract-note .q-icon {
  color: #5e9fca;
  margin-top: 1px;
  flex-shrink: 0;
}

.actions-column {
  display: grid;
  gap: 10px;
  margin-top: 16px;
}

.accept-btn {
  min-height: 52px;
  border-radius: 18px;
  color: #ffffff;
  font-size: 15px;
  font-weight: 900;
  background: rgba(123, 175, 212, 0.70);
  border: 1px solid rgba(255, 255, 255, 0.76);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.78),
    inset 0 -12px 24px rgba(36, 59, 83, 0.08),
    0 16px 34px rgba(84, 139, 178, 0.28);
  backdrop-filter: blur(20px) saturate(170%);
  -webkit-backdrop-filter: blur(20px) saturate(170%);
}

.refuse-btn {
  min-height: 48px;
  border-radius: 18px;
  color: rgba(36, 59, 83, 0.66);
  font-size: 14px;
  font-weight: 850;
  background: rgba(255, 255, 255, 0.26);
  border: 1px solid rgba(255, 255, 255, 0.64);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.62),
    0 10px 22px rgba(36, 59, 83, 0.05);
  backdrop-filter: blur(18px) saturate(160%);
  -webkit-backdrop-filter: blur(18px) saturate(160%);
}

:deep(.q-checkbox__label) {
  font-size: 13px;
  line-height: 1.35;
  font-weight: 700;
}

:deep(.q-checkbox__inner) {
  font-size: 32px;
}

:deep(.q-checkbox__bg) {
  border-radius: 6px;
  border-color: rgba(123, 175, 212, 0.38);
  background: rgba(123, 175, 212, 0.38);
}

:deep(.q-btn.disabled),
:deep(.q-btn:disabled) {
  opacity: 0.48 !important;
}

@media (max-width: 540px) {
  .contract-shell {
    max-width: 100%;
    padding: 16px;
  }

  .contract-page {
    align-items: flex-start;
  }

  .contract-scroll {
    height: 300px;
  }

  .orb-one {
    left: -44px;
  }

  .orb-two {
    right: -32px;
  }

  .orb-three {
    left: -20px;
  }
}

@media (max-height: 760px) {
  .contract-shell {
    padding: 12px 16px;
  }

  .contract-hero {
    margin-bottom: 10px;
  }

  .logo-bubble {
    width: 50px;
    height: 50px;
    border-radius: 20px;
  }

  .contract-hero h1 {
    font-size: 24px;
    margin-top: 8px;
  }

  .contract-hero p {
    font-size: 13px;
    max-width: 350px;
  }

  .card-section {
    padding: 18px 16px 16px;
  }

  .contract-scroll {
    height: 230px;
  }

  .contract-text {
    font-size: 13.5px;
    line-height: 1.6;
  }

  .contract-check {
    padding: 7px 9px;
  }

  .accept-btn {
    min-height: 50px;
  }

  .refuse-btn {
    min-height: 46px;
  }
}
</style>
