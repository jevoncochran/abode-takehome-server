import * as eventService from "../services/eventService";
import { Request, Response } from "express";
import { EventInput, Event } from "../types/custom";

// @desc Create event
// @route POST /api/events
// @access Private
const createEvent = async (req: Request, res: Response) => {
  const { title, date, startTime, endTime, isAllDay }: EventInput = req.body;

  const userId = req.user.id;

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
// @route GET /api/events
// @access Private
const getEvents = async (req: Request, res: Response) => {
  const userId = req.user.id;

  try {
    const events = await eventService.getEvents(userId);
    res.status(200).json(events);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errMsg: "Unable to retrieve events" });
  }
};

// @desc Update event
// @route PUT /api/events/:id
// @access Private
const updateEvent = async (req: Request, res: Response) => {
  const { id } = req.params;

  let updates: EventInput = req.body;

  // Check if event exists
  const existingEvent: Event = await eventService.getEvent(id);

  if (!existingEvent) {
    return res.status(400).json({ errMsg: "Event does not exist" });
  }

  // Check that user created the event
  // Users can only update events they create
  if (req.user.id.toString() !== existingEvent.userId) {
    return res.status(401).json({ errMsg: "Unauthorized" });
  }

  try {
    const updated = await eventService.updateEvent(id, updates);

    res.status(201).json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errMsg: "Unable to update event" });
  }
};

// @desc Delete event
// @route DELETE /api/events/:id
// @access Private
const deleteEvent = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Check if event exists
  const existingEvent: Event = await eventService.getEvent(id);

  if (!existingEvent) {
    return res
      .status(400)
      .json({ errMsg: "You cannot delete an event that does not exist" });
  }

  // Check that user created the event
  // Users can only delete events they create
  if (req.user.id.toString() !== existingEvent.userId) {
    return res.status(401).json({ errMsg: "Unauthorized" });
  }

  try {
    const deleted = await eventService.deleteEvent(id);

    res.status(201).json(deleted);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errMsg: "Unable to delete event" });
  }
};

export { createEvent, getEvents, updateEvent, deleteEvent };
