import { ApiProperty } from '@nestjs/swagger';

export class Result<T> {
    constructor(code: number, msg: string, data: T | null) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    @ApiProperty({ type: Number })
    private code: number;

    @ApiProperty({ type: String })
    private msg: string;

    private data: T | null;
}
