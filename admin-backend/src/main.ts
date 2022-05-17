import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import * as compression from 'compression';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './filter/HttpExceptionFilter';
import { ResponseInterceptor } from './interceptor/ResponseInterceptor';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new HttpExceptionFilter())
        // .useGlobalInterceptors(new ResponseInterceptor())
        .use(cookieParser())
        .use(compression());
    const config = new DocumentBuilder()
        .setTitle('Admin API')
        .setDescription('The Radium Admin API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    await app.listen(3000);
}
bootstrap();
