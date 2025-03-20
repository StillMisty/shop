<template>
  <div>
    <div v-if="isLoading" class="flex items-center justify-center h-screen">
      <Loader class="animate-spin" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Loader } from "lucide-vue-next";
import { useOrder } from "~/api/useOrder";

const route = useRoute();
const orderId = route.params.id as string;

const { orderQuery } = useOrder();
const { data: order, isLoading } = await orderQuery(orderId);
</script>
