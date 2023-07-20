import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtExceptionFilter } from './auth/jwt-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new JwtExceptionFilter(httpAdapter));
  await app.listen(3000);
}
bootstrap();
