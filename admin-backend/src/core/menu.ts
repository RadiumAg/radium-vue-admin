import { CreateMenuDto } from '@dto/menu/mogodb/CreateMenuDto';
import { Menu } from '@schemas/menu';

export const flatMenu = (menu: CreateMenuDto) => {
    const menus: Menu[] = [];

    const flat = (menu: CreateMenuDto) => {
        menus.push({
            menuName: menu.menuName,
            menuIcon: menu.menuIcon,
        });
        menu.children?.forEach(menu => {
            if (menu.children || menu.children?.length) {
                return flat(menu);
            }
            menus.push({
                menuName: menu.menuName,
                menuIcon: menu.menuIcon,
            });
        });
    };

    flat(menu);

    return menus;
};
