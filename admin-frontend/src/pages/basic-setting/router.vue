<template>
  <keep-alive-router-view></keep-alive-router-view>
</template>

<script lang="ts" setup>
import KeepAliveRouterView from '@components/keep-alive-router-view/keep-alive-router-view.vue';
import { setInclude } from '@core/pinia/stores/menuStore';

defineOptions({
  name: 'BasicSetting',
});

setInclude('BasicSetting');
</script>
