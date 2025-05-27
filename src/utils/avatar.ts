// Returns the initials of a given displayName. It is supposed to have at least one valid word for it to work.

export default function getInitials(displayName: string | null) {
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
