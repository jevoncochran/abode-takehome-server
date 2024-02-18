import express, { Request, Response } from "express";
import cors from "cors";
import userRouter from "../routers/userRouter";
import eventRouter from "../routers/eventRouter";
import inviteRouter from "../routers/inviteRouter";
import authenticate from "../middleware/authenticationMiddleware";

const server = express();

server.use(cors());
server.use(express.json());

server.get("/", (req: Request, res: Response) => {
  res.status(200).json({ api: "up" });
});

server.use("/api/users", userRouter);
server.use("/api/events", authenticate, eventRouter);
server.use("/api/invites", authenticate, inviteRouter);

module.exports = server;
