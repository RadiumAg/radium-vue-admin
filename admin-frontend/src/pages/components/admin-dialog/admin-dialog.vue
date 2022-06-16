<script lang="ts">
import { ElDialog } from 'element-plus';
import { defineComponent, h } from 'vue';
export default defineComponent({
  setup(props, { slots }) {
    return () => h(ElDialog as any, { appendToBody: true }, slots);
  },
});
</script>

<style lang="scss">
.el-overlay {
  backdrop-filter: blur(4px);
}
</style>
