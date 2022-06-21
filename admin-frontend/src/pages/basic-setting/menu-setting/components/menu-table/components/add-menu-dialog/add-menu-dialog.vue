<template>
  <admin-dialog v-model="visible" width="500px">
    <el-form :model="formData" :rules="rules" label-width="50px">
      <el-form-item label="名称" prop="menuName">
        <el-input v-model="formData.menuName"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="menuUrl">
        <el-input v-model="formData.menuUrl"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="menuIcon">
        <icon-select v-model="formData.menuIcon"></icon-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button
        :loading="isLoading"
        type="primary"
        @click="
          isSureButtonClick = true;
          visible = false;
        "
        >确认</el-button
      >
    </template>
  </admin-dialog>
</template>

<script lang="ts" setup>
import IconSelect from '@components/icon-select/icon-select.vue';
import AdminDialog from '@components/admin-dialog/admin-dialog.vue';
import { useApi } from '@core/http/api-instance';
import { computed, reactive, ref } from 'vue';
import { UPDATE_MODEL_VALUE_EVENT, autoMap } from '@core/utils';
import { useErrorMessage } from '@core/hooks/use-error-message';
import { ElMessage, FormRules } from 'element-plus';
import type { FormType } from '.';

const props = defineProps({
  parentId: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Boolean,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});
const emits = defineEmits<{
  (event: 'afterClose');
  (event: UPDATE_MODEL_VALUE_EVENT, visible: boolean);
}>();
const isLoading = ref(false);
const isSureButtonClick = ref(false);
const { menu } = useApi();

const visible = computed({
  get() {
    return props.modelValue;
  },
  async set(val) {
    if (isSureButtonClick.value) {
      isSureButtonClick.value = false;
      if (!(await insertMenu())) {
        return;
      }
      emits('afterClose');
    }
    emits(UPDATE_MODEL_VALUE_EVENT, val);
  },
});

const rules: FormRules = {
  menuName: [
    {
      required: true,
      message: '请填写菜单名称',
    },
  ],
};

const formData = reactive<FormType>({
  menuIcon: '',
  menuName: '',
  menuUrl: '',
  parentId: props.parentId,
});

const insertMenu = async () => {
  try {
    isLoading.value = true;
    await menu.insertMenu(formData);
    isLoading.value = false;
    ElMessage.success('插入成功');
    return true;
  } catch (e) {
    useErrorMessage(e);
    return false;
  }
};

const getData = () => {
  try {
    if (!props.id) return;
    const resData = menu.getById(props.id);
    autoMap(formData, resData);
  } catch (e) {
    useErrorMessage(e);
  }
};

getData();
</script>

<style lang="scss" scoped></style>
