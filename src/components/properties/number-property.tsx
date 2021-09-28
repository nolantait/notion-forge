import React from "react";
import formatNumber from "format-number";

import { Components, Formats } from "@types";
import { useNotionContext } from "@context";
import { Props as PropertyProps } from "../property";
import { Decorated } from "@entities";

export type Props = Required<Pick<PropertyProps, "data" | "block">> & {
  schema: {
    number_format?: Formats.NumberFormat;
  };
};

export const Property: Components.Presenter<Props> = ({
  data,
  block,
  schema,
}) => {
  const { components } = useNotionContext();
  const dataText = data.isEmpty ? "0" : data.asString;
  const parsableNumberFormat = /^[a-fA-F0-9]+$/;
  if (!parsableNumberFormat.test(dataText)) {
    throw new Error(
      `Could not parse number property ${dataText} for ${block.id}`
    );
  }

  const value = parseFloat(dataText);

  if (isNaN(value)) {
    return <components.text value={data} block={block} />;
  } else {
    const formattedValue = formattedNumber(
      schema.number_format ?? "number_with_commas",
      value
    );
    const decoratedValue = new Decorated(formattedValue);

    return <components.text value={decoratedValue} block={block} />;
  }
};

const formattedNumber = (
  format: Formats.NumberFormat,
  value: number
): string => {
  switch (format) {
    case "number_with_commas":
      return formatNumber()(value);
    case "percent":
      return formatNumber({ suffix: "%" })(value * 100);
    case "dollar":
      return formatNumber({ prefix: "$", round: 2, padRight: 2 })(value);
    case "euro":
      return formatNumber({ prefix: "€", round: 2, padRight: 2 })(value);
    case "pound":
      return formatNumber({ prefix: "£", round: 2, padRight: 2 })(value);
    case "yen":
      return formatNumber({ prefix: "¥", round: 0 })(value);
    case "rupee":
      return formatNumber({ prefix: "₹", round: 2, padRight: 2 })(value);
    case "won":
      return formatNumber({ prefix: "₩", round: 0 })(value);
    case "yuan":
      return formatNumber({ prefix: "CN¥", round: 2, padRight: 2 })(value);
    default:
      throw new Error(
        `No number formatting available for ${format} with value ${value}`
      );
  }
};
