<template>
  <admin-card
    height="100%"
    margin="0"
    :border="false"
    padding="0"
    :background="false"
    flex-direction="row"
    class="admin-card-wrapper"
  >
    <admin-card class="header-card">
      <img
        class="star-img"
        src="https://img.shields.io/github/stars/RadiumAg/radium-vue-admin?style=flat-square&label=Stars&logo=github"
      />
      有帮助的话,给个star吧
    </admin-card>
    <visit-card></visit-card>
    <download-card></download-card>
    <admin-card class="right" auto-fill></admin-card>
  </admin-card>
</template>

<script lang="ts" setup>
import AdminCard from '../components/admin-card/admin-card.vue';
import VisitCard from './components/visit-card.vue';
import DownloadCard from './components/download-card.vue';
</script>

<style lang="scss" scoped>
.right {
  margin: 0;
  display: inline-grid;
  grid-template-columns: repeat(4, 140px);
}

.admin-card-wrapper {
  width: 100%;
  flex-wrap: wrap;
  align-content: flex-start;
}

.header-card {
  font-size: 14px;
  flex-basis: 100%;
  margin: 0 0 10px 0;
  align-items: center;
  padding: 30px 0 30px 10px;
}

.star-img {
  margin-right: 10px;
}
</style>
