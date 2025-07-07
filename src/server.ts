import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://book:book@cluster0.jq7qb.mongodb.net/tour-DB?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("connected to db");

    server = app.listen(5000, () => {
      console.log("server is listening on port 5000");
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();
