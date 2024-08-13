import {
  add,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachWeekOfInterval,
  subDays,
} from "date-fns";

type Mode = "daily" | "weekly" | "monthly";

type DateObj = {
  start: Date;
  end: Date;
};

class DateNavigator {
  private mode: Mode;

  private days: DateObj[] = eachDayOfInterval({
    start: subDays(new Date(), 100),
    end: new Date(),
  }).map((day) => ({
    start: day,
    end: add(day, { days: 1 }),
  }));
  private weeks: DateObj[] = eachWeekOfInterval(
    {
      start: subDays(new Date(), 365),
      end: new Date(),
    },
    {
      weekStartsOn: 1,
    },
  ).map((week) => ({
    start: week,
    end: subDays(add(week, { weeks: 1 }), 1),
  }));
  private months: DateObj[] = eachMonthOfInterval({
    start: subDays(new Date(), 365),
    end: new Date(),
  }).map((month) => ({
    start: month,
    end: add(month, { months: 1 }),
  }));

  private ranges = {
    daily: this.days.reverse(),
    weekly: this.weeks.reverse(),
    monthly: this.months.reverse(),
  };

  private currentRangeIndex = 0;

  constructor(mode: Mode) {
    this.mode = mode;
  }

  prev = () => {
    if (this.currentRangeIndex < this.ranges[this.mode].length - 1) {
      this.currentRangeIndex++;
    }

    return this.getRange(); // return the current range
  };

  next = () => {
    if (this.currentRangeIndex > 0) {
      this.currentRangeIndex--;
    }

    return this.getRange(); // return the current range
  };

  getRange = () => {
    return {
      start: this.ranges[this.mode][this.currentRangeIndex].start,
      end: this.ranges[this.mode][this.currentRangeIndex].end,
    };
  };

  changeMode = (mode: Mode) => {
    this.mode = mode;
    this.currentRangeIndex = 0;
    return this.getRange();
  };
}

const dateNavigatorInstance = new DateNavigator("daily");

export { dateNavigatorInstance as dateNavigator };
