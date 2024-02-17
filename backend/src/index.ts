import express from "express";
import upstoxRouter from "./routers/upstox";
const app = express();

app.use(express.json());
app.use("/upstox", upstoxRouter);

app.listen(8080, () => {
  console.log("server started...  on port 8080");
});
