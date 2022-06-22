<script lang="ts">
import { ElTable } from 'element-plus';
import { defineComponent, h } from 'vue';

export default defineComponent({
  setup(props, { slots }) {
    return () =>
      h(
        ElTable,
        {
          stripe: true,
          border: true,
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
