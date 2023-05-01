"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const common_1 = require("@nestjs/common");
class ErrorHandler extends common_1.HttpException {
    constructor(message, errorCode, statusCode = common_1.HttpStatus.BAD_REQUEST, data = { ok: false }) {
        super({
            message,
            errorCode,
            statusCode,
            data,
        }, statusCode);
    }
}
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=error.handler.js.map