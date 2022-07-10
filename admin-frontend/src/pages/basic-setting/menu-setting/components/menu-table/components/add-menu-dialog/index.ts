import type { TGetAllRes } from '@core/http/apis/menu/models/TGetAllRes';
import type { TUpdateMenu } from '@core/http/apis/menu/models/TUpdateMenu';
import type { TInsertMenuData } from '@core/http/apis/menu/models/TInsertMenuData';

export type FormType = TInsertMenuData & TUpdateMenu;

export const searchTableData = (tableData: TGetAllRes[], id: string) => {
  if (tableData.length === 0) return;
  for (const data of tableData) {
    const res = searchNext(data, id);
    if (res) return res;
  }
};

const searchNext = (data: TGetAllRes, id: string) => {
  if (data._id === id) return data;
  else return searchTableData(data.children, id);
};
