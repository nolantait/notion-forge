import React from "react";

import { View, Api } from "@types";

export type Props = {
  decoration: [string, Api.Formats.FormattedDate];
};

export const DateDecorator: View.Component<Props> = ({ decoration }) => {
  const dateDetails = decoration[1];
  const [startDate, endDate, formattedDate] = getDateStrings(dateDetails);

  if (!endDate) {
    return <time dateTime={startDate}>{formattedDate}</time>;
  }

  return <time dateTime={`${startDate}/${endDate}`}>{formattedDate}</time>;
};

const getDateStrings = (
  dateDetails: Api.Formats.FormattedDate
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
