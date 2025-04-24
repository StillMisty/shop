import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import type { Address } from "~/types/Address";
import type { AddressChangeRequest } from "~/types/DTO/AddressChangeRequest";
import type { ApiResponse } from "~/types/DTO/ApiResponse";

export function useAddress() {
  const apiUrl = useRuntimeConfig().public.apiUrl;
  const queryClient = useQueryClient();
  /**
   * 获取地址列表
   * @returns 地址列表
   */
  const fetchAddress = async () => {
    const data: ApiResponse<Address[]> = await $fetch(`${apiUrl}/api/address`);
    if (!data.success) {
      // 处理错误情况
      console.error("获取数据失败:", data.message);
      throw new Error(data.message);
    }
    return data.data.sort((a, b) => {
      return a.addressId - b.addressId;
    });
  };

  /**
   * 获取地址详情
   * @param addressId 地址 ID
   * @returns 地址详情
   */
  const fetchAddressById = async (addressId: number) => {
    const data: ApiResponse<Address> = await $fetch(
      `${apiUrl}/api/address/${addressId}`,
    );
    if (!data.success) {
      // 处理错误情况
      console.error("获取数据失败:", data.message);
      throw new Error(data.message);
    }
    return data.data;
  };

  /**
   * 添加地址
   * @param address 地址
   * @returns 新增的地址
   */
  const postAddress = async (addressChangeRequest: AddressChangeRequest) => {
    const data: ApiResponse<Address> = await $fetch(`${apiUrl}/api/address`, {
      method: "POST",
      body: addressChangeRequest,
    });
    if (!data.success) {
      // 处理错误情况
      console.error("获取数据失败:", data.message);
      throw new Error(data.message);
    }
    return data.data;
  };

  /**
   * 修改地址
   * @param addressId 地址 ID
   * @param address 地址
   * @returns 修改后的地址
   */
  const patchAddress = async (
    addressId: number,
    addressChangeRequest: AddressChangeRequest,
  ) => {
    const data: ApiResponse<Address> = await $fetch(
      `${apiUrl}/api/address/${addressId}`,
      {
        method: "PATCH",
        body: addressChangeRequest,
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
   * 设置默认地址
   * @param addressId 地址 ID
   * @returns 修改后的地址
   */
  const updateDefaultAddress = async (
    addressId: number,
    isDefault: boolean = true,
  ) => {
    const data: ApiResponse<Address> = await $fetch(
      `${apiUrl}/api/address/${addressId}/set-default`,
      {
        method: "PATCH",
        query: { isDefault },
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
   * 删除地址
   * @param addressId 地址 ID
   */
  const deleteAddressById = async (addressId: number) => {
    await $fetch(`${apiUrl}/api/address/${addressId}`, {
      method: "DELETE",
    });
  };

  const addressQuery = useQuery({
    queryKey: ["address"],
    queryFn: fetchAddress,
  });

  const addressDetailQuery = (addressId: number | null) => {
    return useQuery({
      queryKey: ["address", addressId],
      queryFn: () => fetchAddressById(addressId!),
      enabled: !!addressId, // 只有在 addressId 存在时才会执行查询
    });
  };

  const postAddressMutation = useMutation({
    mutationFn: postAddress,
    onSuccess: () => {
      ElMessage({
        message: "地址添加成功",
        type: "success",
      });
    },
    onSettled: () => {
      // 地址添加后，重新获取地址列表
      queryClient.invalidateQueries({
        queryKey: ["address"],
      });
    },
  });

  const patchAddressMutation = useMutation({
    mutationFn: (params: {
      addressId: number;
      addressChangeRequest: AddressChangeRequest;
    }) => patchAddress(params.addressId, params.addressChangeRequest),
    onSuccess: () => {
      ElMessage({
        message: "地址修改成功",
        type: "success",
      });
    },
    onSettled: () => {
      // 地址修改后，重新获取地址列表
      queryClient.invalidateQueries({
        queryKey: ["address"],
      });
    },
  });

  const updateDefaultAddressMutation = useMutation({
    mutationFn: (params: { addressId: number; isDefault: boolean }) =>
      updateDefaultAddress(params.addressId, params.isDefault),
    onSuccess: () => {
      ElMessage({
        message: "地址设置成功",
        type: "success",
      });
    },
    onSettled: () => {
      // 地址设置后，重新获取地址列表
      queryClient.invalidateQueries({
        queryKey: ["address"],
      });
    },
  });

  const deleteAddressMutation = useMutation({
    mutationFn: deleteAddressById,
    onSuccess: () => {
      ElMessage({
        message: "地址删除成功",
        type: "success",
      });
    },
    onSettled: () => {
      // 地址删除后，重新获取地址列表
      queryClient.invalidateQueries({
        queryKey: ["address"],
      });
    },
  });

  const isExistAddress = computed(() => {
    return (addressQuery.data?.value?.length ?? 0) > 0;
  });

  return {
    addressQuery,
    addressDetailQuery,
    postAddressMutation,
    patchAddressMutation,
    deleteAddressMutation,
    updateDefaultAddressMutation,
    isExistAddress,
  };
}
