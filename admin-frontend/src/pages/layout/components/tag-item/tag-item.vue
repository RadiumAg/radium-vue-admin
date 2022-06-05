<template>
  <div class="tag" @click="handleToPage">{{ name }}</div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});

const router = useRouter();

const handleToPage = () => {
  router.push(props.path);
};
</script>

<style lang="scss" scope>
.tag {
  padding: 4px 8px;
  font-size: 12px;
  border: 1px solid #42b983;
  margin-right: 4px;
}
</style>
