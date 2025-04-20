import { useQuery } from "@tanstack/vue-query";

export function useProduct() {
  const apiUrl = useRuntimeConfig().public.apiUrl;

  const getProductInfo = async (productId: string) => {
    const data = await $fetch(`${apiUrl}/api/products/${productId}`, {
      method: "GET",
    });
    return data;
  };

  const productInfoQuery = (productId: string) =>
    useQuery({
      queryKey: ["productInfo", productId],
      queryFn: () => getProductInfo(productId),
      refetchOnWindowFocus: false,
    });

  return { productInfoQuery };
}
