<template>
  <teleport to="body">
    <ul
      v-if="visible"
      class="menu-context"
      :style="{
        left: left + 'px',
        top: top + 'px',
      }"
    >
      <li @click="handleClick(EventType.刷新)">
        <el-icon>
          <refresh-left></refresh-left>
        </el-icon>
        刷新
      </li>

      <li @click="handleClick(EventType.关闭)">
        <el-icon>
          <close></close>
        </el-icon>
        关闭
      </li>

      <li @click="handleClick(EventType.关闭左侧)">
        <el-icon>
          <back></back>
        </el-icon>
        关闭左侧
      </li>

      <li @click="handleClick(EventType.关闭右侧)">
        <el-icon>
          <right></right>
        </el-icon>
        关闭右侧
      </li>
    </ul>
  </teleport>
</template>

<script lang="ts" setup>
import { UPDATE_MODEL_VALUE_EVENT } from '@core/utils';
import { Back, Close, RefreshLeft, Right } from '@element-plus/icons-vue';
import { EventType } from '.';

const props = defineProps({
  left: {
    type: Number,
    require: true,
    default: 0,
  },
  top: {
    type: Number,
    require: true,
    default: 0,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  (event: 'update:modelValue', visible: boolean);
  (event: 'afterClose', eventType: EventType);
}>();

const visible = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit(UPDATE_MODEL_VALUE_EVENT, val);
  },
});

const handleClick = (event: EventType) => {
  emit('afterClose', event);
};
</script>

<style lang="scss" scoped>
.menu-context {
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 9999;
  position: fixed;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 2px 2px 3px 0 rgb(0 0 0 / 30%);

  li {
    font-size: 14px;
    cursor: pointer;
    padding: 5px 10px;
    list-style: none;

    &:hover {
      background-color: #efef;
    }
  }
}
</style>
