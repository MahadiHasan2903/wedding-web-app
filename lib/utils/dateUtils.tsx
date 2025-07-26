import {
  parse,
  format,
  isValid,
  isBefore,
  addYears,
  differenceInYears,
} from "date-fns";

export const DATE_FORMAT_1 = "yyyy-MM-dd";

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
