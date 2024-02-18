import { Router } from "express";
import { UpstoxController } from "../../../controller/upstox";

const router = Router();

router.get("/", async (req: any, res: any) => {
  const token = req.body.token;
  const data = await UpstoxController.getAllTrades(token, "2324", "EQ");
  return res.json(data);
});
router.get("/current", async (req: any, res: any) => {
  const token = req.body.token;
  const data = await UpstoxController.getPositions(token);
  return res.json(data);
});
export default router;
