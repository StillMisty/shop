<template>
  <div>
    <el-dialog
      :model-value="isDialogVisible"
      title="添加地址"
      @update:model-value="$emit('update:isDialogVisible', $event)"
    >
      <el-form
        ref="addressFormRef"
        label-width="100px"
        class="max-w-108 mx-auto"
        :rules="rules"
        :model="addressForm2Show"
      >
        <el-form-item label="收货人" prop="name">
          <el-input v-model="addressForm2Show.name" />
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="addressForm2Show.phone" />
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="addressForm2Show.address" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="$emit('update:isDialogVisible', false)"
          >取消</el-button
        >
        <el-button type="primary" @click="handleSubmitForm(addressFormRef)"
          >确定</el-button
        >
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import type { FormInstance } from "element-plus";
import type { AddressChangeRequest } from "~/types/DTO/AddressChangeRequest";

const props = defineProps<{
  isDialogVisible: boolean;
  addressForm?: AddressChangeRequest | null;
}>();
const emit = defineEmits<{
  "update:isDialogVisible": [value: boolean];
  submitAddress: [addressForm: AddressChangeRequest];
}>();
const rules = {
  name: nameRules,
  phone: phoneRules,
  address: addressRules,
};

// 要展示的地址表单数据
const addressForm2Show = ref<AddressChangeRequest>({
  name: "",
  phone: "",
  address: "",
});

watch(
  () => props.addressForm,
  (newVal) => {
    if (newVal) {
      addressForm2Show.value = { ...newVal };
    } else {
      // 如果父组件传入null或undefined，重置表单
      addressForm2Show.value = {
        name: "",
        phone: "",
        address: "",
      };
    }
  },
  { immediate: true }, // 组件挂载时也会执行一次
);

const addressFormRef = ref<FormInstance>();

const handleSubmitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      emit("submitAddress", addressForm2Show.value);
    } else {
      ElMessage.error("表单验证失败，请检查输入");
    }
  });
};
</script>
