import React from "react";

import { BlockRenderer } from "@src/renderer";
import { Components } from "@types";
import { Entity as TransclusionReferenceBlock } from "./";

export type Props = {
  block: TransclusionReferenceBlock;
  level: number;
};

export const TransclusionReferenceComponent: Components.Presenter<Props> = ({
  block,
  level,
}) => {
  const referencePointer =
    block.transclusionReferencePointer.getOrElse(undefined);

  if (!referencePointer)
    throw new Error(`Missing reference pointer on ${block.id}`);

  return (
    <BlockRenderer
      key={referencePointer.id}
      level={level}
      blockId={referencePointer.id}
    />
  );
};
