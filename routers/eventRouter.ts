import express from "express";
import {
  createEvent,
  getEvents,
  updateEvent,
} from "../controllers/eventController";
import authenticate from "../middleware/authenticationMiddleware";

const router = express.Router();

router.post("/", createEvent);
router.get("/", getEvents);
router.put("/:id", updateEvent);

export default router;
