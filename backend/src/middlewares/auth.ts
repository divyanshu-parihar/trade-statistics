import { Result } from "../models/types";

const middleware = (req: any, res: any, next: any) => {
  if (req.body == null || !req.body.hasOwnProperty("token")) {
    const result: Result = {
      status: "error",
      data: [],
      error: {
        message: "Token not provided or does not work",
      },
    };
    return res.json(result);
  }

  next();
};

export default middleware;
