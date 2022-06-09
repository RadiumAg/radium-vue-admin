import { AdminResponse } from '@core/utils';
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        if (status === HttpStatus.BAD_REQUEST) {
            response
                .status(status)
                .json(
                    AdminResponse.error(
                        (exception.getResponse() as any).message,
                        status,
                    ),
                );
        } else {
            response
                .status(status)
                .json(AdminResponse.error(exception.message, status));
        }
    }
}
