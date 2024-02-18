import express from "express";
import { createInvite, getInvites } from "../controllers/inviteController";

const router = express.Router();

router.post("/", createInvite);
router.get("/", getInvites);

export default router;
