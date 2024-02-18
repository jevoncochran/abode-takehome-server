import db from "../data/dbConfig";
import { Invite, InviteInput, UniqueId } from "../types/custom";

const createInvites = async (invites: InviteInput[]) => {
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

const getInvites = async (guestId: UniqueId) => {
  return db("invites").where({ guestId });
};

// TODO: Remove "any" and provide type for filter
const findInviteBy = async (filter: any) => {
  return db("invites").where(filter).first();
};

export { createInvites, getInvites };
