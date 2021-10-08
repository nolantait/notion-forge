import React from "react";

import { Domain, View } from "@types";
import { cs } from "@utils";
import { Property } from "@entities";

export type Props = {
  property: Property<Domain.Definitions.Select>;
};

export const PropertyComponent: View.Component<Props> = ({ property }) => {
  const { value, options } = property.value;

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
