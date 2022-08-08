<template>
  <admin-card height="100%" background margin="0">
    <input ref="inputRef" type="file" />
    <el-button type="primary" @click="handleUpload">上传</el-button>
  </admin-card>
</template>

<script lang="ts" setup>
import AdminCard from '@components/admin-card/admin-card.vue';
import { useErrorMessage } from '@core/hooks/use-error-message';
import { useApi } from '@core/http/api-instance.js';
import { createFileChunk } from '.';
const { upload } = useApi();
new Worker('./hash.ts');

const inputRef = ref<HTMLInputElement>();

const handleUpload = async () => {
  try {
    const fileChunk = createFileChunk(inputRef.value.files.item(0));
    fileChunk.forEach(async ({ file }) => {
      upload.file(file, 'upload');
    });
  } catch (e) {
    useErrorMessage(e);
  }
};
</script>

<style lang="scss" scoped></style>
