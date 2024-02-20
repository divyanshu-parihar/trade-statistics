import { Instruments, Result } from "../../models/types";
import axios from "axios";
import { genError } from "../../utils/generateError";
export type token = string;
export class UpstoxController {
  constructor() {}
  // platform

  static async getOptionsInstuments(
    access_token: string,
    instrument_key: string,
    expiry_date: string
  ) {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://api.upstox.com/v2/option/contract`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${access_token.toString()}`,
      },
      params: {
        instrument_key,
        expiry_date,
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
        status: "error",
        data: {},
        error: e,
      };
    }

    return result;
  }
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
        status: "error",
        data: {},
        error: e,
      };
    }

    return result;
  }

  static async getFunds(access_token: token) {
    let config = {
      method: "GET",
      maxBodyLength: Infinity,
      url: "https://api.upstox.com/v2/user/get-funds-and-margin",
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
        status: "error",
        data: {},
        error: e,
      };
    }

    return result;
  }
  // orders

  static async cancelTrade(access_token: token, token: string, qty: number) {
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
        status: "error",
        data: {},
        error: e,
      };
    }

    return result;
  }

  static async exitAll(access_token: token, token: string) {
    const positions: Result = await UpstoxController.getPositions(access_token);
    if (positions.status == "error") {
      return genError("Unable to fetch positions");
    }
    console.log((positions.data as any).data[0]);
    try {
      const results = [];
      for (let position of (positions.data as any).data) {
        results.push(
          new Promise((resolve, reject) => {
            try {
              const data = UpstoxController.cancelTrade(
                access_token,
                position["instrument_token"],
                position["quantity"]
              );

              resolve(data);
            } catch (e) {
              reject();
            }
          })
        );
      }
      const result: Result = {
        status: "success",
        data: await Promise.allSettled(results),
        error: {},
      };
      return result;
    } catch (e: any) {
      return genError(e.message);
    }
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
        status: "error",
        data: {},
        error: e,
      };
    }

    return result;
  }

  static async placeOrder(
    access_token: token,
    token: Instruments,
    qty: number
  ) {
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
        status: "error",
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
        status: "error",
        data: {},
        error: e,
      };
    }

    return result;
  }
}
