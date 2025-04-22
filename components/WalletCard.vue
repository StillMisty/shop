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
        <el-button type="primary" @click="handleWalletRecharge"
          ><Plus :size="18" />充值</el-button
        >
        <el-button type="info"><Files :size="18" />交易记录</el-button>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { Plus, Files } from "lucide-vue-next";
import { useWallet } from "~/api/useWallet";

defineProps<{
  wallet: number;
}>();

const { walletRechargeMutation } = useWallet();

// 格式化余额显示，保留两位小数
const formatBalance = (value: number): string => {
  return value.toFixed(2);
};

const handleWalletRecharge = () => {
  ElMessageBox.prompt("请输入充值金额", "充值", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    inputPattern: /^\d+(\.\d{1,2})?$/,
    inputErrorMessage: "请输入有效的金额",
  })
    .then(({ value }) => {
      // 处理充值逻辑
      const amount = parseFloat(value);
      if (isNaN(amount) || amount <= 0) {
        ElMessage.error("请输入有效的充值金额");
        return;
      }
      // 调用充值接口
      walletRechargeMutation.mutate({
        amount,
      });
    })
    .catch(() => {
      console.log("充值取消");
    });
};
</script>
