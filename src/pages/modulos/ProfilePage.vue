<template>
  <q-page class="simple-page">
    <div class="bg-orb orb-one"></div>
    <div class="bg-orb orb-two"></div>

    <div class="page-shell">
      <section class="page-hero">
        <div>
          <div class="eyebrow">Conta do responsável</div>
          <h1>Meu perfil</h1>
          <p>Dados principais da conta e status de segurança.</p>
        </div>

        <div class="hero-icon">
          <q-icon name="person" size="28px" />
        </div>
      </section>

      <q-card flat class="highlight-card">
        <q-card-section>
          <div class="profile-avatar-large">
            RS
          </div>

          <strong>Responsável Demo</strong>
          <p>responsavel@email.com</p>
        </q-card-section>
      </q-card>

      <div class="cards-list">
        <q-card
          v-for="item in profileItems"
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
                <span>{{ item.value }}</span>
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
const profileItems = [
  {
    title: 'Verificação em duas etapas',
    value: 'Ativa',
    description: 'A frase de segurança está configurada.',
    icon: 'verified_user'
  },
  {
    title: 'Contrato',
    value: 'Aceito',
    description: 'Termos de uso e consentimento confirmados.',
    icon: 'gavel'
  },
  {
    title: 'Telefone',
    value: '(65) 99999-9999',
    description: 'Contato principal do responsável.',
    icon: 'phone_iphone'
  }
]
</script>

<style lang="scss" scoped>
@import "src/css/page-glass.scss";

.profile-avatar-large {
  width: 68px;
  height: 68px;
  border-radius: 24px;
  margin: 0 auto 12px;
  color: #ffffff;
  background: rgba(123, 175, 212, 0.58);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 900;
}
</style>
