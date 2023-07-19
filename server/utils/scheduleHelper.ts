import { Frequency, RRule } from "rrule";
import { RecurringType } from "components/schedule/type";

interface Params {
  recurring: RecurringType;
  recurringEndTime?: string;
  startTime: string;
}

export const parseRecurringSchedule = ({
  recurring,
  recurringEndTime,
  startTime,
}: Params) => {
  if (recurring === "none") {
    return [new Date(startTime)];
  }

  if (!recurringEndTime) {
    return [];
  }

  const rrule = new RRule({
    freq: recurringTypeToFreqMap[recurring],
    dtstart: new Date(startTime),
    tzid: "Asia/Seoul",
    until: new Date(recurringEndTime),
    count: 99999999,
    interval: recurring === "every-two-week" ? 2 : 1,
  });

  return rrule.all();
};

const recurringTypeToFreqMap: Record<RecurringType, Frequency | undefined> = {
  "every-day": RRule.DAILY,
  "every-month": RRule.MONTHLY,
  "every-two-week": RRule.WEEKLY,
  "every-week": RRule.WEEKLY,
  "every-year": RRule.YEARLY,
  none: undefined,
};
