// This file defines the User interface for the application.
// It includes properties for user identification, contact information, and profile details.

export interface StoreUser {
  uid: string;
  email: string;
  displayName?: string;
  createdAt: Date;
  bio: string;
  firstName?: string;
  lastName?: string;
}
