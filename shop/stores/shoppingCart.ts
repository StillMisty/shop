// filepath: c:\Users\Still\Project\shop\stores\shoppingCart.ts
import { ref } from 'vue';
import { Product } from '../types/Product';

interface CartItem {
  product: Product;
  quantity: number;
  checked: boolean;
}

export const useShoppingCartStore = () => {
  const shoppingCart = ref<CartItem[]>([]);
  const selectAll = ref(false);

  const addProductToCart = (product: Product, quantity: number) => {
    const existingItem = shoppingCart.value.find(item => item.product.productId === product.productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      shoppingCart.value.push({ product, quantity, checked: true });
    }
  };

  const removeProductFromCart = (productId: string) => {
    shoppingCart.value = shoppingCart.value.filter(item => item.product.productId !== productId);
  };

  const toggleSelectAll = () => {
    selectAll.value = !selectAll.value;
    shoppingCart.value.forEach(item => {
      item.checked = selectAll.value;
    });
  };

  const totalPrice = computed(() => {
    return shoppingCart.value.reduce((total, item) => {
      return total + (item.checked ? item.product.productPrice * item.quantity : 0);
    }, 0);
  });

  return {
    shoppingCart,
    selectAll,
    addProductToCart,
    removeProductFromCart,
    toggleSelectAll,
    totalPrice,
  };
};