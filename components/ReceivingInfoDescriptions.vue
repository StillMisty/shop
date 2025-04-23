<template>
  <el-descriptions
    border
    title="收货地址"
    size="large"
    :column="2"
    class="w-full max-w-3xl"
  >
    <template #extra>
      <el-button type="primary" @click="isDrawerVisible = true"
        >修改地址</el-button
      >
      <el-drawer
        v-model="isDrawerVisible"
        size="80%"
        direction="btt"
        title="修改地址"
      >
        <AddressCard
          v-if="addressList"
          class="max-w-4xl mx-auto"
          :is-drawer-visible="isDrawerVisible"
          :address-list="addressList"
          @add-address="handleAddAddress"
          @update-address="handleUpdateAddress"
          @delete-address="handleDeleteAddress"
          @update-default-address="handleUpdateDefaultAddress"
      /></el-drawer>
    </template>
    <el-descriptions-item label-width="120">
      <template #label>
        <div class="flex items-center gap-4"><User />收件人</div>
      </template>
      {{ receivingInfo.name }}
    </el-descriptions-item>
    <el-descriptions-item label-width="120">
      <template #label>
        <div class="flex items-center gap-4"><Phone />电话</div>
      </template>
      {{ receivingInfo.phone }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="flex items-center gap-4"><MapPinHouse />地址</div>
      </template>
      {{ receivingInfo.address }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts" setup>
import { User, Phone, MapPinHouse } from "lucide-vue-next";
import { useAddress } from "~/api/useAddress";
import type { AddressChangeRequest } from "~/types/DTO/AddressChangeRequest";

const { receivingInfo } = defineProps<{
  receivingInfo: AddressChangeRequest;
}>();

const emit = defineEmits<{
  updateOrderAddress: [address: AddressChangeRequest];
}>();

const isDrawerVisible = ref(false);

const {
  addressQuery,
  addressDetailQuery,
  postAddressMutation,
  patchAddressMutation,
  updateDefaultAddressMutation,
  deleteAddressMutation,
} = useAddress();

const { data: addressList } = addressQuery;

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

const handleUpdateDefaultAddress = async (addressId: number) => {
  // 先更新默认地址
  await updateDefaultAddressMutation.mutateAsync({
    addressId,
    isDefault: true,
  });
  // 然后获取地址详情
  // TODO
  const { data } = addressDetailQuery(addressId);
  if (data && data.value) {
    emit("updateOrderAddress", data.value as AddressChangeRequest);
    console.log("更新地址成功", data.value);
  }
};
</script>
