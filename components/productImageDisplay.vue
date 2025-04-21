<template>
  <div
    class="flex items-center justify-center w-full h-full bg-gray-100 rounded-sm"
  >
    <el-image
      v-if="productImage"
      :src="productImage"
      fit="cover"
      class="w-full h-full rounded-sm"
      :preview-src-list="[productImage]"
      alt="商品图片"
    >
      <template #placeholder>
        <div class="flex items-center justify-center w-full h-full">
          <LoaderCircle :size="64" class="animate-spin" />
        </div>
      </template>
    </el-image>
    <el-empty v-else description="暂无图片"></el-empty>
  </div>
</template>

<script lang="ts" setup>
import { LoaderCircle } from "lucide-vue-next";

defineProps<{
  productImage: string | null | undefined;
}>();
</script>
