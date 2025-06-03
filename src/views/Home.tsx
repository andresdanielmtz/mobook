/**
 * Main View
 * This is the main view of the component, used to show the cards and its main information.
 * */

import { useEffect, useState } from "react";
import { getBooks } from "../api/getBooks";
import { type Item } from "@/model";
import BookCard from "../components/BookCard/BookCard.tsx";
import { LoadingSpinner } from "@/components/ui/loading.tsx";

export const HomeView: React.FC = () => {
  const [bookData, setBookData] = useState<Item[]>([]);
  useEffect(() => {
    getBooks()
      .then((payload) => {
        setBookData(payload);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setBookData([]);
      });
  }, []);

  // Loading state.
  if (bookData.length == 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {bookData.map((book) => (
        <BookCard
          key={book.id}
          imageLinks={book.volumeInfo.imageLinks}
          title={book.volumeInfo.title}
          id={book.id}
        />
      ))}
    </div>
  );
};
