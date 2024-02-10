import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
export async function POST(req: NextRequest) {
  const params: { token: string } = JSON.parse(await req.text());
  if (params == null || !Object.hasOwn(params, "token"))
    return new NextResponse(
      JSON.stringify({ error: { id: 400, message: "No token found" } })
    );
  let config = {
    method: "post",
    url: "https://api.upstox.com/v2/order/place",
    params: {
      quantity: 1,
      product: "D",
      validity: "DAY",
      price: 0,
      tag: "string",
      instrument_token: "NSE_EQ|INE848E01016",
      order_type: "MARKET",
      transaction_type: "BUY",
      disclosed_quantity: 0,
      trigger_price: 0,
      is_amo: false,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.token}`,
    },
  };
  try {
    const { data } = await axios(config);
    return new NextResponse(JSON.stringify({ data }, null, 2));
  } catch (e: any) {
    return new NextResponse(JSON.stringify({ error: e }, null, 2));
  }
}
