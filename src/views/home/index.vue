<template>
  <div class="container">
    <van-nav-bar :title="navBarTitle[active as keyof typeof navBarTitle]" left-arrow/>
    <article>
      <router-view></router-view>
    </article>
    <van-tabbar v-model="active">
  <van-tabbar-item name="home" icon="home-o" to="/index/home">首页</van-tabbar-item>
  <van-tabbar-item name="function" icon="orders-o" to="/index/function">功能</van-tabbar-item>
   <van-tabbar-item name="AI" icon="chat-o" to="/index/ai">AI</van-tabbar-item>
  <van-tabbar-item name="user" icon="user-o" to="/index/user">个人</van-tabbar-item>
 
</van-tabbar>

  </div>
</template>

<script setup lang="ts">

const navBarTitle = {
    home: '首页',
    function: '功能',
    AI: 'AI',
    user: '个人',
}

import { ref } from 'vue';
 const active = ref('home');



</script>

<style scoped lang="scss">

</style>

