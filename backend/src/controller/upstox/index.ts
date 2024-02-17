import { Result } from "../../models/types";
import axios from "axios";
export type token = string;
export class UpstoxController {
  constructor() {}
  // profile
  static async getProfile(access_token: string) {
    let config = {
      method: "GET",
      maxBodyLength: Infinity,
      url: "https://api.upstox.com/v2/user/profile",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${access_token.toString()}`,
      },
    };
    let result: Result;
    try {
      const { data } = await axios(config);
      result = {
        status: "success",
        data: data,
        error: {},
      };
    } catch (e: any) {
      result = {
        status: "success",
        data: {},
        error: e,
      };
    }

    return result;
  }
  // orders

  static async cancleAllTrades(
    access_token: token,
    token: "NSE_EQ|INE669E01016" | "NSE_EQ|INE040H01021"
  ) {
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    };
    const url = "https://api.upstox.com/v2/order/place";
    const params = {
      quantity: 1,
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

    let result: Result;
    try {
      const { data } = await axios.post(url, params, { headers });
      result = {
        status: "success",
        data: data,
        error: {},
      };
    } catch (e: any) {
      result = {
        status: "success",
        data: {},
        error: e,
      };
    }

    return result;
  }

  static async getPositions(access_token: token) {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://api.upstox.com/v2/portfolio/short-term-positions",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access_token.toString()}`,
      },
    };

    let result: Result;
    try {
      const { data } = await axios(config);
      result = {
        status: "success",
        data: data,
        error: {},
      };
    } catch (e: any) {
      result = {
        status: "success",
        data: {},
        error: e,
      };
    }

    return result;
  }

  static async placeOrder(
    access_token: token,
    token: "NSE_EQ|INE669E01016" | "NSE_EQ|INE040H01021"
  ) {
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    };
    const url = "https://api.upstox.com/v2/order/place";
    const params = {
      quantity: 1,
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

    let result: Result;
    try {
      const { data } = await axios.post(url, params, { headers });
      result = {
        status: "success",
        data: data,
        error: {},
      };
    } catch (e: any) {
      result = {
        status: "success",
        data: {},
        error: e,
      };
    }

    return result;
  }
  //trades
  static async getAllTrades(
    access_token: token,
    fin_year: string,
    sector: "EQ"
  ) {
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

    let result: Result;
    try {
      const { data } = await axios(config);
      result = {
        status: "success",
        data: data,
        error: {},
      };
    } catch (e: any) {
      result = {
        status: "success",
        data: {},
        error: e,
      };
    }

    return result;
  }
}
