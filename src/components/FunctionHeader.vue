<template>
    <van-nav-bar class="nav-bar" title="标题" left-arrow @click-left="onClickLeft" />
</template>

<script setup>
// 为什么不用props, 因为有属性透传，父组件传入的属性会直接透传给van-nav-bar组件
import { useRouter } from 'vue-router';
const router = useRouter();
const onClickLeft = () => {
    if (window.history.length > 1) {
        router.back();
        return;
    }
    router.push('/home');
};
</script>


