<template>
  <div class="flex flex-col items-center max-w-24">
    <el-image :src="image" class="size-24 cursor-pointer" fit="cover" />
    <el-text type="info" truncated>{{ name }}</el-text>
    <el-text type="info" size="small">{{ quantity }}件</el-text>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});
</script>
