import express from "express";
import { createEvent, getEvents } from "../controllers/eventController";
import authenticate from "../middleware/authenticationMiddleware";

const router = express.Router();

router.post("/", createEvent);
router.get("/", authenticate, getEvents);

export default router;
