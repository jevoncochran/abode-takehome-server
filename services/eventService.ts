import * as Events from "../models/eventModel";
import * as Invites from "../models/inviteModel";
import { EventInput, UniqueId } from "../types/custom";
import { sortEvents } from "../utils/sortEvents";

const createEvent = async (event: EventInput) => {
  return Events.createEvent(event);
};

// This gets all events that specified user has created or been invited to
const getEvents = async (userId: string) => {
  const userCreatedEvents = await Events.getEventsByCreator(userId);
  const invites = await Invites.getInvites(userId);

  // Use invites data to generate list of events user has been invited to
  const invitedEvents = [];
  for (const invite of invites) {
    let event = await Events.findEventBy({ id: invite.eventId });
    event = {
      ...event,
      userRelation: "invited",
      invite: {
        id: invite.id,
        accepted: invite.accepted,
        declined: invite.declined,
      },
    };
    invitedEvents.push(event);
  }

  // Add userRelation key to user created events
  const userCreatedEventsPlusRelation = userCreatedEvents.map((uce: Event) => {
    return { ...uce, userRelation: "created" };
  });

  const allEvents = [...userCreatedEventsPlusRelation, ...invitedEvents];
  const allEventsSorted = sortEvents(allEvents);
  return allEventsSorted;
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
