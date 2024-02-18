import { Router } from "express";
import { UpstoxController } from "../../../controller/upstox";
import { Result } from "../../../models/types";

const router = Router();

router.post("/", async (req: any, res: any) => {
  const token = req.body.token;
  const data = await UpstoxController.getProfile(token);
  return res.json(data);
});

router.post("/funds", async (req: any, res: any) => {
  const token = req.body.token;
  const data = await UpstoxController.getFunds(token);
  return res.json(data);
});
export default router;
