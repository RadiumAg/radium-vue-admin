import { UploadController } from '@controllers/upload.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [UploadController],
    providers: [],
})
export class UploadModule {}
