import SparkMd5 from 'spark-md5';

self.addEventListener('message', e => {
  const { fileChunkList } = e.data;
  const spark = new SparkMd5.ArrayBuffer();
  let percentage = 0;
  let count = 0;
  const loadNext = index => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(fileChunkList[index].file);
    reader.addEventListener('load', e => {
      count++;
      spark.append(e.target.result as ArrayBuffer);
      if (count === fileChunkList.length) {
        postMessage({
          percentage: 100,
          hash: spark.end(),
        });
        self.close();
      } else {
        percentage += 100 / fileChunkList.length;
        postMessage({
          percentage,
        });
        loadNext(count);
      }
    });
  };
  loadNext(0);
});
