import {
  ArgumentsHost,
  Catch,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch(UnauthorizedException)
export class JwtExceptionFilter extends BaseExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    if (exception.message == 'Unauthorized') {
      super.catch(new ForbiddenException({ error_message: 'Bad token' }), host);
    } else super.catch(exception, host);
  }
}
