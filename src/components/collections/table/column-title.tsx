import React from "react";

import { Components } from "@types";
import { PropertyIcon } from "@icons";

export type Props = {
  schema: {
    type: string;
    name: string;
  };
};

export const Component: Components.Presenter<Props> = ({ schema }) => {
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
