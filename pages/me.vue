<template>
  <div class="max-w-4xl mx-auto py-8 px-4">
    <!-- 页面标题 -->
    <h1 class="text-2xl font-bold mb-6">个人资料</h1>

    <el-card class="mb-6" v-loading="isQuery">
      <div class="flex flex-col md:flex-row items-start gap-8">
        <!-- 左侧头像区域 -->
        <AvatarChange
          class="w-full md:w-1/3"
          :avatar="meInfo?.avatar"
          :patchAvatarMutation="patchAvatarMutation"
        />

        <!-- 右侧个人信息区域 -->
        <div class="w-full md:w-2/3 space-y-4">
          <div class="flex items-center">
            <el-text size="large" class="font-medium text-gray-700 min-w-32"
              >账号：</el-text
            >
            <el-text size="large">{{ meInfo?.username }}</el-text>
          </div>

          <div class="flex items-center">
            <el-text size="large" class="font-medium text-gray-700 min-w-32"
              >昵称：</el-text
            >
            <el-text size="large">{{ meInfo?.nickname }}</el-text>
            <el-button
              type="primary"
              size="small"
              text
              class="ml-3"
              @click="showNicknameDialog"
            >
              <el-icon><Edit /></el-icon>
              <span class="ml-1">修改</span>
            </el-button>
          </div>

          <div class="flex items-center">
            <el-text size="large" class="font-medium text-gray-700 min-w-32"
              >注册时间：</el-text
            >
            <el-text size="large">
              {{
                meInfo?.registerTime
                  ? new Date(meInfo.registerTime).toLocaleString()
                  : "未知"
              }}
            </el-text>
          </div>

          <div class="flex items-center">
            <el-text size="large" class="font-medium text-gray-700 min-w-32"
              >上次登录：</el-text
            >
            <el-text size="large">
              {{
                meInfo?.lastLoginTime
                  ? new Date(meInfo.lastLoginTime).toLocaleString()
                  : "未知"
              }}
            </el-text>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { UploadFilled } from "@element-plus/icons-vue";
import { Edit } from "lucide-vue-next";
import { useMe } from "~/api/useMe";
import AvatarChange from "~/components/AvatarChange.vue";

definePageMeta({
  requiresAuth: true,
});

const {
  meInfoQuery,
  meInfo,
  patchPasswordMutation,
  patchNicknameMutation,
  patchAvatarMutation,
  isQuery,
} = useMe();

let newNickname = ref<string>(meInfo.value?.nickname || "");
const showNicknameDialog = () => {
  ElMessageBox.prompt("请输入新的昵称", "修改昵称", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    inputValue: newNickname.value,
    inputPattern: /^[\u4e00-\u9fa5a-zA-Z0-9_]{1,20}$/,
    inputErrorMessage: "昵称长度应为1-20个字符",
  })
    .then(({ value }) => {
      if (value) {
        newNickname.value = value;
        patchNicknameMutation.mutate(value, {
          onSuccess: () => {
            ElMessage.success("昵称修改成功");
          },
          onError: (error) => {
            ElMessage.error("昵称修改失败");
            console.error("昵称修改失败:", error);
          },
        });
      }
    })
    .catch(() => {
      // 用户取消操作
    });
};
</script>
