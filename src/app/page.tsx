"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  const [user, setUser] = useState();

  return (
    <div className="home">
      {!!user ? (
        <Button>Click me</Button>
      ) : (
        <div className="w-screen h-screen flex items-center justify-center">
          <Link href="https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id=482f3091-f1ef-449f-bc53-da02541d505e&redirect_uri=http://localhost:3000/api/upstox/callback&state=jshgdfakjsghfashjdgf">
            <Button>Login With Upstox</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
