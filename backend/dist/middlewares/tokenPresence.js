"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../models/types");
const middleware = (req, res, next) => {
    console.log(req.body);
    if (!req.body.hasOwnProperty("instrument_token")) {
        const result = {
            status: "error",
            data: [],
            error: {
                message: "Instrument token is missing.",
            },
        };
        return res.json(result);
    }
    if (!(0, types_1.validateRegex)(types_1.instrument_regex, req.body.instrument_token)) {
        const result = {
            status: "error",
            data: [],
            error: {
                message: "Instrument token is Invalid.",
            },
        };
        return res.json(result);
    }
    next();
};
exports.default = middleware;
