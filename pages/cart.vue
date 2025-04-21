<template>
  <div class="flex justify-between max-w-7xl gap-12 p-16 mx-auto w-full">
    <!-- 加载状态 -->
    <div v-if="isPending" class="flex justify-center items-center">
      <el-skeleton :rows="20" animated />
    </div>
    <!-- 错误提示 -->
    <el-result
      v-else-if="isError"
      icon="error"
      title="获取商品信息失败"
      :sub-title="error?.message"
    >
      <template #extra>
        <el-button type="primary">重新加载</el-button>
      </template>
    </el-result>
    <div
      v-else-if="cartData?.length"
      v-auto-animate
      class="flex flex-col gap-4 w-full"
    >
      <el-switch v-model="isCheckAll" active-text="全选" />
      <ProductCartCard
        v-for="cartItem in cartData"
        :key="cartItem.product.productId"
        :quantity="cartItem.quantity"
        :checked="cartItem.checked"
        :cart-item-id="cartItem.cartItemId"
        :product="cartItem.product"
        @update:quantity="handleQuantityChange($event, cartItem)"
        @update:checked="handleCheckedChange($event, cartItem)"
        @remove="handleRemoveCartItem(cartItem.cartItemId)"
      />
    </div>
    <div v-else class="flex flex-col gap-4 w-full">
      <el-empty description="购物车空空如也" />
    </div>
    <SettlementCard
      class="min-w-48 h-40"
      :total-price="totalPrice"
      @settlement="handleSettlement"
    />
  </div>
</template>

<script lang="ts" setup>
import { useCart } from "~/api/useCart";
import type { CartItem } from "~/types/CartItem";

const {
  cartQuery,
  patchCartItemMutation,
  cartItemQuantityMutation,
  isCheckAll,
  deleteCartItemMutation,
  totalPrice,
} = useCart();
const { data: cartData, isPending, isError, error } = cartQuery;

const handleRemoveCartItem = async (cartItemId: string) => {
  await deleteCartItemMutation.mutateAsync(cartItemId);
};
const handleQuantityChange = (value: number, cartItem: CartItem) => {
  cartItemQuantityMutation.mutateAsync({
    productId: cartItem.product.productId,
    quantity: value,
  });
};

const handleCheckedChange = (value: boolean, cartItem: CartItem) => {
  patchCartItemMutation.mutateAsync({
    cartItemId: cartItem.cartItemId,
    checked: value,
  });
};
const handleSettlement = async () => {
  // const data = 1;
  // if (!data) {
  //   ElMessage({
  //     type: "warning",
  //     message: "请选择商品",
  //   });
  //   return;
  // }
  // ElMessageBox.confirm(
  //   `订单号：${data?.id}\n共: ￥${data?.orderTotal}`,
  //   "结账",
  //   {
  //     confirmButtonText: "前去支付",
  //     cancelButtonText: "暂不支付",
  //     type: "success",
  //     center: true,
  //   },
  // )
  //   .then(() => {
  //     const router = useRouter();
  //     router.push(`/orders/${data?.id}`);
  //   })
  //   .catch(() => {
  //     ElMessage({
  //       type: "info",
  //       message: "已取消支付",
  //     });
  //   });
};
</script>
