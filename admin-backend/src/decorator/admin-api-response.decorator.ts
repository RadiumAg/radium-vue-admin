import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import {
    ReferenceObject,
    SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { Result } from '@vo/result';

export const AdminApiResponse = (schema: SchemaObject | ReferenceObject) => {
    return applyDecorators(
        ApiOkResponse({
            schema: {
                allOf: [
                    {
                        $ref: getSchemaPath(Result),
                    },
                    {
                        properties: {
                            data: schema,
                        },
                    },
                ],
            },
        }),
    );
};
