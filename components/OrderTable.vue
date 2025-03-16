<template>
  <el-table :data="orders" border>
    <el-table-column prop="id" label="订单号" width="160"></el-table-column>
    <el-table-column
      prop="orderTotal"
      label="总价"
      width="100"
    ></el-table-column>
    <el-table-column
      prop="orderTime"
      label="创建时间"
      :formatter="(row: any) => new Date(row.orderTime).toLocaleString()"
    >
    </el-table-column>
    <el-table-column prop="orderStatus" label="状态" width="160">
      <template #default="{ row }">
        <div class="flex justify-between items-center">
          <el-tag
            :type="row.orderStatus === OrderStatus.PAID ? 'success' : 'info'"
            size="small"
          >
            {{ row.orderStatus }}
          </el-tag>
          <el-button
            v-if="row.orderStatus === OrderStatus.PENDING_PAYMENT"
            type="primary"
            size="small"
            @click="handlePay(row.id)"
          >
            前去支付
          </el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { OrderStatus } from "~/types/OrderType";

const orderStore = useMyOrderStore();
const { orders } = storeToRefs(orderStore);

const handlePay = (id: string) => {
  const router = useRouter();
  router.push(`/orders/${id}`);
  // orderStore.updateOrder({
  //   orderId: row.id,
  //   newStatus: OrderStatus.PAID,
  // });
};
</script>
