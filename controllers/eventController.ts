import * as eventService from "../services/eventService";
import { Request, Response } from "express";
import { CreateEventInput } from "../types/custom";

// @desc Create event
// @route POST /api/events
// @access Private
const createEvent = async (req: Request, res: Response) => {
  const {
    title,
    date,
    startTime,
    endTime,
    userId,
    isAllDay,
  }: CreateEventInput = req.body;

  try {
    const event = await eventService.createEvent({
      title,
      date,
      startTime,
      endTime,
      userId,
      isAllDay,
    });

    res.status(201).json(event);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errMsg: "Unable to create event" });
  }
};

// @desc Get events (by user)
// @route GET /api/events?userId=${userId}
// @access Private
const getEvents = async (req: Request, res: Response) => {
  const { userId } = req.query;

  // Check that the user ID from the request matches the userId from the query
  if (req.user.id.toString() === userId) {
    try {
      const events = await eventService.getEvents(userId as string);

      res.status(200).json(events);
    } catch (error) {
      console.log(error);
      res.status(500).json({ errMsg: "Unable to retrieve events" });
    }
  } else {
    // If the user ID from the request does not request the userId from the query
    // This is because the user is trying to retrieve events that they did not create or have not been invited to
    // Prevent users from retrieving events they did not create or have not been invited to
    res.status(401).json({ errMsg: "Unauthorized" });
  }
};

export { createEvent, getEvents };
