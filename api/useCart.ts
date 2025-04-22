import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import type { CartItem } from "~/types/CartItem";
import type { ApiResponse } from "~/types/DTO/ApiResponse";
import type { CartItemChangeRequest } from "~/types/DTO/CartItemChangeRequest";

export function useCart() {
  const apiUrl = useRuntimeConfig().public.apiUrl;
  const queryClient = useQueryClient();
  const fetchCart = async () => {
    const data: ApiResponse<CartItem[]> = await $fetch(`${apiUrl}/api/cart`, {
      method: "GET",
    });
    if (!data.success) {
      // 处理错误情况
      console.error("获取数据失败:", data.message);
      throw new Error(data.message);
    }
    return data.data.sort((a, b) => {
      // 按照商品 ID 升序排序
      return a.product.productId.localeCompare(b.product.productId);
    });
  };

  /**
   * 更新购物车商品数量
   * @param cartItemChangeRequest 商品 ID 和数量
   */
  const postCartItem = async (cartItemChangeRequest: CartItemChangeRequest) => {
    const data: ApiResponse<CartItem> = await $fetch(`${apiUrl}/api/cart`, {
      method: "POST",
      body: cartItemChangeRequest,
    });
    if (!data.success) {
      // 处理错误情况
      console.error("获取数据失败:", data.message);
      throw new Error(data.message);
    }
    return data.data;
  };

  /**
   * 修改购物车项选中状态
   * @param cartItemId 商品 ID
   * @param checked 是否选中
   */
  const patchCartItem = async (cartItemId: string, checked: boolean) => {
    const data: ApiResponse<CartItem> = await $fetch(
      `${apiUrl}/api/cart/${cartItemId}/checked`,
      {
        method: "PATCH",
        body: { checked },
      },
    );
    if (!data.success) {
      // 处理错误情况
      console.error("获取数据失败:", data.message);
      throw new Error(data.message);
    }
    return data.data;
  };

  /**
   * 根据CartItemId删除商品
   */
  const deleteCartItemById = async (cartItemId: string) => {
    await $fetch(`${apiUrl}/api/cart/${cartItemId}`, {
      method: "DELETE",
    });
  };

  /**
   * 获取购物车商品列表
   */
  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
  });

  /**
   * 添加商品到购物车
   * @param cartItemChangeRequest 商品 ID 和数量
   */
  const cartItemQuantityMutation = useMutation({
    mutationFn: postCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      ElMessage.error(`添加商品到购物车失败: ${error.message || "未知错误"}`);
    },
  });

  /**
   * 修改购物车项选中状态
   * @param params 包含商品ID和选中状态的对象
   */
  const patchCartItemMutation = useMutation({
    mutationFn: (params: { cartItemId: string; checked: boolean }) =>
      patchCartItem(params.cartItemId, params.checked),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      ElMessage.error(
        `修改购物车商品选中状态失败: ${error.message || "未知错误"}`,
      );
    },
  });

  /**
   * 根据CartItemId删除商品
   * @param cartItemId 商品 ID
   */
  const deleteCartItemMutation = useMutation({
    mutationFn: deleteCartItemById,
    onSuccess: () => {
      ElMessage.success("删除购物车商品成功");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      ElMessage.error(`删除购物车商品失败: ${error.message || "未知错误"}`);
    },
  });

  const isCheckAll = computed({
    get: () => {
      const cartItems = cartQuery.data?.value;
      if (!cartItems) return false;
      return cartItems.every((item) => item.checked);
    },
    set: (value) => {
      const cartItems = cartQuery.data?.value;
      if (!cartItems) return;
      cartItems.forEach((item) => {
        if (item.checked === value) return;
        // 只在选中状态发生变化时才调用接口
        patchCartItemMutation.mutate({
          cartItemId: item.cartItemId,
          checked: value,
        });
      });
    },
  });

  const totalPrice = computed(() => {
    const cartItems = cartQuery.data?.value;
    if (!cartItems) return 0;
    return cartItems.reduce((total, item) => {
      if (item.checked) {
        const product = item.product;
        // 保留两位小数
        const discountPrice =
          Math.round(product.productPrice * product.productDiscount * 100) /
          100;
        const quantity = item.quantity;
        return total + discountPrice * quantity;
      }
      return total;
    }, 0);
  });

  return {
    cartQuery,
    cartItemQuantityMutation,
    deleteCartItemMutation,
    isCheckAll,
    patchCartItemMutation,
    totalPrice,
  };
}
