<template>
  <el-table :data="orders" border>
    <el-table-column prop="orderItems" label="订单">
      <template #default="{ row }: { row: Order }">
        <div
          class="flex items-center gap-3 overflow-x-auto"
          @wheel.stop="handleWheel"
        >
          <div
            v-for="item of row.orderItems"
            :key="item.id"
            class="flex flex-col items-center max-w-24"
          >
            <ProductImageDisplay
              :product-image="item.product.productImage"
              class="size-24 cursor-pointer"
              @click.stop="handleClickProduct(item.product.productId)"
            />
            <el-text type="info" truncated>{{
              item.product.productName
            }}</el-text>
            <el-text type="info" size="small">{{ item.quantity }}件</el-text>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="totalAmount" label="总价" width="100">
      <template #default="{ row }: { row: Order }">
        <PriceDisplay :price="row.totalAmount" />
      </template>
    </el-table-column>
    <el-table-column label="创建时间" width="160">
      <template #default="{ row }: { row: Order }">
        <el-text type="info" size="small">{{
          new Date(row.orderTime).toLocaleString()
        }}</el-text>
      </template>
    </el-table-column>
    <el-table-column
      prop="orderStatus"
      label="状态"
      width="160"
      :filters="orderStatusFilters"
      :filter-method="orderStatusFilterMethod"
    >
      <template #default="{ row }: { row: Order }">
        <div class="flex justify-between items-center">
          <OrderStatusTag :order-status="row.orderStatus" />
          <el-button
            type="primary"
            size="small"
            @click.stop="handlePay(row.orderId)"
          >
            订单详情
          </el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import gsap from "gsap";
import type { Order } from "~/types/Order";
import { OrderStatus } from "~/types/OrderStatus";

defineProps<{
  orders: Order[];
}>();

const orderStatusFilters = [
  { text: "待支付", value: OrderStatus.PendingPayment },
  { text: "已支付", value: OrderStatus.Paid },
  { text: "处理中", value: OrderStatus.Processing },
  { text: "已发货", value: OrderStatus.Shipped },
  { text: "已完成", value: OrderStatus.Completed },
  { text: "已取消", value: OrderStatus.Cancelled },
  { text: "退款中", value: OrderStatus.Refunding },
  { text: "已退款", value: OrderStatus.Refunded },
];

const orderStatusFilterMethod = (value: string, row: any) =>
  row.orderStatus === value;

const handlePay = (id: string) => {
  const router = useRouter();
  router.push(`/orders/${id}`);
};

const handleClickProduct = (id: string) => {
  const router = useRouter();
  router.push(`/products/${id}`);
};

const handleWheel = (e: WheelEvent) => {
  // 没有滚动条时，不阻止默认行为
  if (e.deltaY !== 0 && e.currentTarget) {
    const target = e.currentTarget as HTMLElement;
    if (target.scrollWidth <= target.clientWidth) {
      return;
    }
    e.preventDefault();

    gsap.to(target, {
      scrollLeft: target.scrollLeft + e.deltaY,
      duration: 0.3,
      ease: "power2.out",
    });
  }
};
</script>
