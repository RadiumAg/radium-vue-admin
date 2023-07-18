<template>
  <admin-dialog v-model="visible" width="300px">
    <el-form ref="formRef" :model="formData" :rules="rules">
      <el-form-item label="名称" prop="roleName">
        <el-input v-model="formData.roleName"></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" :loading="isLoading" @click="handleSure"
        >确认</el-button
      >
    </template>
  </admin-dialog>
</template>

<script lang="ts" setup>
import { AdminDialog } from '@components';
import { UPDATE_MODEL_VALUE_EVENT } from '@core/utils';
import { useApi } from '@core/http/api-instance';
import { useErrorMessage } from '@core/hooks';
import { ElMessage } from 'element-plus';
import type { Role } from '@core/http/apis/role/types';
import type { FormInstance } from 'element-plus';

const { role } = useApi();
const isLoading = ref(false);
const formData = reactive<Role>({
  roleName: '',
  menus: [],
});
const formRef = ref<FormInstance>();
const rules = {
  roleName: [{ required: true, message: '请填写名称' }],
};

const emits = defineEmits<{
  (event: 'update:modelValue', visible: boolean);
  (event: 'afterClose');
}>();

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const visible = computed<boolean>({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits(UPDATE_MODEL_VALUE_EVENT, val);
  },
});

const handleSure = async () => {
  try {
    isLoading.value = true;
    await role.insertRole(formData);
    isLoading.value = false;
    ElMessage.success('插入成功');
    visible.value = false;
    emits('afterClose');
  } catch (e) {
    useErrorMessage(e);
  }
};
</script>

<style lang="scss" scoped></style>
