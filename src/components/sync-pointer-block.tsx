import React from "react";

import { NotionBlockRenderer } from "../renderer";
import { SyncPointerProps } from "@types";

export const SyncPointer = (props: SyncPointerProps): JSX.Element => {
  const { block, level } = props;
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
