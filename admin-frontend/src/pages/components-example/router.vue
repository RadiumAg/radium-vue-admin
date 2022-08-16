<template>
  <keep-alive-router-view></keep-alive-router-view>
</template>

<script lang="ts" setup>
import KeepAliveRouterView from '@components/keep-alive-router-view/keep-alive-router-view.vue';
import { setInclude } from '@core/pinia/stores/menu-store';

defineOptions({
  name: 'ComponentsExampleRouter',
});

setInclude('ComponentsExampleRouter', { router: true });
</script>
