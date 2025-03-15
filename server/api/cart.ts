import { CartItemType } from "~/types/CartItemType";

export default defineEventHandler(async (): Promise<CartItemType[]> => {
  const cart: CartItemType[] = [
    {
      product: {
        id: "1",
        name: "商品1",
        price: 100,
        image: "/images/placeholder.png",
        soldCount: 100,
        category: "分类1",
        discount: 0.1,
        merchant: "商家1",
      },
      quantity: 1,
      checked: true,
    },
  ];
  return cart;
});
