// This component receives a list of books from the user's wishlist and displays them in a grid format.

import type { Item } from "@/model";
import BookCard from "./BookCard/BookCard";

export default function BookShelf({
  books,
  title,
}: {
  books: Item[];
  title: string;
}) {
  if (books.length === 0) {
    return (
      <div className="max-w-md mx-auto mt-10">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-left">
          <h2 className="text-xl font-bold mb-4">{title}</h2>
          <p className="text-gray-600">No books found in this shelf.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-left">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="grid grid-cols-3 gap-4">
          {books
            .sort((a, b) =>
              a.volumeInfo.title.localeCompare(b.volumeInfo.title),
            )
            .map((book) => (
              <BookCard
                key={book.id}
                imageLinks={book.volumeInfo.imageLinks}
                title={book.volumeInfo.title}
                id={book.id}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
