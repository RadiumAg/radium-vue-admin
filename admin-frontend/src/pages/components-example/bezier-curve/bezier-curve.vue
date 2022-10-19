<template>
  <admin-card height="100%" margin="0" flex-direction="row">
    <div ref="containerRef" class="wrapper"></div>
  </admin-card>
</template>

<script lang="ts" setup>
import konva from 'konva';
import { AdminCard } from '@components';

const ctxMove = 0;
const coordinateAxisSize = 400;
const containerRef = ref<HTMLDivElement>();

const controlPoints = reactive({
  control1: [0.2, 0.1],
  control2: [0.8, 0.9],
});

onMounted(() => {
  const layer = new konva.Layer();
  const stage = new konva.Stage({
    container: containerRef.value,
    width: 400,
    height: 400,
  });

  stage.add(layer);

  const line = new konva.Line({
    points: [0, 0, coordinateAxisSize, coordinateAxisSize],
    stroke: 'red',
  });

  const controlCircle1 = new konva.Circle({
    x: controlPoints.control1[0] * coordinateAxisSize,
    y: controlPoints.control1[1] * coordinateAxisSize,
    fill: 'red',
    radius: 10,
    draggable: true,
  });

  const controlCircle2 = new konva.Circle({
    x: controlPoints.control2[0] * coordinateAxisSize,
    y: controlPoints.control2[1] * coordinateAxisSize,
    fill: 'red',
    radius: 10,
    stroke: 'red',
    strokeWidth: 4,
    draggable: true,
  });

  const bezierCurve = new konva.Shape({
    sceneFunc: (context, shape) => {
      const { control1, control2 } = controlPoints;
      const [cp1x, cp1y] = [
        control1[0] * coordinateAxisSize - ctxMove,
        control1[1] * coordinateAxisSize - ctxMove,
      ];
      const [cp2x, cp2y] = [
        control2[0] * coordinateAxisSize - ctxMove,
        control2[1] * coordinateAxisSize - ctxMove,
      ];
      context.beginPath();
      context.moveTo(0, 0);
      context.bezierCurveTo(
        cp1x,
        cp1y,
        cp2x,
        cp2y,
        coordinateAxisSize,
        coordinateAxisSize,
      );
      context.fillStrokeShape(shape);
    },
    stroke: 'black',
    strokeWidth: 4,
  });

  stage.on('dragstart', e => {
    e.target.moveTo(layer);
    layer.draw();
  });

  layer.add(bezierCurve, line, controlCircle1, controlCircle2);

  stage.on('dragmove', event => {
    if (event.target._id === controlCircle1._id) {
      controlPoints.control1[0] = event.target.x() / coordinateAxisSize;
      controlPoints.control1[1] = event.target.y() / coordinateAxisSize;
    } else if (event.target._id === controlCircle2._id) {
      controlPoints.control2[0] = event.target.x() / coordinateAxisSize;
      controlPoints.control2[1] = event.target.y() / coordinateAxisSize;
    }
    bezierCurve.sceneFunc();
  });
});
</script>

<style lang="scss" scoped></style>
