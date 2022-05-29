import { ApiExtraModels } from '@nestjs/swagger';
import { Result } from '@vo/Result';

// eslint-disable-next-line @typescript-eslint/ban-types
export const AdminApiExtraModels = (...models: Function[]) => {
    return ApiExtraModels(...[...models, Result]);
};
