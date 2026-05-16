<template>
  <q-layout view="hHh lpR fFf" class="main-layout">
    <q-header class="main-header">
      <q-toolbar class="main-toolbar">
        <div class="brand-area" @click="$router.push({ name: 'dashboard' })">
          <div class="brand-mark">
            <q-icon name="shield" size="22px" />
          </div>

          <div class="brand-copy">
            <div class="brand-title">
              Elo Seguro
            </div>

            <div class="brand-subtitle">
              Cuidado digital familiar
            </div>
          </div>
        </div>

        <q-space />

        <q-btn
          flat
          round
          dense
          icon="notifications_none"
          class="header-icon-btn"
        >
          <q-badge
            floating
            rounded
            color="negative"
            class="notification-badge"
          />
        </q-btn>

        <q-btn
          flat
          round
          dense
          class="profile-btn"
        >
          <q-avatar size="34px" class="profile-avatar">
            {{ userInitials }}
          </q-avatar>

          <q-menu
            class="profile-menu"
            anchor="bottom right"
            self="top right"
            :offset="[0, 10]"
          >
            <div class="profile-card">
              <div class="profile-top">
                <q-avatar size="48px" class="profile-avatar big">
                  {{ userInitials }}
                </q-avatar>

                <div>
                  <div class="profile-name">
                    {{ userName }}
                  </div>

                  <div class="profile-email">
                    {{ userEmail }}
                  </div>
                </div>
              </div>

              <q-separator class="menu-separator" />

              <q-list class="menu-list">
                <q-item clickable v-ripple @click="goToProfile">
                  <q-item-section avatar>
                    <q-icon name="person_outline" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Meu perfil</q-item-label>
                    <q-item-label caption>
                      Dados do responsável
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-ripple @click="goToPrivacy">
                  <q-item-section avatar>
                    <q-icon name="privacy_tip" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Privacidade</q-item-label>
                    <q-item-label caption>
                      Permissões e termos
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-ripple @click="logout">
                  <q-item-section avatar>
                    <q-icon name="logout" color="negative" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label class="text-negative text-weight-bold">
                      Sair da conta
                    </q-item-label>
                    <q-item-label caption>
                      Encerrar acesso seguro
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="main-footer">
      <div class="footer-glass">
        <q-tabs
          dense
          active-color="primary"
          indicator-color="transparent"
          class="bottom-tabs"
        >
          <q-route-tab
            icon="dashboard"
            label="Início"
            to="/dashboard"
            exact
          />

          <q-route-tab
            icon="warning_amber"
            label="Alertas"
            to="/alertas"
            exact
          />

          <q-route-tab
            icon="family_restroom"
            label="Crianças"
            to="/criancas"
            exact
          />

          <q-route-tab
            icon="devices"
            label="Aparelhos"
            to="/dispositivos"
            exact
          />

          <q-route-tab
            icon="more_horiz"
            label="Mais"
            to="/mais"
            exact
          />
        </q-tabs>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'stores/authStore.js'

const router = useRouter()
const authStore = useAuthStore()

const userName = computed(() => {
  return authStore.user?.name || 'Responsável'
})

const userEmail = computed(() => {
  return authStore.user?.email || 'responsavel@email.com'
})

const userInitials = computed(() => {
  const name = userName.value.trim()

  if (!name) {
    return 'RS'
  }

  const parts = name.split(' ').filter(Boolean)

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
})

function goToProfile() {
  router.push({ name: 'profile' })
}

function goToPrivacy() {
  router.push({ name: 'privacy' })
}

function logout() {
  authStore.logout()
  router.push({ name: 'login' })
}
</script>

<style lang="scss" scoped>
.main-layout {
  background:
    radial-gradient(circle at 18% 16%, rgba(168, 218, 220, 0.38), transparent 28%),
    radial-gradient(circle at 78% 22%, rgba(205, 180, 219, 0.34), transparent 30%),
    radial-gradient(circle at 50% 100%, rgba(123, 175, 212, 0.30), transparent 36%),
    linear-gradient(135deg, #dbeaf0 0%, #d7e1ea 42%, #e7e1ef 100%);
}

.main-header {
  background: rgba(255, 255, 255, 0.36);
  color: #20344b;
  border-bottom: 1px solid rgba(255, 255, 255, 0.58);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.72),
    0 10px 32px rgba(36, 59, 83, 0.08);
  backdrop-filter: blur(24px) saturate(170%);
  -webkit-backdrop-filter: blur(24px) saturate(170%);
}

.main-toolbar {
  min-height: 66px;
  padding: 10px 16px;
}

.brand-area {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  min-width: 0;
}

