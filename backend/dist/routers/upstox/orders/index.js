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
router.get("/buy", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield upstox_1.UpstoxController.placeOrder("eyJ0eXAiOiJKV1QiLCJrZXlfaWQiOiJza192MS4wIiwiYWxnIjoiSFMyNTYifQ.eyJzdWIiOiI2RUFFWkYiLCJqdGkiOiI2NWQwOTVjM2QwOTU1MDA4NmNlZmNlNjUiLCJpc011bHRpQ2xpZW50IjpmYWxzZSwiaXNBY3RpdmUiOnRydWUsInNjb3BlIjpbImludGVyYWN0aXZlIiwiaGlzdG9yaWNhbCJdLCJpYXQiOjE3MDgxNjg2NDMsImlzcyI6InVkYXBpLWdhdGV3YXktc2VydmljZSIsImV4cCI6MTcwODIwNzIwMH0.BatAzaL-wKgtlp_ci7b7QejthexLdXnnRRck8RrzApk", "NSE_EQ|INE040H01021");
    return res.json(data);
}));
router.get("/cancel", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const data = await UpstoxController.
}));
exports.default = router;
