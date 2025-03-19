<template>
  <el-button @click="handleToggleDark">
    <Loader v-if="!isHydrated" class="animate-spin" />
    <template v-else>
      <Sun v-if="!isDark" />
      <Moon v-else />
    </template>
  </el-button>
</template>

<script lang="ts" setup>
import { Sun, Moon, Loader } from "lucide-vue-next";

const isHydrated = ref(false);
onMounted(() => {
  isHydrated.value = true;
});

const isDark = useDark();
const toggleDark = useToggle(isDark);
const handleToggleDark = () => {
  toggleDark();
};
</script>
