import { ref } from 'vue';
import { Product } from '@/types/Product';

const useProductApi = () => {
  const product = ref<Product | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const fetchProductDetails = async (id: string) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(`/api/products/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }
      product.value = await response.json();
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const fetchProductReviews = async (id: string) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(`/api/products/${id}/reviews`);
      if (!response.ok) {
        throw new Error('Failed to fetch product reviews');
      }
      return await response.json();
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    product,
    loading,
    error,
    fetchProductDetails,
    fetchProductReviews,
  };
};

export default useProductApi;