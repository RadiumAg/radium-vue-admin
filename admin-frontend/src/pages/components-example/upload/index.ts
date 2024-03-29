const createFileChunk = (file: File, size = 10 * 1024 * 1024) => {
  const fileChunkList: { file: Blob }[] = [];
  let cur = 0;
  while (cur < file.size) {
    fileChunkList.push({ file: file.slice(cur, cur + size) });
    cur += size;
  }
  return fileChunkList;
};

type FileInfo = {
  hash: string;
  hashPercentage: number;
  hashList: {
    file: Blob;
    name: string;
    percentage: number;
  }[];
};

export type { FileInfo };
export { createFileChunk };
