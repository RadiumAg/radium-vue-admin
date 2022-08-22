import { AdminResponse } from './../core/utils';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { JwtAuthGuard } from '@core/auth/guards/jwt-auth.guard';
import {
    AdminApiExtraModels,
    AdminApiResponse,
    AdminController,
} from '@decorator';
import { mock } from 'mockjs';
import { UseGuards, Post } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('example')
@ApiBearerAuth()
@AdminApiExtraModels()
@AdminController('example')
export class ExampleController {
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '获取编辑表格信息' })
    @AdminApiResponse({ type: 'string' })
    @Post('insertMenu')
    async getEditTableData() {
        const users = Array.from({ length: 50 }).map(() => ({
            name: mock('@name'),
            address: mock('@area'),
        }));

        return AdminResponse.success('获取成功', users);
    }
}
