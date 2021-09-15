import { BaseBlock } from "notion-types";
import React from "react";

import { NotionBlockRenderer } from "../renderer";

interface AliasBlock extends BaseBlock {
  type: "alias";
  format: {
    alias_pointer: {
      id: string;
      table: string;
      spaceid: string;
    };
  };
}

export const Alias: React.FC<{
  block: AliasBlock;
  level: number;
}> = (props) => {
  const { block, level } = props;
  const { id } = block;

  if (!block) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("missing block", id);
    }
    return null;
  }

  const aliasPointerBlock = block;
  const referencePointerId = aliasPointerBlock?.format?.alias_pointer?.id;

  if (!referencePointerId) return null;

  return (
    <NotionBlockRenderer
      key={referencePointerId}
      level={level}
      blockId={referencePointerId}
    />
  );
};
