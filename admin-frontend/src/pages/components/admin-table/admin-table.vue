<script lang="ts" setup>
import { ElTable } from 'element-plus';
import { h } from 'vue';

defineOptions({
  setup() {
    return h(ElTable, { stripe: true, border: true });
  },
});
</script>

<style lang="scss" scoped></style>
