import { AdminResponse } from './../core/utils';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { JwtAuthGuard } from '@core/auth/guards/jwt-auth.guard';
import { mock } from 'mockjs';
import { UseGuards, Post, Get } from '@nestjs/common';
import {
    ApiTags,
    ApiBearerAuth,
    ApiOperation,
    getSchemaPath,
} from '@nestjs/swagger';
import { AdminApiExtraModels } from '@decorator/admin-api-extra-models.decorator';
import { AdminApiResponse } from '@decorator/admin-api-response.decorator';
import { AdminController } from '@decorator/admin-controller.decorator';
import { GetEditTableData } from '@dto/example/view';

@ApiTags('example')
@ApiBearerAuth()
@AdminApiExtraModels(GetEditTableData)
@AdminController('example')
export class ExampleController {
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '获取测试用户信息' })
    @AdminApiResponse({ $ref: getSchemaPath(GetEditTableData) })
    @Get('getExampleUsers')
    async getExampleUsers() {
        const users = Array.from({ length: 50 }).map(() => ({
            name: mock('@name'),
            email: mock('@email'),
            address: mock('@city(true)'),
        }));

        return AdminResponse.success('获取成功', users);
    }
}
