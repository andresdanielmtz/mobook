import { type Item } from "@/model";

/*
 * Book API Hooks
 * VITE_BOOK_API_URL: string; <- Used for fetching all books
 * VITE_BOOK_API_URL2: string; <- Used for fetching books by ID or query
 */

// Fetches all books from the Book API.

export async function getBooks(): Promise<Item[]> {
  const response = await fetch(import.meta.env.VITE_BOOK_API_URL);
  const data = await response.json(); // Parse the JSON response
  if (!response.ok) {
    throw new Error(data.error.message);
  }

  return data.items;
}

// Fetches a book by its ID from the Book API.

export async function getBooksById(id: string): Promise<Item> {
  const response = await fetch(
    `${import.meta.env.VITE_BOOK_API_URL2}/${id}?key=${import.meta.env.VITE_BOOK_KEY}`,
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error.message);
  }

  return data;
}

// Fetches books based on a search query from the Book API.

export async function getBooksByQuery(query: string): Promise<Item[]> {
  const response = await fetch(
    `${import.meta.env.VITE_BOOK_API_URL2}?q=${query}&key=${import.meta.env.VITE_BOOK_KEY}`,
  );
  console.log(
    `Used URL: ${import.meta.env.VITE_BOOK_API_URL}?q=${query}&key=${import.meta.env.VITE_BOOK_KEY}`,
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error.message);
  }

  return data.items;
}
