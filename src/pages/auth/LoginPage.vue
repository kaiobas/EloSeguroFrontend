<template>
  <q-page class="login-page">
    <div class="bg-orb orb-one"></div>
    <div class="bg-orb orb-two"></div>
    <div class="bg-orb orb-three"></div>
    <div class="bg-orb orb-four"></div>

    <div class="login-shell">
      <section class="login-hero">
        <div class="logo-bubble">
          <q-icon name="shield" size="28px" />
        </div>

        <h1>
          Elo Seguro
        </h1>

        <p>
          Proteção digital com cuidado, confiança e acolhimento.
        </p>
      </section>

      <q-card flat class="login-card">
        <q-card-section class="card-section">
          <div class="glass-highlight"></div>

          <div class="card-title">
            Acessar conta
          </div>

          <div class="card-subtitle">
            Entre com os dados do responsável.
          </div>

          <div class="form-area">
            <q-input
              v-model="email"
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
              v-model="password"
              label="Senha"
              :type="showPassword ? 'text' : 'password'"
              outlined
              dense
              class="glass-input q-mt-sm"
              color="primary"
              @keyup.enter="login"
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

            <div class="helper-row">
              <q-checkbox
                v-model="remember"
                dense
                label="Lembrar acesso"
                color="primary"
                class="remember-check"
              />

              <q-btn
                flat
                dense
                no-caps
                label="Esqueci a senha"
                class="forgot-btn"
              />
            </div>

            <div
              v-if="errorMessage"
              class="error-box"
            >
              <q-icon name="error_outline" size="18px" />
              <span>{{ errorMessage }}</span>
            </div>
          </div>

          <q-btn
            label="Continuar"
            icon-right="arrow_forward"
            unelevated
            no-caps
            class="full-width continue-btn q-mt-md"
            @click="login"
          />
        </q-card-section>
      </q-card>

      <div class="register-link">
        <span>Ainda não tem conta?</span>

        <q-btn
          flat
          dense
          no-caps
          label="Criar conta"
          class="register-btn"
          @click="$router.push({ name: 'register' })"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'stores/authStore.js'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('responsavel@email.com')
const password = ref('123456')
const remember = ref(true)
const showPassword = ref(false)
const errorMessage = ref('')

function login() {
  errorMessage.value = ''

  try {
    authStore.loginFirstStep({
      email: email.value,
      password: password.value
    })

    router.push({ name: 'security-word' })
  } catch (error) {
    errorMessage.value = error.message
  }
}
</script>

<style lang="scss" scoped>
.login-page {
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
    linear-gradient(135deg, #dbeaf0 0%, #d7e1ea 42%, #e7e1ef 100%);
}

.login-page::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(120deg, rgba(255, 255, 255, 0.36), transparent 42%),
    radial-gradient(circle at center, rgba(255, 255, 255, 0.20), transparent 54%);
  pointer-events: none;
  z-index: 0;
}

.login-page::after {
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

.login-shell {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
  padding: 18px;
}

.login-hero {
  text-align: center;
  margin-bottom: 16px;
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

.login-hero h1 {
  margin: 12px 0 4px;
  font-size: 28px;
  line-height: 1.08;
  font-weight: 900;
  color: #20344b;
  letter-spacing: -0.05em;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.42);
}

.login-hero p {
  margin: 0 auto;
  max-width: 320px;
  color: rgba(36, 59, 83, 0.72);
  font-size: 14px;
  line-height: 1.45;
  font-weight: 500;
}

.login-card {
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

.login-card::before {
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

.login-card::after {
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
  padding: 20px 18px 18px;
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

.card-title {
  text-align: center;
  font-size: 20px;
  line-height: 1.2;
  font-weight: 900;
  color: #20344b;
  letter-spacing: -0.035em;
}

.card-subtitle {
  text-align: center;
  color: rgba(36, 59, 83, 0.66);
  font-size: 13px;
  line-height: 1.4;
  margin-top: 4px;
  margin-bottom: 16px;
  font-weight: 500;
}

.form-area {
  min-height: auto;
}

.helper-row {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.remember-check {
  color: rgba(36, 59, 83, 0.68);
  font-size: 13px;
  font-weight: 600;
}

.forgot-btn {
  color: #5e9fca;
  font-weight: 900;
  font-size: 12px;
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

.continue-btn {
  position: relative;
  overflow: hidden;
  min-height: 50px;
  border-radius: 20px;
  color: #ffffff;
  font-weight: 900;
  letter-spacing: -0.01em;
  background: rgba(123, 175, 212, 0.54);
  border: 1px solid rgba(255, 255, 255, 0.74);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.78),
    inset 0 -12px 24px rgba(36, 59, 83, 0.08),
    0 16px 34px rgba(84, 139, 178, 0.28);
  backdrop-filter: blur(20px) saturate(170%);
  -webkit-backdrop-filter: blur(20px) saturate(170%);
}

.continue-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(120deg, rgba(255, 255, 255, 0.48), transparent 42%, rgba(255, 255, 255, 0.14));
  pointer-events: none;
}

.register-link {
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

.register-btn {
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

:deep(.q-checkbox__label) {
  font-size: 13px;
}

:deep(.q-checkbox__bg) {
  border-radius: 5px;
  border-color: rgba(255, 255, 255, 0.74);
  background: rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

@media (max-width: 480px) {
  .login-shell {
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
  .login-shell {
    padding: 14px 18px;
  }

  .login-hero {
    margin-bottom: 12px;
  }

  .logo-bubble {
    width: 56px;
    height: 56px;
    border-radius: 22px;
  }

  .login-hero h1 {
    font-size: 25px;
    margin-top: 9px;
  }

  .login-hero p {
    font-size: 13px;
  }

  .card-section {
    padding: 18px 17px 16px;
  }

  .card-subtitle {
    margin-bottom: 13px;
  }

  .continue-btn {
    min-height: 48px;
  }
}
</style>
