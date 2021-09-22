import React from "react";

import { BlockRenderer } from "../renderer";
import { Components } from "@types";
import { TransclusionReferenceBlock } from "@entities";

export type Props = {
  block: TransclusionReferenceBlock;
  level: number;
};

export const Component: Components.Presenter<Props> = ({ block, level }) => {
  const referencePointer = block.transclusionReferencePointer;

  return (
    <BlockRenderer
      key={referencePointer.id}
      level={level}
      blockId={referencePointer.id}
    />
  );
};
