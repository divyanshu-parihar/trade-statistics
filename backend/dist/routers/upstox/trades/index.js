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
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.body.token;
    const data = yield upstox_1.UpstoxController.getAllTrades(token, "2324", "EQ");
    return res.json(data);
}));
router.get("/current", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.body.token;
    const data = yield upstox_1.UpstoxController.getPositions(token);
    return res.json(data);
}));
exports.default = router;
