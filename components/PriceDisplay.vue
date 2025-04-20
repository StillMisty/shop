<template>
  <p class="text-red-500">
    <span class="text-xs">¥</span> {{ integer }}.<span class="text-xs">{{
      decimal
    }}</span>
  </p>
</template>

<script lang="ts" setup>
const { price } = defineProps({
  price: {
    type: Number,
    required: false,
    default: 0,
  },
});

// 拆分价格整数部分和小数部分
const integer = computed(() => {
  const temp = price.toFixed(2).split(".");
  return temp[0];
});

const decimal = computed(() => {
  const temp = price.toFixed(2).split(".");
  return temp[1].padEnd(2, "0");
});
</script>
