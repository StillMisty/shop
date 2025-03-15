import type { ProductCardType } from "~/types/ProductCardType";

export interface CartItemType {
  product: ProductCardType;
  quantity: number;
  checked: boolean;
}
