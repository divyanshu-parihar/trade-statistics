import { Router } from "express";
import { UpstoxController } from "../../../controller/upstox";

const router = Router();

router.get("/", async (req: any, res: any) => {
  const data = await UpstoxController.getAllTrades(
    "eyJ0eXAiOiJKV1QiLCJrZXlfaWQiOiJza192MS4wIiwiYWxnIjoiSFMyNTYifQ.eyJzdWIiOiI2RUFFWkYiLCJqdGkiOiI2NWQwOTVjM2QwOTU1MDA4NmNlZmNlNjUiLCJpc011bHRpQ2xpZW50IjpmYWxzZSwiaXNBY3RpdmUiOnRydWUsInNjb3BlIjpbImludGVyYWN0aXZlIiwiaGlzdG9yaWNhbCJdLCJpYXQiOjE3MDgxNjg2NDMsImlzcyI6InVkYXBpLWdhdGV3YXktc2VydmljZSIsImV4cCI6MTcwODIwNzIwMH0.BatAzaL-wKgtlp_ci7b7QejthexLdXnnRRck8RrzApk",
    "2324",
    "EQ"
  );
  return res.json(data);
});
router.get("/current", async (req: any, res: any) => {
  const data = await UpstoxController.getPositions(
    "eyJ0eXAiOiJKV1QiLCJrZXlfaWQiOiJza192MS4wIiwiYWxnIjoiSFMyNTYifQ.eyJzdWIiOiI2RUFFWkYiLCJqdGkiOiI2NWQwOTVjM2QwOTU1MDA4NmNlZmNlNjUiLCJpc011bHRpQ2xpZW50IjpmYWxzZSwiaXNBY3RpdmUiOnRydWUsInNjb3BlIjpbImludGVyYWN0aXZlIiwiaGlzdG9yaWNhbCJdLCJpYXQiOjE3MDgxNjg2NDMsImlzcyI6InVkYXBpLWdhdGV3YXktc2VydmljZSIsImV4cCI6MTcwODIwNzIwMH0.BatAzaL-wKgtlp_ci7b7QejthexLdXnnRRck8RrzApk"
  );

  return res.json(data);
});
export default router;
