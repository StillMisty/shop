<template>
  <div class="h-full">
    <div v-if="isLoading" class="flex items-center justify-center h-full">
      <LoaderCircle class="animate-spin" :size="48" />
    </div>
    <div v-else-if="order" class="flex flex-col items-center p-16 gap-8">
      <el-card class="w-full max-w-2xl">
        <OrderStatusSteps :order-status="order.orderStatus" />
      </el-card>
      <ReceivingInfoDescriptions
        :receiving-info="order"
        :order-id="orderId"
        :order-status="order.orderStatus"
        @update-order-address="handleUpdateOrderAddress"
      />
      <OrderInfoCard :order="order"></OrderInfoCard>
      <div class="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-4">
        <OrderProductItemCard
          v-for="orderItem in order.orderItems"
          :key="orderItem.id"
          :order-item="orderItem"
          class="cursor-pointer"
          @click="handleClickProductItem(orderItem.product.productId)"
        ></OrderProductItemCard>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LoaderCircle } from "lucide-vue-next";
import { useOrder } from "~/api/useOrder";
import type { AddressChangeRequest } from "~/types/DTO/AddressChangeRequest";

const route = useRoute();
const orderId = route.params.id as string;

const { orderByIdQuery, updateOrderAddressMutation } = useOrder();
const { isLoading, data: order } = orderByIdQuery(orderId);

const handleUpdateOrderAddress = async (
  addressChangeRequest: AddressChangeRequest,
) => {
  await updateOrderAddressMutation.mutateAsync({
    orderId,
    addressChangeRequest,
  });
};

const handleClickProductItem = (productId: string) => {
  useRouter().push(`/products/${productId}`);
};
</script>
