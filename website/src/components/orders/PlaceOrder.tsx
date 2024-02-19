import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
function PlaceOrder() {
  const { toast } = useToast();
  const [token, setToken] = useState<string>("NSE_FO|66716");
  const radioRef = useRef<HTMLElement>();
  const PlaceOrder = (token: string) => {
    if (
      radioRef &&
      (radioRef.current as HTMLElement).getAttribute("data-state") ==
        "unchecked"
    ) {
      return;
    }
    axios
      .post("/api/upstox/user/order/buy", {
        headers: {
          "Content-Type": "application/json",
        },
        token,
        instrument_token: token,
        qty: 10,
      })
      .then((res) => {
        console.log(res.data);
        toast({
          title: "Order Placed",
          description: "BUY order ",
        });
        return res.data;
      })
      .catch((e) => console.log(e));
    console.log("order");
  };

  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    function handleCallback(e: any) {
      if (
        radioRef.current &&
        radioRef.current.getAttribute("data-state") == "unchecked"
      )
        return;
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        // Handle the cmd + enter combination
        e.preventDefault(); // Prevent the default behavior (e.g., form submission)
        PlaceOrder(token!);
        toast({
          title: "Order Placed",
          description: "BUY order ",
        });
      }
    }
    document.addEventListener("keydown", handleCallback);

    return () => {
      document.removeEventListener("keydown", handleCallback);
    };
  }, []);
  return (
    <div className="place_order">
      <div className="container">
        <Card>
          <CardHeader>
            <CardTitle>Place order</CardTitle>
            <CardDescription>
              Place QUICK 1 QTY Order in CMD + ENTER
            </CardDescription>
          </CardHeader>
          <CardContent className=" w-100 flex items-center">
            {/* @ts-ignore */}
            <Switch ref={radioRef} id="airplane-mode" />
            <Label htmlFor="airplane-mode">Quick Trade</Label>
            {/* <Input></Input> */}
            <Button
              // disabled={orderLoading}
              onClick={() => PlaceOrder(token || "")}
              className="m-4 cursor-pointer rounded-md bg-green-600 p-2 text-white"
            >
              {" "}
              Order
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PlaceOrder;
