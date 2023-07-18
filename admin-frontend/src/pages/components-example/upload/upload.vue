<template>
  <admin-card height="100%" background margin="0" class="upload-wrapper">
    <input ref="inputRef" type="file" />
    <el-button type="primary" @click="handleUpload">上传</el-button>

    <div class="hash-progress">
      文件hash:
      <el-progress
        :width="500"
        type="line"
        :percentage="fileInfo.hashPercentage"
      ></el-progress>
    </div>

    <div class="hash-progress">
      上传切片:
      <div v-for="item in fileInfo.hashList" :key="item.percentage">
        {{ item.name }}

        {{ item.file.size }}

        <el-progress
          :width="500"
          type="line"
          :percentage="item.percentage"
        ></el-progress>
      </div>
    </div>
  </admin-card>
</template>

<script lang="ts" setup>
import { AdminCard } from '@components';
import { useApi } from '@core/http';
import { useMenuStore } from '@core/pinia';
import { ElMessage } from 'element-plus';
import { createFileChunk } from '.';
import type { FileInfo } from '.';

defineOptions({
  name: 'UploadPage',
});
const { setInclude } = useMenuStore();
const { upload } = useApi();
const fileInfo = reactive<FileInfo>({
  hash: '',
  hashPercentage: 0,
  hashList: [],
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
  const uploadFile = inputRef.value.files.item(0);
  const fileType = `${uploadFile.name.slice(uploadFile.name.lastIndexOf('.'))}`;

  if (!uploadFile) {
    ElMessage.warning('请选择文件');
    return;
  }

  const fileChunkList = createFileChunk(uploadFile);
  hashWork.postMessage({ fileChunkList });
  fileInfo.hash = await createFileHash();
  fileInfo.hashList = fileChunkList.map(({ file }, index) => ({
    file,
    percentage: 0,
    name: `${fileInfo.hash}-${index}${fileType}`,
  }));

  await Promise.all(
    fileInfo.hashList.map(file => {
      return upload.file(file.file, file.name, event => {
        file.percentage = +(event.loaded / event.total).toFixed(2) * 100;
      });
    }),
  );

  upload.merge(`${fileInfo.hash}${fileType}`, 1024 * 1024);
};

setInclude('UploadPage');
</script>

<style lang="scss" scoped>
.upload-wrapper {
  display: block;
}

.hash-progress {
  font-size: 14px;
  margin-top: 20px;
}
</style>
