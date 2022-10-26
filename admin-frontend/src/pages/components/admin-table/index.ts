export const defaultCheckboxWidth = 80;
export const defaultRadioWidth = 80;

export type RadioConfig = {
  width?: number;
  checkField: string;
  checkRowKey?: string;
};

export type CheckConfig = {
  checkField: string;

  width?: number;
  checkRowKeys?: string[];
};

export const getDataCount = async (data: any[], childProps: string) => {
  let dataCount = 0;
  const calculation = async data => {
    await Promise.resolve().then(async () => {
      for (const child of data) {
        const children = child[childProps];
        dataCount++;
        if (children && children.length > 0) {
          await calculation(children);
        }
      }
    });
  };

  await calculation(data);
  return dataCount;
};

export const getDataRow = (
  checkRowKey: string,
  data: any[],
  rowKey: string,
  treeChildrenProps: string,
) => {
  for (const row of data) {
    const children = row[treeChildrenProps];
    const checkKey = row[rowKey];
    if (checkKey === checkRowKey) {
      return row;
    }

    if (children && children.length > 0) {
      const row = getDataRow(checkRowKey, children, rowKey, treeChildrenProps);
      if (row) {
        return row;
      }
    }
  }
};
