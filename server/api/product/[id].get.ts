import { productCardList } from "~/server/data";
import { ApiResponse } from "~/types/DTO/ApiResponse";

export default defineEventHandler(async (event) => {
  const productId = getRouterParam(event, "id");
  const result = productCardList.find((product) => product.id === productId);
  if (!result) {
    return ApiResponse.fail("商品不存在");
  }
  return ApiResponse.success(result);
});
