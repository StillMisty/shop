<template>
  <ClientOnly>
    <el-button @click="handleToggleDark">
      <Sun v-if="!isDark" />
      <Moon v-else />
    </el-button>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { Sun, Moon } from "lucide-vue-next";

const isDark = useDark();
const toggleDark = useToggle(isDark);
const handleToggleDark = () => {
  toggleDark();
};
</script>
