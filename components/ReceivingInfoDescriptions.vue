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
          :is-exit-address="isExistAddress"
          ><AddressItemCard
            v-for="address in addressList"
            :key="address.addressId"
            :address="address"
            ><el-button
              type="primary"
              text
              size="small"
              @click.stop="handleClickAddressItemCard(address)"
              ><MousePointer2 />选择</el-button
            >
          </AddressItemCard>
        </AddressCard>
      </el-drawer>
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
import { User, Phone, MapPinHouse, MousePointer2 } from "lucide-vue-next";
import { useAddress } from "~/api/useAddress";
import { useOrder } from "~/api/useOrder";
import type { Address } from "~/types/Address";
import type { AddressChangeRequest } from "~/types/DTO/AddressChangeRequest";

const { receivingInfo, orderId } = defineProps<{
  receivingInfo: AddressChangeRequest;
  orderId: string;
}>();

const isDrawerVisible = ref(false);

const { addressQuery, isExistAddress } = useAddress();
const { data: addressList } = addressQuery;

const { updateOrderAddressMutation } = useOrder();

const handleClickAddressItemCard = async (address: Address) => {
  await updateOrderAddressMutation.mutateAsync({
    orderId,
    addressChangeRequest: {
      name: address.name,
      phone: address.phone,
      address: address.address,
    },
  });
  isDrawerVisible.value = false;
};
</script>
