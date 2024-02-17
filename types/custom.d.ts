export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type RegisterUserInput = Omit<User, "id">;

export type LoginUserInput = Omit<User, ["id", "firstName", "lastName"]>;
