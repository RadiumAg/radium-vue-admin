<template>
  <keep-alive-router-view></keep-alive-router-view>
</template>

<script lang="ts" setup>
import KeepAliveRouterView from '@components/keep-alive-router-view/keep-alive-router-view.vue';
import { useMenuStore } from '@core/pinia';

const { setInclude } = useMenuStore();

defineOptions({
  name: 'BasicSetting',
});

setInclude('BasicSetting');
</script>
