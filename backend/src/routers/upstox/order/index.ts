import { Router } from "express";
import { UpstoxController } from "../../../controller/upstox";
import { Instruments } from "../../../models/types";
import InstrumentMiddleware from "../../../middlewares/tokenPresence";
import { genError } from "../../../utils/generateError";
const router = Router();

// router.use(InstrumentMiddleware);

router.post(
  "/buy",
  function (req, res, next) {
    console.log(req.body);
    next();
  },
  async (req: any, res: any) => {
    const token = req.body.token;

    // QTY : check
    if (!req.body.hasOwnProperty("qty")) {
      return res.json(genError("No Qty Provided"));
    }
    const data = await UpstoxController.placeOrder(
      token,
      req.body.instrument_token,
      req.body.qty
    );

    return res.json(data);
  }
);
router.post("/cancel", async (req: any, res: any) => {
  const token = req.body.token;
  if (!req.body.hasOwnProperty("qty")) {
    return res.json(genError("No Qty Provided"));
  }
  const data = await UpstoxController.cancelTrade(
    token,
    req.body.instrument_token,
    req.body.qty
  );
  return res.json(data);
});

// get all instraday position of the user and exit them all on by one
router.post("/exitall", async (req: any, res: any) => {
  const token = req.body.token;
  const inst: string = req.body.instrument_token;
  const data = await UpstoxController.exitAll(token, inst);

  return res.json(data);
});
export default router;
