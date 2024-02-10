"use client";
import { Dispatch, SetStateAction, createContext, useState } from "react";

interface props {
  from: Date;
  to: Date;
}
export const dateRangeContext = createContext<
  | {
      currentDateRange: {
        from: Date;
        to: Date;
      };
      setCurrentDateRange: Dispatch<SetStateAction<props>>;
    }
  | undefined
>(undefined);

const DateRangeProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentDateRange, setCurrentDateRange] = useState<props>({
    from: new Date(2022, 0, 22),
    to: new Date(2022, 0, 20),
  });
  return (
    <dateRangeContext.Provider
      value={{ currentDateRange, setCurrentDateRange }}
    >
      {children}
    </dateRangeContext.Provider>
  );
};

export default DateRangeProvider;
