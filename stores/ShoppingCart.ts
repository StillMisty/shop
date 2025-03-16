import type { CartItemType } from "~/types/CartItemType";
import type { CreateOrderDto } from "~/types/DTO/OrderDtoType";
import type { OrderType } from "~/types/OrderType";
import type { ProductCardType } from "~/types/ProductCardType";

export const useMyShoppingCartStore = defineStore("myShoppingCart", () => {
  const shoppingCart = ref<CartItemType[]>([]);
  const loading = ref(true);
  const withLoading = async <T>(action: () => Promise<T>): Promise<T> => {
    loading.value = true;
    try {
      return await action();
    } finally {
      loading.value = false;
    }
  };

  // 从服务器获取购物车数据
  const fetchShoppingCart = async () => {
    const res = await withLoading(async () => {
      return await $fetch("/api/cart");
    });
    shoppingCart.value = res ?? [];
  };
  onMounted(() => {
    fetchShoppingCart();
  });

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
      shoppingCart.value.push({ product, quantity: 1, checked: false });
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
  const settlement = async () => {
    const checkedItems = shoppingCart.value.filter((item) => item.checked);
    if (checkedItems.length === 0) {
      return;
    }
    const order: CreateOrderDto = {
      orderItems: checkedItems.map((item) => {
        return {
          productId: item.product.id,
          quantity: item.quantity,
        };
      }),
    };
    const res = await $fetch("/api/order", {
      method: "POST",
      body: order,
    });
    if (res.success) {
      clearCart();
      return res.data as OrderType;
    }
  };

  return {
    shoppingCart,
    totalItems,
    totalPrice,
    addProductToCart,
    removeProductFromCart,
    clearCart,
    settlement,
    fetchShoppingCart,
  };
});
