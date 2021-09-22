import React from "react";
import { format } from "date-fns";

import { Components } from "@types";
import { Props as PropertyProps } from "../property";
import { useNotionContext } from "@context";
import { Decorated } from "@entities";

export type Props = Required<Pick<PropertyProps, "block">> & {
  value: number;
};

export const Property: Components.Presenter<Props> = ({ block, value }) => {
  const { components } = useNotionContext();
  const formattedDate = format(new Date(value), "MMM d, YYY hh:mm aa");
  const decoratedDate = new Decorated(formattedDate);

  return <components.text value={decoratedDate} block={block} />;
};
