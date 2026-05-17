<template>
  <q-page class="register-page">
    <div class="bg-orb orb-one"></div>
    <div class="bg-orb orb-two"></div>
    <div class="bg-orb orb-three"></div>
    <div class="bg-orb orb-four"></div>

    <div class="register-shell">
      <section class="register-hero">
        <div class="logo-bubble">
          <q-icon :name="currentStep.icon" size="28px" />
        </div>

        <h1>
          {{ currentStep.title }}
        </h1>

        <p>
          {{ currentStep.subtitle }}
        </p>
      </section>

      <q-card flat class="register-card">
        <q-card-section class="card-section">
          <div class="glass-highlight"></div>

          <div class="step-header">
            <div
              v-for="item in steps"
              :key="item.number"
              class="step-pill"
              :class="{
                active: step === item.number,
                done: step > item.number
              }"
            >
              <div class="step-dot">
                <q-icon
                  v-if="step > item.number"
                  name="check"
                  size="15px"
                />

                <span v-else>
                  {{ item.number }}
                </span>
              </div>

              <div class="step-text">
                <strong>{{ item.shortLabel }}</strong>
                <small>{{ item.helper }}</small>
              </div>
            </div>
          </div>

          <div class="form-area">
            <template v-if="step === 1">
              <q-input
                v-model="form.name"
                label="Nome completo"
                outlined
                dense
                class="glass-input"
                color="primary"
              >
                <template #prepend>
                  <q-icon name="person_outline" class="input-icon" />
                </template>
              </q-input>

              <q-input
                v-model="form.phone"
                label="Telefone"
                outlined
                dense
                class="glass-input q-mt-sm"
                color="primary"
              >
                <template #prepend>
                  <q-icon name="phone_iphone" class="input-icon" />
                </template>
              </q-input>

              <div class="row q-col-gutter-sm q-mt-sm">
                <div class="col-5">
                  <q-select
                    v-model="form.documentType"
                    :options="documentTypes"
                    label="Tipo"
                    outlined
                    dense
                    emit-value
                    map-options
                    class="glass-input"
                    color="primary"
                  />
                </div>

                <div class="col-7">
                  <q-input
                    v-model="form.documentNumber"
                    label="Documento"
                    outlined
                    dense
                    class="glass-input"
                    color="primary"
                  />
                </div>
              </div>
            </template>

            <template v-if="step === 2">
              <q-input
                v-model="form.email"
                label="E-mail"
                type="email"
                outlined
                dense
                class="glass-input"
                color="primary"
              >
                <template #prepend>
                  <q-icon name="mail_outline" class="input-icon" />
                </template>
              </q-input>

              <q-input
                v-model="form.password"
                label="Senha"
                :type="showPassword ? 'text' : 'password'"
                outlined
                dense
                class="glass-input q-mt-sm"
                color="primary"
              >
                <template #prepend>
                  <q-icon name="lock_outline" class="input-icon" />
                </template>

                <template #append>
                  <q-icon
                    :name="showPassword ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer input-icon-muted"
                    @click="showPassword = !showPassword"
                  />
                </template>
              </q-input>

              <div class="step-note">
                <q-icon name="verified_user" size="18px" />
                <span>
                  Esses dados serão usados para acessar a conta do responsável.
                </span>
              </div>
            </template>

            <template v-if="step === 3">
              <q-input
                v-model="form.securityPhrase"
                label="Frase de segurança"
                :type="showSecurityPhrase ? 'text' : 'password'"
                outlined
                dense
                class="glass-input"
                color="primary"
              >
                <template #prepend>
                  <q-icon name="key" class="input-icon" />
                </template>

                <template #append>
                  <q-icon
                    :name="showSecurityPhrase ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer input-icon-muted"
                    @click="showSecurityPhrase = !showSecurityPhrase"
                  />
                </template>
              </q-input>

              <q-input
                v-model="confirmSecurityPhrase"
                label="Confirmar frase"
                :type="showSecurityPhrase ? 'text' : 'password'"
                outlined
                dense
                class="glass-input q-mt-sm"
                color="primary"
              >
                <template #prepend>
                  <q-icon name="shield" class="input-icon" />
                </template>
              </q-input>

              <div class="step-note">
                <q-icon name="privacy_tip" size="18px" />
                <span>
                  Essa frase será solicitada depois do e-mail e senha.
                </span>
              </div>

              <div
                v-if="securityPhraseError"
                class="error-box"
              >
                <q-icon name="error_outline" size="18px" />
                <span>{{ securityPhraseError }}</span>
              </div>
            </template>
          </div>

          <div class="actions-row">
            <q-btn
              outline
              no-caps
              icon="arrow_back"
              label="Voltar"
              class="step-nav-btn back-step-btn"
              :disable="step === 1"
              @click="step--"
            />

            <q-btn
              v-if="step < 3"
              icon-right="arrow_forward"
              label="Continuar"
              unelevated
              no-caps
              class="step-nav-btn continue-btn"
              :disable="!canGoNext"
              @click="step++"
            />

            <q-btn
              v-else
              icon-right="check"
              label="Finalizar"
              unelevated
              no-caps
              class="step-nav-btn continue-btn"
              :disable="!canFinishRegister"
              @click="register"
            />
          </div>
        </q-card-section>
      </q-card>

      <div class="login-link">
        <span>Já tem conta?</span>

        <q-btn
          flat
          dense
          no-caps
          label="Entrar"
          class="login-btn"
          @click="$router.push({ name: 'login' })"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const step = ref(1)

