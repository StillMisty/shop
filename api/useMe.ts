import { useMutation, useQuery } from "@tanstack/vue-query";
import type { ApiResponse } from "~/types/DTO/ApiResponse";
import type { Users } from "~/types/Users";

export function useMe() {
  const apiUrl = useRuntimeConfig().public.apiUrl;

  const getMeInfo = async (): Promise<ApiResponse<Users>> => {
    const data = await $fetch<ApiResponse<Users>>(`${apiUrl}/api/users/me`, {
      method: "GET",
    });
    return data;
  };

  const meInfoQuery = useQuery({
    queryKey: ["meInfo"],
    queryFn: getMeInfo,
  });

  const meInfo = computed(() => {
    if (meInfoQuery.data.value) {
      return meInfoQuery.data.value.data;
    }
    return null;
  });

  return {
    meInfoQuery,
    meInfo,
  };
}
