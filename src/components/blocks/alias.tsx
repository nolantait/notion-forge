import React from "react";

import { BlockRenderer } from "../../renderer";
import { Components } from "@types";
import { AliasBlock } from "@entities";

export type Props = {
  block: AliasBlock;
  level: number;
};

export const Component: Components.Presenter<Props> = ({ block, level }) => {
  const referencePointerId = block.aliasPointer.getOrElse({ id: undefined }).id;

  return (
    <BlockRenderer
      key={referencePointerId}
      level={level}
      blockId={referencePointerId}
    />
  );
};