const showPassword = ref(false)
const showSecurityPhrase = ref(false)
const confirmSecurityPhrase = ref('')

const form = ref({
  name: 'Responsável Demo',
  email: 'responsavel@email.com',
  phone: '(65) 99999-9999',
  documentType: 'cpf',
  documentNumber: '000.000.000-00',
  password: '123456',
  securityPhrase: ''
})

const documentTypes = [
  { label: 'CPF', value: 'cpf' },
  { label: 'RG', value: 'rg' },
  { label: 'CNH', value: 'cnh' },
  { label: 'Passaporte', value: 'passport' }
]

const steps = [
  {
    number: 1,
    shortLabel: 'Dados',
    helper: 'Responsável',
    title: 'Criar conta',
    subtitle: 'Comece com seus dados de responsável.',
    icon: 'family_restroom'
  },
  {
    number: 2,
    shortLabel: 'Acesso',
    helper: 'Login',
    title: 'Dados de acesso',
    subtitle: 'Defina como você entrará no Elo Seguro.',
    icon: 'lock'
  },
  {
    number: 3,
    shortLabel: 'Segurança',
    helper: '2 etapas',
    title: 'Frase de segurança',
    subtitle: 'Crie uma verificação extra para proteger o app.',
    icon: 'key'
  }
]

const currentStep = computed(() => {
  return steps.find((item) => item.number === step.value)
})

const canGoNext = computed(() => {
  if (step.value === 1) {
    return (
      form.value.name &&
      form.value.phone &&
      form.value.documentType &&
      form.value.documentNumber
    )
  }

  if (step.value === 2) {
    return form.value.email && form.value.password
  }

  return false
})

const securityPhraseError = computed(() => {
  if (!form.value.securityPhrase || !confirmSecurityPhrase.value) {
    return ''
  }

  if (form.value.securityPhrase.length < 4) {
    return 'A frase precisa ter pelo menos 4 caracteres.'
  }

  if (form.value.securityPhrase !== confirmSecurityPhrase.value) {
    return 'As frases não coincidem.'
  }

  return ''
})

const canFinishRegister = computed(() => {
  return (
    form.value.securityPhrase &&
    confirmSecurityPhrase.value &&
    !securityPhraseError.value
  )
})

