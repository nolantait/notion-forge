import React from "react";

import { Components } from "@types";
import { useNotionContext } from "@context";
import { PageBlock, CollectionViewPageBlock, Decorated } from "@entities";

export type Props = {
  block: PageBlock | CollectionViewPageBlock;
  value: Decorated;
};

export const Component: Components.Presenter<Props> = ({ value, block }) => {
  const { components } = useNotionContext();

  return (
    <h1 className="notion-title">
      <components.text value={value} block={block} />
    </h1>
  );
};
