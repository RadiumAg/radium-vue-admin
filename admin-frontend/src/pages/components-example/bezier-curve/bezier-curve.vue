<template>
  <admin-card height="100%" margin="0">
    <canvas ref="canvasRef" class="canvas" width="400" height="400"></canvas>
  </admin-card>
</template>

<script lang="ts" setup>
import { AdminCard } from '@components';

const canvasRef = ref<HTMLCanvasElement>();
</script>

<style lang="scss" scoped>
.canvas {
  border: 1px solid #ccc;
}
</style>
