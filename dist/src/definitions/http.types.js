"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandlerResponse = exports.HttpErrorCode = void 0;
var HttpErrorCode;
(function (HttpErrorCode) {
    HttpErrorCode["VALIDATION_ERROR"] = "VALIDATION_ERROR";
    HttpErrorCode["NOT_FOUND"] = "NOT_FOUND";
    HttpErrorCode["UNAUTHORIZED"] = "UNAUTHORIZED";
    HttpErrorCode["FORBIDDEN"] = "FORBIDDEN";
    HttpErrorCode["INTERNAL_SERVER_ERROR"] = "INTERNAL_SERVER_ERROR";
})(HttpErrorCode = exports.HttpErrorCode || (exports.HttpErrorCode = {}));
class ErrorHandlerResponse {
    constructor(options) {
        this.message = options.message;
        this.statusCode = options.statusCode;
        this.errorCode = options.errorCode;
        this.data = options.data;
    }
}
exports.ErrorHandlerResponse = ErrorHandlerResponse;
//# sourceMappingURL=http.types.js.map