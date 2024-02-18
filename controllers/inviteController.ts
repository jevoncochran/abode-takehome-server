import * as inviteService from "../services/inviteService";
import { Request, Response } from "express";
import { InviteInput } from "../types/custom";

// @desc Create invite
// @route POST /api/invites
// @access Private
const createInvite = async (req: Request, res: Response) => {
  const { eventId, guestId, accepted, declined }: InviteInput = req.body;

  try {
    const invite = await inviteService.createInvite({
      eventId,
      guestId,
      accepted,
      declined,
    });

    res.status(201).json(invite);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errMsg: "Unable to create event" });
  }
};

export { createInvite };
