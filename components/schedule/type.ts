export const RECURRING_TYPE = {
  NONE: "none",
  EVERY_DAY: "every-day",
  EVERY_WEEK: "every-week",
  EVERY_TWO_WEEK: "every-two-week",
  EVERY_MONTH: "every-month",
  EVERY_YEAR: "every-year",
} as const;
export type RecurringType =
  (typeof RECURRING_TYPE)[keyof typeof RECURRING_TYPE];
