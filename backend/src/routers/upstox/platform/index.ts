import { Router } from "express";
import { UpstoxController } from "../../../controller/upstox";
import { Result } from "../../../models/types";

const router = Router();

router.post("/instrument", async (req: any, res: any) => {
  const token = req.body.token;
  const data = await UpstoxController.getOptionsInstuments(
    token,
    "NSE_INDEX|Nifty 50",
    "2024-02-22"
  );
  return res.json(data);
});

export default router;
