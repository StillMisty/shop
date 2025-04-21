<template>
  <div class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
    <!-- 加载状态 -->
    <div v-if="isPending" class="flex justify-center items-center">
      <el-skeleton :rows="10" animated />
    </div>

    <!-- 错误提示 -->
    <el-result
      v-else-if="isError"
      icon="error"
      title="获取商品信息失败"
      :sub-title="error?.message"
    >
      <template #extra>
        <el-button type="primary">重新加载</el-button>
      </template>
    </el-result>

    <!-- 商品信息 -->
    <el-card v-else-if="product">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- 商品图片区域 -->
        <product-image-display
          class="min-h-96 max-h-[50vh]"
          :product-image="product.productImage"
        ></product-image-display>

        <!-- 商品信息区域 -->
        <div class="flex flex-col gap-6">
          <!-- 商品名称 -->
          <h1 class="text-2xl font-bold">{{ product.productName }}</h1>

          <!-- 商品价格 -->
          <div class="flex items-baseline gap-4">
            <div
              v-if="product.productDiscount < 1"
              class="flex items-center gap-3"
            >
              <span class="text-3xl font-bold text-rose-600"
                >¥{{
                  (product.productPrice * product.productDiscount).toFixed(2)
                }}</span
              >
              <span class="text-lg text-gray-500 line-through"
                >¥{{ product.productPrice.toFixed(2) }}</span
              >
              <el-tag type="danger" size="small"
                >{{ (product.productDiscount * 10).toFixed(1) }}折</el-tag
              >
            </div>
            <div v-else class="text-3xl font-bold text-rose-600">
              ¥{{ product.productPrice.toFixed(2) }}
            </div>
          </div>

          <!-- 销量和库存 -->
          <div class="flex items-center gap-6 text-gray-500 text-sm">
            <span>销量: {{ product.productSoldCount }}</span>
            <span>库存: {{ product.productStock }}</span>
            <span>商家: {{ product.productMerchant }}</span>
          </div>

          <!-- 商品描述 -->
          <div class="py-4 border-t border-b border-gray-200">
            <h3 class="text-sm text-gray-500 mb-2">商品描述</h3>
            <p class="text-gray-700 whitespace-pre-line">
              {{ product.productDescription }}
            </p>
          </div>

          <!-- 数量选择和添加到购物车 -->
          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-4">
              <span class="text-gray-700">数量</span>
              <el-input-number
                v-model="quantity"
                :min="1"
                :max="product.productStock"
                :disabled="
                  product.productIsOffShelf || product.productStock <= 0
                "
              />
            </div>

            <div class="flex gap-4">
              <el-button
                type="primary"
                size="large"
                :disabled="
                  product.productIsOffShelf || product.productStock <= 0
                "
                class="flex-grow"
                @click="addToCart"
              >
                <el-icon class="mr-1"><ShoppingCart /></el-icon>
                加入购物车
              </el-button>

              <el-button
                type="danger"
                size="large"
                :disabled="
                  product.productIsOffShelf || product.productStock <= 0
                "
                class="flex-grow"
                @click="buyNow"
              >
                立即购买
              </el-button>
            </div>

            <el-alert
              v-if="product.productIsOffShelf"
              title="该商品已下架"
              type="error"
              show-icon
              :closable="false"
            />
            <el-alert
              v-else-if="product.productStock <= 0"
              title="该商品已售罄"
              type="warning"
              show-icon
              :closable="false"
            />
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ShoppingCart } from "@element-plus/icons-vue";
import { useProduct } from "~/api/useProduct";

const { productQuery } = useProduct();
const { id } = useRoute().params;

const quantity = ref(1);

const { data: product, isPending, isError, error } = productQuery(id as string);

// 添加到购物车
const addToCart = () => {
  if (!product.value) return;

  ElMessage({
    type: "success",
    message: `已将 ${quantity.value} 件 "${product.value.productName}" 加入购物车`,
  });
};

// 立即购买
const buyNow = () => {
  addToCart();
  useRouter().push("/cart");
};
</script>
