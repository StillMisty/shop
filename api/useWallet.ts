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

    return response;
  };

  const walletRechargeMutation = useMutation({
    mutationFn: walletRecharge,
    onSuccess: (res) => {
      if (res.success) {
        queryClient.setQueryData(["meInfo"], res);
      }
    },
  });

  return {
    walletRechargeMutation,
  };
}
