import { db } from "@/config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  type DocumentData,
} from "firebase/firestore";
import { getBookList, isUserInList } from "./infoServices";

// Pending Book heavily relies on ./InfoServices.ts
// This is good since the logic in all lists are pretty much the same. :)

export const getUserPendingList = async (userId: string) => {
  const databaseName = "pendingBooks";
  const userList = await getBookList(userId, databaseName);
  if (!userList || userList.length === 0) {
    return [];
  }
  return userList;
};

export const checkIfBookInPendingList = async (
  bookId: string,
  userId: string,
): Promise<boolean> => {
  const isBookInPending = await isUserInList(bookId, userId, "pendingBooks");
  return isBookInPending;
};

export const addBookToUserPendingList = async (
  bookId: string,
  userId: string,
): Promise<DocumentReference<DocumentData, DocumentData>> => {
  try {
    const pendingCollection = collection(db, "pendingBooks");
    const newBookInPendingList = await addDoc(pendingCollection, {
      userId: userId,
      bookId: bookId,
    });
    return newBookInPendingList;
  } catch (error) {
    console.error("Error adding book to user's pending list", error);
    throw error;
  }
};

export const removeBookFromUserPendingList = async (pendingId: string) => {
  try {
    const pendingCollection = collection(db, "pendingBooks");
    await deleteDoc(doc(pendingCollection, pendingId));
  } catch (error) {
    console.error("Error adding book to user's pending list", error);
    throw error;
  }
};
