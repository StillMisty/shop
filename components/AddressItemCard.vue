<template>
  <el-card shadow="hover">
    <div class="flex justify-between items-start mb-2">
      <div class="flex gap-2 items-center">
        <span class="font-bold text-base">{{ address.name }}</span>
        <span class="text-gray-500">{{ address.phone }}</span>
        <el-tag v-if="address.isDefault" size="small" type="success"
          >默认</el-tag
        >
      </div>
      <el-tooltip
        content="设为默认地址"
        placement="top"
        :disabled="address.isDefault"
      >
        <el-switch
          :model-value="address.isDefault"
          class="ml-2"
          @update:model-value="handleUpdateDefaultAddress"
        />
      </el-tooltip>
    </div>

    <p class="mb-4 text-gray-300">{{ address.address }}</p>
    <el-divider />
    <div class="flex justify-end gap-2">
      <el-button
        type="primary"
        text
        size="small"
        @click.stop="handleOpenUpdateAddressForm(address)"
      >
        <Edit /> 编辑
        <!-- 弹出编辑地址表单 -->
        <address-change-dialog
          :is-dialog-visible="isUpdateAddressDialogVisible"
          :address-form="currentEditAddress"
          @submit-address="
            currentEditAddress &&
            handleUpdateAddress(currentEditAddress.addressId, $event)
          "
          @update:is-dialog-visible="isUpdateAddressDialogVisible = $event"
        />
      </el-button>

      <el-button
        type="danger"
        text
        size="small"
        @click.stop="handleDeleteAddress(address.addressId)"
      >
        <Delete /> 删除
      </el-button>
      <slot></slot>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { Edit, Delete } from "lucide-vue-next";
import { useAddress } from "~/api/useAddress";
import type { Address } from "~/types/Address";
import type { AddressChangeRequest } from "~/types/DTO/AddressChangeRequest";

const { address } = defineProps<{
  address: Address;
}>();

const isUpdateAddressDialogVisible = ref(false);

const currentEditAddress = ref<Address | null>(null);
const handleOpenUpdateAddressForm = (address: Address) => {
  currentEditAddress.value = address;
  isUpdateAddressDialogVisible.value = true;
};
const {
  patchAddressMutation,
  deleteAddressMutation,
  updateDefaultAddressMutation,
} = useAddress();

const handleUpdateAddress = async (
  addressId: number,
  addressForm: AddressChangeRequest,
) => {
  await patchAddressMutation.mutateAsync({
    addressId,
    addressChangeRequest: addressForm,
  });
  isUpdateAddressDialogVisible.value = false;
};

const handleDeleteAddress = async (addressId: number) => {
  await deleteAddressMutation.mutateAsync(addressId);
};

const handleUpdateDefaultAddress = async (
  isDefault: string | number | boolean,
) => {
  await updateDefaultAddressMutation.mutateAsync({
    addressId: address.addressId,
    isDefault: Boolean(isDefault),
  });
};
</script>
