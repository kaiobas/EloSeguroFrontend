<template>
  <q-layout view="hHh lpR fFf" class="auth-layout">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
</script>

<style scoped>
.auth-layout {
  background:
    radial-gradient(circle at top left, rgba(168, 218, 220, 0.46), transparent 34%),
    radial-gradient(circle at top right, rgba(205, 180, 219, 0.34), transparent 32%),
    linear-gradient(180deg, #ffffff 0%, var(--color-background) 100%);
}
</style>
