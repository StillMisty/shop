<template>
  <el-card hover="shadow">
    {{ order }}
    <h1 class="text-2xl font-bold">{{ order.id }}</h1>
    <p>{{}}</p>
  </el-card>
</template>

<script lang="ts" setup>
import type { OrderType } from "~/types/OrderType";

defineProps<{
  order: OrderType;
}>();
</script>
