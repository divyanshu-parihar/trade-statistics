import { Router } from "express";
import orderRouter from "./orders";
import tradesRouter from "./trades";
import profileRouter from "./profile";
const router = Router();

router.get("/", (req: any, res: any) => {
  return res.json({ data: "Hello" });
});

router.use("/profile", profileRouter);
router.use("/order", orderRouter);
router.use("/trades", tradesRouter);
export default router;
