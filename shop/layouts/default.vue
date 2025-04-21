<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import Header from '@/components/common/Header.vue';
import Footer from '@/components/common/Footer.vue';
</script>

<style scoped>
/* Add any additional styles for the layout here */
</style>