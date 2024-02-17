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

export { createEvent };
