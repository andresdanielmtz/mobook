/*
 * Book API Hooks
 */

import { type Item } from "@/model";

export async function getBooks(): Promise<Item[]> {
  const response = await fetch(import.meta.env.VITE_BOOK_API_URL);
  const data = await response.json(); // Parse the JSON response
  if (!response.ok) {
    throw new Error(data.error.message);
  }

  return data.items;
}

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
