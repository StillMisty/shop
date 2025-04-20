<template>
  <div class="h-full">
    <div v-if="isPending" class="flex items-center justify-center h-full">
      <LoaderCircle :size="64" class="animate-spin" />
    </div>
    <div
      v-else-if="isError"
      class="flex items-center justify-center h-full text-red-500"
    >
      <TriangleAlert /><span>加载失败，请稍后再试。</span>
    </div>

    <div
      v-else-if="meInfo"
      v-if="meInfo.success"
      class="max-w-4xl mx-auto py-8 px-4"
    >
      <MeInfoCard :meInfo="meInfo.data" class="mb-6" />
      <WalletCard :wallet="meInfo.data.wallet" class="mb-6" />
      <PasswordResetCard class="mb-6" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LoaderCircle, TriangleAlert } from "lucide-vue-next";
import { useMe } from "~/api/useMe";

definePageMeta({
  requiresAuth: true,
});

const { meInfoQuery } = useMe();

const { isPending, isError, data: meInfo } = meInfoQuery;
</script>
