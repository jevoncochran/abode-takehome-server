import db from "../data/dbConfig";
import { CreateEventInput, UniqueId } from "../types/custom";

const createEvent = async (event: CreateEventInput) => {
  return db("events")
    .insert(event, "id")
    .then((ids: string[]) => {
      const [id] = ids;
      return findEventBy(id);
    });
};

const getEvents = async (userId: string) => {
  return db("events").where({ userId });
};

// TODO: Remove "any" and provide type for filter
const findEventBy = async (filter: any) => {
  return db("events").where(filter).first();
};

export { createEvent, getEvents, findEventBy };
