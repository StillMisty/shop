import { useQuery, useQueryClient } from "@tanstack/vue-query";
import type { Category } from "~/types/Category";
import type { ApiResponse } from "~/types/DTO/ApiResponse";

export function useCategory() {
  const apiUrl = useRuntimeConfig().public.apiUrl;
  const queryClient = useQueryClient();

  const fetchCategories = async () => {
    const res: ApiResponse<Category[]> = await $fetch(
      `${apiUrl}/api/categories/top`,
      {
        method: "GET",
      },
    );
    if (!res.success) {
      // 处理错误情况
      throw new Error(res.message);
    }
    return res.data;
  };

  const fetchCategoryQuery = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  return {
    fetchCategoryQuery,
  };
}
