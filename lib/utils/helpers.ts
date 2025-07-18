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
