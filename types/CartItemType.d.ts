import type { ProductCardType } from "~/types/ProductCardType";

export type CartItemType = {
  product: ProductCardType;
  quantity: number;
  checked: boolean;
};
