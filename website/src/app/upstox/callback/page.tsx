"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function handler() {
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
          client_id: "e50e1fd9-6337-4429-8659-a4f00710bbe2",
          client_secret: "2y741sy4n5",
          redirect_uri: "https://upstox-token.vercel.app/upstox/callback",
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
        setLoading(false);
        setToken(res.data.access_token);

        localStorage.setItem("accesstoken", res.data.access_token);
        // redirect("/");
      })
      .catch((e) => {
        console.log(e.message);
        setLoading(false);
        setToken("Failed: Please go to the main screen ");
      });
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-screen h-screen flex flex-col items-center justify-center ">
        <div className="text-xl">
          Please go to the main Screen and put this access token
        </div>
        {!loading && (
          <div className="container w-100 grid place-items-center">
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
            <Button onClick={() => router.push("/")}>Home</Button>
          </div>
        )}
      </div>
    </Suspense>
  );
}
