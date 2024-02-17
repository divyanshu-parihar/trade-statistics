import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
export async function POST(req: NextRequest) {
  const params: { token: string } = JSON.parse(await req.text());
  console.log("params", params);
  if (params == null || !Object.hasOwn(params, "token"))
    return new NextResponse(
      JSON.stringify({ error: { id: 400, message: "No token found" } })
    );
  let config = {
    method: "GET",
    url: "https://api.upstox.com/v2/trade/profit-loss/metadata",
    params: { segment: "EQ", financial_year: "2324" },
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
