import React from "react";

import { Components } from "@types";
import { cs } from "@utils";
import { Props as PropertyProps } from "../property";

export type Props = Pick<PropertyProps, "data" | "schema">;

export const Property: Components.Presenter<Props> = ({ data, schema }) => {
  const values = data.asString.split(",");
  const options = schema?.options ?? [];

  const tags = values.map((value, index) => {
    const option = options.find((option) => value === option.value);
    const color = option?.color ?? "gray";
    const tagStyle = cs(
      `notion-property-${schema?.type}-item`,
      color && `notion-item-${color}`
    );

    return (
      <div key={index} className={tagStyle}>
        {value}
      </div>
    );
  });

  return <>{tags}</>;
};
