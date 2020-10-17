import dayjs from "dayjs";

const isYearOnly = /^[0-9]+$/;

export function formatTimelineDate(dateStr: string) {
  if (isYearOnly.test(dateStr)) {
    return dateStr;
  } else {
    return dayjs.utc(dateStr).format("YYYY-MMM-D");
  }
}
