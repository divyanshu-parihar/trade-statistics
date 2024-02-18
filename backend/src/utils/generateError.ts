import { Result } from "../models/types";

export function genError(message: string) {
  const result: Result = {
    status: "error",
    data: {},
    error: {
      message: message,
    },
  };
  return result;
}
