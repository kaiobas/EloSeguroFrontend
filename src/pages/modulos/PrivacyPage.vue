<template>
  <q-page class="simple-page">
    <div class="bg-orb orb-one"></div>
    <div class="bg-orb orb-two"></div>

    <div class="page-shell">
      <section class="page-hero">
        <div>
          <div class="eyebrow">Controle e transparência</div>
          <h1>Privacidade</h1>
          <p>Veja quais dados são analisados e como o monitoramento funciona.</p>
        </div>

        <div class="hero-icon">
          <q-icon name="privacy_tip" size="28px" />
        </div>
      </section>

      <div class="cards-list">
        <q-card
          v-for="item in privacyItems"
          :key="item.title"
          flat
          class="glass-card"
        >
          <q-card-section class="card-section">
            <div class="item-top">
              <div class="item-icon">
                <q-icon :name="item.icon" size="24px" />
              </div>

              <div class="item-content">
                <strong>{{ item.title }}</strong>
                <span>{{ item.tag }}</span>
                <p>{{ item.description }}</p>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
const privacyItems = [
  {
    title: 'O que é analisado',
    tag: 'Transparência',
    description: 'Sinais textuais e padrões de risco em ambientes autorizados pelo responsável.',
    icon: 'search'
  },
  {
    title: 'O que não é analisado',
    tag: 'Limites',
    description: 'O app não tem objetivo de expor a vida privada da criança, e sim identificar riscos.',
    icon: 'visibility_off'
  },
  {
    title: 'Controle dos dados',
    tag: 'Responsável',
    description: 'O responsável pode revisar permissões, evidências e consentimentos.',
    icon: 'settings'
  }
]
</script>

<style lang="scss" scoped>
@import "src/css/page-glass.scss";
</style>
