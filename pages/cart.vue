<template>
  <div class="flex justify-between max-w-7xl gap-12 p-16 mx-auto w-full">
    <div class="flex flex-col gap-4 w-full">
      <ProductCartCard
        v-for="cartItem in shoppingCartStore.shoppingCart"
        v-model:quantity="cartItem.quantity"
        v-model:checked="cartItem.checked"
        :product="cartItem.product"
        @remove="shoppingCartStore.removeProductFromCart"
      />
    </div>
    <SettlementCard
      class="min-w-48 h-48"
      :totalPrice="shoppingCartStore.totalPrice"
    />
  </div>
</template>

<script lang="ts" setup>
import { useMyShoppingCartStore } from "~/stores/ShoppingCart";

const shoppingCartStore = useMyShoppingCartStore();
</script>
