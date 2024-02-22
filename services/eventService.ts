import * as Events from "../models/eventModel";
import * as Invites from "../models/inviteModel";
import { EventInput, ExistingEvent, UniqueId } from "../types/custom";
import { sortEvents } from "../utils/sortEvents";
import { Event } from "../types/custom";

const createEvent = async (event: EventInput) => {
  return Events.createEvent(event);
};

const getAllUpcomingEvents = async () => {
  const allEvents: ExistingEvent[] = await Events.getAllEvents();

  const currentTime = new Date();
  const today = currentTime.setHours(0, 0, 0, 0);
  const currentTimeAsNum = currentTime.getTime();

  const upcomingEvents = allEvents.filter((event: ExistingEvent) => {
    if (new Date(event.date).getTime() > today) {
      return true;
    } else if (new Date(event.date).getTime() === today) {
      if (
        event.startTime &&
        new Date(event.startTime).getTime() > currentTimeAsNum
      ) {
        return true;
      }
    }
  });

  // Retrieve guests data
  const upcomingEventsPlusGuests = [];
  for (const event of upcomingEvents) {
    let invites = await Invites.getInvitesByEvent(event.id);
    upcomingEventsPlusGuests.push({ ...event, guests: invites });
  }

  return sortEvents(upcomingEventsPlusGuests);
};

// This gets all events that specified user has created or been invited to
const getEventsByUser = async (userId: string) => {
  const userCreatedEvents = await Events.getEventsByCreator(userId);
  const invites = await Invites.getInvitesByUser(userId);

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

  // Retrieve guests data
  const allEventsPlusGuests = [];
  for (const event of allEvents) {
    let invites = await Invites.getInvitesByEvent(event.id);
    allEventsPlusGuests.push({ ...event, guests: invites });
  }

  const allEventsSorted = sortEvents(allEventsPlusGuests);

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

export {
  createEvent,
  getAllUpcomingEvents,
  getEventsByUser,
  getEvent,
  updateEvent,
  deleteEvent,
};
