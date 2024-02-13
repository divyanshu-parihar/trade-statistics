"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { DatePickerWithRange } from "@/components/custom/datePicker";
import { dateRangeContext } from "../contexts/dateRange";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
export default function page() {
  // const localStorage = new LocalStorage();

  const token = localStorage.getItem("accesstoken");
  // const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState();
  const radioRef = useRef<HTMLElement>();
  const [noOfTrades, setNoOfTrades] = useState<number>(0);
  const [noOfTradesLoading, setNoOfTradesLoading] = useState(true);
  // const [orderLoading, setOrderLoading] = useState(true);

  // @ts-ignore
  const { currentDateRange } = useContext(dateRangeContext);
  const { toast } = useToast();

  const PlaceOrder = (token: string) => {
    if (
      radioRef.current &&
      (radioRef.current as HTMLElement).getAttribute("data-state") ==
        "unchecked"
    ) {
      // console.log(radioRef.current);
      return;
    }
    axios
      .post("/api/user/order/buy", {
        headers: {
          "Content-Type": "application/json",
        },
        token,
      })
      .then((res) => {
        // console.log(res.data);
        // setOrderLoading(false);
        return res.data;
      })
      .catch((e) => console.log(e));
    toast({
      title: "Order Placed",
      description: "BUY order ",
    });
    console.log("order");
  };
  // useEffect(() => {
  //   const token = localStorage.getItem("accesstoken");
  //   axios
  //     .post("/api/user/trades", {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       token,
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       // setOrderLoading(false);
  //       setNoOfTrades((s) => res.data.data.data["trades_count"]);
  //       return res.data;
  //     })
  //     .catch((e) => console.log(e));
  //   toast({
  //     title: "Logs",
  //     description: "Trades Fetched ",
  //   });
  //   console.log("order");
  // }, []);
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
    <div className="h-scree font-sans text-xl text-center">
      <div className="title">User Statistics </div>
      {loading ? (
        ".. loading"
      ) : (
        <div className="container">
          <pre className="profile_data">
            <div className="flex">
              <Card className="w-full m-4 shadow-md">
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
                      }
                    )}
                </CardFooter>
              </Card>

              <Card className="w-full m-4 shadow-md">
                <CardHeader>
                  <CardTitle>Statistics</CardTitle>
                  <CardDescription>Stats with Intervals</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <DatePickerWithRange
                    from={currentDateRange?.from || Date.now()}
                  />

                  {noOfTradesLoading ? (
                    <Skeleton className="w-[50px] h-[10px] rounded-full" />
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
                  className=" flex items-center w-100
                "
                >
                  {/* @ts-ignore */}
                  <Switch ref={radioRef} id="airplane-mode" />
                  <Label htmlFor="airplane-mode">Quick Trade</Label>
                  <Input></Input>
                  <Button
                    // disabled={orderLoading}
                    onClick={() => PlaceOrder(token || "")}
                    className="m-4 cursor-pointer text-white bg-green-600 p-2 rounded-md"
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
