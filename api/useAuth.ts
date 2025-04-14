import { useMutation } from "@tanstack/vue-query";
import type { ApiResponse } from "~/types/DTO/ApiResponse";
import type { LoginResponse } from "~/types/DTO/LoginResponse";
import type { LoginRequest } from "~/types/LoginRequest";

export function useAuth() {
  const apiUrl = useRuntimeConfig().public.apiUrl;

  const authToken = useState<string | null>("auth-token", () => null);

  // 从 localStorage 获取令牌
  const initAuth = () => {
    if (import.meta.client) {
      const savedToken = localStorage.getItem("auth-token");
      if (savedToken) {
        authToken.value = savedToken;
      }
    }
  };

  // 仅在客户端调用初始化
  if (import.meta.client) {
    initAuth();
  }

  // 保存令牌到 localStorage
  const saveToken = (token: string) => {
    if (import.meta.client) {
      localStorage.setItem("auth-token", token);
      authToken.value = token;
    }
  };

  // 清除 localStorage 中的令牌
  const clearToken = () => {
    if (import.meta.client) {
      localStorage.removeItem("auth-token");
      authToken.value = null;
    }
  };

  const register = async (
    userData: LoginRequest,
  ): Promise<ApiResponse<LoginResponse>> => {
    const data = await $fetch<ApiResponse<LoginResponse>>(
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
    const data = await $fetch<ApiResponse<LoginResponse>>(
      `${apiUrl}/api/auth/login`,
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
        saveToken(response.data.token); // 使用辅助函数保存令牌
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
        saveToken(data.data.token); // 使用辅助函数保存令牌
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
    clearToken(); // 使用辅助函数清除令牌
    ElMessage.success("已登出");
  };

  const isAuthenticated = computed(() => !!authToken.value);

  return {
    register: registerMutation.mutateAsync,
    login: loginMutation.mutateAsync,
    logout,
    isRegistering: registerMutation.isPending,
    isLoggingIn: loginMutation.isPending,
    registerError: registerMutation.error,
    loginError: loginMutation.error,
    token: readonly(authToken),
    isAuthenticated,
  };
}
