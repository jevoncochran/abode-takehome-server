const express = require("express");
const cors = require("cors");

const userRouter = require("../routers/userRouter.ts");

const server = express();

server.use(cors());
server.use(express.json());

// TODO: Remove "any" and provide types for req and res
server.get("/", (req: any, res: any) => {
  res.status(200).json({ api: "up" });
});

server.use("/api/users", userRouter);

module.exports = server;
