<template>
  <div class="menu-setting">
    <div class="left">
      <role-tree></role-tree>
    </div>
    <div class="right"></div>
  </div>
</template>

<script lang="ts" setup>
import RoleTree from './components/role-tree/role-tree.vue';
</script>

<style lang="scss" scoped>
.menu-setting {
  display: flex;

  .left {
    flex-basis: 100px;
  }
}
</style>
