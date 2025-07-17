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
 * Converts an enum object with string values into an array of option objects,
 * suitable for use in select inputs or radio groups.
 * For example: "non_binary" becomes "Non Binary".
 *
 * @param enumObj - An object representing the enum, with string values.
 *                  Typically this will be a TypeScript enum or a similar object.
 * @returns An array of objects, each with: label and value
 */
export function enumToOptions(enumObj: Record<string, string>) {
  return Object.values(enumObj).map((value) => ({
    label: value
      .split("_") // split on underscores
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "), // join with space
    value,
  }));
}
