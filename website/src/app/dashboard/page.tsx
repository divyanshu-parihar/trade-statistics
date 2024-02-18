"use client";
import { DatePickerWithRange } from "@/components/custom/datePicker";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { dateRangeContext } from "../contexts/dateRange";
export default function page() {
  const token = localStorage.getItem("accesstoken");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState();
  const radioRef = useRef<HTMLElement>();
  const [noOfTrades, setNoOfTrades] = useState<number>(0);
  const [noOfTradesLoading, setNoOfTradesLoading] = useState(true);
  // @ts-ignore
  const { currentDateRange } = useContext(dateRangeContext);
  const { toast } = useToast();

  const PlaceOrder = (token: string) => {
    if (
      radioRef.current &&
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
        (radioRef.current as HTMLElement).getAttribute("data-state") ==
          "unchecked"
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

  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    axios
      .post("/api/upstox/user/trades", {
        headers: {
          "Content-Type": "application/json",
        },
        token,
      })
      .then((res) => {
        // console.log(res);
        console.log(res.data);
        setNoOfTradesLoading(false);
        setNoOfTrades((s) => res.data.data.data["trades_count"]);
      })
      .catch((e) => {
        // reject();
        console.log(e);
      });
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    axios
      .post("/api/upstox/user/profile", {
        token,
        header: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        // resolve();
        setLoading((s) => false);
        setUserData(res.data.data);
      })
      .catch(() => {
        // reject();
      });
  }, []);

  return (
    <div className="h-scree text-center font-sans text-xl">
      <div className="title">User Statistics </div>
      {loading ? (
        ".. loading"
      ) : (
        <div className="container">
          <pre className="profile_data">
            <div className="flex">
              <Card className="m-4 w-full shadow-md">
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                  <CardDescription> Enabled Settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="broker__section">
                    Broker:
                    <Badge>UPSTOX</Badge>
                  </div>
                  <div className="name flex items-center justify-center">
                    Name : {(userData as any).data.user_name}{" "}
                    {(userData as any).data.is_active == true ? (
                      <Badge variant="success">active</Badge>
                    ) : (
                      <Badge variant="destructive">active</Badge>
                    )}
                    {/* <pre>{JSON.stringify(userData, null, 2)}</pre> */}
                  </div>

                  {/* <div className="title">Exchanges</div> */}
                </CardContent>
                <CardFooter className="flex justify-around">
                  Exchanges:
                  {!!userData &&
                    (userData as any).data.exchanges.map(
                      (el: string, idx: number) => {
                        return (
                          <div key={idx} className="m-2">
                            <Badge>{el}</Badge>
                          </div>
                        );
                      },
                    )}
                </CardFooter>
              </Card>

              <Card className="m-4 w-full shadow-md">
                <CardHeader>
                  <CardTitle>Statistics</CardTitle>
                  <CardDescription>Stats with Intervals</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <DatePickerWithRange
                    from={currentDateRange?.from || Date.now()}
                  />

                  {noOfTradesLoading ? (
                    <Skeleton className="h-[10px] w-[50px] rounded-full" />
                  ) : (
                    <div className="no_of_trades">
                      No. Of Trades : {noOfTrades}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* {JSON.stringify(userData, null, 2)} */}
          </pre>
          {JSON.stringify(currentDateRange, null, 2)}
          <div className="place_order">
            <div className="container">
              <Card>
                <CardHeader>
                  <CardTitle>Place order</CardTitle>
                  <CardDescription>
                    Place QUICK 1 QTY Order in CMD + ENTER
                  </CardDescription>
                </CardHeader>
                <CardContent
                  className=" w-100 flex items-center
                "
                >
                  {/* @ts-ignore */}
                  <Switch ref={radioRef} id="airplane-mode" />
                  <Label htmlFor="airplane-mode">Quick Trade</Label>
                  <Input></Input>
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
        </div>
      )}
    </div>
  );
}