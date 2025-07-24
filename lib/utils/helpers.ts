/**
 * Truncate a string to a specified maximum length and add ellipsis if needed.
 * @param {string} value - The string to truncate.
 * @param {number} maxLength - The maximum length allowed.
 * @returns {string} - The truncated string with ellipsis (if truncated).
 */
export const truncateString = (value: string, maxLength: number): string => {
  if (typeof value !== "string") {
    return ""; // Return an empty string if the value is not a string
  }
  return value.length > maxLength
    ? `${value.substring(0, maxLength)}...`
    : value;
};

/**
 * Convert an enum object to an array of options with human-readable labels.
 * Useful for rendering enums in dropdowns or radio groups.
 *
 * @param enumObj - An object representing the enum (typically from TypeScript `enum`)
 * @returns An array of objects with `label` and `value` keys
 */
export function enumToOptions(enumObj: Record<string, string>) {
  return Object.values(enumObj).map((value) => ({
    label: value
      .split("_") // split on underscores
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize each word
      .join(" "), // join words with spaces
    value,
  }));
}

/**
 * Convert a numeric range object to a string in "start-end" format.
 * If both start and end are 0, returns an empty string.
 *
 * @param range - An object containing `start` and `end` numeric values
 * @returns A formatted string representing the range, or an empty string if default
 */
export const rangeToString = (range: { start: number; end: number }) => {
  const { start, end } = range;
  return start !== 0 || end !== 0 ? `${start}-${end}` : "";
};

/**
 * Safely retrieve a query parameter from a searchParams object.
 * Trims whitespace and ensures the return value is always a string.
 * If the parameter is not a valid string, returns the provided fallback value (converted to string),
 * or an empty string if no fallback is specified.
 *
 * @param searchParams - An object representing URL query parameters.
 * @param key - The key to extract from searchParams.
 * @param fallback - Optional fallback value (string, number, or boolean) to return if the key is missing or invalid.
 * @returns The query value as a trimmed string, or the fallback value as a string.
 */

export const getQueryParam = (
  searchParams: { [key: string]: string | string[] | undefined },
  key: string,
  fallback: string | number | boolean = ""
): string => {
  const value = searchParams[key];
  if (typeof value === "string") {
    return value.trim();
  }

  return String(fallback);
};

/**
 * Generates pagination buttons with ellipses, always showing current page.
 *
 * @param currentPage - Current active page
 * @param totalPages - Total number of pages
 * @param maxButtons - Maximum buttons visible (not strictly enforced here)
 * @returns Array of page numbers and ellipsis strings
 */
export const getPaginationPages = (
  currentPage: number,
  totalPages: number,
  maxButtons = 7
): (number | string)[] => {
  const pages: (number | string)[] = [];

  if (totalPages <= maxButtons) {
    // Show all pages if few pages
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(currentPage - 1, 2);
  const rightSibling = Math.min(currentPage + 1, totalPages - 1);

  // Always show first page
  pages.push(1);

  // Left ellipsis if gap between first page and left sibling
  if (leftSibling > 2) {
    pages.push("left-ellipsis");
  } else {
    // No gap, show all pages from 2 to leftSibling - 1
    for (let i = 2; i < leftSibling; i++) {
      pages.push(i);
    }
  }

  // Pages around current page
  for (let i = leftSibling; i <= rightSibling; i++) {
    pages.push(i);
  }

  // Right ellipsis if gap between right sibling and last page
  if (rightSibling < totalPages - 1) {
    pages.push("right-ellipsis");
  } else {
    // No gap, show pages from rightSibling + 1 to totalPages - 1
    for (let i = rightSibling + 1; i < totalPages; i++) {
      pages.push(i);
    }
  }

  // Always show last page
  pages.push(totalPages);

  return pages;
};

/**
 * Converts a snake_case string into a more readable format.
 * Capitalizes the first word and lowercases the rest.
 * @param input - The snake_case string to format.
 * @returns The formatted string.
 */
/**
 * Converts a snake_case string into a readable format.
 * @param input - The snake_case string to format.
 * @returns The formatted string or "N/A".
 */
export const formatLabel = (input: string | null | undefined): string => {
  if (!input || typeof input !== "string" || input.trim() === "") {
    return "N/A";
  }

  return input
    .split("_")
    .map((word, index) =>
      index === 0
        ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        : word.toLowerCase()
    )
    .join(" ");
};
