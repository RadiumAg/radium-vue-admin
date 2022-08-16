import type {
  GetAllRes,
  InsertMenuData,
  UpdateMenu,
} from '@core/http/apis/menu/types';

export type FormType = InsertMenuData & UpdateMenu;

export const searchTableData = (tableData: GetAllRes[], id: string) => {
  if (tableData.length === 0) return;
  for (const data of tableData) {
    const res = searchNext(data, id);
    if (res) return res;
  }
};

const searchNext = (data: GetAllRes, id: string) => {
  if (data._id === id) return data;
  else return searchTableData(data.children, id);
};
