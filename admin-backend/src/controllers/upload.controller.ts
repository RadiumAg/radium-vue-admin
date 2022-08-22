import { JwtAuthGuard } from '@core/auth/guards/jwt-auth.guard';
import { AdminController } from '@decorator';
import {
    Get,
    Post,
    Query,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { resolve } from 'path';

@ApiTags('upload')
@AdminController('upload')
export class UploadController {
    @ApiOperation({
        summary: '文件上传',
        requestBody: {
            content: {
                ['multipart/form-data']: {
                    schema: {
                        type: 'object',
                        properties: {
                            files: {
                                type: 'array',
                                items: {
                                    type: 'string',
                                    format: 'binary',
                                },
                            },
                            directory: {
                                type: 'string',
                            },
                        },
                    },
                },
            },
        },
    })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('files'))
    @Post('file')
    async uploadFile(
        @UploadedFiles() files: Array<Express.Multer.File>,
        @Query('filename') fileName: string,
    ) {
        const dirPath = resolve(__dirname, '../targets');
        if (!existsSync(dirPath)) {
            await mkdir(dirPath);
        }
        files.forEach(file => {
            writeFile(resolve(dirPath, fileName), file.buffer);
        });
    }

    @Get('merge')
    async merge(@Query('filename') filename: string) {}
}
