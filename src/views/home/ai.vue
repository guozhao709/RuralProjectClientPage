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
          <van-button size="small" type="primary" @click="handleAIchat"
            >发送</van-button
          >
        </template>
      </van-field>
    </van-cell-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { requestAIchatStream } from "@/api/aiWebAPI";

const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
const userId = Number(userInfo.id);

console.log("在ai聊天界面的userId:", userId);

interface MessageRole {
  id: number;
  role: string;
  content: string;
}

const userPrompt = ref<string>("");

const handleAIchat = () => {
  const length = messages.value.length;
  messages.value.push({
    id: length + 1,
    role: "user",
    content: userPrompt.value,
  });

  messages.value.push({
    id: length + 2,
    role: "assistant",
    content: "",
  });

  requestAIchatStream(userId, userPrompt.value, (str) => {
    if (messages.value[length + 1]) {
      messages.value[length + 1]!.content = str;
    }
  });

  userPrompt.value = "";

  // 滚动到最底部
  const bottomAnchor = ref<HTMLDivElement | null>(null);
  if (bottomAnchor.value) {
    bottomAnchor.value.scrollIntoView({ behavior: "smooth" });
  }
};

const messages = ref<MessageRole[]>([]);
</script>

<style scoped lang="scss">
.chat-container {
  margin: 10px;
  padding: 10px;
  border: 2px solid #fff;
  border-radius: 10px;
  background-color: #cfd8f3;
  overflow-y: auto;
  height: 80vh;

  .message-item {
    margin: 10px 0 0 0;
    font-size: 20px;

    // 消息容器的公共 flex 样式
    .user-message,
    .assistant-message {
      display: flex;
      align-items: flex-start;
    }

    // 用户消息：右对齐 + 左侧 margin
    .user-message {
      justify-content: flex-end;
      margin-left: 10%;

      .message-pop {
        margin-right: 10px;
        background-color: #35ec08;
      }
    }

    // 助手消息：左对齐 + 右侧 margin
    .assistant-message {
      justify-content: flex-start;
      margin-right: 10%;

      .message-pop {
        margin-left: 10px;
        background-color: #fff;
      }
    }
    // 气泡的公共样式
    .message-pop {
      padding: 10px;
      border-radius: 10px;
      white-space: pre-wrap;
      word-break: break-word;
    }
  }
}
</style>
