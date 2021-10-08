import React from "react";

import { BlockRenderer } from "@src/renderer";
import { View } from "@types";
import { Entity as TransclusionReferenceBlock } from "./";

export type Props = {
  block: TransclusionReferenceBlock;
  level: number;
};

export const TransclusionReferenceComponent: View.Component<Props> = ({
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
