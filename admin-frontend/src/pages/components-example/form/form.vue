<template>
  <admin-card margin="0">
    <el-form ref="formInstance" :model="form" label-width="120px">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="活动区域" prop="region">
        <el-select v-model="form.region" placeholder="请选择你得活动区域">
          <el-option label="上海" value="上海"></el-option>
          <el-option label="北京" value="北京"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="活动时间" prop="date1">
        <el-col :span="11">
          <el-date-picker
            v-model="form.date1"
            type="date"
            placeholder="选择一个时间"
            style="width: 100%"
          ></el-date-picker>
        </el-col>

        <el-col :span="2" class="text-center">
          <span class="text-gray-500">-</span>
        </el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker
              v-model="form.date2"
              placeholder="选择一个时间"
              style="width: 100%"
            ></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="及时配送" prop="delivery">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>

      <el-form-item label="活动性质" prop="type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="线上活动" name="type"></el-checkbox>
          <el-checkbox label="线下活动" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="活动资源" prop="resource">
        <el-radio-group v-model="form.resource">
          <el-radio label="线上品牌赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="活动形式" prop="desc">
        <el-input v-model="form.desc" type="textarea"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit">创建</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </admin-card>
</template>

<script lang="ts" setup>
import { AdminCard } from '@components';
import { ElMessageBox, FormInstance } from 'element-plus';
import { reactive } from 'vue';

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
});
const formInstance = ref<FormInstance>();

const handleSubmit = () => {
  ElMessageBox.confirm(JSON.stringify(form));
};

const handleReset = () => {
  formInstance.value?.resetFields();
};
</script>
