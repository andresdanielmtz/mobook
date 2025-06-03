import { getBooksById } from "@/api/getBooks";
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

export const getUserPendingList = async (userId: string) => {
  try {
    const pendingCollection = collection(db, "pendingBooks");
    const q = query(pendingCollection, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const books: Item[] = [];

    // Fetch each book by its bookId
    for (const docSnap of querySnapshot.docs) {
      const { bookId } = docSnap.data();
      if (!bookId) continue;
      try {
        const book = await getBooksById(bookId);
        if (book) {
          books.push(book);
        }
      } catch (err) {
        console.warn(`Book with id ${bookId} not found or error fetching.`);
        console.error(err);
      }
    }

    return books;
  } catch (error) {
    console.error("Error fetching user's pending list", error);
    throw error;
  }
};

export const checkIfBookInPendingList = async (
  bookId: string,
  userId: string,
): Promise<boolean> => {
  try {
    const pendingCollection = collection(db, "pendingBooks");
    const q = query(
      pendingCollection,
      where("userId", "==", userId),
      where("bookId", "==", bookId),
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking if book is in user's pending list", error);
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
