<template>
  <el-card shadow="hover">
    <div class="flex flex-col justify-between gap-4">
      <h3 class="text-lg">结算明细</h3>
      <div class="flex flex-row justify-between space-x-4">
        <p>合计</p>
        <PriceDisplay :price="displayPrice" />
      </div>
      <el-button
        type="primary"
        class="w-full"
        @click="emit('settlement')"
        :disabled="totalPrice <= 0"
      >
        去结算
      </el-button>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { gsap } from "gsap";

const props = defineProps({
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
});
const displayPrice = ref(0);
const emit = defineEmits(["settlement"]);

// 价格动画函数
const animatePrice = (to: number) => {
  gsap.to(displayPrice, {
    duration: 1, // 动画持续时间，单位：秒
    value: to,
    ease: "power4.out", // 动画缓动函数，可以根据需求更改
    onUpdate: () => {
      // 保留两位小数
      displayPrice.value = Number(displayPrice.value.toFixed(2));
    },
  });
};

watchEffect(() => {
  animatePrice(props.totalPrice);
});

// 初始化价格
onMounted(() => {
  displayPrice.value = props.totalPrice;
});
</script>
