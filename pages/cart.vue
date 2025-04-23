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
      class="min-w-48 h-40 sticky top-18 self-start"
      :total-price="totalPrice"
      @settlement="handleSettlement"
    />
  </div>
</template>

<script lang="ts" setup>
import { useAddress } from "~/api/useAddress";
import { useCart } from "~/api/useCart";
import { useOrder } from "~/api/useOrder";
import type { CartItem } from "~/types/CartItem";

// 需要登录才能访问
definePageMeta({
  requiresAuth: true,
});

const {
  cartQuery,
  patchCartItemMutation,
  cartItemQuantityMutation,
  isCheckAll,
  deleteCartItemMutation,
  totalPrice,
} = useCart();
const { data: cartData, isPending, isError, error } = cartQuery;

const { checkOrderMutation } = useOrder();

const { addressQuery } = useAddress();

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
  if (!cartData.value || cartData.value.length === 0) return;
  ElMessageBox.confirm(`合计 ${totalPrice.value}`, "是否确认结算？", {
    type: "warning",
    showCancelButton: true,
    cancelButtonText: "取消",
    confirmButtonText: "确定",
  }).then(async () => {
    // 检查是否有地址
    if (!addressQuery.data || addressQuery.data.value?.length === 0) {
      ElMessage.error("请先添加地址");
      return;
    }
    let defaultAddressId = addressQuery.data.value?.find(
      (address) => address.isDefault,
    )?.addressId;
    if (defaultAddressId === undefined) {
      defaultAddressId = addressQuery.data.value?.[0].addressId;
    }
    if (defaultAddressId === undefined) {
      ElMessage.error("找不到有效地址");
      return;
    }
    await checkOrderMutation.mutateAsync({ addressId: defaultAddressId });
  });
};
</script>
