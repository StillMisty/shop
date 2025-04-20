<template>
  <div class="flex flex-col items-center">
    <div class="relative mb-4 group">
      <el-avatar :src="avatar" :size="160" class="border-2 border-gray-200" />
      <div
        class="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
        @click="triggerFileInput"
      >
        <Upload :size="32" />
      </div>
    </div>
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      class="hidden"
      @change="handleAvatarChange"
    />
  </div>
</template>

<script setup lang="ts">
import { Upload } from "lucide-vue-next";

const props = defineProps({
  avatar: {
    type: String,
    default: "/images/photo.webp",
  },
  patchAvatarMutation: {
    type: Object,
    default: () => {},
  },
});

const fileInput = ref<HTMLInputElement | null>(null);

// 触发文件选择
const triggerFileInput = () => {
  fileInput.value?.click();
};

// 处理头像上传
const handleAvatarChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const avatar = target.files?.[0];

  if (!avatar) return;

  // 检查文件类型和大小
  if (!avatar.type.includes("image/")) {
    ElMessage.error("请上传图片文件");
    return;
  }

  if (avatar.size > 2 * 1024 * 1024) {
    // 限制2MB
    ElMessage.error("图片大小不能超过2MB");
    return;
  }

  props.patchAvatarMutation.mutate(avatar, {
    onSuccess: () => {
      ElMessage.success("头像上传成功");
    },
    onError: () => {
      ElMessage.error("头像上传失败");
    },
  });
  // 清空文件输入，允许再次选择相同的文件
  if (fileInput.value) fileInput.value.value = "";
};
</script>
