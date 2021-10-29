import React from "react";

import { View, Domain } from "@types";
import { PropertyIcon } from "@icons";

export type Props = {
  definition: Domain.AnyDefinition;
};

export const ColumnTitle: View.Component<Props> = ({ definition }) => {
  return (
    <div className="notion-collection-column-title">
      <PropertyIcon
        className="notion-collection-column-title-icon"
        type={definition.type}
      />

      <div className="notion-collection-column-title-body">
        {definition.name}
      </div>
    </div>
  );
};
