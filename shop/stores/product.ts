// filepath: c:\Users\Still\Project\shop\stores\product.ts
import type { Product } from "../types/Product";
import { ref } from "vue";

const products = ref<Product[]>([]);
const selectedProduct = ref<Product | null>(null);

export const useProductStore = () => {
  const setProducts = (newProducts: Product[]) => {
    products.value = newProducts;
  };

  const setSelectedProduct = (product: Product) => {
    selectedProduct.value = product;
  };

  const clearSelectedProduct = () => {
    selectedProduct.value = null;
  };

  return {
    products,
    selectedProduct,
    setProducts,
    setSelectedProduct,
    clearSelectedProduct,
  };
};
