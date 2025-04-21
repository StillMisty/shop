<template>
  <div class="flex justify-between max-w-7xl gap-12 p-16 mx-auto w-full">
    <div
      v-if="shoppingCartStore.shoppingCart.length"
      v-auto-animate
      class="flex flex-col gap-4 w-full"
    >
      <el-switch v-model="shoppingCartStore.selectAll" active-text="全选" />
      <ProductCartCard
        v-for="cartItem in shoppingCartStore.shoppingCart"
        :key="cartItem.product.id"
        v-model:quantity="cartItem.quantity"
        v-model:checked="cartItem.checked"
        :product="cartItem.product"
        @remove="shoppingCartStore.removeProductFromCart"
      />
    </div>
    <div v-else class="flex flex-col gap-4 w-full">
      <el-empty description="购物车空空如也" />
    </div>
    <SettlementCard
      class="min-w-48 h-40"
      :total-price="shoppingCartStore.totalPrice"
      @settlement="handleSettlement"
    />
  </div>
</template>

<script lang="ts" setup>
const shoppingCartStore = useMyShoppingCartStore();

const handleSettlement = async () => {
  const data = await shoppingCartStore.settlement();
  if (!data) {
    ElMessage({
      type: "warning",
      message: "请选择商品",
    });
    return;
  }
  ElMessageBox.confirm(
    `订单号：${data?.id}\n共: ￥${data?.orderTotal}`,
    "结账",
    {
      confirmButtonText: "前去支付",
      cancelButtonText: "暂不支付",
      type: "success",
      center: true,
    },
  )
    .then(() => {
      const router = useRouter();
      router.push(`/orders/${data?.id}`);
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消支付",
      });
    });
};
</script>