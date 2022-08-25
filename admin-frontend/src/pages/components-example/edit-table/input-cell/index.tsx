import { ElInput } from 'element-plus';
import type { FunctionalComponent } from 'vue';
import type { SelectionCellProps } from '..';

const InputCell: FunctionalComponent<SelectionCellProps> = ({
  value,
  onChange,
  forwardRef,
}) => {
  return (
    <ElInput ref={forwardRef as any} onInput={onChange} modelValue={value} />
  );
};

export default InputCell;
