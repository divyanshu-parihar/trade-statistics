"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_1 = __importDefault(require("./orders"));
const trades_1 = __importDefault(require("./trades"));
const profile_1 = __importDefault(require("./profile"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    return res.json({ data: "Hello" });
});
router.use("/profile", profile_1.default);
router.use("/order", orders_1.default);
router.use("/trades", trades_1.default);
exports.default = router;
