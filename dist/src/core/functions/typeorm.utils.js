"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateTypeORMError = exports.translateErrorMessage = void 0;
const typeorm_1 = require("typeorm");
function translateErrorMessage(message) {
    if (message.includes('duplicate key value')) {
        return 'Valor duplicado. A operação viola a restrição de chave única.';
    }
    if (message.includes('null value in column') &&
        message.includes('violates not-null constraint')) {
        return 'Valor nulo em coluna. A operação viola a restrição de não nulo.';
    }
    if (message.includes('violates foreign key constraint') &&
        message.includes('insert or update on table')) {
        return 'A tentativa de salvar/atualizar o item falhou, verique se os dados relacionados existem.';
    }
    if (message.includes('invalid input syntax for type')) {
        return 'Algum tipo de valor está incorreto. A operação viola a restrição de tipo.';
    }
    return message;
}
exports.translateErrorMessage = translateErrorMessage;
function translateTypeORMError(error) {
    if (error instanceof typeorm_1.TypeORMError) {
        const translatedMessage = translateErrorMessage(error.message);
        error.message = translatedMessage;
    }
    return error;
}
exports.translateTypeORMError = translateTypeORMError;
//# sourceMappingURL=typeorm.utils.js.map