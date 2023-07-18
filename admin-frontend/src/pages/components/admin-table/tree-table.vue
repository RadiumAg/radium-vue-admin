<script lang="tsx">
import { ElCheckbox, ElTable, ElTableColumn } from 'element-plus';
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRef,
  toRefs,
  watch,
} from 'vue';
import { defaultCheckboxWidth, getDataCount, getDataRow } from '.';
import type { CheckConfig } from '.';
import type { PropType } from 'vue';

export default defineComponent({
  props: {
    rowKey: {
      type: String,
      required: true,
    },
    selection: {
      type: Boolean,
    },
    forwardRef: {
      type: Function as PropType<(ref) => void>,
    },
    checkboxConfig: {
      type: Object as PropType<CheckConfig>,
    },
    checkRowKeys: {
      type: Array as PropType<string[]>,
    },
  },
  emits: ['rowClick', 'selectionChange', 'select'],
  setup(props, { emit, attrs, slots, expose }) {
    const dataCount = ref(0);
    const dataTableRef = ref<InstanceType<typeof ElTable>>();
    const selectionRows = ref<Map<string, any>>(new Map());
    const indeterminateRows = ref<Map<string, any>>(new Map());
    const tableSlots = reactive({ default: slots.default });
    const { 'tree-props': treeProps, data: tableData } = toRefs(attrs as any);
    const treeChildrenProp = toRef(treeProps.value, 'children');

    const setDeepCheck = (row, checked) => {
      const rowKey = row[props.rowKey];
      if (checked) {
        selectionRows.value.set(rowKey, row);
      } else {
        selectionRows.value.delete(rowKey);
      }
      row[treeChildrenProp.value]?.forEach(child => {
        const rowKey = child[props.rowKey];
        const children = child[treeChildrenProp.value];
        if (checked) {
          selectionRows.value.set(rowKey, child);
        } else {
          selectionRows.value.delete(rowKey);
        }
        if (children) {
          children.forEach(child => {
            setDeepCheck(child, checked);
          });
        }
      });
    };

    const clearSelection = () => {
      selectionRows.value.clear();
      indeterminateRows.value.clear();
    };

    onMounted(() => {
      if (props.selection) {
        if (!props.rowKey) {
          console.warn('please set the rowKey');
          return;
        }
        tableSlots.default = () => {
          const columnsVNodes = slots.default();
          columnsVNodes.unshift(
            <ElTableColumn
              className="checkbox-column"
              align="center"
              width={props.checkboxConfig?.width || defaultCheckboxWidth}
            >
              {{
                default: ({ row }) => {
                  const rowKey = row[props.rowKey];
                  const isChecked = selectionRows.value.has(rowKey);
                  const children = row[treeChildrenProp.value] as any[];
                  const checkRows = children?.filter(child =>
                    selectionRows.value.has(child[props.rowKey]),
                  );
                  if (
                    checkRows &&
                    selectionRows.value.size > 0 &&
                    checkRows.length > 0 &&
                    checkRows.length < children.length
                  ) {
                    indeterminateRows.value.set(rowKey, row);
                  } else {
                    if (
                      children?.length > 0 &&
                      checkRows?.length > 0 &&
                      checkRows?.length === children?.length
                    ) {
                      selectionRows.value.set(rowKey, row);
                    } else if (
                      children?.length > 0 &&
                      checkRows?.length === 0
                    ) {
                      selectionRows.value.delete(rowKey);
                    }
                    indeterminateRows.value.delete(rowKey);
                  }

                  return (
                    <ElCheckbox
                      modelValue={isChecked}
                      indeterminate={indeterminateRows.value.has(
                        row[props.rowKey],
                      )}
                      onChange={value => {
                        setDeepCheck(row, value);
                      }}
                    />
                  );
                },
                header: () => {
                  const isIndeterminateRows =
                    selectionRows.value.size > 0 &&
                    selectionRows.value.size < dataCount.value;

                  const isChecked =
                    selectionRows.value.size > 0 &&
                    selectionRows.value.size === dataCount.value;

                  return (
                    <ElCheckbox
                      modelValue={isChecked}
                      indeterminate={isIndeterminateRows}
                      onChange={value => {
                        tableData.value.forEach(row => {
                          setDeepCheck(row, value);
                        });
                      }}
                    />
                  );
                },
              }}
            </ElTableColumn>,
          );
          return columnsVNodes;
        };
      }
    });

    watch(tableData, async () => {
      dataCount.value = await getDataCount(
        tableData.value,
        treeChildrenProp.value,
      );
    });

    watch(
      [tableData, () => props.checkRowKeys],
      () => {
        selectionRows.value.clear();
        props.checkRowKeys?.forEach(key => {
          const row = getDataRow(
            key,
            tableData.value,
            props.rowKey,
            treeChildrenProp.value,
          );
          if (row) {
            selectionRows.value.set(row[props.rowKey], row);
          }
        });
      },
      { immediate: true },
    );

    watch(tableData, () => {
      if (!props.checkboxConfig?.checkField) return;
      const setCheckFileSelection = children => {
        if (children) {
          children.forEach(child => {
            const rowKey = child[props.rowKey];
            const checkFileValue = child[props.checkboxConfig.checkField];
            if (checkFileValue) {
              selectionRows.value.set(rowKey, child);
            } else {
              selectionRows.value.delete(rowKey);
            }

            const children = child[treeChildrenProp.value];
            setCheckFileSelection(children);
          });
        }
      };

      setCheckFileSelection(tableData.value);
    });

    watch(
      selectionRows,
      (newValue: Map<string, any>, oldValue: Map<string, any>) => {
        const selection = [...newValue.values()];
        const oldSelection = [...oldValue.values()];
        const checkRow = selection.find(role => !selectionRows.value.has(role));
        const cancelRow = oldSelection.filter(
          role => !selection.includes(role),
        );
        if (checkRow) {
          emit('selectionChange', {
            selection,
            row: checkRow,
            checked: true,
          });
        } else if (cancelRow) {
          emit('selectionChange', {
            selection,
            row: cancelRow,
            checked: false,
          });
        }
      },
      {
        deep: true,
      },
    );

    expose({ clearSelection });

    return () => (
      <ElTable
        {...attrs}
        rowKey={props.rowKey}
        tableLayout="fixed"
        border={true}
        highlightCurrentRow={true}
        height="100%"
        ref={ref => {
          dataTableRef.value = ref as any;
          props.forwardRef?.(ref);
        }}
      >
        {tableSlots}
      </ElTable>
    );
  },
});
</script>

<style lang="scss" scoped>
.checkbox-column {
  display: flex;
  justify-content: center;
}
</style>
