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
        console.log('🔍 ValidationPipe.transform() - INÍCIO');
        console.log('📦 Valor recebido:', JSON.stringify(value, null, 2));
        console.log('🏷️ Metatype:', (metatype === null || metatype === void 0 ? void 0 : metatype.name) || 'undefined');
        console.log('📋 ArgumentMetadata completo:', { metatype: metatype === null || metatype === void 0 ? void 0 : metatype.name });
        if (!metatype || !this.toValidate(metatype)) {
            console.log('⚠️ Validação pulada - metatype inválido ou tipo primitivo');
            console.log('🔄 Retornando valor original sem validação');
            return value;
        }
        console.log('✅ Metatype válido, iniciando transformação e validação');
        const object = (0, class_transformer_1.plainToInstance)(metatype, value);
        console.log('🔄 Objeto transformado:', JSON.stringify(object, null, 2));
        console.log('🎯 Classe do objeto transformado:', object.constructor.name);
        try {
            console.log('🚀 Iniciando validateOrReject...');
            await (0, class_validator_1.validateOrReject)(object, {
                whitelist: true,
                forbidNonWhitelisted: true,
                skipMissingProperties: false,
                validationError: { target: false },
            });
            console.log('✅ Validação bem-sucedida!');
            console.log('📤 Retornando valor validado:', JSON.stringify(value, null, 2));
            return value;
        }
        catch (errors) {
            console.log('❌ ERRO na validação!');
            console.log('🔥 Errors capturados:', JSON.stringify(errors, null, 2));
            console.log('📊 Número de erros:', Array.isArray(errors) ? errors.length : 'não é array');
            if (Array.isArray(errors)) {
                errors.forEach((error, index) => {
                    var _a, _b;
                    console.log(`🚨 Erro ${index + 1}:`, {
                        property: error.property,
                        value: error.value,
                        constraints: error.constraints,
                        target: (_b = (_a = error.target) === null || _a === void 0 ? void 0 : _a.constructor) === null || _b === void 0 ? void 0 : _b.name
                    });
                });
            }
            throw new error_handler_1.ErrorHandler('Falha na validação dos dados', 400, 400, {
                errors,
            });
        }
    }
    toValidate(metatype) {
        console.log('🔍 toValidate() - Verificando se deve validar');
        console.log('📝 Metatype recebido:', metatype === null || metatype === void 0 ? void 0 : metatype.name);
        const types = [String, Boolean, Number, Array, Object];
        const shouldValidate = !types.includes(metatype);
        console.log('🎯 Tipos primitivos:', types.map(t => t.name));
        console.log('✅ Deve validar?', shouldValidate);
        return shouldValidate;
    }
};
ValidationPipe = __decorate([
    (0, common_1.Injectable)()
], ValidationPipe);
exports.ValidationPipe = ValidationPipe;
//# sourceMappingURL=validation.pipe.js.map