<template>
  <div class="userInfo">
    <div class="userAvatar">
      <van-image
        src="../../../public/image/userAvatar.png"
        width="150"
        height="150"
        round
      />
    </div>
    <div class="userName">
      <p>{{ userInfo.name }}</p>
      <p>{{ userInfo.phone }}</p>
    </div>
  </div>
  <div class="user-setting">
    <div class="setting" v-for="value in functionArray" :key="value.id">
      <div>
        <span>{{ value.title }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
console.log("这是个人页面的userInfo:", userInfo);

const functionArray = [
  {
    id: 1,
    title: "修改个人信息",
  },
  {
    id: 2,
    title: "查询个人健康",
  },
  {
    id: 3,
    title: "联系客服",
  },
  {
    id: 4,
    title: "退出登录",
  },
];
</script>

<style scoped lang="scss">
.userInfo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0 0 0;
  margin: 5px;
  border: 2px dashed #1487ecbd;
  border-radius: 10px;
  gap: 5px;
  .userName {
    padding: 0 10px 0 10px;
    font-size: 36px;
    text-align: center;
    border-radius: 10px;
    background-color: #bed9f0bd;
  }
}

.user-setting{
  display: flex;
  flex-wrap: wrap;
  margin: 70px 10px 0 10px;
  font-size: 36px;
  gap: 30px;
  
  .setting{
    width: 100%;
    height: 100px;
    line-height: 100px;
    border-radius: 20px;
    text-align: center;
    background-color: #bed9f0bd;
    
  }
}

</style>
