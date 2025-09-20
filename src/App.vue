<template>
  <div>
    <Header>

    </Header>

    <main class="pt-16">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Header from './component/Header.vue';
</script>
