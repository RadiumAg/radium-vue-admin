<template>
  <div class="user-manager-wrapper">
    <admin-card
      margin="0 10px 0 0"
      style="resize: horizontal; width: 400px"
      flex-basic="auto"
    >
      <user-table></user-table>
    </admin-card>
    <admin-card auto-fill margin="0">
      <role-table></role-table>
    </admin-card>
  </div>
</template>

<script lang="ts" setup>
import AdminCard from '@components/admin-card/admin-card.vue';
import RoleTable from './role-table.vue';
import UserTable from './user-table.vue';
</script>

<style lang="scss" scoped>
.user-manager-wrapper {
  height: 100%;
  display: flex;
}
</style>
