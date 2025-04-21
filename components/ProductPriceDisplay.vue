<template>
  <div class="flex items-center gap-2">
    <PriceDisplay :price="price * discount" />
    <el-text v-if="discount < 1" type="info" size="small" tag="del">
      {{ price.toFixed(2) }}
    </el-text>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  price: number;
  discount: number;
}>();
</script>

<style></style>
