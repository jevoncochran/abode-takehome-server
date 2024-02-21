export type UniqueId = number | string;

export interface User {
  id: UniqueId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type RegisterUserInput = Omit<User, "id">;

export type LoginUserInput = Omit<User, ["id", "firstName", "lastName"]>;

export type AuthenticatedUser = Omit<User, "password">;

export interface Event {
  id: UniqueId;
  title: string;
  date: Date;
  startTime?: Date | null;
  endTime?: Date | null;
  userId: UniqueId;
  isAllDay?: boolean;
  description?: string;
}

export interface NewEvent {
  title: string;
  date: Date;
  startTime?: Date | null;
  endTime?: Date | null;
  userId: UniqueId;
  isAllDay?: boolean;
  description?: string;
  usersToInvite: UniqueId[];
}

export type EventInput = Omit<Event, "id">;

export interface Invite {
  id: UniqueId;
  eventId: UniqueId;
  guestId: UniqueId;
  accepted: boolean;
  declined: boolean;
}

export interface NewInvite {
  eventId: UniqueId;
  guestId: UniqueId;
}

export type InviteInput = Omit<Invite, "id">;
