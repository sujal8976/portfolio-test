import { cn } from "@/lib/utils";

export const DateDisplay = ({
  date,
  showCounter = false,
  showEndDate = true,
  className,
}: {
  date: { from: Date; to: Date | null } | Date;
  showCounter?: boolean;
  className?: string;
  showEndDate?: boolean;
}) => {
  const formatDate = (d: Date): string => {
    return d
      .toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
      .toUpperCase();
  };

  const formatDateWithoutDay = (d: Date): string => {
    return d
      .toLocaleDateString("en-US", { month: "short", year: "numeric" })
      .toUpperCase();
  };

  const calculateDuration = (from: Date, to: Date | null): string => {
    const endDate = to || new Date();
    const startDate = new Date(from);

    // Calculate the difference in months
    let months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    months += endDate.getMonth() - startDate.getMonth();

    // Adjust for day of month
    if (endDate.getDate() < startDate.getDate()) {
      months--;
    }

    // Calculate years and remaining months
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    // Build the duration string
    const duration = [];
    if (years > 0) duration.push(`${years} year${years !== 1 ? "s" : ""}`);
    if (remainingMonths > 0)
      duration.push(
        `${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`
      );

    return duration.join(" ");
  };

  if (date instanceof Date) {
    return (
      <p className="date">
        <span>{formatDate(date)}</span>
      </p>
    );
  }

  const { from, to } = date;
  const fromStr = formatDateWithoutDay(from);
  const toStr = to ? formatDateWithoutDay(to) : "PRESENT";
  const duration = calculateDuration(from, to);

  return (
    <p className={cn("group date text-xs sm:text-sm", className)}>
      <span>{fromStr}</span>
      {showEndDate && (
        <>
          <span>-</span>
          <span>{toStr}</span>
        </>
      )}
      {showCounter && duration && (
        <span className="text-muted">({duration})</span>
      )}
    </p>
  );
};
