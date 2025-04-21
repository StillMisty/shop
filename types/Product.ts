/**
 * top.stillmisty.shopback.entity.Product
 *
 * Product
 */
export interface Product {
  /**
   * 商品描述
   */
  productDescription: string;
  /**
   * 商品折扣(0-1)
   */
  productDiscount: number;
  /**
   * 商品 ID
   */
  productId: string;
  /**
   * 商品图片 URL
   */
  productImage: string | null;
  /**
   * 是否下架
   */
  productIsOffShelf: boolean;
  /**
   * 商品商家
   */
  productMerchant: string;
  /**
   * 商品名称
   */
  productName: string;
  /**
   * 上架时间
   */
  productOnShelfTime: number;
  /**
   * 商品价格
   */
  productPrice: number;
  /**
   * 商品销量
   */
  productSoldCount: number;
  /**
   * 商品库存
   */
  productStock: number;
}
