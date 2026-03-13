<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="userLoginInfo.phone"
        name="phone"
        label="phone"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="userLoginInfo.password"
        type="password"
        name="password"
        label="passward"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { login } from "@/api/webAPI";
import { showNotify } from 'vant';

const userLoginInfo = reactive({
  phone: "",
  password: "",
});

const onSubmit = async () => {

  const res = await login(userLoginInfo);
  console.log("登录返回的数据:", res);
  if (res.success) {
    localStorage.setItem("token", res.token);
    localStorage.setItem("userInfo", JSON.stringify(res.userInfo));
  }else{
    showNotify({message: "用户名或密码错误", position: "top"});
  }
};
</script>

<style scoped lang="scss"></style>
