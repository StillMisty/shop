<template>
  <div class="mt-8">
    <h2 class="text-2xl font-bold mb-4">用户评价</h2>
    <div v-if="reviews.length" class="space-y-4">
      <div v-for="review in reviews" :key="review.id" class="p-4 border rounded-lg shadow">
        <h3 class="font-semibold">{{ review.username }}</h3>
        <p class="text-gray-600">{{ review.comment }}</p>
        <div class="flex items-center mt-2">
          <span class="text-yellow-500">
            <i v-for="star in 5" :key="star" class="fas fa-star" :class="star <= review.rating ? 'text-yellow-500' : 'text-gray-300'"></i>
          </span>
          <span class="ml-2 text-gray-500 text-sm">{{ review.date }}</span>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-gray-500">暂无评价</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const reviews = ref([
  {
    id: 1,
    username: '用户A',
    comment: '这款商品非常好，值得购买！',
    rating: 5,
    date: '2023-10-01',
  },
  {
    id: 2,
    username: '用户B',
    comment: '质量不错，但价格有点高。',
    rating: 4,
    date: '2023-10-02',
  },
  {
    id: 3,
    username: '用户C',
    comment: '一般般，没什么特别的。',
    rating: 3,
    date: '2023-10-03',
  },
]);
</script>

<style scoped>
</style>