import { db } from "@/config/firebase";
import type { Item } from "@/model";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  getDocs,
  query,
  where,
  type DocumentData,
} from "firebase/firestore";

export const getUserPendingBooks = async (userId: string) => {
  try {
    const pendingCollection = collection(db, "pendingBooks");
    const q = query(pendingCollection, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const books: Item[] = [];

    querySnapshot.forEach((doc) => {
      books.push({
        id: doc.id,
        ...doc.data(),
        kind: doc.data().kind || "",
        etag: doc.data().etag || "",
        selfLink: doc.data().selfLink || "",
        volumeInfo: doc.data().volumeInfo || undefined,
        saleInfo: doc.data().saleInfo || undefined,
        accessInfo: doc.data().accessInfo || undefined,
      });
    });

    return books;
  } catch (error) {
    console.error("Error fetching user's pending list", error);
    throw error;
  }
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
