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
      @submit-address="submitAddAddressForm"
      @update:is-dialog-visible="isAddAddressDialogVisible = $event"
    />

    <div v-auto-animate class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <el-card
        v-for="address in addressList"
        :key="address.addressId"
        shadow="hover"
      >
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
              @update:model-value="
                handleUpdateDefaultAddress(
                  address.addressId,
                  !address.isDefault,
                )
              "
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
            @click="handleOpenUpdateAddressForm(address)"
          >
            <Edit /> 编辑
          </el-button>
          <!-- 弹出编辑地址表单 -->
          <address-change-dialog
            :is-dialog-visible="isUpdateAddressDialogVisible"
            :address-form="currentEditAddress"
            @submit-address="
              currentEditAddress &&
              submitUpdateAddressForm(currentEditAddress.addressId, $event)
            "
            @update:is-dialog-visible="isUpdateAddressDialogVisible = $event"
          />
          <el-button
            type="danger"
            text
            size="small"
            @click="handleDeleteAddress(address.addressId)"
          >
            <Delete /> 删除
          </el-button>
        </div>
      </el-card>
    </div>

    <div v-if="!addressList.length" class="text-center py-8 text-gray-500">
      <el-icon class="text-2xl mb-2"><MapPinOff /></el-icon>
      <p>暂无地址信息，请添加收货地址</p>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
// import { vAutoAnimate } from "@formkit/auto-animate";
import { Plus, Edit, Delete, MapPinOff } from "lucide-vue-next";
import type { Address } from "~/types/Address";
import type { AddressChangeRequest } from "~/types/DTO/AddressChangeRequest";

const isAddAddressDialogVisible = ref(false);
const isUpdateAddressDialogVisible = ref(false);
defineProps<{
  addressList: Address[];
}>();

const emit = defineEmits<{
  addAddress: [addressForm: AddressChangeRequest];
  updateAddress: [addressId: number, addressForm: AddressChangeRequest];
  deleteAddress: [addressId: number];
  updateDefaultAddress: [addressId: number, isDefault: boolean];
}>();

const handleOpenAddAddressFrom = () => {
  isAddAddressDialogVisible.value = true;
};

const currentEditAddress = ref<Address | null>(null);
const handleOpenUpdateAddressForm = (address: Address) => {
  currentEditAddress.value = address;
  isUpdateAddressDialogVisible.value = true;
};

const submitAddAddressForm = (addressForm: AddressChangeRequest) => {
  emit("addAddress", addressForm);
  isAddAddressDialogVisible.value = false;
};

const submitUpdateAddressForm = (
  addressId: number,
  addressForm: AddressChangeRequest,
) => {
  emit("updateAddress", addressId, addressForm);
  isUpdateAddressDialogVisible.value = false;
};

const handleUpdateDefaultAddress = (addressId: number, isDefault: boolean) => {
  emit("updateDefaultAddress", addressId, isDefault);
};

const handleDeleteAddress = (addressId: number) => {
  emit("deleteAddress", addressId);
};
</script>
