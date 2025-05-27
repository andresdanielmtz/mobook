import type { StoreUser } from "@/model/User";

// This function returns an initial depending on whether you have first and last name OR if you have the display name. :)

export default function getInitialsAdapter(user: StoreUser): string {
  if (user.firstName && user.lastName) {
    const initials = getInitials(`${user.firstName} ${user.lastName}`);
    if (!initials) return "";
    return initials;
  } else if (user.displayName) {
    const initials = getInitials(user.displayName);
    if (!initials) return "";
    return initials;
  }

  return "";
}

// Returns the initials of a given displayName. It is supposed to have at least one valid word for it to work.

export function getInitials(displayName: string | null) {
  if (!displayName) return "AM";
  const trimmedName = displayName.trim();
  if (!trimmedName) {
    throw new Error("Display name cannot be empty");
  }

  const words = trimmedName.split(/\s+/);
  if (words.length === 0 || !words[0]) {
    throw new Error("Display name must contain at least one valid word");
  }

  const initials = words
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase());
  return initials.join("");
}
