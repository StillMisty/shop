import type { ApiResponse } from "~/types/DTO/ApiResponse";
import type { ProduceSearchType } from "~/types/DTO/ProductQuery";
import type { ProductCardType } from "~/types/ProductCardType";

export const useMyProductCardListStore = defineStore(
  "myProductCardList",
  () => {
    const loading = ref(true);
    const withLoading = async <T>(action: () => Promise<T>): Promise<T> => {
      loading.value = true;
      try {
        return await action();
      } finally {
        loading.value = false;
      }
    };
    // 显示的商品
    const product2Show = ref<ProductCardType[]>([]);

    const fetchProductCard = async () => {
      product2Show.value = await withLoading(async () => {
        const { data } =
          await useFetch<ApiResponse<ProductCardType[]>>("/api/product");
        return data.value?.data ?? [];
      });
    };

    const fetchProductCardByKeyword = async (
      keyword: string,
      type: ProduceSearchType,
    ) => {
      product2Show.value = await withLoading(async () => {
        const res = await $fetch<ApiResponse<ProductCardType[]>>(
          "/api/product/search",
          {
            query: {
              keyword,
              type,
            },
          },
        );
        return res.data ?? [];
      });
    };

    return {
      product2Show,
      loading,
      fetchProductCard,
      fetchProductCardByKeyword,
    };
  },
);
