import React from "react";

import { BlockRenderer } from "../../renderer";
import { View } from "@types";
import { Entity as AliasBlock } from "./";

export type Props = {
  block: AliasBlock;
  level: number;
};

export const AliasComponent: View.Component<Props> = ({ block, level }) => {
  const referencePointerId = block.aliasPointer.getOrElse({ id: undefined }).id;

  return (
    <BlockRenderer
      key={referencePointerId}
      level={level}
      blockId={referencePointerId}
    />
  );
};
