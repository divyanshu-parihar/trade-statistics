import { NextRequest, NextResponse } from "next/server";

export function POST(req: NextRequest) {
  const data = req.body;
  // console.log(data);
  return new NextResponse(JSON.stringify({ data: data }));
}
