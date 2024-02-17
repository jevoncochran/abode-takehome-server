import * as Events from "../models/eventModel";
import { CreateEventInput } from "../types/custom";

const createEvent = async (event: CreateEventInput) => {
  return Events.createEvent(event);
};

export { createEvent };
