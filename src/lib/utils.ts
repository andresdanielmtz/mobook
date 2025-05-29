import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function to merge class names using clsx and tailwind-merge. Used mostly for ShadCN UI compatibility.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
