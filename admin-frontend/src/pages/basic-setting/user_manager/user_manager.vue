<template>
  <div class="user-manager-wrapper">
    <admin-card flex-basic="400px" margin="0 10px 0 0">
      <user-table></user-table>
    </admin-card>
    <admin-card flex-basic="100px" auto-fill margin="0"></admin-card>
  </div>
</template>

<script lang="ts" setup>
import AdminCard from '@components/admin-card/admin-card.vue';
import UserTable from './user-table.vue';
</script>

<style lang="scss" scoped>
.user-manager-wrapper {
  height: 100%;
  display: flex;
}
</style>
