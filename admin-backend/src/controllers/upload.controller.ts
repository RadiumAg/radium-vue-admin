import { JwtAuthGuard } from '@core/auth/guards/jwt-auth.guard';
import { AdminController } from '@decorator/admin-controller.decorator';
import {
    Post,
    Query,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

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
        @Query('dir') directory: string,
        @UploadedFiles() files: Array<Express.Multer.File>,
    ) {
        console.log(files, directory);
    }
}
