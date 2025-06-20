/**
 * Search View
 * This is the main view of the Search component, it will just show the searchbar alongside more card components.
 * */

import { getBooksByQuery } from "@/api/getBooks";
import BookCard from "@/components/BookCard/BookCard";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading";
import type { Book } from "@/model";
import { useEffect, useState } from "react";

export const SearchView = () => {
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(timerId); // Cleanup timer on unmount or if searchQuery changes
    };
  }, [searchQuery]);

  useEffect(() => {
    setLoading(true);
    if (debouncedSearchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    getBooksByQuery(debouncedSearchQuery)
      .then((payload) => {
        setSearchResults(payload);
        console.log("Fetched data for:", debouncedSearchQuery, payload);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setSearchResults([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [debouncedSearchQuery]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book Search</h1>
      <Input
        type="search"
        placeholder="Search for books..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="mb-4"
      />
      {loading ||
        (searchResults.length === 0 && (
          <div className="flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ))}
      {searchResults.length > 0 && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {searchResults.map((book) => (
              <BookCard
                key={book.id}
                imageLinks={book.volumeInfo.imageLinks}
                title={book.volumeInfo.title}
                id={book.id}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
