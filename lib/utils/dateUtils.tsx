import { differenceInYears, addYears, isBefore } from "date-fns";

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
