import React from "react";
import { DateFormat } from "notion-types";
import { formatDate } from "../../utils";

export const FormatDate = (decorator: DateFormat): React.ReactNode => {
  const v = decorator[1];
  const type = v?.type;

  if (type === "date") {
    // Example: Jul 31, 2010
    const startDate = v.start_date;

    return formatDate(startDate);
  } else if (type === "daterange" && v?.end_date) {
    // Example: Jul 31, 2010 → Jul 31, 2020
    const startDate = v.start_date;
    const endDate = v.end_date;

    return `${formatDate(startDate)} → ${formatDate(endDate)}`;
  } else {
    return v;
  }
};
