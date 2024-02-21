"use client";
import PlaceOrder from "@/components/orders/PlaceOrder";

export default function handler() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <PlaceOrder />
    </div>
  );
}
