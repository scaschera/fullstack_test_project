<template>
  <navbar />
  <RouterView />
</template>

<script setup>
  import { RouterView} from 'vue-router'
  import navbar from './components/navbar.vue';
</script>

<style scoped></style>
