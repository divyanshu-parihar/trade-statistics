import { type ClassValue, clsx } from "clsx";
import { time } from "console";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMiddleElements(arr: any[], times: number): Object[] {
  const mid = Math.floor(arr.length / 2);
  console.log(arr[mid]);
  console.log((arr.length / 2) * times);
  console.log(arr[arr.length / 2 - 1]);
  const start = mid + times + 2; // Adjust for desired number of middle elements
  const end = mid + times * 2; // Adjust for desired number of middle elements

  return arr.slice(start, end);
}
90;
// 1 2. 3 4 . 5 6. 7 8. 9 10
// pe ce pe ce pe ce pe ce pe ce pe ce
