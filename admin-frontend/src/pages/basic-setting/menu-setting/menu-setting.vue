<template>
  <div class="menu-setting">
    <admin-card flex-basic="120px" flex-direction="column" margin="0">
      <role-tree></role-tree>
    </admin-card>
    <admin-card auto-fill margin="0 0 0 10px">
      <menu-table></menu-table>
    </admin-card>
  </div>
</template>

<script lang="ts" setup>
import { AdminCard } from '@components';
import { useMenuStore } from '@core/pinia';
import { provide, ref } from 'vue';
import MenuTable from './components/menu-table/menu-table.vue';
import RoleTree from './components/role-tree/role-tree.vue';
import { MENU_SETTING_PROVIDE } from '.';

defineOptions({
  name: 'MenuSettingPage',
});

const { setInclude } = useMenuStore();

provide(MENU_SETTING_PROVIDE, {
  roleId: ref(),
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
