<template>
  <teleport to="body">
    <ul class="menucontext">
      <li>
        <el-icon>
          <refresh-left></refresh-left>
        </el-icon>
        刷新
      </li>

      <li>
        <el-icon>
          <back></back>
        </el-icon>
        关闭左侧
      </li>

      <li>
        <el-icon>
          <right></right>
        </el-icon>
        关闭右侧
      </li>
    </ul>
  </teleport>
</template>

<script lang="ts" setup>
import { Back, RefreshLeft, Right } from '@element-plus/icons-vue';

defineProps({
  left: {
    type: Number,
    require: true,
  },
  right: {
    type: Number,
    require: true,
  },
});
</script>

<style lang="scss" scoped>
.menucontext {
  top: 0;
  left: 0;
  position: fixed;
  background-color: #fff;
  border-radius: 10px;
}
</style>
