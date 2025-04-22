import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { ApiResponse } from "~/types/DTO/ApiResponse";
import type { WalletRechargeRequest } from "~/types/DTO/WalletRechargeRequest";
import type { Users } from "~/types/Users";

export function useWallet() {
  const apiUrl = useRuntimeConfig().public.apiUrl;
  const queryClient = useQueryClient();

  const walletRecharge = async (
    walletRechargeRequest: WalletRechargeRequest,
  ) => {
    const response: ApiResponse<Users> = await $fetch(
      `${apiUrl}/api/wallet/recharge`,
      {
        method: "PATCH",
        body: walletRechargeRequest,
      },
    );
    if (!response.success) {
      throw new Error(response.message);
    }

    return response;
  };

  /**
   * 充值钱包
   * @param walletRechargeRequest 充值请求参数
   */
  const walletRechargeMutation = useMutation({
    mutationFn: walletRecharge,
    onSuccess: (res) => {
      queryClient.setQueryData(["meInfo"], res);

      ElMessage({
        message: "充值成功",
        type: "success",
      });
    },
    onError: (error) => {
      ElMessage({
        message: error.message,
        type: "error",
      });
    },
  });

  return {
    walletRechargeMutation,
  };
}
