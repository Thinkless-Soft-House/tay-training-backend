// src/custom-exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorHandler extends HttpException {
  constructor(
    message: string,
    errorCode: number,
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    super(
      {
        message,
        errorCode,
        statusCode,
      },
      statusCode,
    );
  }
}
