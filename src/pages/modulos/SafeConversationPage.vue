<template>
  <q-page class="simple-page">
    <div class="bg-orb orb-one"></div>
    <div class="bg-orb orb-two"></div>

    <div class="page-shell">
      <section class="page-hero">
        <div>
          <div class="eyebrow">Diálogo acolhedor</div>
          <h1>Conversa segura</h1>
          <p>Frases para conversar com a criança sem medo, culpa ou confronto.</p>
        </div>

        <div class="hero-icon">
          <q-icon name="chat" size="28px" />
        </div>
      </section>

      <q-card flat class="highlight-card">
        <q-card-section>
          <q-icon name="favorite" size="28px" />
          <strong>Antes de confrontar, acolha.</strong>
          <p>A criança precisa sentir que pode contar o que aconteceu sem medo de punição imediata.</p>
        </q-card-section>
      </q-card>

      <div class="cards-list">
        <q-card
          v-for="item in phrases"
          :key="item.category"
          flat
          class="glass-card"
        >
          <q-card-section class="card-section">
            <div class="phrase-category">
              {{ item.category }}
            </div>

            <div
              v-for="phrase in item.items"
              :key="phrase"
              class="phrase-box"
            >
              “{{ phrase }}”
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
const phrases = [
  {
    category: 'Para começar',
    items: [
      'Vi que algo pode ter te deixado desconfortável online. Você quer conversar comigo sobre isso?',
      'Você não está em apuros. Eu só quero entender e te ajudar.'
    ]
  },
  {
    category: 'Para acolher',
    items: [
      'Obrigado por confiar em mim.',
      'Você fez certo em falar sobre isso.'
    ]
  },
  {
    category: 'Para encerrar com segurança',
    items: [
      'Vamos resolver isso juntos.',
      'Eu estou aqui para te proteger, não para te culpar.'
    ]
  }
]
</script>

<style lang="scss" scoped>
@import "src/css/page-glass.scss";

.phrase-category {
  color: #20344b;
  font-size: 15px;
  font-weight: 900;
  margin-bottom: 10px;
}

.phrase-box {
  padding: 12px;
  border-radius: 18px;
  margin-top: 8px;
  color: rgba(36, 59, 83, 0.78);
  background: rgba(255, 255, 255, 0.34);
  border: 1px solid rgba(255, 255, 255, 0.58);
  font-size: 13.5px;
  line-height: 1.45;
  font-weight: 650;
}
</style>
