<template>
  <el-descriptions
    border
    title="收货地址"
    size="large"
    :column="2"
    class="w-full max-w-3xl"
  >
    <template #extra>
      <el-button type="primary" @click="handleUpdateReceivingInfo"
        >确认修改</el-button
      >
    </template>
    <el-descriptions-item>
      <template #label>
        <div class="flex items-center gap-4"><User />收件人</div>
      </template>
      <el-input v-model="changeReceivingInfo.name" placeholder="请输入收件人" />
    </el-descriptions-item>
    <el-descriptions-item
      ><template #label>
        <div class="flex items-center gap-4"><Phone />电话</div>
      </template>
      <el-input v-model="changeReceivingInfo.phone" placeholder="请输入电话" />
    </el-descriptions-item>
    <el-descriptions-item
      ><template #label>
        <div class="flex items-center gap-4"><MapPinHouse />地址</div>
      </template>
      <el-input
        v-model="changeReceivingInfo.address"
        type="textarea"
        :rows="2"
        resize="none"
        placeholder="请输入地址"
      />
    </el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts" setup>
import { User, Phone, MapPinHouse } from "lucide-vue-next";
import type { ReceivingInfoType } from "~/types/ReceivingInfoType";

const { receivingInfo } = defineProps<{ receivingInfo: ReceivingInfoType }>();

const changeReceivingInfo = ref(Object.assign({}, receivingInfo));

const handleUpdateReceivingInfo = () => {
  if (changeReceivingInfo.value.name === "") {
    ElMessage.error("请输入收件人");
    return;
  }
  if (changeReceivingInfo.value.phone === "") {
    ElMessage.error("请输入电话");
    return;
  }
  if (changeReceivingInfo.value.address === "") {
    ElMessage.error("请输入地址");
    return;
  }

  // TODO 调用API更新收货地址

  ElMessage.success("修改成功");
};
</script>
