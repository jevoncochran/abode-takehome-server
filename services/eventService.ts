import * as Events from "../models/eventModel";
import { EventInput, UniqueId } from "../types/custom";

const createEvent = async (event: EventInput) => {
  return Events.createEvent(event);
};

const getEvents = async (userId: string) => {
  return Events.getEvents(userId);
};

const getEvent = async (eventId: UniqueId) => {
  return Events.findEventBy({ id: eventId });
};

const updateEvent = async (eventId: UniqueId, updates: EventInput) => {
  return Events.updateEvent(eventId, updates);
};

const deleteEvent = async (eventId: UniqueId) => {
  return Events.deleteEvent(eventId);
};

export { createEvent, getEvents, getEvent, updateEvent, deleteEvent };
