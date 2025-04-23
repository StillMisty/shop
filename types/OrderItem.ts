import type { Product } from "~/types/Product";

/**
 * top.stillmisty.shopback.entity.OrderItem
 *
 * OrderItem
 */
export interface OrderItem {
  /**
   * @description 购物车项 ID
   */
  id: string;
  /**
   * @description 商品
   */
  product: Product;
  /**
   * @description 购买数量
   */
  quantity: number;
  /**
   * @description 商品单价小计
   */
  subtotal: number;
  /**
   * @description 商品单价折扣
   */
  unitDiscount: number;
  /**
   * @description 商品单价
   */
  unitPrice: number;
}
