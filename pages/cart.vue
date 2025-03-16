<template>
  <div class="flex justify-between max-w-7xl gap-12 p-16 mx-auto w-full">
    <div
      class="flex flex-col gap-4 w-full"
      v-if="shoppingCartStore.shoppingCart.length"
    >
      <ProductCartCard
        v-for="cartItem in shoppingCartStore.shoppingCart"
        v-model:quantity="cartItem.quantity"
        v-model:checked="cartItem.checked"
        :product="cartItem.product"
        @remove="shoppingCartStore.removeProductFromCart"
      />
    </div>
    <div class="flex flex-col gap-4 w-full" v-else>
      <div class="flex items-center justify-center h-40 text-2xl text-gray-400">
        购物车空空如也
      </div>
    </div>
    <SettlementCard
      class="min-w-48 h-40"
      :totalPrice="shoppingCartStore.totalPrice"
      @settlement="handleSettlement"
    />
  </div>
</template>

<script lang="ts" setup>
import { useMyShoppingCartStore } from "~/stores/ShoppingCart";

const shoppingCartStore = useMyShoppingCartStore();
const handleSettlement = async () => {
  const data = await shoppingCartStore.settlement();
  console.log(data);
  ElMessageBox.confirm(
    `订单号：${data?.id}\n共: ￥${data?.orderTotal}`,
    "结账",
    {
      confirmButtonText: "支付",
      cancelButtonText: "暂不支付",
      type: "success",
      center: true,
    },
  )
    .then(() => {
      $fetch("/api/order/pay", {
        method: "POST",
        body: JSON.stringify({ orderId: data?.id }),
      });
      ElMessage({
        type: "success",
        message: "支付成功",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消支付",
      });
    });
};
</script>
