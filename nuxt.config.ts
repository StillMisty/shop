import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL || "http://localhost:3000/api",
    },
  },
  elementPlus: {
    themes: ["dark"],
    defaultLocale: "zh-cn",
  },
  css: ["~/assets/css/main.css"],
  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
    head: {
      title: "购物商城",
      htmlAttrs: {
        lang: "zh-CN",
      },
      meta: [
        {
          charset: "utf-8",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },

  modules: [
    "@pinia/nuxt",
    "@element-plus/nuxt",
    "lenis/nuxt",
    "@formkit/auto-animate/nuxt",
    "@vueuse/nuxt",
  ],
  nitro: {
    routeRules: {
      // 为所有 public 中的资源设置缓存规则
      "/favicon.ico": { cache: { maxAge: 60 * 60 * 24 * 30 } }, // 30天缓存
      "/images/**": { cache: { maxAge: 60 * 60 * 24 * 7 } }, // 7天缓存图片
    },
  },
});
