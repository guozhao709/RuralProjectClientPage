<template>
  <van-swipe class="my-swipe" :autoplay="8000" height="200" indicator-color="white">
    <van-swipe-item v-for="value in notices" :key="value.id">
      <div class="notice-item">
        <h2 class="notice-type">{{ value.title }}</h2>
        <span class="notice-content">{{ value.content }}</span>
        <p class="notice-time">{{ value.time }}</p>
      </div>
    </van-swipe-item>
  </van-swipe>

  <ul class="notice-cards">
    <li class="notice-card" v-for="value in noticeCard" :key="value.id">
      <div class="notice-content">{{ value.content }}</div>
    </li>
  </ul>

  <ul class="fast-servers">
    <li v-for="value in servers" :key="value.id">
      <h1>{{ value.title }}</h1>
      <p>{{ value.content }}</p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { checkToken } from '@/api/webAPI';

const router = useRouter();


onMounted(async () => {
  const res = await checkToken();
  if (!res.success) {
    router.push("/login");
  }
})

const notices = [
  {
    id: 1,
    title: "健康提醒",
    content: "明天上午9点疫苗接种",
    time: "2026-03-16",
  },
  {
    id: 2,
    title: "市场行情",
    content: "玉米价格上涨5%",
    time: "2026-03-15",
  },
  {
    id: 3,
    title: "今天天气",
    content: "天气晴朗, 温度10度",
    time: "2026-03-14",
  },
  {
    id: 4,
    title: "防诈骗提醒",
    content: "请不要点击未知链接，不要分享个人信息",
    time: "2026-03-13",
  },
];

const noticeCard = [
  {
    id: 1,
    content: "明天上午9点疫苗接种",
  },
  {
    id: 2,
    content: "如何科学的种玉米, 点击查看详情",
  },
  {
    id: 3,
    content: "最新农产品收购商名单, 点击查看具体联系方式",
  },
  {
    id: 4,
    content: "注意个人信息防范, 不要轻易给陌生人转账",
  },
  {
    id: 5,
    content: "常见老年人疾病, 点击查看详情",
  },
  {
    id: 6,
    content: "要按照医生的指导进行治疗",
  },
  {
    id: 7,
    content: "您有新的消息",
  },
  {
    id: 8,
    content: "您有新的消息",
  },
];

const servers = [
  {
    id: 1,
    title: "村委电话:",
    content: "12888888888",
  },
  {
    id: 2,
    title: "医疗电话:",
    content: "12888888888",
  },
  {
    id: 3,
    title: "报警电话:",
    content: "12888888888",
  },
  {
    id: 4,
    title: "其他服务电话:",
    content: "12888888888",
  },
];
</script>

<style scoped lang="scss">
.my-swipe {
  margin-top: 10px;

  .van-swipe-item {
    color: #fff;
    font-size: 20px;
    text-align: center;
    background-color: #74caff;
  }
}

.notice-item {
  padding: 30px 10px 0 10px;

  .notice-content {
    font-size: 30px;
  }

  .notice-time {
    text-align: right;
  }
}

.notice-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  height: 400px;
  padding: 0 10px 0 10px;
  margin-top: 10px;
  border-radius: 15px;
  overflow-y: auto;

  .notice-card {
    width: 45%;
    height: 120px;
    margin: 0 0 15px 0;
    border-radius: 15px;
    background-color: #fff;

    .notice-type {
      font-size: 20px;
      text-align: center;
    }

    .notice-content {
      padding: 10px 10px 10px 10px;
      font-size: 20px;
      color: #333;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}

.fast-servers {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 0 10px 0 10px;
  margin-top: 10px;

  li {
    width: 45%;
    height: 80px;
    margin: 0 0 20px 0;
    border-radius: 10px;
    color: #fff;
    text-align: center;
    font-size: 20px;
    background-color: #f02828af;

    p {
      font-size: 30px;
    }
  }
}
</style>
