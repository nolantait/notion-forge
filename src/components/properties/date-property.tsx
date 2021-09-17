import React from "react";
import { format } from "date-fns";

import { Presenter, PropertyProps } from "@types";
import { useNotionContext } from "@context";

interface DatePropertyProps extends Required<Pick<PropertyProps, "block">> {
  value: number;
}

export const DateProperty: Presenter<DatePropertyProps> = ({
  block,
  value,
}) => {
  const { components } = useNotionContext();
  const formattedDate = format(new Date(value), "MMM d, YYY hh:mm aa");

  return <components.text value={[[formattedDate]]} block={block} />;
};
