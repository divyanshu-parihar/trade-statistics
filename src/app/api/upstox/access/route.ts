import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  //   console.log(req.nextUrl.searchParams);
  return new NextResponse("<div> Hell </div>");
}
