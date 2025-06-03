// IUsers' are made to support both email/password users (which are asked the first and last name) as well as those that are logged by google (which only have a single displayname and may have only one name) : )

export interface IUser {
  uid: string;
  email: string;
  displayName?: string;
  createdAt: Date;
  bio: string;
  firstName?: string;
  lastName?: string;
}
