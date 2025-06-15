import { getBooksById } from "@/api/getBooks";
import { db } from "@/config/firebase";
import type { Book } from "@/model";
import { collection, getDocs, query, where } from "firebase/firestore";

// Based on the name of the collection, it will return the list of books.
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

export const isUserInList = async (
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
