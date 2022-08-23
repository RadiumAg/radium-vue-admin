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

    <admin-card
      class="right"
      :background="false"
      auto-fill
      :border="false"
      padding="0"
    >
      <admin-card v-for="(fun, key) in funcs" :key="key">
        <img :src="fun.path" class="fun-img" />
        {{ fun.label }}
      </admin-card>
    </admin-card>
  </admin-card>
</template>

<script lang="ts" setup>
import book from '@assets/img/home/book.png';
import code from '@assets/img/home/code.png';
import game from '@assets/img/home/game.png';
import github from '@assets/img/home/github.png';
import img from '@assets/img/home/img.png';
import learning from '@assets/img/home/learning.png';
import movie from '@assets/img/home/movie.png';
import writing from '@assets/img/home/writing.png';
import { AdminCard } from '../components';

import VisitCard from './components/visit-card.vue';
import DownloadCard from './components/download-card.vue';

const funcs = [
  {
    label: '书籍',
    path: book,
  },
  {
    label: '代码',
    path: code,
  },
  {
    label: '游戏',
    path: game,
  },
  {
    label: 'github',
    path: github,
  },
  {
    label: '学习',
    path: learning,
  },
  {
    label: '电影',
    path: movie,
  },
  {
    label: '写作',
    path: writing,
  },
  {
    label: '图片',
    path: img,
  },
];
</script>

<style lang="scss" scoped>
.right {
  margin: 0;
  row-gap: 10px;
  column-gap: 10px;
  display: inline-grid;
  grid-template-columns: repeat(4, 1fr);

  .fun-img {
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
    object-fit: cover;
  }

  > div {
    margin: 0;
    cursor: pointer;
    font-size: 14px;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
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

.info-card {
  flex-basis: 800px;
}
</style>
