import React from "react";

import { View } from "@types";
import { IFrame, AssetWrapper } from "@components";
import { Entity as CodepenBlock } from "./";

export type Props = {
  block: CodepenBlock;
};

export const CodepenComponent: View.Component<Props> = ({ block }) => {
  return (
    <AssetWrapper block={block}>
      <IFrame block={block} />
    </AssetWrapper>
  );
};
