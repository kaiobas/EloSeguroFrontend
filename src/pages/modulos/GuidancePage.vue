<template>
  <q-page class="simple-page">
    <div class="bg-orb orb-one"></div>
    <div class="bg-orb orb-two"></div>

    <div class="page-shell">
      <section class="page-hero">
        <div>
          <div class="eyebrow">Apoio ao responsável</div>
          <h1>Orientações</h1>
          <p>Guias simples para agir com cuidado após um alerta.</p>
        </div>

        <div class="hero-icon">
          <q-icon name="menu_book" size="28px" />
        </div>
      </section>

      <div class="cards-list">
        <q-card
          v-for="guide in guides"
          :key="guide.title"
          flat
          class="glass-card"
        >
          <q-card-section class="card-section">
            <div class="item-top">
              <div class="item-icon">
                <q-icon :name="guide.icon" size="24px" />
              </div>

              <div class="item-content">
                <strong>{{ guide.title }}</strong>
                <span>{{ guide.tag }}</span>
                <p>{{ guide.description }}</p>
              </div>

              <q-icon name="chevron_right" class="arrow-icon" size="24px" />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
const guides = [
  {
    title: 'Como agir após um alerta',
    tag: 'Primeiros passos',
    description: 'Entenda o alerta, preserve registros e converse sem acusar.',
    icon: 'tips_and_updates'
  },
  {
    title: 'Como preservar evidências',
    tag: 'Segurança',
    description: 'Evite apagar mensagens e mantenha datas, prints e resumos organizados.',
    icon: 'folder_copy'
  },
  {
    title: 'Quando procurar ajuda',
    tag: 'Rede de apoio',
    description: 'Saiba quando envolver escola, conselho tutelar ou canais oficiais.',
    icon: 'support_agent'
  }
]
</script>

<style lang="scss" scoped>
@import "src/css/page-glass.scss";
</style>
