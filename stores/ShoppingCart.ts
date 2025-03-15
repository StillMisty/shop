import type { CartItemType } from "~/types/CartItemType";
import type { ProductCardType } from "~/types/ProductCardType";

export const useMyShoppingCartStore = defineStore("myShoppingCart", () => {
  const shoppingCart = ref<CartItemType[]>([
    {
      product: {
        id: "1",
        name: "商品1",
        price: 100,
        image: "/images/placeholder.png",
        soldCount: 100,
        category: "分类1",
        discount: 0.1,
        merchant: "商家1",
      },
      quantity: 1,
      checked: true,
    },
  ]);
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
    console.log(product);
    console.log(totalItems.value);

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
  return {
    shoppingCart,
    totalItems,
    totalPrice,
    addProductToCart,
    removeProductFromCart,
    clearCart,
  };
});
