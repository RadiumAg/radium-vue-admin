import PjTable from './pj-table.vue';
import type { App } from 'vue';

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
  data.forEach(row => {
    const children = data[treeChildrenProps];
    const checkKey = row[rowKey];
    if (checkKey === checkRowKey) {
      return row;
    } else if (children && children.length > 0) {
      getDataRow(checkKey, children, rowKey, treeChildrenProps);
    }
  });
};

export const installPjTable: (app: App, ...options: any[]) => any = app => {
  app.component('PjTable', PjTable);
};
