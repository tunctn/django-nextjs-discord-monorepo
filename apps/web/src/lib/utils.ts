import { type ClassValue, clsx } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const relativeDate = ({
  date,
  short = false,
}: {
  date: Date;
  short?: boolean;
}) => {
  const dayjsDate = dayjs(date);
  const now = dayjs();

  // just now
  if (now.diff(dayjsDate, "seconds") < 60) {
    return "Just now";
  }

  // a minute ago
  if (now.diff(dayjsDate, "minutes") < 2) {
    return "A minute ago";
  }

  // minutes ago
  if (now.diff(dayjsDate, "minutes") < 60) {
    if (short) {
      return `${now.diff(dayjsDate, "minutes")}m`;
    }

    return `${now.diff(dayjsDate, "minutes")} minutes ago`;
  }

  // 1 hour ago
  if (now.diff(dayjsDate, "hours") < 2) {
    return "About 1 hour ago";
  }

  // hours ago
  if (now.diff(dayjsDate, "hours") < 24) {
    if (short) {
      return `${now.diff(dayjsDate, "hours")}h`;
    }

    return `${now.diff(dayjsDate, "hours")} hours ago`;
  }

  // 1 day ago
  if (now.diff(dayjsDate, "days") < 2) {
    return "About a day ago";
  }

  // days ago
  if (now.diff(dayjsDate, "days") < 7) {
    if (short) {
      return `${now.diff(dayjsDate, "days")}d`;
    }

    return `${now.diff(dayjsDate, "days")} days ago`;
  }

  // 1 week ago
  if (now.diff(dayjsDate, "weeks") < 2) {
    return "About a week ago";
  }

  // weeks ago
  if (now.diff(dayjsDate, "weeks") < 4) {
    if (short) {
      return `${now.diff(dayjsDate, "weeks")}w`;
    }

    return `${now.diff(dayjsDate, "weeks")} weeks ago`;
  }

  return dayjsDate.format("MMM D, YYYY");
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
