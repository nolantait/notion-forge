import React from "react";

import { Notion } from "@types";

interface DecoratedDateProps {
  decoration: [string, Notion.FormattedDate];
}

export const DecoratedDate = ({
  decoration,
}: DecoratedDateProps): React.ReactElement => {
  const dateDetails = decoration[1];
  const [startDate, endDate, formattedDate] = getDateStrings(dateDetails);

  if (!endDate) {
    return <time dateTime={startDate}>{formattedDate}</time>;
  }

  return <time dateTime={`${startDate}/${endDate}`}>{formattedDate}</time>;
};

const getDateStrings = (
  dateDetails: Notion.FormattedDate
): [string, string | undefined, string] => {
  const startDate = dateDetails.start_date;
  const endDate = dateDetails.end_date;

  switch (dateDetails.type) {
    case "date": {
      // Example: Jul 31, 2010
      return [startDate, endDate, formatDate(startDate)];
    }
    case "daterange": {
      // Example: Jul 31, 2010 → Jul 31, 2020
      if (!endDate) return [startDate, endDate, formatDate(startDate)];

      return [
        startDate,
        endDate,
        `${formatDate(startDate)} → ${formatDate(endDate)}`,
      ];
    }
    default: {
      throw new Error(`Invalid date for decoration type ${dateDetails.type}`);
    }
  }
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const formatDate = (input: string) => {
  const date = new Date(input);
  const month = date.getMonth();
  return `${months[month]} ${date.getDate()}, ${date.getFullYear()}`;
};
