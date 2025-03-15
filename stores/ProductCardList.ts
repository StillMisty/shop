import type { ProductCardType } from "~/types/ProductCardType";

export const useMyProductCardListStore = defineStore(
  "myProductCardList",
  () => {
    const loading = ref(true);
    // 所有商品
    const productCardList = ref<ProductCardType[]>([]);
    // 显示的商品
    const product2Show = ref<ProductCardType[]>([]);

    const fetchProductCard = async () => {
      loading.value = true;
      const { data } = await useFetch("/api/product");
      productCardList.value = data.value ?? [];
      product2Show.value = data.value ?? [];
      loading.value = false;
    };

    const searchProduct = (keyword: string) => {
      product2Show.value = productCardList.value.filter((item) => {
        return item.name.includes(keyword);
      });
    };
    return {
      productCardList,
      product2Show,
      loading,
      searchProduct,
      fetchProductCard,
    };
  },
);
