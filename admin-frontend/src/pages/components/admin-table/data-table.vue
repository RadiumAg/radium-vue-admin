<script lang="tsx">
import { defineComponent, ref, toRefs, watch } from 'vue';
import { ElAutoResizer, ElCheckbox, ElTableV2 } from 'element-plus';
import { getDataCount } from '.';
import type { Columns } from 'element-plus';

export default defineComponent({
  props: {
    rowKey: {
      type: String,
    },
    selection: {
      type: Boolean,
    },
  },
  setup(props, { attrs }) {
    const dataCount = ref(0);
    const selectionRows = ref<Map<string, any>>(new Map());
    const indeterminateRows = ref<Map<string, any>>(new Map());
    const { columns, data: tableData } = toRefs(
      attrs as { columns: Columns<any>; data: any[] },
    );

    const setDeepCheck = (row, checked) => {
      const rowKey = row[props.rowKey];
      if (checked) {
        selectionRows.value.set(rowKey, row);
      } else {
        selectionRows.value.delete(rowKey);
      }
      row['children']?.forEach(child => {
        const rowKey = child[props.rowKey];
        const children = child['children'];
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

    const setChecked = () => {
      if (selectionRows.value) {
        columns.value.unshift({
          key: 'selection',
          width: 50,
          cellRenderer: ({ rowData }) => {
            const rowKey = rowData[props.rowKey];
            const isChecked = selectionRows.value.has(rowKey);
            const children = rowData['children'] as any[];
            const checkRows = children?.filter(child =>
              selectionRows.value.has(child[props.rowKey]),
            );
            if (
              checkRows &&
              selectionRows.value.size > 0 &&
              checkRows.length > 0 &&
              checkRows.length < children.length
            ) {
              indeterminateRows.value.set(rowKey, rowData);
            } else {
              if (
                checkRows?.length > 0 &&
                checkRows?.length === children?.length
              ) {
                selectionRows.value.set(rowKey, rowData);
              } else if (checkRows?.length === 0) {
                selectionRows.value.delete(rowKey);
              }
              indeterminateRows.value.delete(rowKey);
            }

            return (
              <ElCheckbox
                value={isChecked}
                indeterminate={indeterminateRows.value.has(
                  rowData[props.rowKey],
                )}
                onChange={value => {
                  setDeepCheck(rowData, value);
                }}
              />
            );
          },
          headerCellRenderer: () => {
            const isIndeterminateRows =
              selectionRows.value.size > 0 &&
              selectionRows.value.size < dataCount.value;

            const isChecked =
              selectionRows.value.size > 0 &&
              selectionRows.value.size === dataCount.value;

            return (
              <ElCheckbox
                value={isChecked}
                indeterminate={isIndeterminateRows}
                onChange={value => {
                  tableData.value.forEach(row => {
                    setDeepCheck(row, value);
                  });
                }}
              />
            );
          },
        });
      }
    };

    watch(tableData, async () => {
      dataCount.value = await getDataCount(tableData.value, 'children');
    });

    setChecked();

    return () => {
      return (
        <ElAutoResizer>
          {{
            default: ({ height, width }) => {
              return (
                <ElTableV2
                  {...attrs}
                  rowKey={props.rowKey}
                  columns={columns.value}
                  height={height}
                  width={width}
                />
              );
            },
          }}
        </ElAutoResizer>
      );
    };
  },
});
</script>
