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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { getMiddleElements } from "@/lib/utils";
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
  // const [token, setToken] = useState<string>("NSE_FO|66716");
  const quickTradeRadioRef = useRef<HTMLButtonElement | null>(null);

  const [quantity, setQuantity] = useState<number>(0);
  const [currentStrikePrice, setCurrentStrikePrice] = useState<
    string | undefined
  >();

  const [loadingOptions, setLoadingOptions] = useState<boolean>(true);
  const [options, setOptions] = useState<Object[]>([
    {
      lot_size: 1,
      instrument_key: "NSE_EQ|INE669E01016",
      trading_symbol: "Idea",
    },
  ]);

  const exitPosition = (instrument_token: string) => {
    const token = localStorage.getItem("accesstoken");
    if (
      quickTradeRadioRef.current &&
      quickTradeRadioRef.current.getAttribute("data-state") == "unchecked"
    ) {
      return;
    }
    // value checks

    if (!currentStrikePrice && quantity < 0 && quantity > 1800) return;

    axios
      .post("http://localhost:8080/upstox/order/cancel", {
        headers: {
          "Content-Type": "application/json",
        },
        token,
        instrument_token: instrument_token,
        qty: quantity * 50,
      })
      .then((res) => {
        console.log(res);
        if (res.data.status == "success")
          toast({
            title: `Position Exited #${res.data.data.order_id}`,
            description: "SELL order ",
          });
        else {
          toast({
            title: `Failed`,
            description: `${res.data.error.message}`,
          });
        }
        return res.data;
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    function handleCallback(e: any) {
      if (
        quickTradeRadioRef &&
        quickTradeRadioRef.current &&
        quickTradeRadioRef.current.getAttribute("data-state") == "unchecked"
      )
        return;
      if ((e.metaKey || e.ctrlKey) && e.key === "Shift") {
        // Handle the cmd + enter combination
        e.preventDefault(); // Prevent the default behavior (e.g., form submission)
        exitPosition(currentStrikePrice!);
        // toast({
        //   title: "Sold",
        //   description: "BUY order ",
        // });
      }
    }
    document.addEventListener("keydown", handleCallback);

    return () => {
      document.removeEventListener("keydown", handleCallback);
    };
  }, [currentStrikePrice]);

  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    console.log(token);
    fetchOptions(token!).then((res) => {
      console.log(res);
      if (res["data"]["status"] == "success") {
        setOptions((s) => [...s, ...getMiddleElements(res.data.data, 10)]);
        setLoadingOptions((s) => false);
      }
    });
  }, []);
  const placeOrder = (instrument_token: string) => {
    const token = localStorage.getItem("accesstoken");
    console.log(currentStrikePrice);
    if (
      quickTradeRadioRef.current &&
      quickTradeRadioRef.current.getAttribute("data-state") == "unchecked"
    ) {
      return;
    }
    // value checks

    if (!currentStrikePrice && quantity < 0 && quantity > 1800) return;
    axios
      .post("http://localhost:8080/upstox/order/buy", {
        headers: {
          "Content-Type": "application/json",
        },
        token,
        instrument_token: instrument_token,
        qty: quantity * 50,
      })
      .then((res) => {
        if (res.data.status == "success")
          toast({
            title: `Order Placed #${res.data.data.order_id}`,
            description: "BUY order ",
          });
        else {
          toast({
            title: `Order Failed`,
            description: `${res.data.error.message}`,
          });
        }
        return res.data;
      })
      .catch((e) => console.log(e));
    console.log("order");
  };

  useEffect(() => {
    function handleCallback(e: any) {
      if (
        quickTradeRadioRef &&
        quickTradeRadioRef.current &&
        quickTradeRadioRef.current.getAttribute("data-state") == "unchecked"
      )
        return;
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        // Handle the cmd + enter combination
        e.preventDefault(); // Prevent the default behavior (e.g., form submission)
        placeOrder(currentStrikePrice!);
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
  }, [currentStrikePrice]);
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
            <Label htmlFor="Button" className="">
              Quick Trade
            </Label>
            <Switch
              ref={quickTradeRadioRef as Ref<HTMLButtonElement> | undefined}
              id="airplane-mode"
              className="m-2"
            />
            <Select
              value={currentStrikePrice}
              onValueChange={(value) => {
                setCurrentStrikePrice(value);
              }}
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Strike Prices" />
              </SelectTrigger>
              <>
                {!!loadingOptions ? (
                  <SelectContent>
                    <SelectItem value="Loading">Loading</SelectItem>
                  </SelectContent>
                ) : (
                  <SelectContent>
                    <SelectGroup>
                      {options.map((el: any) => (
                        <SelectItem
                          // className="w-[100px]"
                          key={el.instrument_key}
                          value={el.instrument_key}
                        >
                          {el.trading_symbol} x {el.lot_size}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                )}
              </>
              {/* <Label htmlFor="Lot size"> Trade</Label> */}
              <Input
                type="number"
                className="w-[100px] mx-4"
                placeholder="Lot size"
                max={36}
                maxLength={36}
                value={quantity}
                onChange={(e) => {
                  setQuantity((s) => parseInt(e.target.value));
                }}
              ></Input>
            </Select>

            <div className="flex flex-col">
              <Button
                onClick={() => placeOrder(currentStrikePrice!)}
                className="m-4 cursor-pointer rounded-md bg-green-600 p-2 text-white"
              >
                {" "}
                Order
              </Button>
              <Button
                onClick={() => exitPosition(currentStrikePrice!)}
                className="m-4 cursor-pointer rounded-md bg-red-600 p-2 text-white"
              >
                {" "}
                Exit
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PlaceOrder;
