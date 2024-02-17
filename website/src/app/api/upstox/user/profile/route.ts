import axios from "axios";
import { log } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const params: { token: string } = await req.json();
  log(params);
  if (params == null || !Object.hasOwn(params, "token"))
    return new NextResponse(JSON.stringify({ error: { id: 400 } }));
  let config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: "https://api.upstox.com/v2/user/profile",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${params.token.toString()}`,
    },
  };

  try {
    const { data } = await axios(config);
    return new NextResponse(JSON.stringify({ data }, null, 2));
  } catch (e: any) {
    // console.log(e);
    return new NextResponse(JSON.stringify({ error: e }, null, 2));
  }
}
