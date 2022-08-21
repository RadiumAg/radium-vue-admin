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
        <icon-select v-model="formData.menuIcon" clearable></icon-select>
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
import { useApi } from '@core/http';
import { computed, reactive, ref } from 'vue';
import { UPDATE_MODEL_VALUE_EVENT, autoMap } from '@core/utils';
import { useErrorMessage } from '@core/hooks';
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
  (event: 'update:modelValue', visible: boolean);
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
      if (!(await save())) {
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
  _id: props.id,
  menuIcon: '',
  menuName: '',
  menuUrl: '',
  parentId: props.parentId,
});

const save = async () => {
  try {
    if (props.id) {
      isLoading.value = true;
      await menu.updateMenu(formData);
      isLoading.value = false;
      ElMessage.success('更新成功');
    } else {
      isLoading.value = true;
      await menu.insertMenu({
        menuIcon: formData.menuIcon,
        menuName: formData.menuName,
        menuUrl: formData.menuUrl,
        parentId: formData.parentId,
      });
      isLoading.value = false;
      ElMessage.success('保存成功');
    }
    return true;
  } catch (e) {
    useErrorMessage(e);
    isLoading.value = false;
    return false;
  }
};

const getData = async () => {
  try {
    if (!props.id) return;
    const resData = await menu.getById(props.id);
    autoMap(formData, resData.data);
  } catch (e) {
    useErrorMessage(e);
  }
};

getData();
</script>

<style lang="scss" scoped></style>
