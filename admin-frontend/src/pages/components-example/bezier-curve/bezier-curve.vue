<template>
  <admin-card height="100%" margin="0" flex-direction="row">
    <canvas ref="canvasRef" class="canvas" width="400" height="400"></canvas>
    <div>
      <el-input-number v-model="controlPoints.control1[0]"></el-input-number>
      <el-input-number v-model="controlPoints.control1[1]"></el-input-number>
      <el-input-number v-model="controlPoints.control2[0]"></el-input-number>
      <el-input-number v-model="controlPoints.control2[1]"></el-input-number>
    </div>
  </admin-card>
</template>

<script lang="ts" setup>
import { AdminCard } from '@components';

const canvasRef = ref<HTMLCanvasElement>();
const ctxMove = 5;
const coordinateAxisSize = 300;
const controlPoints = reactive({
  control1: [0.17, 0.67],
  control2: [0.82, 0.64],
});

const createBeziperCurve = () => {
  const ctx = canvasRef.value.getContext('2d', {});
  ctx.clearRect(0, 0, coordinateAxisSize, coordinateAxisSize);
  const { control1, control2 } = controlPoints;
  const [cp1x, cp1y] = [
    control1[0] * coordinateAxisSize - ctxMove,
    control1[1] * coordinateAxisSize - ctxMove,
  ];
  const [cp2x, cp2y] = [
    control2[0] * coordinateAxisSize - ctxMove,
    control2[1] * coordinateAxisSize - ctxMove,
  ];
  ctx.closePath();
  ctx.beginPath();
  ctx.moveTo(ctxMove, ctxMove);
  ctx.bezierCurveTo(
    cp1x,
    cp1y,
    cp2x,
    cp2y,
    coordinateAxisSize,
    coordinateAxisSize,
  );
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = 'blue';
  ctx.arc(5, 5, 5, 0, 2 * Math.PI);
  ctx.arc(coordinateAxisSize, coordinateAxisSize, 5, 0, 2 * Math.PI);
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle = 'red';
  ctx.fillRect(cp1x - 5, cp1y, 10, 10);
  ctx.fillRect(cp2x - 5, cp2y - 10, 10, 10);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(ctxMove, ctxMove);
  ctx.lineTo(cp1x, cp1y);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(coordinateAxisSize, coordinateAxisSize);
  ctx.lineTo(cp2x, cp2y);
  ctx.stroke();
};

watch(
  controlPoints,
  async () => {
    await nextTick();
    createBeziperCurve();
  },
  { deep: true, immediate: true, flush: 'post' },
);
</script>

<style lang="scss" scoped>
.canvas {
  perspective: none;
  transform: rotate(-90deg);
  border: 1px solid #ccc;
}
</style>
