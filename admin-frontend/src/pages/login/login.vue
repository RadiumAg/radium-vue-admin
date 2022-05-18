<template>
  <div class="login-wrapper">
    <div class="form">
      <el-form :model="loginForm">
        <el-form-item>
          <el-input v-model="loginForm.username" size="large"></el-input>
        </el-form-item>

        <el-form-item>
          <el-input
            v-model="loginForm.password"
            size="large"
            show-password
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const loginForm = reactive({
  username: '',
  password: '',
});
</script>

<style lang="scss" scoped>
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
  }
}
</style>
