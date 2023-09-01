import { HttpException, HttpStatus } from '@nestjs/common';
export declare class ErrorHandler extends HttpException {
    constructor(message: string, errorCode: number, statusCode?: HttpStatus, data?: any);
}
