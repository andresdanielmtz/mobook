import type { Book } from "@/model";
import { DocumentReference, type DocumentData } from "firebase/firestore";
import {
  addBookToList,
  getBookList,
  isBookInList,
  removeBookFromList,
} from "./infoServices";

// Reading -> Books already read.
export const getUserReadList = async (userId: string): Promise<Book[]> => {
  const userList = await getBookList(userId, "readingBooks");
  if (!userList || userList.length === 0) {
    return [];
  }
  return userList;
};

export const checkIfBookInReadList = async (
  bookId: string,
  userId: string,
): Promise<boolean> => {
  const isBookInPending = await isBookInList(bookId, userId, "readingBooks");
  return isBookInPending;
};

export const addBookToUserReadList = async (
  bookId: string,
  userId: string,
): Promise<DocumentReference<DocumentData, DocumentData>> => {
  const response = addBookToList(bookId, userId, "readingBooks");
  return response;
};

export const removeBookFromUserReadList = async (
  readlistId: string,
  userId: string,
) => {
  const response = removeBookFromList(readlistId, userId, "readingBooks");
  return response;
};
