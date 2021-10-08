import React from "react";

import { Domain, View } from "@types";
import { useNotionContext } from "@context";
import { Decorated } from "@entities";

export type Props = {
  block: Domain.Blocks.Page.Entity | Domain.Blocks.CollectionViewPage.Entity;
  value: Decorated;
};

export const Component: View.Component<Props> = ({ value, block }) => {
  const { components } = useNotionContext();

  return (
    <h1 className="notion-title">
      <components.text value={value} block={block} />
    </h1>
  );
};
