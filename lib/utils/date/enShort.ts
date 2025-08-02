import { enUS } from "date-fns/locale";

type FormatDistanceToken =
  | "lessThanXSeconds"
  | "xSeconds"
  | "halfAMinute"
  | "lessThanXMinutes"
  | "xMinutes"
  | "aboutXHours"
  | "xHours"
  | "xDays"
  | "aboutXWeeks"
  | "xWeeks"
  | "aboutXMonths"
  | "xMonths"
  | "aboutXYears"
  | "xYears"
  | "overXYears"
  | "almostXYears";

const shortUnits: Record<FormatDistanceToken, string> = {
  lessThanXSeconds: "s",
  xSeconds: "s",
  halfAMinute: "s",
  lessThanXMinutes: "min",
  xMinutes: "min",
  aboutXHours: "h",
  xHours: "h",
  xDays: "d",
  aboutXWeeks: "w",
  xWeeks: "w",
  aboutXMonths: "mo",
  xMonths: "mo",
  aboutXYears: "y",
  xYears: "y",
  overXYears: "y",
  almostXYears: "y",
};

export const enShort = {
  ...enUS,
  formatDistance: (token: FormatDistanceToken, count: number): string => {
    return `${count}${shortUnits[token]}`;
  },
};
