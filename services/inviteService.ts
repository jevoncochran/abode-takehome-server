import * as Invites from "../models/inviteModel";
import { InviteInput } from "../types/custom";

const createInvite = async (invite: InviteInput) => {
  return Invites.createInvite(invite);
};

export { createInvite };
