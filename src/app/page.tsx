"use client";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
// eyJ0eXAiOiJKV1QiLCJrZXlfaWQiOiJza192MS4wIiwiYWxnIjoiSFMyNTYifQ.eyJzdWIiOiI2RUFFWkYiLCJqdGkiOiI2NWMxMmFjY2UxZjhkODJlNzg1MDYzYmIiLCJpc011bHRpQ2xpZW50IjpmYWxzZSwiaXNBY3RpdmUiOnRydWUsInNjb3BlIjpbImludGVyYWN0aXZlIiwiaGlzdG9yaWNhbCJdLCJpYXQiOjE3MDcxNTgyMjAsImlzcyI6InVkYXBpLWdhdGV3YXktc2VydmljZSIsImV4cCI6MTcwNzE3MDQwMH0.uyOcvF3KHytT4leiiLUU26c4RuWrT0ZZftARjaAriQw
export default function Home() {
  const [input, setInput] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const router = useRouter();
  const addToken = (e: any) => {
    if (input == "" || input == undefined || input == " ") return;
    localStorage.setItem("accesstoken", input!);
    setUser((s) => input);
    router.push(`/dashboard`);
  };

  return (
    <div className="home">
      {!!user ? (
        <div>
          <pre>{JSON.stringify(user)}</pre>
          <Button>Click me</Button>
        </div>
      ) : (
        <div className="w-screen h-screen flex items-center justify-center flex-col">
          <Link href="https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id=482f3091-f1ef-449f-bc53-da02541d505e&redirect_uri=http://localhost:3000/api/upstox/callback&state=jshgdfakjsghfashjdgf">
            <Button>Login With Upstox</Button>
          </Link>

          <input
            value={input}
            onChange={(e) => {
              console.log(e.target.value);
              setInput(e.target.value);
            }}
            placeholder="Access Token"
          />
          <Button onClick={addToken}>Let's start</Button>
        </div>
      )}
    </div>
  );
}
