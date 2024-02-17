"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upstox_1 = __importDefault(require("./routers/upstox"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/upstox", upstox_1.default);
app.listen(8080, () => {
    console.log("server started...  on port 8080");
});
