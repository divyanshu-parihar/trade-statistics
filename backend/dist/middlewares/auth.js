"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middleware = (req, res, next) => {
    console.log(req.body);
    if (req.body == null || !req.body.hasOwnProperty("token")) {
        const result = {
            status: "error",
            data: [],
            error: {
                message: "Token not provided or does not work",
            },
        };
        return res.json(result);
    }
    next();
};
exports.default = middleware;
