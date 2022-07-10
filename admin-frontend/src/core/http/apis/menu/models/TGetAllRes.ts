import type { Base } from '../../common/models/Base';
import type { Menu } from './Menu';

export type TGetAllRes = Menu &
  Base & {
    children: TGetAllRes[];
  };
