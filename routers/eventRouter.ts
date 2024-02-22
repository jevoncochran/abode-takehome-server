import express from "express";
import {
  createEvent,
  deleteEvent,
  getEventsByUser,
  updateEvent,
  uploadEventImage,
} from "../controllers/eventController";
import multer from "multer";

// File upload middleware configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.post("/", createEvent);
router.get("/", getEventsByUser);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);
router.post("/images", upload.single("file"), uploadEventImage);

export default router;
