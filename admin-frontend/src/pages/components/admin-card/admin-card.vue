<template>
  <div class="card-wrapper">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { PropType, computed } from 'vue';

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
  flexDirection: {
    type: String as PropType<'row' | 'column'>,
    default: 'row',
  },
  height: {
    type: String,
    default: 'auto',
  },
  flexBasic: {
    type: String,
    default: 'max-content',
  },
  border: { type: Boolean, default: false },
});

const flexGrow = computed(() => {
  if (props.autoFill) return 1;
  else return 'auto';
});

const backgroundColor = computed(() => {
  if (props.background) return 'var(--el-bg-color)';
  else return 'transparent';
});

const borderStyle = computed(() => {
  if (props.border) {
    return '1px solid var(--el-border-color)';
  } else {
    return 'none';
  }
});
</script>

<style lang="scss" scoped>
.card-wrapper {
  display: flex;
  overflow: hidden;
  border-radius: 2.5px;
  margin: v-bind(margin);
  height: v-bind(height);
  padding: v-bind(padding);
  border: v-bind(borderStyle);
  flex-grow: v-bind(flexGrow);
  flex-basis: v-bind(flexBasic);
  flex-direction: v-bind(flexDirection);
  background: v-bind(backgroundColor);
}
</style>
