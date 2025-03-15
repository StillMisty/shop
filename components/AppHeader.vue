<template>
  <header
    class="flex justify-between items-center w-full px-8 py-2 bg-gray-800 text-white"
  >
    <div class="flex items-center space-x-2">
      <el-avatar fit="cover" alt="用户头像" />
      <el-button><NuxtLink to="/">首页</NuxtLink></el-button>
      <el-button><NuxtLink to="/order">订单中心</NuxtLink></el-button>
      <el-button
        ><NuxtLink to="/cart"
          >购物车
          {{
            shoppingCartStore.totalItems ? shoppingCartStore.totalItems : ""
          }}</NuxtLink
        ></el-button
      >
    </div>
    <div>
      <el-input v-model="search" placeholder="搜索商品" :prefix-icon="Search" />
    </div>
  </header>
</template>

<script lang="ts" setup>
import { Search } from "lucide-vue-next";
import { useMyShoppingCartStore } from "~/stores/ShoppingCart";

const shoppingCartStore = useMyShoppingCartStore();
const search = ref("");
</script>
