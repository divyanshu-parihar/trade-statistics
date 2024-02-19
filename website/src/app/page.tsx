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
    <div className="container flex items-center justify-center h-screen">
      {!!user ? (
        <div>
          <pre>{JSON.stringify(user)}</pre>
          <div>logged in </div>
        </div>
      ) : (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
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
            <Link href="https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id=482f3091-f1ef-449f-bc53-da02541d505e&redirect_uri=http://localhost:3000/api/upstox/callback&state=jshgdfakjsghfashjdgf">
              <Button variant="outline">Get token</Button>
            </Link>
            <Button disabled={!!input == false} onClick={addToken}>
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
