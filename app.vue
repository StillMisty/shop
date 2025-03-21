<template>
  <div>
    <AppHeader />
    <main class="min-h-[calc(100vh-64px)] h-[calc(100vh-64px)]">
      <index />
      <cart />
      <order />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppFooter from "~/components/AppFooter.vue";
import AppHeader from "~/components/AppHeader.vue";
import cart from "~/pages/cart.vue";
import index from "~/pages/index.vue";
import order from "~/pages/order.vue";
</script>
