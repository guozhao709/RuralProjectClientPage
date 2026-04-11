<template>
  <header class="header">
    <h1>点击卡片使用其功能</h1>
  </header>
  <div class="cards">
    <div v-for="item in cards" :key="item.id" class="card" @click="handleCardClick(item.id)">
      <div class="word">
        <div class="card-header">
          <h2>{{ item.name }}</h2>
        </div>
        <div class="card-meta">
          <p>{{ item.meta }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
// 添加跳转路由功能
const handleCardClick = (id: number) => {
  switch (id) {
    case 1:
      router.push("/function/healthy");
      break;
    case 2:
      router.push("/function/safety");
      break;
    case 3:
      router.push("/function/agriculture");
      break;
    case 4:
      router.push("/function/hospital");
      break;
    case 5:
      router.push("/function/villageCommittee");
      break;
    default:
      break;
  }
};

const cards = ref([
  {
    id: 1,
    name: "健康助手",
    meta: "根据您的情况，为您提供专业的健康建议。",
  },
  {
    id: 2,
    name: "安全助手",
    meta: "有什么安全问题, 都可以问。",
  },
  {
    id: 3,
    name: "农业助手",
    meta: "想尝试新的作物？",
  },
  {
    id: 4,
    name: "医院助手",
    meta: "看病难， 请咨询医院助手。",
  },
  {
    id: 5,
    name: "村委会",
    meta: "点对点联系村委会。",
  },
]);
</script>

<style scoped lang="scss">

.header{
  margin: 5px 10px 0 10px;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  height: 80px;
  border-radius: 10px;
  line-height: 80px;
  background-color: #fff;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  height: 80vh;
  padding: 10px 10px 0 10px;
  overflow-y: auto;

  .card {
    height: 120px;
    width: 100%;
    padding: 5px 0 0 10px;
    border-radius: 10px;
    background-color: #b6f4e0;

    .word {
      width: 70%;
      .card-header {
        font-size: 30px;
      }
      .card-meta {
        font-size: 20px;
      }
    }
  }
}
</style>
