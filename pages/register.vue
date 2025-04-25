<template>
  <div
    class="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md space-y-8">
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-bold tracking-tight">创建账号</h2>
        <p class="mt-2 text-sm text-gray-600">
          或者
          <NuxtLink
            to="/login"
            class="font-medium text-blue-600 hover:text-blue-500"
          >
            返回登录
          </NuxtLink>
        </p>
      </div>

      <el-card class="mt-8 shadow-md mb-54">
        <el-form
          ref="formRef"
          :model="registerRequest"
          :rules="rules"
          status-icon
          class="space-y-6"
        >
          <el-form-item prop="username">
            <el-input
              v-model="registerRequest.username"
              placeholder="用户名"
              :prefix-icon="User"
              size="large"
              class="rounded-md"
            />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="registerRequest.password"
              type="password"
              placeholder="密码"
              :prefix-icon="Lock"
              size="large"
              show-password
              class="rounded-md"
            />
          </el-form-item>

          <el-form-item prop="confirmPassword">
            <el-input
              v-model="registerRequest.confirmPassword"
              type="password"
              placeholder="确认密码"
              :prefix-icon="Lock"
              size="large"
              show-password
              class="rounded-md"
            />
          </el-form-item>

          <div>
            <el-button
              type="primary"
              :loading="loading"
              class="w-full py-3 text-base font-medium"
              size="large"
              :disabled="!formIsValid"
              @click="submitForm"
            >
              注册
            </el-button>
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { User, Lock } from "@element-plus/icons-vue";
import type { FormInstance, FormRules } from "element-plus";
import { useAuth } from "~/api/useAuth";

definePageMeta({
  layout: "auth",
});

const registerRequest = ref({
  password: "",
  username: "",
  confirmPassword: "",
});

const loading = ref(false);
const formRef = ref<FormInstance>();
const formIsValid = computed(
  () =>
    registerRequest.value.username &&
    registerRequest.value.password &&
    registerRequest.value.confirmPassword === registerRequest.value.password,
);

const rules: FormRules = {
  username: usernameRules,
  password: passwordRules,
  confirmPassword: [
    { required: true, message: "请再次输入密码", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        console.log(value, registerRequest.value.password);

        if (value !== registerRequest.value.password) {
          callback(new Error("两次输入的密码不一致"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
};

const { register } = useAuth();

const submitForm = async () => {
  if (!formRef.value) return;

  await formRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true;

      try {
        await register({
          username: registerRequest.value.username,
          password: registerRequest.value.password,
        });
        // 登录成功，会自动触发 loginMutation 中的 onSuccess 回调
        // 可以在这里进行其他操作，比如导航到首页
        navigateTo("/");
      } catch (error) {
        console.error("登录失败:", error);
      } finally {
        loading.value = false;
      }
    }
  });
};
</script>
