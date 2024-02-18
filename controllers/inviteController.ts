import * as inviteService from "../services/inviteService";
import * as eventService from "../services/eventService";
import { Request, Response } from "express";
import { InviteInput, Event } from "../types/custom";

// @desc Create invite
// @route POST /api/invites
// @access Private
const createInvite = async (req: Request, res: Response) => {
  const { eventId, guestId, accepted, declined }: InviteInput = req.body;

  // Check that event exists
  const existingEvent: Event = await eventService.getEvent(eventId);

  if (!existingEvent) {
    return res.status(400).json({ errMsg: "Event does not exist" });
  }

  // Check that user created the event
  // Users can only send invites for events they create
  if (req.user.id.toString() !== existingEvent.userId) {
    return res.status(401).json({ errMsg: "Unauthorized" });
  }

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
    res.status(500).json({ errMsg: "Unable to send invite" });
  }
};

// @desc Get invites (by user)
// @route GET /api/invites
// @access Private
const getInvites = async (req: Request, res: Response) => {
  const userId = req.user.id;

  try {
    const invites = await inviteService.getInvites(userId);
    res.status(200).json(invites);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errMsg: "Unable to retrieve invites" });
  }
};

export { createInvite, getInvites };
