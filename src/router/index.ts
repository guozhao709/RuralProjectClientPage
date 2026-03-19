import { createRouter, createWebHashHistory } from "vue-router";

import main from "@/views/home/main.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/login",
      component: () => import("@/views/login/index.vue"),
    },
    {
      path: "/",
      component: main,
      children: [
        {
          path: "/main/home",
          component: () => import("@/views/home/home.vue"),
        },
        {
          path: "/main/function",
          component: () => import("@/views/home/function.vue"),
        },
        {
          path: "/main/ai",
          component: () => import("@/views/home/ai.vue"),
        },
        {
          path: "/main/user",
          component: () => import("@/views/home/user.vue"),
        },
      ]
    },
  ],
});

export default router;
