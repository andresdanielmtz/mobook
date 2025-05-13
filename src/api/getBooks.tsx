/*
* Get Books
* */

import { type Item } from "../model";

export async function getBooks(): Promise<Item[]> {
    const response = await fetch(import.meta.env.VITE_BOOK_API_URL);
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error.message);
    }

    return data.items;
}