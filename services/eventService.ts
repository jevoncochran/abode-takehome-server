import * as Events from "../models/eventModel";
import { CreateEventInput, UniqueId } from "../types/custom";

const createEvent = async (event: CreateEventInput) => {
  return Events.createEvent(event);
};

const getEvents = async (userId: string) => {
  return Events.getEvents(userId);
};

export { createEvent, getEvents };
