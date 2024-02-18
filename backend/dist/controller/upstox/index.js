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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpstoxController = void 0;
const axios_1 = __importDefault(require("axios"));
const generateError_1 = require("../../utils/generateError");
class UpstoxController {
    constructor() { }
    static getProfile(access_token) {
        return __awaiter(this, void 0, void 0, function* () {
            let config = {
                method: "GET",
                maxBodyLength: Infinity,
                url: "https://api.upstox.com/v2/user/profile",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${access_token.toString()}`,
                },
            };
            let result;
            try {
                const { data } = yield (0, axios_1.default)(config);
                result = {
                    status: "success",
                    data: data,
                    error: {},
                };
            }
            catch (e) {
                result = {
                    status: "success",
                    data: {},
                    error: e,
                };
            }
            return result;
        });
    }
    static getFunds(access_token) {
        return __awaiter(this, void 0, void 0, function* () {
            let config = {
                method: "GET",
                maxBodyLength: Infinity,
                url: "https://api.upstox.com/v2/user/get-funds-and-margin",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${access_token.toString()}`,
                },
            };
            let result;
            try {
                const { data } = yield (0, axios_1.default)(config);
                result = {
                    status: "success",
                    data: data,
                    error: {},
                };
            }
            catch (e) {
                result = {
                    status: "success",
                    data: {},
                    error: e,
                };
            }
            return result;
        });
    }
    static cancelTrade(access_token, token, qty) {
        return __awaiter(this, void 0, void 0, function* () {
            let headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
            };
            const url = "https://api.upstox.com/v2/order/place";
            const params = {
                quantity: qty,
                product: "D",
                validity: "DAY",
                price: 0,
                tag: "string",
                instrument_token: token,
                order_type: "MARKET",
                transaction_type: "SELL",
                disclosed_quantity: 0,
                trigger_price: 0,
                is_amo: false,
            };
            let result;
            try {
                const { data } = yield axios_1.default.post(url, params, { headers });
                result = {
                    status: "success",
                    data: data,
                    error: {},
                };
            }
            catch (e) {
                result = {
                    status: "success",
                    data: {},
                    error: e,
                };
            }
            return result;
        });
    }
    static exitAll(access_token, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const positions = yield UpstoxController.getPositions(access_token);
            if (positions.status == "error") {
                return (0, generateError_1.genError)("Unable to fetch positions");
            }
            console.log(positions.data.data[0]);
            try {
                const results = [];
                for (let position of positions.data.data) {
                    results.push(new Promise((resolve, reject) => {
                        try {
                            const data = UpstoxController.cancelTrade(access_token, position["instrument_token"], position["quantity"]);
                            resolve(data);
                        }
                        catch (e) {
                            reject();
                        }
                    }));
                }
                const result = {
                    status: "success",
                    data: yield Promise.allSettled(results),
                    error: {},
                };
                return result;
            }
            catch (e) {
                return (0, generateError_1.genError)(e.message);
            }
        });
    }
    static getPositions(access_token) {
        return __awaiter(this, void 0, void 0, function* () {
            let config = {
                method: "get",
                maxBodyLength: Infinity,
                url: "https://api.upstox.com/v2/portfolio/short-term-positions",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${access_token.toString()}`,
                },
            };
            let result;
            try {
                const { data } = yield (0, axios_1.default)(config);
                result = {
                    status: "success",
                    data: data,
                    error: {},
                };
            }
            catch (e) {
                result = {
                    status: "success",
                    data: {},
                    error: e,
                };
            }
            return result;
        });
    }
    static placeOrder(access_token, token, qty) {
        return __awaiter(this, void 0, void 0, function* () {
            let headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
            };
            const url = "https://api.upstox.com/v2/order/place";
            const params = {
                quantity: qty,
                product: "D",
                validity: "DAY",
                price: 0,
                tag: "string",
                instrument_token: token,
                order_type: "MARKET",
                transaction_type: "BUY",
                disclosed_quantity: 0,
                trigger_price: 0,
                is_amo: false,
            };
            let result;
            try {
                const { data } = yield axios_1.default.post(url, params, { headers });
                result = {
                    status: "success",
                    data: data,
                    error: {},
                };
            }
            catch (e) {
                result = {
                    status: "success",
                    data: {},
                    error: e,
                };
            }
            return result;
        });
    }
    static getAllTrades(access_token, fin_year, sector) {
        return __awaiter(this, void 0, void 0, function* () {
            let config = {
                method: "GET",
                url: "https://api.upstox.com/v2/trade/profit-loss/data",
                params: {
                    segment: sector,
                    financial_year: fin_year,
                    page_size: 100,
                    page_number: 1,
                },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                },
            };
            let result;
            try {
                const { data } = yield (0, axios_1.default)(config);
                result = {
                    status: "success",
                    data: data,
                    error: {},
                };
            }
            catch (e) {
                result = {
                    status: "success",
                    data: {},
                    error: e,
                };
            }
            return result;
        });
    }
}
exports.UpstoxController = UpstoxController;
