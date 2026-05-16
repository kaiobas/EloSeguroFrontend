<template>
  <q-page class="q-pa-md flex flex-center bg-grey-1">
    <div class="text-center" style="max-width: 420px;">
      <q-icon name="lock" size="76px" color="negative" />

      <div class="text-h6 text-weight-bold q-mt-md">
        Acesso bloqueado
      </div>

      <p class="text-body2 text-grey-7 q-mt-sm">
        Para utilizar a plataforma, é necessário aceitar os Termos de Uso,
        a Política de Privacidade e o Consentimento de Monitoramento.
      </p>

      <q-btn
        color="primary"
        label="Voltar para os termos"
        class="full-width q-mt-md"
        unelevated
        @click="$router.push({ name: 'contract-acceptance' })"
      />

      <q-btn
        flat
        color="negative"
        label="Sair da conta"
        class="full-width q-mt-sm"
        @click="logout"
      />
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from 'stores/authStore.js'

const router = useRouter()
const authStore = useAuthStore()

function logout() {
  authStore.logout()
  router.push({ name: 'login' })
}
</script>
