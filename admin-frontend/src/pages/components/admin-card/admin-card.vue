<template>
  <div class="card-wrapper">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  autoFill: {
    type: Boolean,
    default: false,
  },
  padding: {
    type: String,
    default: '10px',
  },
  margin: {
    type: String,
    default: '10px',
  },
  background: {
    type: Boolean,
    default: true,
  },
  height: {
    type: String,
    default: 'auto',
  },
  flexBasic: {
    type: String,
    default: 'max-content',
  },
});

const flexGrow = computed(() => {
  if (props.autoFill) return 1;
  else return 'auto';
});

const backgroundColor = computed(() => {
  if (props.background) return '#fff';
  else return 'transparent';
});
</script>

<style lang="scss" scoped>
.card-wrapper {
  padding: v-bind(padding);
  margin: v-bind(margin);
  flex-grow: v-bind(flexGrow);
  height: v-bind(height);
  flex-basis: v-bind(flexBasic);
  background: v-bind(backgroundColor);
  border-radius: 2.5px;
  border: 1px solid #e4e7ed;
}
</style>
