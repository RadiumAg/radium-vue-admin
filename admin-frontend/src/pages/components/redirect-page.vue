<template>
  <div></div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const redirect = () => {
  router.replace({ path: route.params.redirect as string });
};

redirect();
</script>
