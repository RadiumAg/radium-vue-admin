import { JwtAuthGuard } from '@core/auth';
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
import { writeFile, mkdir, readdir, rmdir } from 'fs/promises';
import {
    WriteStream,
    createReadStream,
    createWriteStream,
    existsSync,
    unlinkSync,
} from 'fs';
import { resolve } from 'path';
import { AdminController } from '@decorator';

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
        const dirPath = resolve(
            process.cwd(),
            'targets',
            fileName.replace(
                [...fileName.matchAll(/(-\d+\.[a-z]+)$/g)][0][0],
                '',
            ),
        );

        if (!existsSync(dirPath)) {
            await mkdir(dirPath, { recursive: true });
        }

        files.forEach(file => {
            writeFile(resolve(dirPath, fileName), file.buffer);
        });
    }

    @ApiOperation({
        summary: '合并文件',
    })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('files'))
    @Get('merge')
    async merge(
        @Query('filename') filename: string,
        @Query('size') size: number,
    ) {
        const targetsFile = resolve(process.cwd(), 'targets');
        const chunkFileDir = resolve(
            targetsFile,
            filename.slice(0, filename.lastIndexOf('.')),
        );
        const chunkFileArray = await readdir(resolve(chunkFileDir));

        chunkFileArray.sort(
            (a, b) =>
                +a.slice(a.lastIndexOf('.') - 1) -
                +b.slice(a.lastIndexOf('.') - 1),
        );

        const pipeStream = (path: string, writeStream: WriteStream) => {
            console.log(path);
            return new Promise(resolve => {
                const readStream = createReadStream(path);

                readStream.on('end', () => {
                    unlinkSync(path);
                    resolve(undefined);
                });

                readStream.pipe(writeStream);
            });
        };

        await Promise.all(
            chunkFileArray.map((path, index) => {
                pipeStream(
                    resolve(chunkFileDir, path),
                    createWriteStream(resolve(targetsFile, filename), {
                        start: index * size,
                    }),
                );
            }),
        );

        console.log(chunkFileDir);
        await rmdir(chunkFileDir);
    }
}
