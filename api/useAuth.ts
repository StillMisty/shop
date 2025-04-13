import { useMutation } from "@tanstack/vue-query";
import type { ApiResponse } from "~/types/DTO/ApiResponse";
import type { LoginResponse } from "~/types/DTO/LoginResponse";
import type { LoginRequest } from "~/types/LoginRequest";

export function useAuth() {
  const apiUrl = useRuntimeConfig().public.apiUrl;

  const token = useLocalStorage("auth-token", "");

  const register = async (
    userData: LoginRequest,
  ): Promise<ApiResponse<LoginResponse>> => {
    const data: ApiResponse<LoginResponse> = await $fetch(
      `${apiUrl}/api/auth/register`,
      {
        method: "POST",
        body: userData,
      },
    );
    return data;
  };

  const login = async (
    userData: LoginRequest,
  ): Promise<ApiResponse<LoginResponse>> => {
    const data: ApiResponse<LoginResponse> = await $fetch(
      `${apiUrl}/auth/login`,
      {
        method: "POST",
        body: userData,
      },
    );
    return data;
  };

  /**
   * 用户注册操作
   */
  const registerMutation = useMutation({
    mutationFn: (userData: LoginRequest) => register(userData),
    onSuccess: (response) => {
      if (response.success && response.data?.token) {
        token.value = response.data.token;
        ElMessage.success("注册成功！");
      } else {
        // API返回了成功状态但业务逻辑失败
        throw new Error(response.message);
      }
    },
    onError: (error) => {
      ElMessage.error(error.message || "注册失败");
    },
  });

  /**
   * 用户登录操作
   */
  const loginMutation = useMutation({
    mutationFn: (userData: LoginRequest) => login(userData),
    onSuccess: (data) => {
      if (data.data?.token) {
        token.value = data.data.token;
        ElMessage.success("登录成功！");
      }
    },
    onError: (error) => {
      if (error) {
        ElMessage.error("用户名或密码错误");
      } else {
        ElMessage.error("登录失败，请稍后再试");
      }
    },
  });

  const logout = () => {
    token.value = "";
    ElMessage.success("已登出");
  };

  const isAuthenticated = computed(() => !!token.value);

  return {
    register: registerMutation.mutateAsync,
    login: loginMutation.mutateAsync,
    logout,
    isRegistering: registerMutation.isPending,
    isLoggingIn: loginMutation.isPending,
    registerError: registerMutation.error,
    loginError: loginMutation.error,
    token: readonly(token),
    isAuthenticated,
  };
}
