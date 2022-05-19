<template>
  <div class="login-wrapper">
    <div class="form">
      <h1 class="title">登录</h1>
      <el-form ref="formRef" :model="loginForm" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" size="large"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            size="large"
            show-password
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>

      <el-button
        type="primary"
        class="login-button"
        size="large"
        @click="loginHandler"
        >登录</el-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useThrottleFn } from '@vueuse/core';
import { ElMessage, FormInstance } from 'element-plus';
import { useApi } from '@core/http/api-instance';
import { defaultThrottleTime } from '@core/utils';

const api = useApi();
const formRef = ref<FormInstance>();
const loginForm = reactive({
  username: '',
  password: '',
});

const rules = {
  username: [
    {
      required: true,
      message: '请输入用户名',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
    },
  ],
};

const loginHandler = useThrottleFn(
  async () => {
    try {
      await formRef.value.validate();
    } catch {
      return;
    }
    try {
      const res = await api.oath.login(loginForm.username, loginForm.password);
      ElMessage.success(res.msg);
    } catch (e) {
      ElMessage.warning(e instanceof Error && e.message);
    }
  },
  defaultThrottleTime,
  false,
);
</script>

<style lang="scss" scoped>
:deep(.el-input__wrapper) {
  background-color: #0000001a;
}

.login-button {
  width: 100%;
}

.login-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  justify-content: center;
  background-color: #2d3a4b;

  .form {
    width: 500px;
    margin-top: 300px;

    .title {
      color: #fff;
      text-align: center;
      margin-bottom: 20px;
    }
  }
}
</style>
