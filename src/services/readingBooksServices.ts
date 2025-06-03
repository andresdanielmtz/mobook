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

export const getUserReadBooks = async (userId: string): Promise<Item[]> => {
  try {
    const readlistCollection = collection(db, "readingBooks");
    const q = query(readlistCollection, where("userId", "==", userId));
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
    console.error("Error fetching user's read list", error);
    throw error;
  }
};

export const addBookToUserReadList = async (
  bookId: string,
  userId: string,
): Promise<DocumentReference<DocumentData, DocumentData>> => {
  try {
    const readlistsCollection = collection(db, "readingBooks");
    const newBookInReadList = await addDoc(readlistsCollection, {
      userId: userId,
      bookId: bookId,
    });
    return newBookInReadList;
  } catch (error) {
    console.error("Error adding book to user's wihlist", error);
    throw error;
  }
};

export const removeBookFromUserReadList = async (readlistId: string) => {
  try {
    const readlistsCollection = collection(db, "readingBooks");
    await deleteDoc(doc(readlistsCollection, readlistId));
  } catch (error) {
    console.error("Error adding book to user's wihlist", error);
    throw error;
  }
};
