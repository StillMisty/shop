<template>
  <div>
    <button @click="refreshUserData">
      {{ meInfoQuery.isLoading }}
    </button>

    <div>
      <h2>用户信息</h2>
      <p>用户名: {{ meInfo }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMe } from "~/api/useMe";

definePageMeta({
  requiresAuth: true,
});

const { meInfoQuery, meInfo } = useMe();

const refreshUserData = () => {
  meInfoQuery.refetch();
};
</script>
