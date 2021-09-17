import React from "react";

import { NotionBlockRenderer } from "../renderer";
import { AliasPresenter } from "@types";

export const Alias: AliasPresenter = ({ block, level }) => {
  const referencePointerId = block.format.alias_pointer.id;

  if (!referencePointerId) {
    throw new Error("Missing reference pointer id for alias block");
  }

  return (
    <NotionBlockRenderer
      key={referencePointerId}
      level={level}
      blockId={referencePointerId}
    />
  );
};
