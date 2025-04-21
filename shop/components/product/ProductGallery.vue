<template>
  <div class="product-gallery">
    <div class="flex justify-center">
      <img :src="currentImage" alt="Product Image" class="max-w-full h-auto rounded-lg shadow-lg" />
    </div>
    <div class="flex justify-center mt-4">
      <div class="flex space-x-2">
        <img
          v-for="(image, index) in images"
          :key="index"
          :src="image"
          alt="Thumbnail"
          class="w-20 h-20 object-cover cursor-pointer rounded-lg border-2"
          :class="{ 'border-blue-500': currentImage === image }"
          @click="currentImage = image"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue';

const props = defineProps<{
  images: string[];
}>();

const currentImage = ref(props.images[0]);
</script>

<style scoped>
.product-gallery {
  max-width: 600px;
  margin: auto;
}
</style>