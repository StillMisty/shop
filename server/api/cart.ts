import { CartItemType } from "~/types/CartItemType";
import { ApiResponse } from "~/types/DTO/ApiResponse";

export default defineEventHandler(async () => {
  const cart: CartItemType[] = [
    {
      product: {
        id: "1",
        name: "商品1",
        price: 100.49,
        image: "/images/placeholder.png",
        soldCount: 100,
        category: ["分类1"],
        discount: 0.1,
        merchant: "商家1",
      },
      quantity: 1,
      checked: false,
    },
  ];
  return ApiResponse.success(cart);
});
