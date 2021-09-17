import React from "react";

import { Presenter, PropertyProps } from "@types";
import { cs } from "@utils";

interface SelectTagPropertyProps
  extends Pick<PropertyProps, "data" | "schema"> {}

export const SelectTagProperty: Presenter<SelectTagPropertyProps> = ({
  data,
  schema,
}) => {
  const decorationText = data?.[0][0] ?? "";
  const values = decorationText.split(",");
  const options = schema.options ?? [];

  const tags = values.map((value, index) => {
    const option = options.find((option) => value === option.value);
    const color = option?.color ?? "gray";
    const tagStyle = cs(
      `notion-property-${schema.type}-item`,
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
