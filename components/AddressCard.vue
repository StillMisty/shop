<template>
  <el-card>
    <template #header>
      <span>地址管理</span>
    </template>
    <el-button type="primary" class="mb-4" @click="handleOpenAddAddressFrom">
      <Plus />添加地址
    </el-button>
    <!-- 弹出添加地址表单 -->
    <address-change-dialog
      :is-dialog-visible="isAddAddressDialogVisible"
      @submit-address="handleAddAddress"
      @update:is-dialog-visible="isAddAddressDialogVisible = $event"
    />

    <div v-auto-animate class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- 地址卡片插槽 -->
      <slot></slot>
    </div>

    <div v-if="!isExitAddress" class="text-center py-8 text-gray-500">
      <el-icon class="text-2xl mb-2"><MapPinOff /></el-icon>
      <p>暂无地址信息，请添加收货地址</p>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { Plus, MapPinOff } from "lucide-vue-next";
import { useAddress } from "~/api/useAddress";
import type { Address } from "~/types/Address";
import type { AddressChangeRequest } from "~/types/DTO/AddressChangeRequest";

const isAddAddressDialogVisible = ref(false);
defineProps<{
  isExitAddress: boolean;
}>();

defineEmits<{
  clickAddressItemCard: [address: Address];
}>();

const handleOpenAddAddressFrom = () => {
  isAddAddressDialogVisible.value = true;
};

const { postAddressMutation } = useAddress();

const handleAddAddress = async (addressForm: AddressChangeRequest) => {
  await postAddressMutation.mutateAsync(addressForm);
  isAddAddressDialogVisible.value = false;
};
</script>
