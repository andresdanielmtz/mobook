import { DocumentReference, type DocumentData } from "firebase/firestore";
import {
  addBookToList,
  getBookList,
  isBookInList,
  removeBookFromList,
} from "./infoServices";

// Pending Book heavily relies on ./InfoServices.ts
// This is good since the logic in all lists are pretty much the same. :)

export const getUserPendingList = async (userId: string) => {
  const userList = await getBookList(userId, "pendingBooks");
  if (!userList || userList.length === 0) {
    return [];
  }
  return userList;
};

export const checkIfBookInPendingList = async (
  bookId: string,
  userId: string,
): Promise<boolean> => {
  const isBookInPending = await isBookInList(bookId, userId, "pendingBooks");
  return isBookInPending;
};

export const addBookToUserPendingList = async (
  bookId: string,
  userId: string,
): Promise<DocumentReference<DocumentData, DocumentData>> => {
  const response = addBookToList(bookId, userId, "pendingBooks");
  return response;
};

export const removeBookFromUserPendingList = async (
  pendingId: string,
  userId: string,
) => {
  const response = removeBookFromList(pendingId, userId, "pendingBooks");
  return response;
};
