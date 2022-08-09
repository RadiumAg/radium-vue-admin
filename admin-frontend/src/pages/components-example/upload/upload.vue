<template>
  <admin-card height="100%" background margin="0" class="upload-wrapper">
    <input ref="inputRef" type="file" />
    <el-button type="primary" @click="handleUpload">上传</el-button>

    <div>
      文件hash:
      <el-progress
        :width="500"
        type="line"
        :percentage="fileInfo.hashPercentage"
      ></el-progress>
    </div>
  </admin-card>
</template>

<script lang="ts" setup>
import AdminCard from '@components/admin-card/admin-card.vue';
import { useErrorMessage } from '@core/hooks/use-error-message';
import { useApi } from '@core/http/api-instance.js';
import { createFileChunk } from '.';

const { upload } = useApi();
const fileInfo = reactive({
  hash: '',
  hashPercentage: 0,
});
const hashWork = new Worker(new URL('./hash', import.meta.url), {
  type: 'module',
});

const inputRef = ref<HTMLInputElement>();

const createFileHash = () => {
  return new Promise<string>(resolve => {
    hashWork.addEventListener('message', ({ data: { percentage, hash } }) => {
      fileInfo.hash = hash;
      fileInfo.hashPercentage = +(percentage as number).toFixed(2);
      if (hash) {
        resolve(hash);
      }
    });
  });
};

const handleUpload = async () => {
  try {
    const fileChunkList = createFileChunk(inputRef.value.files.item(0));
    hashWork.postMessage({ fileChunkList });
    fileInfo.hash = await createFileHash();

    // fileChunk.forEach(async ({ file }) => {
    //   upload.file(file, 'upload');
    // });
  } catch (e) {
    useErrorMessage(e);
  }
};
</script>

<style lang="scss" scoped>
.upload-wrapper {
  display: block;
}
</style>
