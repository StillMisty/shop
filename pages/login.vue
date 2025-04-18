<template>
  <div
    class="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md space-y-8">
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-bold tracking-tight">登陆账号</h2>
        <p class="mt-2 text-sm text-gray-600">
          或者
          <NuxtLink
            to="/register"
            class="font-medium text-blue-600 hover:text-blue-500"
          >
            进行注册
          </NuxtLink>
        </p>
      </div>

      <el-card class="mt-8 shadow-md mb-54">
        <el-form
          :model="LoginRequest"
          :rules="rules"
          ref="formRef"
          status-icon
          class="space-y-6"
        >
          <el-form-item prop="username">
            <el-input
              v-model="LoginRequest.username"
              placeholder="用户名"
              :prefix-icon="User"
              size="large"
              class="rounded-md"
            />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="LoginRequest.password"
              type="password"
              placeholder="密码"
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
              @click="submitForm"
              class="w-full py-3 text-base font-medium"
              size="large"
              :disabled="!formIsValid"
            >
              登陆
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
import type { LoginRequest } from "~/types/LoginRequest";

definePageMeta({
  layout: "auth",
});

const LoginRequest: Ref<LoginRequest> = ref({
  password: "",
  username: "",
});

const loading = ref(false);
const formRef = ref<FormInstance>();
const formIsValid = computed(
  () => LoginRequest.value.username && LoginRequest.value.password,
);

const rules: FormRules = {
  username: usernameRules,
  password: passwordRules,
};

const { login } = useAuth();

const submitForm = async () => {
  if (!formRef.value) return;

  await formRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true;

      try {
        await login(LoginRequest.value);
        // 登录成功，会自动触发 loginMutation 中的 onSuccess 回调
        // 可以在这里进行其他操作，比如导航到首页
        const route = useRoute();
        route.query.redirect = route.query.redirect || "/";
        const router = useRouter();
        router.push(route.query.redirect as string);
      } catch (error) {
        console.error("登录失败:", error);
      } finally {
        loading.value = false;
      }
    }
  });
};
</script>
