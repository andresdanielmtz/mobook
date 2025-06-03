// TODO: Add user lists services
// 1. Books the user has read (read list)
// 2. Books the user wants to read (pending list)
// 3. Books the user wants to buy (wishlist)

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

// Though it is necessary to add/remove elements to the wishlist of a specific user. It is not necessary to "update" them, so to speak.
// This is just a normalized table so the "content" of the elements does not really matter as it is just connections between two different tables. :)

export const getUserWishlist = async (userId: string): Promise<Item[]> => {
  try {
    const wishlistCollection = collection(db, "wishlistBooks");
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

export const checkIfBookInWishlist = async (
  bookId: string,
  userId: string,
): Promise<boolean> => {
  try {
    const wishlistCollection = collection(db, "wishlistBooks");
    const q = query(
      wishlistCollection,
      where("userId", "==", userId),
      where("bookId", "==", bookId),
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking if book is in user's wishlist", error);
    throw error;
  }
};

export const addBookToUserWishlist = async (
  bookId: string,
  userId: string,
): Promise<DocumentReference<DocumentData, DocumentData>> => {
  try {
    const wishlistsCollection = collection(db, "wishlistBooks");
    const newBookInWishList = await addDoc(wishlistsCollection, {
      userId: userId,
      bookId: bookId,
    });
    return newBookInWishList;
  } catch (error) {
    console.error("Error adding book to user's wihlist", error);
    throw error;
  }
};

export const removeBookFromUserWishList = async (wishlistId: string) => {
  try {
    const wishlistCollection = collection(db, "wishlistBooks");
    await deleteDoc(doc(wishlistCollection, wishlistId));
  } catch (error) {
    console.error("Error adding book to user's wihlist", error);
    throw error;
  }
};
