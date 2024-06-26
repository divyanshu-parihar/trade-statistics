"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { BackgroundBeams } from "@/components/ui/background-beams";
export default function Home() {
  const [input, setInput] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const router = useRouter();
  const addToken = (e: any) => {
    if (input == "" || input == undefined || input == " ") return;
    localStorage.setItem("accesstoken", input!);
    setUser((s) => input);
    console.log("here");
    router.push(`/dashboard`);
  };
  const { setTheme } = useTheme();
  setTheme("dark");
  return (
    <div className="container flex flex-col items-center justify-center h-screen">
      <div className="background z-[-1]">
        <BackgroundBeams />
      </div>
      <h1 className="title italic text-6xl font-bold m-4">BURST</h1>
      {!!user ? (
        <div>
          <pre>{JSON.stringify(user)}</pre>
          <div>logged in </div>
        </div>
      ) : (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Let's get started</CardTitle>
            <CardDescription>Make profits with shortcuts.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Upstox Token</Label>
                  <Input
                    onChange={(e) => {
                      setInput(e.target.value);
                    }}
                    value={input}
                    id="name"
                    placeholder="Access token for your account"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id=e50e1fd9-6337-4429-8659-a4f00710bbe2&redirect_uri=https://upstox-token.vercel.app/upstox/callback&state=jshgdfakjsghfashjdgf">
              <Button variant="outline">Get token</Button>
            </Link>
            <Button disabled={!input} onClick={addToken}>
              Start
            </Button>
          </CardFooter>
        </Card>
      )}
      {/* 
      )} */}
    </div>
  );
}
