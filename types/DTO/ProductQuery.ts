export enum ProduceSearchType {
  PRODUCT = "商品",
  MERCHANT = "商家",
}

export interface ProductQuery {
  keyword?: string[];
  category?: string[];
  type?: ProduceSearchType;
}
