import { Controller } from '@nestjs/common';

export const AdminController = (prefix: string | string[]) => {
    return Controller('/api/' + prefix);
};
