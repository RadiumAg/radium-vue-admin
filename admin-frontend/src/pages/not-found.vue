<template>
  <div class="not-found-wrapper">
    <img :src="notFoundImg" />
  </div>
</template>

<script lang="ts" setup>
import notFoundImg from '@assets/img/404.png';
</script>

<style lang="scss" scoped>
.not-found-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 500px;
    height: 500px;
  }
}
</style>
