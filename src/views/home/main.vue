<template>
  <div class="container">
    <van-nav-bar :title="navBarTitle[active as keyof typeof navBarTitle]" left-arrow @click-left="onClickLeft" />
    <article>
      <router-view></router-view>
    </article>
    <!-- 单行向更新值 -->
    <van-tabbar :model-value="active">
      <van-tabbar-item name="home" icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item name="function" icon="orders-o" to="/function">功能</van-tabbar-item>
      <van-tabbar-item name="ai" icon="chat-o" to="/ai">AI</van-tabbar-item>
      <van-tabbar-item name="user" icon="user-o" to="/user">个人</van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script setup lang="ts">

import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// 左上角点击返回上一级路由
const onClickLeft = () => {
  if (window.history.length > 1) {
    router.back();
    return;
  }
  router.push('/home');
};

const navBarTitle = {
  home: '首页',
  function: '功能',
  ai: 'AI',
  user: '个人',
}

// 导航栏当前激活的tab
const active = computed(() => {
  const path = route.path;
  if (path.startsWith('/home')) return 'home';
  if (path.startsWith('/function')) return 'function';
  if (path.startsWith('/ai')) return 'ai';
  if (path.startsWith('/user')) return 'user';

  return 'home';
});;
</script>

<style scoped lang="scss"></style>
