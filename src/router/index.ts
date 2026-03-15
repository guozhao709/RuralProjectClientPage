import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: () => import("@/views/login/index.vue"),
    },
    {
      path: "/index",
      component: () => import("@/views/home/index.vue"),
      children: [
        {
          path: "/index/home",
          component: () => import("@/views/home/home.vue"),
        },
        {
          path: "/index/function",
          component: () => import("@/views/home/function.vue"),
        },
        {
          path: "/index/ai",
          component: () => import("@/views/home/ai.vue"),
        },
        {
          path: "/index/user",
          component: () => import("@/views/home/user.vue"),
        },
      ]
    },
  ],
});

export default router;
