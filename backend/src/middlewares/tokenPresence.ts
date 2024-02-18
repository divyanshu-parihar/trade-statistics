import { Result, instrument_regex, validateRegex } from "../models/types";

const middleware = (req: any, res: any, next: any) => {
  console.log(req.body);
  if (!req.body.hasOwnProperty("instrument_token")) {
    const result: Result = {
      status: "error",
      data: [],
      error: {
        message: "Instrument token is missing.",
      },
    };
    return res.json(result);
  }

  if (!validateRegex(instrument_regex, req.body.instrument_token)) {
    const result: Result = {
      status: "error",
      data: [],
      error: {
        message: "Instrument token is Invalid.",
      },
    };
    return res.json(result);
  }
  next();
};

export default middleware;
