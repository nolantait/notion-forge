import React from "react";

import { NotionBlockRenderer } from "../renderer";
import { AliasProps } from "@types";

export const Alias = (props: AliasProps) => {
  const { block, level } = props;

  const referencePointerId = block.format.alias_pointer.id;

  if (!referencePointerId) throw new Error('Missing reference pointer id for alias block')

  return (
    <NotionBlockRenderer
      key={referencePointerId}
      level={level}
      blockId={referencePointerId}
    />
  );
};
