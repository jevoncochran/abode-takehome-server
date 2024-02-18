import * as Invites from "../models/inviteModel";
import { InviteInput, UniqueId } from "../types/custom";

const sendInvites = async (invites: InviteInput[]) => {
  return Invites.createInvites(invites);
};

const getInvites = async (guestId: UniqueId) => {
  return Invites.getInvites(guestId);
};

export { sendInvites, getInvites };
