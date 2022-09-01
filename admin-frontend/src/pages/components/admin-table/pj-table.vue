<script lang="tsx">
import { ElRadio, ElTable, ElTableColumn } from 'element-plus';
import {
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  ref,
  toRef,
  watch,
} from 'vue';
import { defaultRadioWidth } from '.';
import type { CheckConfig, RadioConfig } from '.';
import type { PropType, Ref } from 'vue';

export default defineComponent({
  props: {
    radioConfig: {
      type: Object as PropType<RadioConfig>,
    },
    checkboxConfig: {
      type: Object as PropType<CheckConfig>,
    },
    forwardRef: {
      type: Function as PropType<(ref) => void>,
    },
  },
  emits: ['select', 'currentChange', 'selectAll'],
  setup(props, { slots, emit, attrs }) {
    const currentRow = ref();
    const selectionRows = ref([]);
    const tableData = toRef(attrs, 'data') as Ref<any[]>;
    const tableRef = ref<InstanceType<typeof ElTable>>();
    const componentsSlots = reactive({ default: slots.default });

    const handleSelect = (selection: any[], row: any) => {
      selection = selection.filter(_ => _);
      const checkRow = selection.includes(row);
      if (checkRow) {
        emit('select', selection, row, true);
      } else {
        emit('select', selection, row, false);
      }
    };

    const handleSelectAll = (selection: any[]) => {
      selection = selection.filter(_ => _);
      if (selection.length > 0) {
        selectionRows.value = selection;
        emit('selectAll', selectionRows.value, true);
      } else {
        emit('selectAll', selectionRows.value, false);
      }
    };

    const setRadio = () => {
      if (!attrs['highlight-current-row']) return;
      if (!attrs['row-key'] && !props.radioConfig?.checkField) {
        console.warn('please set the rowKey or checkField');
        return;
      }

      componentsSlots.default = () => {
        const vNodes = slots.default();
        vNodes.unshift(
          <ElTableColumn width={props.radioConfig.width || defaultRadioWidth}>
            {{
              default: ({ row }) => {
                const key = (attrs['row-key'] ||
                  props.radioConfig.checkField) as string;
                return (
                  <ElRadio
                    modelValue={currentRow.value?.[key]}
                    label={row[key]}
                  />
                );
              },
            }}
          </ElTableColumn>,
        );
        return vNodes;
      };
    };

    const handleCurrentChange = (newRow, oldRow) => {
      currentRow.value = newRow;
      emit('currentChange', newRow, oldRow);
    };

    watch(
      tableData,
      async () => {
        await nextTick();
        if (!props.checkboxConfig?.checkField) return;
        props.checkboxConfig.checkRowKeys?.forEach(key => {
          const row = tableData.value.find(
            row => row[props.checkboxConfig.checkField] === key,
          );
          tableRef.value.toggleRowSelection(row, true);
        });
      },
      {
        immediate: true,
      },
    );

    onMounted(() => {
      setRadio();
    });

    return () => {
      return (
        <ElTable
          border
          height="100%"
          onSelect-all={handleSelectAll}
          onSelect={handleSelect}
          onCurrent-change={handleCurrentChange}
          ref={ref => {
            tableRef.value = ref as any;
            props.forwardRef?.(ref);
          }}
        >
          {componentsSlots}
        </ElTable>
      );
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.el-radio__label) {
  display: none;
}
</style>