function register() {
  authStore.registerResponsible({
    ...form.value
  })

  router.push({ name: 'contract-acceptance' })
}
</script>

<style lang="scss" scoped>
.register-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(circle at 18% 16%, rgba(168, 218, 220, 0.38), transparent 28%),
    radial-gradient(circle at 78% 22%, rgba(205, 180, 219, 0.34), transparent 30%),
    radial-gradient(circle at 50% 100%, rgba(123, 175, 212, 0.30), transparent 36%),
    linear-gradient(135deg, #bbd0d8 0%, #9eacb8 42%, #a299ac 100%);
}

.register-page::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(120deg, rgba(255, 255, 255, 0.36), transparent 42%),
    radial-gradient(circle at center, rgba(255, 255, 255, 0.20), transparent 54%);
  pointer-events: none;
  z-index: 0;
}

.register-page::after {
  content: '';
  position: absolute;
  width: 520px;
  height: 520px;
  top: 50%;
  left: 50%;
  border-radius: 999px;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.12);
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
  top: 13%;
  left: calc(50% - 260px);
  background: rgba(168, 218, 220, 0.46);
  box-shadow:
    0 35px 90px rgba(168, 218, 220, 0.38),
    inset 0 0 28px rgba(255, 255, 255, 0.18);
  filter: blur(1px);
}

.orb-two {
  width: 128px;
  height: 128px;
  top: 29%;
  right: calc(50% - 235px);
  background: rgba(205, 180, 219, 0.42);
  box-shadow:
    0 35px 90px rgba(205, 180, 219, 0.34),
    inset 0 0 24px rgba(255, 255, 255, 0.18);
  filter: blur(1px);
}

.orb-three {
  width: 92px;
  height: 92px;
  bottom: 24%;
  left: calc(50% - 210px);
  background: rgba(123, 175, 212, 0.34);
  box-shadow:
    0 28px 78px rgba(123, 175, 212, 0.30),
    inset 0 0 20px rgba(255, 255, 255, 0.16);
}

.orb-four {
  width: 72px;
  height: 72px;
  bottom: 17%;
  right: calc(50% - 180px);
  background: rgba(184, 224, 210, 0.34);
  box-shadow:
    0 26px 70px rgba(184, 224, 210, 0.28),
    inset 0 0 18px rgba(255, 255, 255, 0.16);
}

.register-shell {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
  padding: 18px;
}

.register-hero {
  text-align: center;
  margin-bottom: 14px;
}

.logo-bubble {
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 24px;
  margin: 0 auto;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.60);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.80),
    inset 0 -12px 22px rgba(123, 175, 212, 0.18),
    0 18px 36px rgba(36, 59, 83, 0.12);
  backdrop-filter: blur(22px) saturate(180%);
  -webkit-backdrop-filter: blur(22px) saturate(180%);
}

.logo-bubble::before {
  content: '';
  position: absolute;
  width: 28px;
  height: 9px;
  top: 9px;
  left: 16px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.46);
  filter: blur(2px);
}

.register-hero h1 {
  margin: 12px 0 4px;
  font-size: 28px;
  line-height: 1.08;
  font-weight: 900;
  color: #20344b;
  letter-spacing: -0.05em;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.42);
}

.register-hero p {
  margin: 0 auto;
  max-width: 320px;
  color: rgba(36, 59, 83, 0.72);
  font-size: 14px;
  line-height: 1.45;
  font-weight: 500;
}

.register-card {
  position: relative;
  overflow: hidden;
  border-radius: 34px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.68), rgba(255, 255, 255, 0.26));
  border: 1px solid rgba(255, 255, 255, 0.68);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.92),
    inset 0 -1px 0 rgba(255, 255, 255, 0.22),
    0 26px 80px rgba(36, 59, 83, 0.18);
  backdrop-filter: blur(34px) saturate(180%);
  -webkit-backdrop-filter: blur(34px) saturate(180%);
}

