import { useState } from "react";
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
  subDays,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
  eachDayOfInterval,
} from "date-fns";

function useDateRange(mode: "daily" | "weekly" | "monthly") {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDateRange = (date: Date) => {
    let startDate;
    let endDate;

    switch (mode) {
      case "daily":
        startDate = startOfDay(date);
        endDate = endOfDay(date);
        break;
      case "weekly":
        startDate = startOfWeek(date);
        endDate = endOfWeek(date);
        break;
      case "monthly":
        startDate = startOfMonth(date);
        endDate = endOfMonth(date);
        break;
      default:
        throw new Error("Invalid mode");
    }

    return { startDate, endDate };
  };

  const { startDate, endDate } = getDateRange(currentDate);

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const next = () => {
    setCurrentDate((prevDate) => {
      switch (mode) {
        case "daily":
          return addDays(prevDate, 1);
        case "weekly":
          return addWeeks(prevDate, 1);
        case "monthly":
          return addMonths(prevDate, 1);
        default:
          return prevDate;
      }
    });
  };

  const prev = () => {
    setCurrentDate((prevDate) => {
      switch (mode) {
        case "daily":
          return subDays(prevDate, 1);
        case "weekly":
          return subWeeks(prevDate, 1);
        case "monthly":
          return subMonths(prevDate, 1);
        default:
          return prevDate;
      }
    });
  };

  return { startDate, endDate, days, next, prev };
}

export default useDateRange;
