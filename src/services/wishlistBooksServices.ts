import type { Book } from "@/model";
import { DocumentReference, type DocumentData } from "firebase/firestore";
import {
  addBookToList,
  getBookList,
  isBookInList,
  removeBookFromList,
} from "./infoServices";

// Though it is necessary to add/remove elements to the wishlist of a specific user. It is not necessary to "update" them, so to speak.
// This is just a normalized table so the "content" of the elements does not really matter as it is just connections between two different tables.

export const getUserWishlist = async (userId: string): Promise<Book[]> => {
  const userList = await getBookList(userId, "wishlistBooks");
  if (!userList || userList.length === 0) {
    return [];
  }
  return userList;
};

export const checkIfBookInWishlist = async (
  bookId: string,
  userId: string,
): Promise<boolean> => {
  const isBookInWishlist = await isBookInList(bookId, userId, "wishlistBooks");
  return isBookInWishlist;
};

export const addBookToUserWishlist = async (
  bookId: string,
  userId: string,
): Promise<DocumentReference<DocumentData, DocumentData>> => {
  const response = addBookToList(bookId, userId, "wishlistBooks");
  return response;
};

export const removeBookFromUserWishList = async (
  wishlistId: string,
  userId: string,
) => {
  const response = removeBookFromList(wishlistId, userId, "wishlistBooks");
  return response;
};
