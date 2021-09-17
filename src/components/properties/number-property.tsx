import React from "react";
import formatNumber from "format-number";

import { Notion, PropertyProps, NumberPropertySchema } from "@types";
import { useNotionContext } from "@context";
import { decorate } from "@utils";

interface NumberPropertyProps
  extends Required<Pick<PropertyProps, "data" | "block">> {
  schema: NumberPropertySchema;
}

export const NumberProperty = ({
  data,
  block,
  schema,
}: NumberPropertyProps): React.ReactElement => {
  const { components } = useNotionContext();
  const dataText = data[0][0] ?? "0";
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
    const formattedValue = formattedNumber(schema.number_format, value);
    const decoratedValue = decorate(formattedValue);

    return <components.text value={decoratedValue} block={block} />;
  }
};

const formattedNumber = (
  format: Notion.NumberFormat,
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
