import { format } from "date-fns";

const formatDate = ({
  startDate,
  endDate,
  mode,
}: {
  startDate: Date;
  endDate: Date;
  mode: "daily" | "weekly" | "monthly";
}) => {
  switch (mode) {
    case "daily":
      return `${format(startDate, "dd MMM yyyy")}`;
    case "weekly":
      return `${format(startDate, "dd MMM yyyy")} - ${format(
        endDate,
        "dd MMM yyyy",
      )}`;
    case "monthly":
      return `${format(startDate, "MMM yyyy")}`;
  }
};

export default formatDate;
