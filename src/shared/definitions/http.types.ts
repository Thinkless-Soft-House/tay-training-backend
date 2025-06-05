export enum HttpErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR'
}

export class ErrorHandlerResponse<T = any> {
  message: string;
  statusCode: number;
  errorCode: HttpErrorCode;
  data?: T;

  constructor(options: {
    message: string;
    statusCode: number;
    errorCode: HttpErrorCode;
    data?: T;
  }) {
    this.message = options.message;
    this.statusCode = options.statusCode;
    this.errorCode = options.errorCode;
    this.data = options.data;
  }
}
