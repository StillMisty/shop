<template>
  <div class="h-full">
    <div v-if="isPending" class="flex items-center justify-center h-full">
      <LoaderCircle :size="64" class="animate-spin" />
    </div>
    <div v-else-if="isError" class="flex items-center justify-center h-full">
      <p class="text-red-500">加载失败，请稍后再试。</p>
    </div>

    <div v-else-if="meInfo" class="max-w-4xl mx-auto py-8 px-4">
      <div v-if="meInfo.success">
        <MeInfoCard :meInfo="meInfo.data" />
      </div>
      <div>
        <PasswordReset />
      </div>
    </div>

    <!-- 修改密码 -->
  </div>
</template>

<script lang="ts" setup>
import MeInfoCard from "../components/MeInfoCard.vue";
import { LoaderCircle } from "lucide-vue-next";
import { useMe } from "~/api/useMe";

definePageMeta({
  requiresAuth: true,
});

const { meInfoQuery, patchNicknameMutation, patchAvatarMutation } = useMe();

const { isPending, isError, data: meInfo } = meInfoQuery;
</script>
