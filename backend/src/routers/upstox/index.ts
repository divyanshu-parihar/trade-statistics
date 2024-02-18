import { Router } from "express";
import orderRouter from "./order";
import tradesRouter from "./trades";
import profileRouter from "./profile";
import InstrumentMiddleware from "../../middlewares/tokenPresence";
const router = Router();

router.get("/", (req: any, res: any) => {
  return res.json({ data: "Hello" });
});

router.use("/profile", profileRouter);
router.use("/order", InstrumentMiddleware, orderRouter);
router.use("/trades", tradesRouter);
export default router;
