export type DateRange = {
  option: string;
  value: string;
};

export const dateRanges: DateRange[] = [
  {
    option: "daily",
    value: "Today",
  },
  {
    option: "weekly",
    value: "This week",
  },
  {
    option: "monthly",
    value: "This month",
  },
];
