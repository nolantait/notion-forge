import React from "react";

import { NotionBlockRenderer } from "../renderer";
import { SyncPointerPresenter } from "@types";

export const SyncPointer: SyncPointerPresenter = ({ block, level }) => {
  const { format } = block;
  const referencePointerId = format.transclusion_reference_pointer.id;

  return (
    <NotionBlockRenderer
      key={referencePointerId}
      level={level}
      blockId={referencePointerId}
    />
  );
};
