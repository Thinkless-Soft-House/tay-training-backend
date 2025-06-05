import { ValidationError, ValidatorOptions } from 'class-validator';
import { ErrorHandlerResponse } from '../definitions/http.types';
export declare class ValidationErrorWithIndex extends ValidationError {
    index: number;
    constructor(base: ValidationError, index: number);
}
export declare class ValidationConfig {
    static isValidationError(error: any): boolean;
    static handleError<T>(error: any): ErrorHandlerResponse<T>;
    static validationDTO<T>(val: {
        metatype: T;
        object: any;
    }, customConfiguration?: ValidatorOptions): Promise<any>;
    static validationListDTO<T>(val: {
        metatype: T;
        object: any[];
    }, customConfiguration?: ValidatorOptions): Promise<any[]>;
    private static handleValidatorsErrorWithItem;
    private static handleValidatorsErrorWithList;
    private static handleValidatorsError;
}
