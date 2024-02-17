import express, { Request, Response } from "express";
import cors from "cors";
import userRouter from "../routers/userRouter";

const server = express();

server.use(cors());
server.use(express.json());

server.get("/", (req: Request, res: Response) => {
  res.status(200).json({ api: "up" });
});

server.use("/api/users", userRouter);

module.exports = server;
