<script lang="ts">
import { ElTable } from 'element-plus';
import { PropType, defineComponent, h } from 'vue';

export default defineComponent({
  props: {
    toRef: {
      type: Function as PropType<(ref: InstanceType<typeof ElTable>) => void>,
      require: false,
      default: () => null,
    },
  },
  setup(props, { slots }) {
    return () =>
      h(
        ElTable,
        {
          ref(ref) {
            props.toRef?.(ref as InstanceType<typeof ElTable>);
          },
          stripe: true,
          border: true,
          highlightCurrentRow: true,
          treeProps: {
            children: 'children',
            hasChildren: 'hasChildren',
          },
          style: {
            height: '100%',
          },
        },
        slots,
      );
  },
});
</script>

<style lang="scss" scoped></style>
