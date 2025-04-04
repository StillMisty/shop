<template>
  <el-table :data="orders" border>
    <el-table-column prop="orderItems" label="订单">
      <template #default="{ row }">
        <div
          class="flex items-center gap-3 overflow-x-auto"
          @wheel.stop="handleWheel"
        >
          <div
            class="flex flex-col items-center max-w-24"
            v-for="item of row.orderItems"
            :key="item.id"
          >
            <el-image
              :src="item.product.image"
              @click.stop="handleClickProduct(item.product.id)"
              class="size-24 cursor-pointer"
              fit="cover"
            />
            <el-text type="info" truncated>{{ item.product.name }}</el-text>
            <el-text type="info" size="small">{{ item.quantity }}件</el-text>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="orderTotal" label="总价" width="100">
      <template #default="{ row }">
        <PriceDisplay :price="row.orderTotal" />
      </template>
    </el-table-column>
    <el-table-column label="订单号">
      <el-table-column label="创建时间" width="160">
        <template #default="{ row }">
          <div class="flex flex-col">
            <el-text type="info">{{ row.id }}</el-text>
            <el-text type="info" size="small">{{
              new Date(row.orderTime).toLocaleString()
            }}</el-text>
          </div>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column
      prop="orderStatus"
      label="状态"
      width="160"
      :filters="orderStatusFilters"
      :filter-method="orderStatusFilterMethod"
    >
      <template #default="{ row }">
        <div class="flex justify-between items-center">
          <OrderStatusTag :orderStatus="row.orderStatus" />
          <el-button
            type="primary"
            size="small"
            @click.stop="handlePay(row.id)"
          >
            订单详情
          </el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import PriceDisplay from "./PriceDisplay.vue";
import gsap from "gsap";
import { OrderStatus } from "~/types/OrderType";

const orderStore = useMyOrderStore();
const { orders } = storeToRefs(orderStore);

const orderStatusFilters = [
  { text: "待支付", value: OrderStatus.PENDING_PAYMENT },
  { text: "已支付", value: OrderStatus.PAID },
  { text: "处理中", value: OrderStatus.PROCESSING },
  { text: "已发货", value: OrderStatus.SHIPPED },
  { text: "已完成", value: OrderStatus.COMPLETED },
  { text: "已取消", value: OrderStatus.CANCELLED },
  { text: "退款中", value: OrderStatus.REFUNDING },
  { text: "已退款", value: OrderStatus.REFUNDED },
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
