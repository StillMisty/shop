<template>
  <el-card>
    <template #header>
      <span>我的钱包</span>
    </template>
    <div class="flex justify-center items-center gap-12">
      <div class="text-center">
        <div class="text-sm text-gray-500 mb-2">当前余额</div>
        <div class="flex items-baseline justify-center">
          <span class="text-xl text-blue-500 mr-1">¥</span>
          <span class="text-3xl font-bold text-blue-500">{{
            formatBalance(wallet)
          }}</span>
          <span class="text-base text-gray-600 ml-1">元</span>
        </div>
      </div>
      <div>
        <el-button type="primary"><Plus :size="18" />充值</el-button>
        <el-button type="info"><Files :size="18" />交易记录</el-button>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { Plus, Files } from "lucide-vue-next";

defineProps<{
  wallet: number;
}>();

// 格式化余额显示，保留两位小数
const formatBalance = (value: number): string => {
  return value.toFixed(2);
};
</script>
