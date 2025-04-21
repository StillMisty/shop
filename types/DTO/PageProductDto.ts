import type { Product } from "../Product";
import type { PageDto } from "./PageDto";

/**
 * PageProduct
 */
export interface PageProductDto {
  content: Product[];
  page: PageDto;
}
