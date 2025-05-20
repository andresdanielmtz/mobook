/**
 * Main View
 * This is the main view of the component, used to show the cards and its main information.
 * */

import { useEffect, useState } from "react";
import { getBooks } from "../api/getBooks";
import { type Item } from "@/model";
import BookCard from "../components/BookCard/BookCard.tsx";
import { LoadingSpinner } from "@/components/ui/loading.tsx";

export const Home: React.FC = () => {
  const [bookData, setBookData] = useState<Item[]>([]);
  useEffect(() => {
    getBooks()
      .then((payload) => setBookData(payload))
      .then(() => {
        console.log(JSON.stringify(bookData));
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
      {bookData.map((item) => (
        <BookCard
          key={item.id}
          imageLinks={item.volumeInfo.imageLinks}
          title={item.volumeInfo.title}
          id={item.id}
        />
      ))}
    </div>
  );
};
