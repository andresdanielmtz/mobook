/**
 * Main View
 * This is the main view of the component, used to show the cards and its main information.
 * */

import { useEffect, useState } from "react";
import { getBooks } from "../api/getBooks";
import { type Item } from "@/model";
import BookCard from "../components/BookCard";

export const Home: React.FC = () => {
  const [bookData, setBookData] = useState<Item[]>([]);
  useEffect(() => {
    getBooks()
      .then((payload) => setBookData(payload))
      .then(() => {
        console.log(JSON.stringify(bookData));
      });
  }, []);

  return (
    <div
      className="flex flex-col items-center gap-4 px-2 overflow-y-auto max-h-screen
                sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6 sm:overflow-y-visible sm:max-h-none"
    >
      {bookData.map((item) => (
        <BookCard
          key={item.id}
          imageLinks={item.volumeInfo.imageLinks}
          title={item.volumeInfo.title}
        />
      ))}
    </div>
  );
};
