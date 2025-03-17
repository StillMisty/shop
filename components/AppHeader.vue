<template>
  <div class="h-16"></div>
  <header
    class="flex justify-between items-center w-full px-8 py-2 bg-gray-800/90 text-white fixed top-0 z-10 h-16"
  >
    <div class="flex items-center gap-1">
      <el-avatar
        fit="cover"
        alt="用户头像"
        src="/images/photo.jpg"
        class="mr-2 cursor-pointer"
      />
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
      <el-input v-model="keyword" placeholder="搜索商品" @change="handleSearch">
        <template #prepend>
          <el-button :icon="Search" />
        </template>
        <template #append>
          <el-select v-model="type" style="width: 72px">
            <el-option
              :label="ProduceSearchType.PRODUCT"
              :value="ProduceSearchType.PRODUCT"
            />
            <el-option
              :label="ProduceSearchType.MERCHANT"
              :value="ProduceSearchType.MERCHANT"
            />
          </el-select>
        </template>
      </el-input>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { Search } from "lucide-vue-next";
import { useMyShoppingCartStore } from "~/stores/ShoppingCart";
import { ProduceSearchType } from "~/types/DTO/ProductQuery";

const shoppingCartStore = useMyShoppingCartStore();
const productCardListStore = useMyProductCardListStore();
const keyword = ref("");
const type = ref(ProduceSearchType.PRODUCT);
const handleSearch = async () => {
  const router = useRouter();
  await router.push({
    path: "/search",
    query: {
      keyword: keyword.value,
      type: type.value,
    },
  });
  await productCardListStore.fetchProductCardByKeyword(
    keyword.value,
    type.value,
  );
};
</script>
