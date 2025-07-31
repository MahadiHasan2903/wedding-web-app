import {
  parse,
  format,
  isValid,
  isBefore,
  addYears,
  parseISO,
  differenceInYears,
} from "date-fns";

export const DATE_FORMAT_1 = "yyyy-MM-dd";
export const DATE_FORMAT_2 = "MMMM d, yyyy 'at' hh:mm a";

/**
 * Calculates the age in years from a given date of birth.
 * If the person is part-way through a new year (e.g., 25.1 years),
 * the result is rounded up to the next full year (e.g., 26).
 *
 * @param dob - The user's date of birth, as a string or Date object.
 * @returns The user's age in full years, rounded up if partially into the next year.
 */
export const calculateAgeFromDOB = (dob: string | Date): number => {
  const birthDate = new Date(dob);
  const age = differenceInYears(new Date(), birthDate);
  const nextBirthday = addYears(birthDate, age);
  return isBefore(new Date(), nextBirthday) ? age + 1 : age;
};

/**
 * Parses a date string from a given input format and returns it in the specified output format.
 * Returns empty string if input is invalid or empty.
 *
 * @param dateStr - The input date string, can be null or undefined.
 * @param inputFormat - The format of the input date string (default: "MMM dd, yyyy").
 * @param outputFormat - Desired output format (default: "yyyy-MM-dd").
 * @returns The formatted date string or empty string.
 */
export function formatDateString1(
  dateStr?: string | null,
  inputFormat: string = "MMM dd, yyyy",
  outputFormat: string = "yyyy-MM-dd"
): string {
  if (!dateStr) return "";

  const parsedDate = parse(dateStr, inputFormat, new Date());

  if (!isValid(parsedDate)) {
    return "";
  }

  return format(parsedDate, outputFormat);
}

/**
 * Formats an ISO date string into a human-readable format.
 * If the input is null or undefined, returns null.
 *
 * @param isoString - ISO date string (e.g. "2025-07-21T03:30:14.034Z")
 * @returns A formatted date string (e.g. "July 21, 2025 at 03:30 AM") or null
 */
export const formatDateString2 = (isoString?: string | null): string | null => {
  if (!isoString) {
    return null;
  }

  const date = parseISO(isoString);
  return format(date, DATE_FORMAT_2);
};

/**
 * Returns the user's local UTC offset in the format "UTC±HH:MM".
 * Uses the system time and timezone to determine the current offset.
 * @returns {string} The UTC offset string (e.g., "UTC+06:00", "UTC-04:00").
 */
export const getUserUtcOffset = (): string => {
  const now = new Date();
  const offset = format(now, "xxx");
  return `UTC${offset}`;
};
