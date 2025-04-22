<template>
  <div class="h-full">
    <div v-if="isPending" class="flex items-center justify-center h-full">
      <LoaderCircle :size="64" class="animate-spin" />
    </div>
    <div
      v-else-if="isError"
      class="flex flex-col items-center justify-center h-full text-red-500"
    >
      <div class="flex mr-2"><TriangleAlert />加载失败，请稍后再试</div>
      <p>{{ error?.message }}</p>
      <RefreshCw
        :size="36"
        class="mt-2 cursor-pointer transition-all hover:rotate-180"
        @click="handleRefresh"
      />
    </div>

    <div
      v-else-if="meInfo && meInfo.success"
      class="max-w-4xl mx-auto py-8 px-4"
    >
      <MeInfoCard :me-info="meInfo.data" class="mb-6" />
      <WalletCard :wallet="meInfo.data.wallet" class="mb-6" />
      <PasswordResetCard class="mb-6" />
      <!-- 加载状态 -->
      <div v-if="addressIsPending" class="flex justify-center items-center">
        <el-skeleton :rows="10" animated />
      </div>
      <AddressCard
        v-if="addressData"
        :address-list="addressData"
        class="mb-6"
        @add-address="handleAddAddress"
        @update-address="handleUpdateAddress"
        @delete-address="handleDeleteAddress"
        @update-default-address="handleUpdateDefaultAddress"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LoaderCircle, TriangleAlert, RefreshCw } from "lucide-vue-next";
import { useAddress } from "~/api/useAddress";
import { useMe } from "~/api/useMe";
import type { AddressChangeRequest } from "~/types/DTO/AddressChangeRequest";

// 需要登录才能访问
definePageMeta({
  requiresAuth: true,
});

const { meInfoQuery } = useMe();
const {
  addressQuery,
  postAddressMutation,
  patchAddressMutation,
  deleteAddressMutation,
  updateDefaultAddressMutation,
} = useAddress();

const { isPending, isError, data: meInfo, error } = meInfoQuery;
const { isPending: addressIsPending, data: addressData } = addressQuery;

const handleAddAddress = async (addressForm: AddressChangeRequest) => {
  await postAddressMutation.mutateAsync(addressForm);
};

const handleUpdateAddress = async (
  addressId: number,
  addressForm: AddressChangeRequest,
) => {
  await patchAddressMutation.mutateAsync({
    addressId,
    addressChangeRequest: addressForm,
  });
};

const handleDeleteAddress = async (addressId: number) => {
  await deleteAddressMutation.mutateAsync(addressId);
};

const handleUpdateDefaultAddress = async (
  addressId: number,
  isDefault: boolean,
) => {
  await updateDefaultAddressMutation.mutateAsync({
    addressId,
    isDefault,
  });
};

const handleRefresh = () => {
  meInfoQuery.refetch();
  ElMessage({
    message: "正在刷新数据...",
    type: "info",
  });
};
</script>
