<template>
  <el-card>
    <div class="grid grid-cols-2">
      <product-image-display
        class="size-36"
        :product-image="orderItem.product.productImage"
      ></product-image-display>
      <div class="flex justify-center flex-col gap-2">
        <h1>
          {{ orderItem.product.productName }}
        </h1>
        <div class="flex items-center gap-2">
          <span class="text-lg">
            ¥{{
              (
                orderItem.product.productPrice *
                orderItem.product.productDiscount
              ).toFixed(2)
            }}
          </span>
          <span class="text-gray-500 line-through">
            ¥{{ orderItem.product.productPrice.toFixed(2) }}
          </span>
          <el-tag type="danger" size="small">
            {{ (orderItem.product.productDiscount * 10).toFixed(1) }}折
          </el-tag>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-gray-500">数量：</span>
          <span>
            {{ orderItem.quantity }}
          </span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import type { OrderItem } from "~/types/OrderItem";

defineProps<{ orderItem: OrderItem }>();
</script>
