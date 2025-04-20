import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import type { ApiResponse } from "~/types/DTO/ApiResponse";
import type { PasswordResetRequest } from "~/types/DTO/PasswordResetRequest";
import type { Users } from "~/types/Users";

export function useMe() {
  const queryClient = useQueryClient();

  const apiUrl = useRuntimeConfig().public.apiUrl;

  const getMeInfo = async (): Promise<ApiResponse<Users>> => {
    const data = await $fetch<ApiResponse<Users>>(`${apiUrl}/api/users/me`, {
      method: "GET",
    });
    return data;
  };

  const patchPassword = async (
    passwordResetRequest: PasswordResetRequest,
  ): Promise<ApiResponse<Users>> => {
    const data = await $fetch<ApiResponse<Users>>(
      `${apiUrl}/api/users/me/password`,
      {
        method: "PATCH",
        body: passwordResetRequest,
      },
    );
    return data;
  };

  const patchNickname = async (
    nickname: string,
  ): Promise<ApiResponse<Users>> => {
    const data = await $fetch<ApiResponse<Users>>(
      `${apiUrl}/api/users/me/nickname`,
      {
        method: "PATCH",
        body: {
          nickname: nickname,
        },
      },
    );
    return data;
  };

  const patchAvatar = async (avatar: File): Promise<ApiResponse<Users>> => {
    const formData = new FormData();
    formData.append("avatar", avatar);
    const data = await $fetch<ApiResponse<Users>>(
      `${apiUrl}/api/users/me/avatar`,
      {
        method: "PATCH",
        body: formData,
      },
    );
    return data;
  };

  const meInfoQuery = useQuery({
    queryKey: ["meInfo"],
    queryFn: getMeInfo,
  });

  const patchPasswordMutation = useMutation({
    mutationFn: (passwordResetRequest: PasswordResetRequest) =>
      patchPassword(passwordResetRequest),
    onSuccess: (res) => {
      console.log("res", res);
      if (res.success) {
        queryClient.setQueryData(["meInfo"], res);
      }
    },
  });

  const patchNicknameMutation = useMutation({
    mutationFn: (nickname: string) => patchNickname(nickname),
    onSuccess: (res) => {
      if (res.success) {
        queryClient.setQueryData(["meInfo"], res);
      }
    },
  });

  const patchAvatarMutation = useMutation({
    mutationFn: (avatar: File) => patchAvatar(avatar),
    onSuccess: (res) => {
      if (res.success) {
        queryClient.setQueryData(["meInfo"], res);
      }
    },
  });

  return {
    meInfoQuery,
    patchPasswordMutation,
    patchNicknameMutation,
    patchAvatarMutation,
  };
}
