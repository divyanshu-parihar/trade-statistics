import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");
  try {
    const response = await axios.post(
      "https://api.upstox.com/v2/login/authorization/token",
      {
        code,
        client_id: "482f3091-f1ef-449f-bc53-da02541d505e",
        client_secret: "t476fgptfo",
        redirect_uri: "http://localhost:3000/api/upstox/callback",
        grant_type: "authorization_code",
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return new NextResponse(
      `<pre>${JSON.stringify({ data: response.data }, null, 2)}</pre>`
    );
  } catch (e) {
    return new NextResponse(JSON.stringify({ data: e }, null, 2));
  }
}
