"use client";
import PlaceOrder from "@/components/orders/PlaceOrder";

export default function handler() {
  return (
    <div className="Container h-screen w-screen flex items-center justify-center">
      <PlaceOrder />
    </div>
  );
}
