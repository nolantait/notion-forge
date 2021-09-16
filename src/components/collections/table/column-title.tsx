import React from "react";

import { CollectionColumnTitleProps } from "@types";
import { PropertyIcon } from "@icons";

export const CollectionColumnTitle = ({
  schema,
}: CollectionColumnTitleProps) => {
  return (
    <div className="notion-collection-column-title">
      <PropertyIcon
        className="notion-collection-column-title-icon"
        type={schema.type}
      />

      <div className="notion-collection-column-title-body">{schema.name}</div>
    </div>
  );
};
