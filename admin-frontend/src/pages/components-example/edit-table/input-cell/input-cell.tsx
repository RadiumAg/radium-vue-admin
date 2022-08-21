import Input from 'element-plus/es/components/input';
import type { FunctionalComponent } from 'vue';
import type { SelectionCellProps } from '..';

const InputCell: FunctionalComponent<SelectionCellProps> = ({
  value,
  onChange,
  forwardRef,
}) => {
  return (
    <Input ref={forwardRef as any} onInput={onChange} modelValue={value} />
  );
};

export default InputCell;
