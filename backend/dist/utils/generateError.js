"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genError = void 0;
function genError(message) {
    const result = {
        status: "error",
        data: {},
        error: {
            message: message,
        },
    };
    return result;
}
exports.genError = genError;
