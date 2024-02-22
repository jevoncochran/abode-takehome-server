import * as Events from "../models/eventModel";
import * as Invites from "../models/inviteModel";
import { EventInput, ExistingEvent, UniqueId } from "../types/custom";
import { Event } from "../types/custom";
import { sortEvents } from "../utils/sortEvents";
import { v4 as uuid } from "uuid";
import AWS from "aws-sdk";
import { filterFutureEvents } from "../utils/filterFutureEvents";

// S3 Configuration
const s3 = new AWS.S3({
  region: "us-east-2",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY as string,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
  },
});

const createEvent = async (event: EventInput) => {
  return Events.createEvent(event);
};

const getAllUpcomingEvents = async () => {
  const allEvents: ExistingEvent[] = await Events.getAllEvents();

  const upcomingEvents = filterFutureEvents(allEvents);

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

  // Remove past events and return
  return filterFutureEvents(allEventsSorted);
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

const uploadEventImage = async (file: Express.Multer.File) => {
  const buffer = file?.buffer;

  const mimeType = file?.mimetype;
  const fileExtension = mimeType?.split("/")[1];
  const fileName = `${uuid()}.${fileExtension}`;
  const newFileName = `${Date.now()}-${fileName}`;

  const params = {
    Bucket: process.env.S3_BUCKET_NAME as string,
    Key: newFileName,
    Body: buffer,
    ContentType: mimeType,
    ACL: "public-read",
  };

  await s3.upload(params).promise();

  const link = `https://${process.env.S3_BUCKET_NAME}.s3.us-east-2.amazonaws.com/${newFileName}`;

  return link;
};

export {
  createEvent,
  getAllUpcomingEvents,
  getEventsByUser,
  getEvent,
  updateEvent,
  deleteEvent,
  uploadEventImage,
};
