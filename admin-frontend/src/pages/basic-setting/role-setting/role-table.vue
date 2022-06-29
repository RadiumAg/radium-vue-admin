<template>
  <admin-table>
    <el-table-column type="selection"></el-table-column>

    <el-table-column label="角色名称" prop="roleName"></el-table-column>
  </admin-table>
</template>

<script lang="ts" setup>
import AdminTable from '@components/admin-table/admin-table.vue';
</script>