.register-card::before {
  content: '';
  position: absolute;
  inset: 1px;
  border-radius: inherit;
  background:
    radial-gradient(circle at 18% 0%, rgba(255, 255, 255, 0.78), transparent 34%),
    radial-gradient(circle at 90% 12%, rgba(255, 255, 255, 0.28), transparent 30%);
  pointer-events: none;
  opacity: 0.86;
}

.register-card::after {
  content: '';
  position: absolute;
  left: 22px;
  right: 22px;
  top: 12px;
  height: 1px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.82);
  pointer-events: none;
}

.card-section {
  position: relative;
  z-index: 2;
  padding: 18px 18px 17px;
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

.step-header {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 9px;
  margin-bottom: 16px;
}

.step-pill {
  position: relative;
  min-height: 72px;
  border-radius: 22px;
  padding: 9px 6px;
  background: rgba(255, 255, 255, 0.28);
  border: 1px solid rgba(255, 255, 255, 0.56);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.66),
    0 8px 18px rgba(36, 59, 83, 0.04);
  backdrop-filter: blur(18px) saturate(160%);
  -webkit-backdrop-filter: blur(18px) saturate(160%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
  transition: 0.2s ease;
}

.step-pill.active {
  background: rgba(123, 175, 212, 0.32);
  border-color: rgba(255, 255, 255, 0.74);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.76),
    inset 0 -8px 18px rgba(36, 59, 83, 0.04),
    0 12px 26px rgba(84, 139, 178, 0.18);
}

.step-pill.done {
  background: rgba(184, 224, 210, 0.36);
  border-color: rgba(255, 255, 255, 0.68);
}

.step-dot {
  width: 32px;
  height: 32px;
  border-radius: 13px;
  background: rgba(255, 255, 255, 0.32);
  color: rgba(36, 59, 83, 0.60);
  border: 1px solid rgba(255, 255, 255, 0.62);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.68);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 900;
}

.step-pill.active .step-dot {
  background: rgba(123, 175, 212, 0.68);
  color: #ffffff;
}

.step-pill.done .step-dot {
  background: rgba(184, 224, 210, 0.76);
  color: #ffffff;
}

.step-text {
  text-align: center;
  line-height: 1.1;
}

.step-text strong {
  display: block;
  font-size: 13px;
  color: #20344b;
  font-weight: 900;
}

.step-text small {
  display: block;
  font-size: 11px;
  color: rgba(36, 59, 83, 0.62);
  margin-top: 2px;
  font-weight: 650;
}

.form-area {
  min-height: auto;
}

.step-note {
  margin-top: 10px;
  padding: 10px 12px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.28);
  color: rgba(36, 59, 83, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.58);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.60),
    0 8px 18px rgba(36, 59, 83, 0.04);
  backdrop-filter: blur(16px) saturate(160%);
  -webkit-backdrop-filter: blur(16px) saturate(160%);
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  line-height: 1.35;
  font-weight: 650;
}

.step-note .q-icon {
  color: #6fa8ce;
  margin-top: 1px;
}

.error-box {
  margin-top: 10px;
  padding: 10px 12px;
  border-radius: 18px;
  background: rgba(229, 152, 155, 0.22);
  color: #5b2d35;
  border: 1px solid rgba(255, 255, 255, 0.58);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.52),
    0 10px 24px rgba(229, 152, 155, 0.12);
  backdrop-filter: blur(16px) saturate(160%);
  -webkit-backdrop-filter: blur(16px) saturate(160%);
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
}

.actions-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 13px;
}

.step-nav-btn {
  min-height: 48px;
  border-radius: 19px;
  font-weight: 900;
  padding: 0 16px;
  letter-spacing: -0.01em;
}

