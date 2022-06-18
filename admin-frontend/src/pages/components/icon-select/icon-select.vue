<template>
  <el-select-v2 v-model="selectValue" :options="options" filterable>
    <template #default="{ item }">
      <div class="selection-option">
        <span style="margin-right: 8px">{{ item.label }}</span>
        <el-icon><component :is="icons[item.label]"></component></el-icon>
      </div>
    </template>
  </el-select-v2>
</template>

<script lang="ts" setup>
import * as icons from '@element-plus/icons-vue';
import { UPDATE_MODEL_VALUE_EVENT } from '@core/utils';
import { computed } from 'vue';

const emits = defineEmits<{
  (event: UPDATE_MODEL_VALUE_EVENT, value: string);
}>();

const props = defineProps({
  modelValue: { type: String, required: true },
});

const selectValue = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits(UPDATE_MODEL_VALUE_EVENT, val);
  },
});

const options = Object.entries(icons).map(_ => ({
  value: _[0],
  label: _[0],
}));
</script>

<style lang="scss" scoped>
.selection-option {
  display: flex;
  justify-content: space-between;
}
</style>
