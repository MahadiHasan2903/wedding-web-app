import {
  parse,
  format,
  isValid,
  isBefore,
  addYears,
  parseISO,
  differenceInYears,
  formatDistanceToNowStrict,
} from "date-fns";

export const DATE_FORMAT_1 = "yyyy-MM-dd";
export const DATE_FORMAT_2 = "MMMM d, yyyy 'at' hh:mm a";
export const DATE_FORMAT_3 = "dd MMM yyyy HH:mm";

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
 * Returns the user's local UTC offset in the format "UTC±HH:MM".
 * Uses the system time and timezone to determine the current offset.
 *
 * @returns The UTC offset string (e.g., "UTC+06:00", "UTC-04:00").
 */
export const getUserUtcOffset = (): string => {
  const now = new Date();
  const offset = format(now, "xxx");
  return `UTC${offset}`;
};

/**
 *
 * @param date
 * @returns
 */
export const formatRelativeTime = (
  date: string | number | Date
): string | null => {
  if (!date) {
    return null;
  }

  return formatDistanceToNowStrict(new Date(date), { addSuffix: true });
};

/**
 * Parses a date string from a given input format and returns it in the specified output format.
 * Returns an empty string if the input is invalid or empty.
 *
 * @param dateStr - The input date string, can be null or undefined.
 * @param inputFormat - The format of the input date string (default: "MMM dd, yyyy").
 * @param outputFormat - Desired output format (default: DATE_FORMAT_1).
 * @returns The formatted date string or empty string if invalid.
 */
export function formatDateString1(
  dateStr?: string | null,
  inputFormat: string = "MMM dd, yyyy",
  outputFormat: string = "yyyy-MM-dd"
): string {
  if (!dateStr) {
    return "";
  }

  const parsedDate = parse(dateStr, inputFormat, new Date());

  if (!isValid(parsedDate)) {
    return "";
  }

  return format(parsedDate, outputFormat);
}

/**
 * Formats an ISO date string into a human-readable format (e.g., "July 21, 2025 at 03:30 AM").
 * Returns null if the input is null or undefined.
 *
 * @param isoString - ISO date string (e.g., "2025-07-21T03:30:14.034Z")
 * @returns A formatted date string or null.
 */
export const formatDateString2 = (isoString?: string | null): string | null => {
  if (!isoString) {
    return null;
  }

  const date = parseISO(isoString);
  return format(date, DATE_FORMAT_2);
};

/**
 * Formats an ISO date string into the format "dd MMM yyyy HH:mm".
 * Example: "2025-07-31T04:23:40.651Z" → "31 Jul 2025 04:23"
 * Returns null if the input is null or undefined.
 *
 * @param isoString - ISO date string
 * @returns A formatted string or null if input is invalid.
 */
export const formatDateString3 = (isoString?: string | null): string | null => {
  if (!isoString) {
    return null;
  }

  const date = parseISO(isoString);
  return format(date, DATE_FORMAT_3);
};
