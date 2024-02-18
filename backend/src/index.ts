import express from "express";
import cors from "cors";
import upstoxRouter from "./routers/upstox";
import AuthMiddleware from "./middlewares/auth";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/upstox", AuthMiddleware, upstoxRouter);
app.get("/", (req: any, res: any) => {
  return res.json({ ping: "Hello" });
});
app.listen(8080, () => {
  console.log("server started...  on port 8080");
});
