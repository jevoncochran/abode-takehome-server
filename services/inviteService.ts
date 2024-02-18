import * as Invites from "../models/inviteModel";
import { InviteInput, UniqueId } from "../types/custom";

const createInvite = async (invite: InviteInput) => {
  return Invites.createInvite(invite);
};

const getInvites = async (guestId: UniqueId) => {
  return Invites.getInvites(guestId);
};

export { createInvite, getInvites };
