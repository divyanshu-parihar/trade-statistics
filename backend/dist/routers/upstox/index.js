"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_1 = __importDefault(require("./order"));
const trades_1 = __importDefault(require("./trades"));
const profile_1 = __importDefault(require("./profile"));
const tokenPresence_1 = __importDefault(require("../../middlewares/tokenPresence"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    return res.json({ data: "Hello" });
});
router.use("/profile", profile_1.default);
router.use("/order", tokenPresence_1.default, order_1.default);
router.use("/trades", trades_1.default);
exports.default = router;
