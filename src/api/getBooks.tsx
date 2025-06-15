/*
 * Book API Hooks
 */

import { type Book } from "@/model";

export async function getBooks(): Promise<Book[]> {
  const response = await fetch(import.meta.env.VITE_BOOK_API_URL);
  const data = await response.json(); // Parse the JSON response
  if (!response.ok) {
    throw new Error(data.error.message);
  }

  return data.items;
}

export async function getBooksById(id: string): Promise<Book> {
  const response = await fetch(
    `${import.meta.env.VITE_BOOK_API_URL2}/${id}?key=${import.meta.env.VITE_BOOK_KEY}`,
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error.message);
  }

  return data;
}

export async function getBooksByQuery(query: string): Promise<Book[]> {
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
