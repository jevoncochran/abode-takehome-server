import { Request, Response } from "express";
import * as inviteService from "../services/inviteService";
import * as eventService from "../services/eventService";
import { InviteInput, Event } from "../types/custom";

// @desc Send invites
// @route POST /api/invites
// @access Private
const sendInvites = async (req: Request, res: Response) => {
  const invites: InviteInput[] = req.body;

  // Grab the event ID from first invite of array for validation purposes
  const { eventId } = invites[0];

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
    const sent = await inviteService.sendInvites(invites);

    res.status(201).json(sent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errMsg: "Unable to send invites" });
  }
};

// @desc Get invites (by user)
// @route GET /api/invites
// @access Private
const getInvites = async (req: Request, res: Response) => {
  const userId = req.user.id;

  try {
    const invites = await inviteService.getInvitesByUser(userId);
    res.status(200).json(invites);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errMsg: "Unable to retrieve invites" });
  }
};

export { sendInvites, getInvites };
