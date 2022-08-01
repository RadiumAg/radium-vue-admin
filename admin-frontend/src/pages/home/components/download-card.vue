<template>
  <card class="w-100">
    <template #header><span>下载量</span></template>
    <div ref="eDom" style="width: 100%; height: 200px"></div>
  </card>
</template>

<script lang="ts" setup>
import { init } from 'echarts';
import Card from './card.vue';

const eDom = ref();

onMounted(() => {
  const echartsObj = init(eDom.value, undefined);
  echartsObj.setOption({
    xAxis: {
      type: 'category',
      data: ['Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Walnut Brownie'],
    },
    yAxis: {},
    series: [
      {
        type: 'line',
        name: '2015',
        data: [89.3, 92.1, 94.4, 85.4],
      },
    ],
  });
});
</script>

<style lang="scss" scoped></style>
