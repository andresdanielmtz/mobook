// TODO: Add user lists services
// 1. Books the user has read (read list)
// 2. Books the user wants to read (pending list)
// 3. Books the user wants to buy (wishlist)

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

export const getUserWishlist = async (userId: string) => {
  try {
    const wishlistCollection = collection(db, "wishlistBooks");
    const q = query(wishlistCollection, where("userId", "==", userId));
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
    console.error("Error fetching user's wishlist", error);
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
