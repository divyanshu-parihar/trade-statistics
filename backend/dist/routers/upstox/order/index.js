"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upstox_1 = require("../../../controller/upstox");
const generateError_1 = require("../../../utils/generateError");
const router = (0, express_1.Router)();
router.post("/buy", function (req, res, next) {
    console.log(req.body);
    next();
}, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.body.token;
    if (!req.body.hasOwnProperty("qty")) {
        return res.json((0, generateError_1.genError)("No Qty Provided"));
    }
    const data = yield upstox_1.UpstoxController.placeOrder(token, req.body.instrument_token, req.body.qty);
    return res.json(data);
}));
router.post("/cancel", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.body.token;
    if (!req.body.hasOwnProperty("qty")) {
        return res.json((0, generateError_1.genError)("No Qty Provided"));
    }
    const data = yield upstox_1.UpstoxController.cancelTrade(token, req.body.instrument_token, req.body.qty);
    return res.json(data);
}));
router.post("/exitall", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.body.token;
    const inst = req.body.instrument_token;
    const data = yield upstox_1.UpstoxController.exitAll(token, inst);
    return res.json(data);
}));
exports.default = router;
