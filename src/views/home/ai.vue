<template>
  <div class="chat-container">
    <div v-for="message in messages" :key="message.id" class="message-item">
      <div v-if="message.role === 'user'" class="user-message">
        <span class="message-pop">{{ message.content }}</span>
        <div class="avatar">
          <van-image
            src="../../../public/image/userAvatar.png"
            round
            width="45"
            height="45"
          >
          </van-image>
        </div>
      </div>
      <div v-else class="assistant-message">
        <div class="avatar">
          <van-image
            src="../../../public/image/aiAvatar.png"
            round
            width="45"
            height="45"
          >
          </van-image>
        </div>
        <span class="message-pop">{{ message.content }}</span>
      </div>
    </div>
    <div ref="bottomAnchor"></div>
  </div>

  <div class="chat-input-container">
    <van-cell-group inset>
      <van-field
        v-model="userPrompt"
        center
        clearable
        placeholder="有什么想问的?"
      >
        <template #button>
          <van-button size="small" type="primary">发送</van-button>
        </template>
      </van-field>
    </van-cell-group>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

// onMounted(() => {
//   const bottomAnchor = ref<HTMLDivElement | null>(null);
//   if (bottomAnchor.value) {
//     bottomAnchor.value.scrollIntoView({ behavior: "smooth" });
//   }
// });

const userPrompt = ref<string>("");

const messages = [
  {
    id: 1,
    role: "user",
    content: "你好, 我是guozhao, 能告诉我你的名字吗",
  },
  {
    id: 2,
    role: "assistant",
    content: "你好，我是智能助手",
  },
  {
    id: 3,
    role: "user",
    content: "你好, 我是guozhao",
  },
  {
    id: 4,
    role: "assistant",
    content: "你好，我是kimi",
  },
  {
    id: 5,
    role: "user",
    content: "你好, 我是guozhao, 能告诉我你的手机号吗",
  },
  {
    id: 6,
    role: "assistant",
    content: "你好，我是guozhao，我的手机号是12888888888",
  },
  {
    id: 7,
    role: "user",
    content: "你好, 我是guozhao, 能告诉我你的邮箱吗",
  },
  {
    id: 8,
    role: "assistant",
    content: "你好，我是guozhao，我的邮箱是12888888888@qq.com",
  },
  {
    id: 9,
    role: "user",
    content: "你好, 我是guozhao, 能告诉我你的地址吗",
  },
  {
    id: 10,
    role: "assistant",
    content: "你好，我是guozhao，我的地址是北京市海淀区",
  },
];
</script>

<style scoped lang="scss">
.chat-container {
  margin: 10px;
  padding: 10px 10px 10px 10px;
  border: 2px solid #fff;
  border-radius: 10px;
  background-color: #cfd8f3;
  overflow-y: auto;
  height: 80vh;

  .message-item {
    margin: 10px 0 0 0;
    font-size: 20px;

    .user-message {
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
      margin-left: 10%;

      .message-pop {
        margin-right: 10px;
        padding: 10px;
        border-radius: 10px;
        background-color: #35ec08;
      }
    }

    .assistant-message {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      margin-right: 10%;

      .message-pop {
        margin-left: 10px;
        padding: 10px;
        border-radius: 10px;
        background-color: #fff;
      }
    }
  }
}
</style>
