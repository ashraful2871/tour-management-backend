import { Server } from "http";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
const app = express();
app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({
    message: "welcome to tour management backend",
  });
});
export default app;
