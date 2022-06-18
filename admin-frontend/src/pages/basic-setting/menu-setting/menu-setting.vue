<template>
  <div class="menu-setting">
    <admin-card flex-basic="120px" margin="0">
      <role-tree></role-tree>
    </admin-card>
    <admin-card auto-fill margin="0 0 0 10px">
      <menu-table></menu-table>
    </admin-card>
  </div>
</template>

<script lang="ts" setup>
import AdminCard from '@components/admin-card/admin-card.vue';
import { setInclude } from '@core/pinia/stores/menuStore';
import MenuTable from './components/menu-table/menu-table.vue';
import RoleTree from './components/role-tree/role-tree.vue';

defineOptions({
  name: 'MenuSettingPage',
});

setInclude('MenuSettingPage');
</script>

<style lang="scss" scoped>
.menu-setting {
  height: 100%;
  display: flex;
  align-items: stretch;

  .left {
    flex-basis: 100px;
  }
}
</style>
