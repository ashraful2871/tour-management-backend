/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({
    message: "welcome to tour management backend",
  });
});

app.use(globalErrorHandler);

export default app;
