import db from "../data/dbConfig";
import { InviteInput, UniqueId } from "../types/custom";

const createInvite = async (invite: InviteInput) => {
  return db("invites")
    .insert(invite, "id")
    .then((ids: UniqueId[]) => {
      const [id] = ids;
      return findInviteBy(id);
    });
};

const getInvites = async (guestId: UniqueId) => {
  return db("invites").where({ guestId });
};

// TODO: Remove "any" and provide type for filter
const findInviteBy = async (filter: any) => {
  return db("invites").where(filter).first();
};

export { createInvite, getInvites };
