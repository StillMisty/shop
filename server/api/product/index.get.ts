import { productCardList } from "~/server/data";
import { ApiResponse } from "~/types/DTO/ApiResponse";
import { ProduceSearchType, ProductQuery } from "~/types/DTO/ProductQuery";

/**
 * 根据类别查询商品列表
 * @param ProductQuery 查询参数
 * @returns 商品列表
 */
export default defineEventHandler(async (event) => {
  const query = getQuery(event) as ProductQuery;
  let result = productCardList;

  if (query.type === ProduceSearchType.PRODUCT && query.keyword) {
    // 处理可能存在的 keyword 查询参数
    const keywords = Array.isArray(query.keyword)
      ? query.keyword
      : [query.keyword];

    result = result.filter((product) => {
      return keywords.some((keyword) =>
        product.name.toLowerCase().includes(keyword.toLowerCase()),
      );
    });
  }

  if (query.type === ProduceSearchType.MERCHANT && query.keyword) {
    // 处理可能存在的 keyword 查询参数
    const keywords = Array.isArray(query.keyword)
      ? query.keyword
      : [query.keyword];

    result = result.filter((product) => {
      return keywords.some((keyword) =>
        product.merchant.toLowerCase().includes(keyword.toLowerCase()),
      );
    });
  }

  // 处理可能存在的 category 查询参数
  if (query.category) {
    const categories = Array.isArray(query.category)
      ? query.category
      : [query.category];

    result = result.filter((product) => {
      return categories.some((category) => product.category.includes(category));
    });
  }

  return ApiResponse.success(result);
});
