import { getBooksById } from "@/api/getBooks";
import { db } from "@/config/firebase";
import type { Book } from "@/model";
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

// Basic CRUD Operations used for all lists within this project.
// The other services are meant to be wrappers of these functions.
// ?? It could've just been better to have a global function that manages all of this. However, it might have been over-optimization for little to no benefit.

export const getBookList = async (
  userId: string,
  collectionName: string,
): Promise<Book[]> => {
  try {
    const userCollection = collection(db, collectionName);
    const q = query(userCollection, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const books: Book[] = [];

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
    console.error(`Error fetching user list from ${collectionName}:`, error);
    throw error;
  }
};

export const isBookInList = async (
  bookId: string,
  userId: string,
  collectionName: string,
): Promise<boolean> => {
  try {
    const userCollection = collection(db, collectionName);
    const q = query(
      userCollection,
      where("userId", "==", userId),
      where("bookId", "==", bookId),
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error while checking if book is in user's list.");
    throw error;
  }
};

export const addBookToList = async (
  bookId: string,
  userId: string,
  collectionName: string,
): Promise<DocumentReference<DocumentData, DocumentData>> => {
  try {
    const userCollection = collection(db, collectionName);
    const newBookInUserList = await addDoc(userCollection, {
      userId: userId,
      bookId: bookId,
    });
    return newBookInUserList;
  } catch (error) {
    console.error("Error adding book to user's list", error);
    throw error;
  }
};

export const removeBookFromList = async (
  bookId: string,
  userId: string,
  collectionName: string,
) => {
  try {
    const userCollection = collection(db, collectionName);
    const q = query(
      userCollection,
      where("userId", "==", userId),
      where("bookId", "==", bookId),
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (document) => {
      await deleteDoc(doc(userCollection, document.id));
    });
  } catch (error) {
    console.error("Error removing book from user's list", error);
    throw error;
  }
};
