type DatePickerSliderProps = {
  daysAgo?: number;
  onDateChange?: (date: Date) => void;
};

type DateItemProps = {
  currentDate: Date;
  index: number;
  datesLength: number;
  onPress?: () => void;
  selected?: boolean;
};

export type { DatePickerSliderProps, DateItemProps };
