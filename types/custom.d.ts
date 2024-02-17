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

export interface Event {
  id: UniqueId;
  title: string;
  date: Date;
  startTime?: Date;
  endTime?: Date;
  userId: UniqueId;
  isAllDay?: boolean;
}

export type CreateEventInput = Omit<Event, "id">;
