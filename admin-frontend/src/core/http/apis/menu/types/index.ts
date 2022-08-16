import type { Base } from '../../common/types/Base';

export type Menu = {
  menuIcon: string;
  menuName: string;
  menuUrl: string;
  parentId: string;
};

export type InsertMenuData = Menu;

export type GetAllRes = Menu &
  Base & {
    children: GetAllRes[];
  };

export type UpdateMenu = Menu & Base;

export type GetById = Menu & Base;
