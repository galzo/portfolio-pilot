export type UserId = number;
export type UserAuthToken = string;

export interface User {
  id: UserId;
  name: string;
  email: string;
  isAdmin: boolean;
}
