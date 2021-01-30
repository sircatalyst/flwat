import {
  Catch,
  ExceptionFilter,
  HttpStatus,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';
import { Response } from 'express';
import { _responseType } from './app.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * @desc catches any error and returns descent error
   */
  catch(
    exception: { getStatus: any; response: any },
    host: ArgumentsHost,
  ): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus()
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    //result the first class validator error is error is array
    let exceptionResponseMessage =
      typeof exception.response.message === 'object'
        ? exception.response.message[0]
        : exception.response.message;

    //handles invalidate json payload
    exceptionResponseMessage = /Unexpected/g.test(exceptionResponseMessage)
      ? 'Invalid JSON payload passed.'
      : exceptionResponseMessage;


    const errorResponse: _responseType = {
      message:
        status !== HttpStatus.INTERNAL_SERVER_ERROR
          ? exceptionResponseMessage || exception.response
          : 'Internal Server Error',

      status: status !== 200 ? 'error' : 'success',

      data: status !== 200 ? null : response
    };

    if (exception.response.status === 'error') {
      response.status(status).json(exception.response);
    } else {
      response.status(status).json(errorResponse);
    }
  }
}
