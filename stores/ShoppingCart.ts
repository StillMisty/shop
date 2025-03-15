import type { CartItemType } from "~/types/CartItemType";
import type { ProductCardType } from "~/types/ProductCardType";

export const useMyShoppingCartStore = defineStore("myShoppingCart", () => {
  const shoppingCart = ref<CartItemType[]>([]);
  // 从服务器获取购物车数据
  const fetchShoppingCart = async () => {
    const { data } = await useFetch("/api/cart");
    shoppingCart.value = data.value ?? [];
  };
  fetchShoppingCart();

  const totalItems = computed(() => {
    return shoppingCart.value.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
  });
  const totalPrice = computed(() => {
    return shoppingCart.value.reduce((acc, item) => {
      if (item.checked) {
        return acc + item.product.price * item.quantity;
      }
      return acc;
    }, 0);
  });

  const addProductToCart = (product: ProductCardType) => {
    const productInCart = shoppingCart.value.find(
      (item) => item.product.id === product.id,
    );
    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      shoppingCart.value.push({ product, quantity: 1, checked: true });
    }
  };

  const removeProductFromCart = (productId: string) => {
    const productIndex = shoppingCart.value.findIndex(
      (item) => item.product.id === productId,
    );
    if (productIndex !== -1) {
      shoppingCart.value.splice(productIndex, 1);
    }
  };

  const clearCart = () => {
    shoppingCart.value = [];
  };

  /**
   * 结账
   */
  const settlement = () => {
    const checkedItems = shoppingCart.value.filter((item) => item.checked);
    console.log(checkedItems);
  };
  return {
    shoppingCart,
    totalItems,
    totalPrice,
    addProductToCart,
    removeProductFromCart,
    clearCart,
    settlement,
  };
});