.brand-mark {
  position: relative;
  width: 44px;
  height: 44px;
  border-radius: 17px;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.20);
  border: 1px solid rgba(255, 255, 255, 0.64);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.78),
    inset 0 -10px 20px rgba(123, 175, 212, 0.16),
    0 12px 24px rgba(36, 59, 83, 0.10);
  backdrop-filter: blur(20px) saturate(170%);
  -webkit-backdrop-filter: blur(20px) saturate(170%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.brand-mark::before {
  content: '';
  position: absolute;
  width: 20px;
  height: 7px;
  top: 7px;
  left: 11px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.42);
  filter: blur(2px);
}

.brand-copy {
  min-width: 0;
}

.brand-title {
  font-size: 16px;
  font-weight: 900;
  line-height: 1.05;
  color: #20344b;
  letter-spacing: -0.04em;
}

.brand-subtitle {
  font-size: 11.5px;
  color: rgba(36, 59, 83, 0.62);
  margin-top: 3px;
  font-weight: 650;
  white-space: nowrap;
}

.header-icon-btn {
  width: 40px;
  height: 40px;
  color: rgba(36, 59, 83, 0.72);
  background: rgba(255, 255, 255, 0.26);
  border: 1px solid rgba(255, 255, 255, 0.56);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.62),
    0 8px 18px rgba(36, 59, 83, 0.05);
  backdrop-filter: blur(16px) saturate(150%);
  -webkit-backdrop-filter: blur(16px) saturate(150%);
}

.notification-badge {
  width: 8px;
  height: 8px;
  min-width: 8px;
  top: 7px;
  right: 7px;
}

.profile-btn {
  margin-left: 8px;
  padding: 0;
}

.profile-avatar {
  background: rgba(123, 175, 212, 0.48);
  color: #ffffff;
  font-size: 12px;
  font-weight: 900;
  border: 1px solid rgba(255, 255, 255, 0.72);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.70),
    0 8px 18px rgba(36, 59, 83, 0.08);
  backdrop-filter: blur(16px) saturate(160%);
  -webkit-backdrop-filter: blur(16px) saturate(160%);
}

.profile-avatar.big {
  font-size: 16px;
}

.profile-menu {
  border-radius: 28px;
  overflow: hidden;
  background: transparent;
  box-shadow: none;
}

.profile-card {
  width: 300px;
  padding: 16px;
  border-radius: 28px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.78), rgba(255, 255, 255, 0.38));
  border: 1px solid rgba(255, 255, 255, 0.74);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.86),
    0 24px 60px rgba(36, 59, 83, 0.18);
  backdrop-filter: blur(30px) saturate(180%);
  -webkit-backdrop-filter: blur(30px) saturate(180%);
}

.profile-top {
  display: flex;
  align-items: center;
  gap: 12px;
}

.profile-name {
  color: #20344b;
  font-size: 15px;
  font-weight: 900;
  line-height: 1.2;
}

.profile-email {
  margin-top: 2px;
  color: rgba(36, 59, 83, 0.62);
  font-size: 12.5px;
  font-weight: 650;
}

.menu-separator {
  margin: 14px 0;
  background: rgba(255, 255, 255, 0.54);
}

.menu-list {
  border-radius: 20px;
  overflow: hidden;
}

.menu-list :deep(.q-item) {
  border-radius: 18px;
  min-height: 58px;
  margin-bottom: 4px;
  color: rgba(36, 59, 83, 0.78);
}

.menu-list :deep(.q-item:hover) {
  background: rgba(255, 255, 255, 0.34);
}

.menu-list :deep(.q-item__label) {
  font-weight: 850;
}

.menu-list :deep(.q-item__label--caption) {
  font-weight: 600;
  color: rgba(36, 59, 83, 0.56);
}

.main-footer {
  background: transparent;
  padding: 0 12px 12px;
}

.footer-glass {
  max-width: 560px;
  margin: 0 auto;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.42);
  border: 1px solid rgba(255, 255, 255, 0.68);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.74),
    0 18px 50px rgba(36, 59, 83, 0.16);
  backdrop-filter: blur(28px) saturate(180%);
  -webkit-backdrop-filter: blur(28px) saturate(180%);
  overflow: hidden;
}

.bottom-tabs {
  color: rgba(36, 59, 83, 0.58);
  min-height: 72px;
}

:deep(.q-tab) {
  min-height: 64px;
  border-radius: 22px;
  margin: 6px 2px;
  transition: 0.2s ease;
}

:deep(.q-tab__icon) {
  font-size: 22px;
}

:deep(.q-tab__label) {
  font-size: 11px;
  margin-top: 3px;
  font-weight: 800;
}

:deep(.q-tab--active) {
  color: #5e9fca;
  background: rgba(255, 255, 255, 0.36);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.62),
    0 8px 18px rgba(36, 59, 83, 0.05);
}

@media (max-width: 420px) {
  .brand-subtitle {
    display: none;
  }

  .main-toolbar {
    padding: 9px 14px;
  }

  .footer-glass {
    border-radius: 24px;
  }

  :deep(.q-tab__label) {
    font-size: 10px;
  }
}
</style>
