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
        <el-image class="size-36" fit="cover" :src="props.product.image" />
      </div>

      <PriceDisplay :price="props.product.price" />
      <el-input-number
        :model-value="props.quantity"
        :min="1"
        :max="999"
        :step="1"
        label="数量"
        @update:model-value="emit('update:quantity', $event ?? 1)"
      />
      <el-button type="danger" @click="() => emit('remove', props.product.id)"
        >删除</el-button
      >
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import type { CartItemType } from "~/types/CartItemType";

const props = defineProps<CartItemType>();
const emit = defineEmits<{
  "update:quantity": [value: number];
  "update:checked": [value: boolean];
  remove: [id: string];
}>();
</script>
