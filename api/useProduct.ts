import { useQuery } from "@tanstack/vue-query";
import type { ApiResponse } from "~/types/DTO/ApiResponse";
import type { PageProductDto } from "~/types/DTO/PageProductDto";
import type { ProductPageRequest } from "~/types/DTO/ProductPageRequest";
import type { Product } from "~/types/Product";

export function useProduct() {
  const apiUrl = useRuntimeConfig().public.apiUrl;

  const fetchProductPage = async (productPageRequest: ProductPageRequest) => {
    const data: ApiResponse<PageProductDto> = await $fetch(
      `${apiUrl}/api/product/list`,
      {
        method: "POST",
        body: productPageRequest,
      },
    );
    if (!data.success) {
      // 处理错误情况
      console.error("Error fetching product page:", data.message);
      throw new Error(data.message);
    }
    return data.data;
  };

  const fetchProduct = async (id: string) => {
    const data: ApiResponse<Product> = await $fetch(
      `${apiUrl}/api/product/${id}`,
      {
        method: "GET",
      },
    );
    if (!data.success) {
      // 处理错误情况
      console.error("Error fetching product page:", data.message);
      throw new Error(data.message);
    }
    return data.data;
  };

  const fetchProductByCategory = async (
    categoryId: string,
    productPageRequest: ProductPageRequest,
  ) => {
    const data: ApiResponse<PageProductDto> = await $fetch(
      `${apiUrl}/api/product/category/${categoryId}`,
      {
        method: "POST",
        body: productPageRequest,
      },
    );
    if (!data.success) {
      // 处理错误情况
      console.error("Error fetching product page:", data.message);
      throw new Error(data.message);
    }
    return data.data;
  };

  /**
   * 产品分页请求的响应类型
   */
  const productPageRequest = ref<ProductPageRequest>({
    page: 0,
    size: 10,
  });

  /**
   * 获取产品分页数据的查询
   * @param productPageRequest 分页请求参数
   * @returns {Product} 查询对象
   */
  const productPageQuery = useQuery({
    queryKey: ["productPage", productPageRequest],
    queryFn: () => fetchProductPage(productPageRequest.value),
    // 禁用自动重新获取以便手动控制
    refetchOnWindowFocus: false,
  });

  /**
   * 更新分页请求的函数
   * @param newRequest 新的请求参数
   */
  const updatePageRequest = (newRequest: Partial<ProductPageRequest>) => {
    productPageRequest.value = {
      ...productPageRequest.value,
      ...newRequest,
    };
  };

  /**
   * 跳转到指定页码的函数
   * @param page 页码
   */
  const goToPage = (page: number) => {
    updatePageRequest({ page });
  };

  /**
   * 设置每页大小的函数
   * @param size 每页大小
   */
  const setPageSize = (size: number) => {
    updatePageRequest({ size, page: 0 }); // 改变页大小时重置到第一页
  };

  /**
   * 是否有上一页的计算属性
   */
  const hasPrevPage = computed(() => {
    return productPageRequest.value.page > 0;
  });

  /**
   * 是否有下一页的计算属性
   */
  const hasNextPage = computed(() => {
    return (
      productPageRequest.value.page <
      (productPageQuery.data?.value?.page.totalPages || 0) - 1
    );
  });

  /**
   * 获取分类产品的函数
   * @param categoryId 分类ID
   */
  const productByCategoryQuery = (categoryId: string) => {
    return useQuery({
      queryKey: ["productByCategory", categoryId, productPageRequest],
      queryFn: () =>
        fetchProductByCategory(categoryId, productPageRequest.value),
      enabled: !!categoryId, // 只有当分类ID存在时才执行查询
    });
  };

  /**
   * 获取单个产品的函数
   * @param id 产品ID
   */
  const productQuery = (id: string) => {
    return useQuery({
      queryKey: ["product", id],
      queryFn: () => fetchProduct(id),
      enabled: !!id, // 只有当ID存在时才执行查询
    });
  };

  return {
    // 分页查询相关
    productPageRequest,
    productPageQuery,
    updatePageRequest,
    goToPage,
    setPageSize,
    hasPrevPage,
    hasNextPage,

    // 单个产品和分类产品查询
    productQuery,
    productByCategoryQuery,
  };
}
