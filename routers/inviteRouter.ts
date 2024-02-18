import express from "express";
import { getInvites, sendInvites } from "../controllers/inviteController";

const router = express.Router();

router.post("/", sendInvites);
router.get("/", getInvites);

export default router;
