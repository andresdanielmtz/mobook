import { db } from "../config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { type IReview } from "@/model/Reviews";

export const getReviews = async () => {
  try {
    const reviewsCollection = collection(db, "reviews");
    const q = query(reviewsCollection, where("isDeleted", "==", false));
    const querySnapshot = await getDocs(q);
    const reviews: IReview[] = []; // TODO: Set proper type for reviews

    querySnapshot.forEach((doc) => {
      reviews.push({
        id: doc.id,
        ...doc.data(),
        bookId: doc.data().bookId || "",
        userId: doc.data().userId || "",
        rating: doc.data().rating || 0,
        comment: doc.data().comment || "",
        createdAt: doc.data().createdAt
          ? doc.data().createdAt.toDate()
          : new Date(),
      });
    });

    return reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

export const getReviewsByBookId = async (bookId: string) => {
  try {
    const reviewsCollection = collection(db, "reviews");
    const q = query(
      reviewsCollection,
      where("bookId", "==", bookId),
      where("isDeleted", "==", false),
    );
    const querySnapshot = await getDocs(q);
    const reviews: IReview[] = [];

    querySnapshot.forEach((doc) => {
      reviews.push({
        id: doc.id,
        ...doc.data(),
        bookId: doc.data().bookId || "",
        userId: doc.data().userId || "",
        rating: doc.data().rating || 0,
        comment: doc.data().comment || "",
        createdAt: doc.data().createdAt
          ? doc.data().createdAt.toDate()
          : new Date(),
      });
    });

    return reviews;
  } catch (error) {
    console.error("Error fetching reviews by book ID:", error);
    throw error;
  }
};

export const addReview = async (review: IReview) => {
  try {
    const reviewsCollection = collection(db, "reviews");
    const newReviewRef = await addDoc(reviewsCollection, {
      ...review,
      createdAt: new Date(),
      isDeleted: false,
    });
    return { ...review, id: newReviewRef.id };
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
};

export const deleteReview = async (reviewId: string) => {
  try {
    const reviewsCollection = collection(db, "reviews");
    await deleteDoc(doc(reviewsCollection, reviewId));
  } catch (error) {
    console.error("Error adding book to user's wihlist", error);
    throw error;
  }
};

// TODO: Implement this properly.

export const updateReview = async (newMessage: string, reviewId: string) => {
  try {
    const reviewsCollection = collection(db, "reviews");
    await updateDoc(doc(reviewsCollection, reviewId), {
      comment: newMessage,
    });
  } catch (error) {
    console.error("Error while trying to update review", error);
    throw error;
  }
};
