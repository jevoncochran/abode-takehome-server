import * as Invites from "../models/inviteModel";
import { NewInvite, UniqueId } from "../types/custom";

const sendInvites = async (invites: NewInvite[]) => {
  return Invites.createInvites(invites);
};

const getInvitesByUser = async (guestId: UniqueId) => {
  return Invites.getInvitesByUser(guestId);
};

export { sendInvites, getInvitesByUser };
