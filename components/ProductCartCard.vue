<template>
  <el-card shadow="hover">
    <div class="flex flex-row items-center justify-between">
      <div class="flex items-center gap-4">
        <el-switch
          :model-value="props.checked"
          @update:model-value="
            emit('update:checked', ($event = !props.checked))
          "
        />
        <ProductImageDisplay
          :product-image="product.productImage"
          class="w-48 h-48 cursor-pointer"
          @click="handleClickImage"
        ></ProductImageDisplay>
      </div>
      <div class="w-42">
        <el-text truncated>{{ props.product.productName }}</el-text>
        <ProductPriceDisplay
          :price="props.product.productPrice"
          :discount="props.product.productDiscount"
        />
      </div>

      <el-input-number
        :model-value="props.quantity"
        :min="1"
        :max="props.product.productStock"
        :step="1"
        label="数量"
        @update:model-value="emit('update:quantity', $event ?? 1)"
      />
      <el-button type="danger" @click="() => emit('remove', props.cartItemId)">
        删除</el-button
      >
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import type { CartItem } from "~/types/CartItem";

const props = defineProps<CartItem>();
const emit = defineEmits<{
  "update:quantity": [value: number];
  "update:checked": [value: boolean];
  remove: [id: string];
}>();

const handleClickImage = () => {
  useRouter().push(`/products/${props.product.productId}`);
};
</script>
