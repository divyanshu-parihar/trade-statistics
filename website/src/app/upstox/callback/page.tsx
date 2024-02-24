"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { redirect, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
// import { NextRequest, NextResponse } from "next/server";
import { Suspense, useEffect, useState } from "react";

export default function handler() {
  // const code = req.nextUrl.searchParams.get("code");
  // const state = req.nextUrl.searchParams.get("state");
  const params = useSearchParams();
  const { toast } = useToast();
  const [token, setToken] = useState<string>("loading");
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    axios
      .post(
        "https://api.upstox.com/v2/login/authorization/token",
        {
          code: params.get("code"),
          client_id: "482f3091-f1ef-449f-bc53-da02541d505e",
          client_secret: "t476fgptfo",
          redirect_uri: "http://localhost:3000/upstox/callback",
          grant_type: "authorization_code",
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        console.log(res.data.access_token);
        setLoading((s) => false);
        setToken((s) => res.data.access_token);

        localStorage.setItem("accesstoken", res.data.access_token);
        // redirect("/");
      })
      .catch((e) => {
        console.log(e.message);
        setLoading((s) => false);
        setToken((s) => "Failed: Please go to main screen ");
      });
  }, []);
  return (
    <Suspense>
      <div className="w-screen h-screen flex flex-col items-center justify-center ">
        {" "}
        <div className="text-xl">
          {" "}
          Please go to main Screen and put this access token{" "}
        </div>
        {!loading && (
          <div className="container w-100 grid place-items-center">
            {" "}
            <div className="container w-auto overflow-scroll ">{token}</div>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(token);
                toast({ title: "Token copied" });
              }}
              className="m-4"
            >
              Copy to Clipboard
            </Button>
            <Button onClick={() => router.push("/")}> Home</Button>
          </div>
        )}
      </div>
    </Suspense>
  );
}
