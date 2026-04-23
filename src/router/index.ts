import { createRouter, createWebHashHistory } from "vue-router";

import main from "@/views/home/main.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    // 登录页
    {
      path: "/login",
      component: () => import("@/views/login/index.vue"),
    },
    // 首页
    {
      path: "/",
      component: main,
      redirect: "/home",
      children: [
        {
          path: "home",
          component: () => import("@/views/home/home.vue"),
        },
        {
          path: "function",
          component: () => import("@/views/home/function.vue"),
        },
        {
          path: "ai",
          component: () => import("@/views/home/ai.vue"),
        },
        {
          path: "user",
          component: () => import("@/views/home/user.vue"),
        },
      ],
    },
    // 沉浸式功能页面
    {
      path: "/function/healthy",
      component: () => import("@/views/functionPages/healthy.vue"),
    },
    {
      path: "/function/hospital",
      component: () => import("@/views/functionPages/hospital.vue"),
    },
    {
      path: "/function/agriculture",
      component: () => import("@/views/functionPages/agriculture.vue"),
    },
    {
      path: "/function/villageCommittee",
      component: () => import("@/views/functionPages/villageCommittee.vue"),
    },
  ],
});

export default router;
