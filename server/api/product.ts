import { productCardList } from "~/server/data";
import type { ProductCardType } from "~/types/ProductCardType";

export default defineEventHandler(async (): Promise<ProductCardType[]> => {
  return productCardList;
});
