<template>
  <div class="flex items-center justify-between p-4 border-b">
    <div class="flex items-center">
      <img :src="product.productImage" alt="Product Image" class="w-16 h-16 object-cover mr-4" />
      <div>
        <h3 class="text-lg font-semibold">{{ product.productName }}</h3>
        <p class="text-gray-600">{{ product.productDescription }}</p>
        <p class="text-red-500">￥{{ product.productPrice.toFixed(2) }}</p>
      </div>
    </div>
    <div class="flex items-center">
      <el-input-number
        v-model="quantity"
        :min="1"
        :max="product.productStock"
        class="mr-4"
      />
      <el-checkbox v-model="checked">选择</el-checkbox>
      <el-button type="danger" @click="removeProduct">移除</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue';
import { Product } from '@/types/Product';

const props = defineProps<{
  product: Product;
  modelValue: number;
  checked: boolean;
}>();

const emit = defineEmits(['update:modelValue', 'update:checked', 'remove']);

const quantity = ref(props.modelValue);
const checked = ref(props.checked);

watch(quantity, (newQuantity) => {
  emit('update:modelValue', newQuantity);
});

watch(checked, (newChecked) => {
  emit('update:checked', newChecked);
});

const removeProduct = () => {
  emit('remove', props.product.productId);
};
</script>

<style scoped>
/* Add any specific styles for ProductCartCard here */
</style>