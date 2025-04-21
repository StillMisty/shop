import type { Product } from "~/types/Product";

export interface CartItem {
  /**
   * 购物车商品 ID
   */
  cartItemId: string;
  /**
   * 商品
   */
  product: Product;
  /**
   * 商品数量
   */
  quantity: number;
  /**
   * 是否选中
   */
  checked: boolean;
}
