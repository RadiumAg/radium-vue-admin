<template>
  <card class="visit-card-wrapper">
    <template #header><span>访问量</span></template>
    <div ref="eDom" style="width: 100%; height: 200px"></div>
  </card>
</template>

<script lang="ts" setup>
import { init } from 'echarts';
import Card from './card.vue';

const eDom = ref();

onMounted(() => {
  const echartsObj = init(eDom.value);
  echartsObj.setOption({
    xAxis: {
      type: 'category',
      data: [
        '1月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月',
      ],
    },
    yAxis: {},
    series: [
      {
        type: 'line',
        name: '2015',
        data: [10, 20, 23, 32, 23, 32, 23, 23, 23, 23, 23, 100],
      },
    ],
  });
});
</script>

<style lang="scss" scoped>
.visit-card-wrapper {
  flex-shrink: 0;
  flex-basis: 300px;
}
</style>
