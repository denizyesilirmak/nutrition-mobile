type DatePickerSliderProps = {
  daysAgo?: number;
  onDateChange?: (date: Date) => void;
};

type DateItemProps = {
  currentDate: Date;
  index: number;
  datesLength: number;
  onPress?: () => void;
};

export type { DateItemProps, DatePickerSliderProps };
