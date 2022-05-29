import type { Base } from '../../common/models/Base';

export type GetAllRes = {
  menuIcon: string;
  menuName: string;
  menuUrl: string;
  parentId: string;
  children: GetAllRes[];
} & Base;
