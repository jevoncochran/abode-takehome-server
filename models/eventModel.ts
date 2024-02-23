import db from "../data/dbConfig";
import { NewEvent, ExistingEvent, UniqueId } from "../types/custom";

const createEvent = async (event: NewEvent) => {
  return db("events")
    .insert(event, "id")
    .then((ids: string[]) => {
      const [id] = ids;
      return findEventBy(id);
    });
};

const getAllEvents = async () => {
  return db("events");
};

const getEventsByCreator = async (userId: string) => {
  return db("events").where({ userId });
};

// TODO: Remove "any" and provide type for filter
const findEventBy = async (filter: any) => {
  return db("events").where(filter).first();
};

const updateEvent = async (eventId: UniqueId, updates: ExistingEvent) => {
  return db("events").where({ id: eventId }).update(updates);
};

const deleteEvent = async (eventId: UniqueId) => {
  return db("events").where({ id: eventId }).del();
};

export {
  createEvent,
  getAllEvents,
  getEventsByCreator,
  findEventBy,
  updateEvent,
  deleteEvent,
};
