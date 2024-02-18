"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middleware = (req, res, next) => {
    if (req.params == null || req.params.hasOwnProperty("token")) {
        const result = {
            status: "error",
            data: [],
            error: {
                message: "Token not provided or does not work",
            },
        };
    }
    next();
};
exports.default = middleware;
