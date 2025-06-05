"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationConfig = exports.ValidationErrorWithIndex = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const lodash_1 = require("lodash");
const http_types_1 = require("../definitions/http.types");
class ValidationErrorWithIndex extends class_validator_1.ValidationError {
    constructor(base, index) {
        super();
        this.index = index;
        Object.assign(this, base);
    }
}
exports.ValidationErrorWithIndex = ValidationErrorWithIndex;
const validationDefaultConfiguration = {
    whitelist: true,
    forbidNonWhitelisted: false,
    transform: true,
    skipMissingProperties: false,
    validationError: { target: false },
};
class ValidationConfig {
    static isValidationError(error) {
        return ((0, lodash_1.isArray)(error) &&
            (error[0] instanceof ValidationErrorWithIndex ||
                error[0] instanceof class_validator_1.ValidationError));
    }
    static handleError(error) {
        let message;
        if (error[0] instanceof ValidationErrorWithIndex) {
            message = this.handleValidatorsErrorWithList(error);
        }
        else if (error[0] instanceof class_validator_1.ValidationError) {
            message = this.handleValidatorsErrorWithItem(error);
        }
        return new http_types_1.ErrorHandlerResponse({
            message: message,
            statusCode: 400,
            errorCode: http_types_1.HttpErrorCode.VALIDATION_ERROR,
        });
    }
    static async validationDTO(val, customConfiguration = {}) {
        const { metatype } = val;
        let { object } = val;
        object = (0, lodash_1.omitBy)(object, lodash_1.isUndefined);
        const entity = (0, class_transformer_1.plainToInstance)(metatype, object, {});
        const configuration = Object.assign(validationDefaultConfiguration, customConfiguration);
        await (0, class_validator_1.validateOrReject)(entity, Object.assign({}, configuration));
        if (configuration.transform) {
            return entity;
        }
        return object;
    }
    static async validationListDTO(val, customConfiguration = {}) {
        const { metatype, object } = val;
        const transformed = [];
        let validationsErrors = [];
        const configuration = Object.assign(validationDefaultConfiguration, customConfiguration);
        for (const iterator of object) {
            const entity = (0, class_transformer_1.plainToInstance)(metatype, (0, lodash_1.omitBy)(iterator, lodash_1.isUndefined));
            try {
                await (0, class_validator_1.validateOrReject)(entity, Object.assign(Object.assign({}, configuration), { forbidNonWhitelisted: false }));
            }
            catch (error) {
                validationsErrors.push(error.map((err) => new ValidationErrorWithIndex(err, object.indexOf(iterator))));
            }
            if (configuration.transform)
                transformed.push(entity);
        }
        if (validationsErrors.length > 0) {
            validationsErrors = (0, lodash_1.concat)(...validationsErrors);
            throw validationsErrors;
        }
        if (configuration.transform) {
            return transformed;
        }
        return object;
    }
    static handleValidatorsErrorWithItem(error) {
        return error.map((err) => this.handleValidatorsError(err)).join(', ');
    }
    static handleValidatorsErrorWithList(error) {
        return error
            .map((err) => `Item ${err.index} - ${this.handleValidatorsError(err)}`)
            .join(', ');
    }
    static handleValidatorsError(error, parentPath = '') {
        const currentPath = parentPath
            ? `${parentPath}.${error.property}`
            : error.property;
        if (error.constraints) {
            return `${Object.values(error.constraints).join(', ')}`;
        }
        if (error.children && error.children.length > 0) {
            return error.children
                .map((child) => this.handleValidatorsError(child, currentPath))
                .join(', ');
        }
        return '';
    }
}
exports.ValidationConfig = ValidationConfig;
//# sourceMappingURL=validation.config.js.map