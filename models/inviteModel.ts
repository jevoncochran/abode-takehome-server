import db from "../data/dbConfig";
import { Invite, NewInvite, UniqueId } from "../types/custom";

const createInvites = async (invites: NewInvite[]) => {
  return db("invites")
    .insert(invites, ["id"])
    .then(async (ids: UniqueId[]) => {
      // Initial array for returning invites
      const sent: Invite[] = [];
      //   Grab each newly created invite by ID and push it to array from above
      for (const id of ids) {
        const individualInvite = await findInviteBy(id);
        sent.push(individualInvite);
      }
      return sent;
    });
};

const getInvitesByUser = async (guestId: UniqueId) => {
  return db("invites").where({ guestId });
};

const getInvitesByEvent = async (eventId: UniqueId) => {
  return db("invites as i")
    .join("users as u", "u.id", "i.guestId")
    .select("i.id as inviteId", "i.guestId", "u.email", "i.accepted", "i.declined")
    .where({ eventId });
};

// TODO: Remove "any" and provide type for filter
const findInviteBy = async (filter: any) => {
  return db("invites").where(filter).first();
};

export { createInvites, getInvitesByUser, getInvitesByEvent };
