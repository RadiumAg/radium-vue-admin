<template>
  <admin-card height="100%" margin="0" flex-direction="row">
    <div ref="containerRef" class="wrapper"></div>
  </admin-card>
</template>

<script lang="ts" setup>
import Konva from 'konva';
import { AdminCard } from '@components';

const ctxMove = 10;
const coordinateAxisSize = 400;
const containerRef = ref<HTMLDivElement>();

const controlPoints = reactive({
  control1: [0.2, 0.2],
  control2: [0.8, 0.8],
});

onMounted(() => {
  const layer = new Konva.Layer();
  const stage = new Konva.Stage({
    container: containerRef.value,
    width: 400,
    height: 400,
  });

  stage.add(layer);

  const line = new Konva.Line({
    points: [0, coordinateAxisSize, coordinateAxisSize, 0],
    stroke: 'red',
  });

  const control1Line = new Konva.Line({
    points: [
      controlPoints.control1[0] * coordinateAxisSize,
      coordinateAxisSize - controlPoints.control1[1] * coordinateAxisSize,
      0,
      coordinateAxisSize,
    ],
    stroke: 'black',
  });

  const controlCircle1 = new Konva.Circle({
    x: controlPoints.control1[0] * coordinateAxisSize,
    y: coordinateAxisSize - controlPoints.control1[1] * coordinateAxisSize,
    fill: 'red',
    radius: 10,
    draggable: true,
  });

  const control2Line = new Konva.Line({
    points: [
      controlPoints.control2[0] * coordinateAxisSize,
      coordinateAxisSize - controlPoints.control2[1] * coordinateAxisSize,
      coordinateAxisSize,
      0,
    ],
    stroke: 'black',
  });

  const controlCircle2 = new Konva.Circle({
    x: controlPoints.control2[0] * coordinateAxisSize,
    y: coordinateAxisSize - controlPoints.control2[1] * coordinateAxisSize,
    fill: 'red',
    radius: 10,
    draggable: true,
  });

  const bezierCurve = new Konva.Shape({
    sceneFunc: (context, shape) => {
      const { control1, control2 } = controlPoints;
      const [cp1x, cp1y] = [
        control1[0] * coordinateAxisSize - ctxMove,
        coordinateAxisSize - control1[1] * coordinateAxisSize,
      ];
      const [cp2x, cp2y] = [
        control2[0] * coordinateAxisSize - ctxMove,
        coordinateAxisSize - control2[1] * coordinateAxisSize,
      ];
      context.beginPath();
      context.moveTo(0, coordinateAxisSize);
      context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, coordinateAxisSize, 0);
      context.fillStrokeShape(shape);
    },
    stroke: 'black',
    strokeWidth: 4,
  });

  stage.on('dragstart', e => {
    e.target.moveTo(layer);
    layer.draw();
  });

  stage.on('dragmove', event => {
    event.target.y(Math.max(event.target.y(), ctxMove));
    event.target.y(Math.min(event.target.y(), coordinateAxisSize - ctxMove));
    event.target.x(Math.max(event.target.x(), ctxMove));
    event.target.x(Math.min(event.target.x(), coordinateAxisSize - ctxMove));

    if (event.target._id === controlCircle1._id) {
      controlPoints.control1[0] = event.target.x() / coordinateAxisSize;
      controlPoints.control1[1] =
        (coordinateAxisSize - event.target.y()) / coordinateAxisSize;
      control1Line.points([
        0,
        coordinateAxisSize,
        event.target.x(),
        event.target.y(),
      ]);
    } else if (event.target._id === controlCircle2._id) {
      controlPoints.control2[0] = event.target.x() / coordinateAxisSize;
      controlPoints.control2[1] =
        (coordinateAxisSize - event.target.y()) / coordinateAxisSize;
      control2Line.points([
        coordinateAxisSize,
        0,
        event.target.x(),
        event.target.y(),
      ]);
    }
    bezierCurve.sceneFunc();
  });

  layer.add(
    bezierCurve,
    line,
    controlCircle1,
    controlCircle2,
    control1Line,
    control2Line,
  );
});
</script>

<style lang="scss" scoped></style>
