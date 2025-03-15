<template>
  <el-card shadow="hover">
    <div class="flex flex-col justify-between gap-4">
      <h3 class="text-lg">结算明细</h3>
      <div class="flex flex-row justify-between space-x-4">
        <p>合计</p>
        <p class="text-red-500">
          <span class="text-sm">¥</span> {{ totalPrice }}
        </p>
      </div>
      <el-button type="primary" class="w-full" @click="emit('settlement')">
        去结算
      </el-button>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
defineProps({
  totalPrice: Number,
});
const emit = defineEmits(["settlement"]);
</script>
