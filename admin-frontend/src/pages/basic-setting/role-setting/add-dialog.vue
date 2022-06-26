<template>
  <admin-dialog v-model="visible" width="300px">
    <el-form ref="formRef" :model="formData" :rules="rules">
      <el-form-item label="名称" prop="roleName">
        <el-input></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleSure">确认</el-button>
    </template>
  </admin-dialog>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import AdminDialog from '@components/admin-dialog/admin-dialog.vue';
import { UPDATE_MODEL_VALUE_EVENT } from '@core/utils';
import { useApi } from '@core/http/api-instance';
import { useErrorMessage } from '@core/hooks/use-error-message';
import type { FormInstance } from 'element-plus';

const { role } = useApi();
const formData = reactive({});
const formRef = ref<FormInstance>();
const rules = {
  roleName: [{ required: true, message: '请填写名称' }],
};

const emits = defineEmits<{
  (event: UPDATE_MODEL_VALUE_EVENT, visible: boolean);
}>();

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const visible = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits(UPDATE_MODEL_VALUE_EVENT, val);
  },
});

const handleSure = () => {
  try {
  } catch (e) {
    useErrorMessage(e);
  }
};
</script>

<style lang="scss" scoped></style>
