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
  border: { type: Boolean, default: true },
});

const flexGrow = computed(() => {
  if (props.autoFill) return 1;
  else return 'auto';
});

const backgroundColor = computed(() => {
  if (props.background) return '#fff';
  else return 'transparent';
});

const borderStyle = computed(() => {
  if (props.border) {
    return '1px solid #e4e7ed';
  } else {
    return 'none';
  }
});
</script>

<style lang="scss" scoped>
.card-wrapper {
  display: flex;
  padding: v-bind(padding);
  margin: v-bind(margin);
  flex-grow: v-bind(flexGrow);
  height: v-bind(height);
  flex-basis: v-bind(flexBasic);
  border: v-bind(borderStyle);
  flex-direction: v-bind(flexDirection);
  background: v-bind(backgroundColor);
  border-radius: 2.5px;
}
</style>
