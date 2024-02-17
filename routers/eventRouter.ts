import express from "express";
import { createEvent } from "../controllers/eventController";

const router = express.Router();

router.post("/", createEvent);

export default router;
