export const createFileChunk = (file: File, size = 10 * 1024 * 1024) => {
  const fileChunkList: { file: Blob }[] = [];
  let cur = 0;
  while (cur < file.size) {
    fileChunkList.push({ file: file.slice(cur, cur + size) });
    cur += size;
  }
  return fileChunkList;
};
