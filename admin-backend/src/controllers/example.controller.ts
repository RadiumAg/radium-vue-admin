/*
https://docs.nestjs.com/controllers#controllers
*/

import { JwtAuthGuard } from '@core/auth/guards';
import { mock } from 'mockjs';
import { UseGuards, Get } from '@nestjs/common';
import {
    ApiTags,
    ApiBearerAuth,
    ApiOperation,
    getSchemaPath,
} from '@nestjs/swagger';
import {
    AdminApiExtraModels,
    AdminApiResponse,
    AdminController,
} from '@decorator';
import { GetEditTableData } from '@dto/example/view';
import { AdminResponse } from '@core/utils';

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
