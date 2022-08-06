import { ApiProperty } from '@nestjs/swagger';

export class UploadData {
    @ApiProperty({
        type: String,
        required: true,
    })
    directory: string;
}
