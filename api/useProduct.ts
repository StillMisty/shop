import { useInfiniteQuery, useQuery } from "@tanstack/vue-query";
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
      console.error("获取数据失败:", data.message);
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
      console.error("获取数据失败:", data.message);
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
      console.error("获取数据失败:", data.message);
      throw new Error(data.message);
    }
    return data.data;
  };

  /**
   * 获取产品分页数据的查询
   * @param productPageRequest 分页请求参数
   * @returns {Product} 查询对象
   */
  const productPageQuery = useInfiniteQuery({
    queryKey: ["productPage"],
    queryFn: ({ pageParam = 0 }) =>
      fetchProductPage({ page: pageParam, size: 12 }),
    getNextPageParam: (lastPage) => {
      if (lastPage.page.totalPages > lastPage.page.number + 1) {
        return lastPage.page.number + 1; // 返回下一页的页码
      } else {
        return undefined; // 没有下一页
      }
    },
    initialPageParam: 0,
  });

  /**
   * 获取分类产品的函数
   * @param categoryId 分类ID
   */
  const productByCategoryQuery = (categoryId: string) =>
    useInfiniteQuery({
      queryKey: ["productByCategory", categoryId],
      queryFn: ({ pageParam = 0 }) =>
        fetchProductByCategory(categoryId, {
          page: pageParam,
          size: 12,
        }),
      getNextPageParam: (lastPage) => {
        if (lastPage.page.totalPages > lastPage.page.number + 1) {
          return lastPage.page.number + 1; // 返回下一页的页码
        } else {
          return undefined; // 没有下一页
        }
      },
      initialPageParam: 0,
    });

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
    productPageQuery,

    // 单个产品和分类产品查询
    productQuery,
    productByCategoryQuery,
  };
}
