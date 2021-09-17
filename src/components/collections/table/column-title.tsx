import React from "react";

import { CollectionColumnTitlePresenter } from "@types";
import { PropertyIcon } from "@icons";

export const CollectionColumnTitle: CollectionColumnTitlePresenter = ({
  schema,
}) => {
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
