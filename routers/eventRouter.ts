import express from "express";
import {
  createEvent,
  deleteEvent,
  getEventsByUser,
  updateEvent,
} from "../controllers/eventController";

const router = express.Router();

router.post("/", createEvent);
router.get("/", getEventsByUser);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
