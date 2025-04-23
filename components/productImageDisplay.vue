<template>
  <div
    class="flex items-center justify-center bg-gray-200 rounded-sm overflow-hidden"
  >
    <el-image
      :src="productImage ?? ''"
      class="size-full"
      fit="cover"
      alt="商品图片"
    >
      <template #placeholder>
        <div class="flex items-center justify-center size-full">
          <LoaderCircle :size="64" class="animate-spin" />
        </div>
      </template>
      <template #error>
        <div class="flex items-center justify-center size-full text-black">
          暂无图片
        </div>
      </template>
    </el-image>
  </div>
</template>

<script lang="ts" setup>
import { LoaderCircle } from "lucide-vue-next";

defineProps<{
  productImage: string | null | undefined;
}>();
</script>
