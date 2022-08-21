import type { ElInput } from 'element-plus';

export type SelectionCellProps = {
  value: string;
  intermediate?: boolean;
  onChange: (value: string) => void;
  forwardRef: (el: InstanceType<typeof ElInput>) => void;
};
