import { Router } from "express";
import { UpstoxController } from "../../../controller/upstox";

const router = Router();

router.get("/buy", async (req: any, res: any) => {
  const token = req.body.token;
  const data = await UpstoxController.placeOrder(
    token,
    "NSE_EQ|INE040H01021",
    1
  );
  return res.json(data);
});
router.get("/cancel", async (req: any, res: any) => {
  const token = req.body.token;
  const data = await UpstoxController.cancelTrade(
    token,
    "NSE_EQ|INE040H01021",
    1
  );

  return res.json(data);
});
export default router;
