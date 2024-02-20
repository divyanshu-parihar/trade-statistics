import React, { Ref, useEffect, useRef, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
const fetchOptions = async (token: string) => {
  try {
    const { data } = await axios.post(
      // `${process.env.BACKEND_URL}/upstox/platform/instrument`,
      `http://0.0.0.0:8080/upstox/platform/instrument`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        token,
      }
    );
    return data;
  } catch (e) {
    return { e };
  }
};

function PlaceOrder() {
  const { toast } = useToast();
  const [token, setToken] = useState<string>("NSE_FO|66716");
  const radioRef = useRef<HTMLButtonElement | null>();
  const [loadingOptions, setLoadingOptions] = useState<boolean>(true);
  const [options, setOptions] = useState<[Object]>([
    { name: "No Options", value: "NONE" },
  ]);

  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    console.log(token);
    fetchOptions(token!).then((res) => {
      console.log(res);
      if (res["data"]["status"] == "success") {
        setOptions((s) => res.data.data);
        setLoadingOptions((s) => false);
      }
    });
  }, []);
  const placeOrder = (token: string) => {
    if (
      radioRef.current &&
      radioRef.current.getAttribute("data-state") == "unchecked"
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
          title: `Order Placed #${res.data.data.order_id}`,
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
        radioRef &&
        radioRef.current &&
        radioRef.current.getAttribute("data-state") == "unchecked"
      )
        return;
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        // Handle the cmd + enter combination
        e.preventDefault(); // Prevent the default behavior (e.g., form submission)
        placeOrder(token!);
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
            <Switch
              ref={radioRef as Ref<HTMLButtonElement> | undefined}
              id="airplane-mode"
              className="m-2"
            />
            <Label htmlFor="Button" className="mx-4">
              Quick Trade
            </Label>
            <Select>
              <SelectTrigger className="w-100">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <>
                {!!loadingOptions ? (
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                  </SelectContent>
                ) : (
                  <SelectContent className="">
                    {options.map((el: any) => (
                      <SelectItem
                        // className="w-[100px]"
                        key={el.instrument_key}
                        value={el.instrument_key}
                      >
                        {el.trading_symbol} x {el.lot_size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                )}
              </>
              {/* <Label htmlFor="Lot size"> Trade</Label> */}
              <Input
                type="number"
                className="w-[100px] mx-4"
                max={1800}
                maxLength={1800}
              ></Input>
              {/* <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem> */}
              {/* </SelectContent> */}
            </Select>

            <Button
              onClick={() => placeOrder(token!)}
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
