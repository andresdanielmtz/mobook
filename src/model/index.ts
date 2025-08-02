import type { IBook } from "./Books.ts";

export interface IContent {
  kind: string;
  totalItems: number;
  items: IBook[];
}
