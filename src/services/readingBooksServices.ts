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

// Reading -> Books already read.
export const getUserReadList = async (userId: string): Promise<Item[]> => {
  try {
    const wishlistCollection = collection(db, "readingBooks");
    const q = query(wishlistCollection, where("userId", "==", userId));
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
    console.error("Error fetching user's wishlist", error);
    throw error;
  }
};

export const checkIfBookInReadList = async (
  bookId: string,
  userId: string,
): Promise<boolean> => {
  try {
    const readlistsCollection = collection(db, "readingBooks");
    const q = query(
      readlistsCollection,
      where("userId", "==", userId),
      where("bookId", "==", bookId),
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking if book is in user's read list", error);
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
    console.error("Error adding book to user's read list", error);
    throw error;
  }
};

export const removeBookFromUserReadList = async (readlistId: string) => {
  try {
    const readlistsCollection = collection(db, "readingBooks");
    await deleteDoc(doc(readlistsCollection, readlistId));
  } catch (error) {
    console.error("Error adding book to user's read list", error);
    throw error;
  }
};
