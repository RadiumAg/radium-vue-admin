import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { AdminResponse } from 'src/core/utils';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                map(value =>
                    AdminResponse.success('', value === null ? '' : value),
                ),
            );
    }
}
