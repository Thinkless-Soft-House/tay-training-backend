"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const error_handler_1 = require("../handlers/error.handler");
let ValidationPipe = class ValidationPipe {
    async transform(value, { metatype }) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = (0, class_transformer_1.plainToInstance)(metatype, value);
        try {
            await (0, class_validator_1.validateOrReject)(object, {
                whitelist: true,
                forbidNonWhitelisted: true,
                skipMissingProperties: false,
                validationError: { target: false },
            });
            return value;
        }
        catch (errors) {
            throw new error_handler_1.ErrorHandler('Falha na validação dos dados', 400, 400, {
                errors,
            });
        }
    }
    toValidate(metatype) {
        const types = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
};
ValidationPipe = __decorate([
    (0, common_1.Injectable)()
], ValidationPipe);
exports.ValidationPipe = ValidationPipe;
//# sourceMappingURL=validation.pipe.js.map