import express, { Request, Response } from "express";
import cors from "cors";
import userRouter from "../routers/userRouter";
import eventRouter from "../routers/eventRouter";

const server = express();

server.use(cors());
server.use(express.json());

server.get("/", (req: Request, res: Response) => {
  res.status(200).json({ api: "up" });
});

server.use("/api/users", userRouter);
server.use("/api/events", eventRouter);

module.exports = server;
