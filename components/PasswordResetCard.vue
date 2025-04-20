<template>
  <el-card>
    <template #header>
      <span>修改密码</span>
    </template>
    <el-form
      ref="passwordFormRef"
      :model="passwordForm"
      :rules="rules"
      label-width="100px"
      class="max-w-108 mx-auto"
    >
      <el-form-item label="当前密码" prop="oldPassword">
        <el-input
          v-model="passwordForm.oldPassword"
          type="password"
          show-password
          placeholder="请输入当前密码"
        />
      </el-form-item>

      <el-form-item label="新密码" prop="newPassword">
        <el-input
          v-model="passwordForm.newPassword"
          type="password"
          show-password
          placeholder="请输入新密码"
        />
      </el-form-item>

      <el-form-item label="确认新密码" prop="confirmPassword">
        <el-input
          v-model="passwordForm.confirmPassword"
          type="password"
          show-password
          placeholder="请再次输入新密码"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" :loading="isPending" @click="submitForm"
          >修改密码</el-button
        >
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { useMe } from "~/api/useMe";

const { patchPasswordMutation } = useMe();

const { isPending } = patchPasswordMutation;

// 表单引用
const passwordFormRef = ref();

// 表单数据
const passwordForm = ref({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});

// 表单验证规则
const rules = {
  oldPassword: passwordRules,
  newPassword: passwordRules,
  confirmPassword: [
    { required: true, message: "请再次输入新密码", trigger: "blur" },
    {
      validator: (rule: any, value: string, callback: any) => {
        if (value !== passwordForm.value.newPassword) {
          callback(new Error("两次输入的密码不一致"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
};

// 提交表单
const submitForm = async () => {
  if (!passwordFormRef.value) return;

  await passwordFormRef.value.validate(async (valid: any) => {
    if (valid) {
      try {
        patchPasswordMutation.mutate({
          oldPassword: passwordForm.value.oldPassword,
          newPassword: passwordForm.value.newPassword,
        });

        ElMessage.success("密码修改成功");
        resetForm();
      } catch (error) {
        console.error("修改密码失败:", error);
        ElMessage.error("密码修改失败，请稍后重试");
      }
    }
  });
};

// 重置表单
const resetForm = () => {
  if (passwordFormRef.value) {
    passwordFormRef.value.resetFields();
  }
};
</script>
