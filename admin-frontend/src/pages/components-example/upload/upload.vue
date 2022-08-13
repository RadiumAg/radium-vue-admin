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
import AdminCard from '@components/admin-card/admin-card.vue';
import { useErrorMessage } from '@core/hooks/use-error-message';
import { useApi } from '@core/http/api-instance.js';
import { FileInfo, createFileChunk } from '.';

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
  try {
    const uploadFile = inputRef.value.files.item(0);
    const fileChunkList = createFileChunk(uploadFile);
    hashWork.postMessage({ fileChunkList });
    fileInfo.hash = await createFileHash();
    fileInfo.hashList = fileChunkList.map(({ file }, index) => ({
      file,
      percentage: 0,
      name: `${fileInfo.hash}${index}${uploadFile.name.slice(
        uploadFile.name.lastIndexOf('.'),
      )}`,
    }));

    fileInfo.hashList.forEach(async file => {
      upload.file(file.file, file.name, event => {
        file.percentage = +(event.loaded / event.total).toFixed(2) * 100;
      });
    });
  } catch (e) {
    useErrorMessage(e);
  }
};
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
