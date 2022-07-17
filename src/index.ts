import express, { Application, Request, Response } from "express";
import config from "./config";
import routes from "./routes";

const PORT = config.PORT || 3000;
const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "hello, from main",
  });
});

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`server starts at: http://localhost:${PORT}/`);
});
