<template>
  <admin-card
    margin="0"
    height="100%"
    :border="false"
    padding="0"
    flex-direction="column"
  >
    <div class="operate">
      <el-button type="primary" @click="adminDialogVisible = true"
        >添加</el-button
      >
    </div>
    <role-table></role-table>
  </admin-card>

  <add-dialog v-model="adminDialogVisible"></add-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import AdminCard from '@components/admin-card/admin-card.vue';
import AddDialog from './add-dialog.vue';
import RoleTable from './role-table.vue';

const adminDialogVisible = ref(false);
</script>

<style lang="scss" scoped>
.operate {
  margin-bottom: 10px;
}
</style>
