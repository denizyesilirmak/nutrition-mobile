import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  getDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";

function getWeeksOfMonth({ year, month }: { year: number; month: number }) {
  const start = startOfWeek(startOfMonth(new Date(year, month - 1)), {
    weekStartsOn: 1,
  });
  const end = endOfWeek(endOfMonth(new Date(year, month - 1)), {
    weekStartsOn: 1,
  });

  const allDays = eachDayOfInterval({ start, end });
  const weeks = [];
  let currentWeek = [] as Date[];

  allDays.forEach((day) => {
    currentWeek.push(day);
    if (getDay(day) === 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  return weeks;
}

export { getWeeksOfMonth };