.back-step-btn {
  width: 42%;
  color: rgba(36, 59, 83, 0.62);
  background: rgba(255, 255, 255, 0.24);
  border: 1px solid rgba(255, 255, 255, 0.62);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.66),
    0 10px 22px rgba(36, 59, 83, 0.06);
  backdrop-filter: blur(18px) saturate(160%);
  -webkit-backdrop-filter: blur(18px) saturate(160%);
}

.continue-btn {
  width: 52%;
  color: #ffffff;
  background: rgba(123, 175, 212, 0.54);
  border: 1px solid rgba(255, 255, 255, 0.74);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.78),
    inset 0 -12px 24px rgba(36, 59, 83, 0.08),
    0 16px 34px rgba(84, 139, 178, 0.28);
  backdrop-filter: blur(20px) saturate(170%);
  -webkit-backdrop-filter: blur(20px) saturate(170%);
}

.back-step-btn.q-btn--disabled {
  opacity: 0.38 !important;
}

.login-link {
  margin-top: 18px;
  padding: 10px 15px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.28);
  border: 1px solid rgba(255, 255, 255, 0.58);
  backdrop-filter: blur(20px) saturate(160%);
  -webkit-backdrop-filter: blur(20px) saturate(160%);
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(36, 59, 83, 0.68);
  font-size: 15px;
  font-weight: 750;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.68),
    0 14px 34px rgba(36, 59, 83, 0.10);
}

.login-btn {
  color: #5e9fca;
  font-weight: 900;
  font-size: 15px;
  padding-left: 4px;
}

.input-icon {
  color: #6fa8ce;
}

.input-icon-muted {
  color: rgba(36, 59, 83, 0.48);
}

:deep(.q-field--outlined .q-field__control) {
  border-radius: 20px;
  min-height: 52px;
  background: rgba(255, 255, 255, 0.30);
  border: 1px solid rgba(255, 255, 255, 0.62);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.76),
    inset 0 -8px 18px rgba(36, 59, 83, 0.025),
    0 10px 22px rgba(36, 59, 83, 0.045);
  backdrop-filter: blur(20px) saturate(170%);
  -webkit-backdrop-filter: blur(20px) saturate(170%);
}

:deep(.q-field--outlined .q-field__control::before) {
  border-color: rgba(255, 255, 255, 0.20);
}

:deep(.q-field--outlined .q-field__control::after) {
  border-color: rgba(123, 175, 212, 0);
}

:deep(.q-field--outlined.q-field--focused .q-field__control) {
  background: rgba(255, 255, 255, 0.44);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.82),
    0 12px 26px rgba(123, 175, 212, 0.12);
}

:deep(.q-field--outlined.q-field--focused .q-field__control::after) {
  border-color: rgba(123, 175, 212, 0.76);
  border-width: 1px;
}

:deep(.q-field--dense .q-field__control) {
  height: 52px;
}

:deep(.q-field__prepend) {
  padding-right: 8px;
}

:deep(.q-field__append) {
  padding-left: 8px;
}

:deep(.q-field__label) {
  font-size: 13px;
  color: rgba(36, 59, 83, 0.58);
  font-weight: 600;
}

:deep(.q-field__native) {
  font-size: 15px;
  color: #20344b;
  font-weight: 500;
}

@media (max-width: 480px) {
  .register-shell {
    padding: 18px 20px;
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

  .orb-four {
    right: 26px;
  }
}

@media (max-height: 720px) {
  .register-shell {
    padding: 14px 18px;
  }

  .register-hero {
    margin-bottom: 12px;
  }

  .logo-bubble {
    width: 56px;
    height: 56px;
    border-radius: 22px;
  }

  .register-hero h1 {
    font-size: 25px;
    margin-top: 9px;
  }

  .register-hero p {
    font-size: 13px;
  }

  .card-section {
    padding: 17px 17px 16px;
  }

  .step-pill {
    min-height: 66px;
  }

  .step-nav-btn {
    min-height: 46px;
  }
}
</style>
