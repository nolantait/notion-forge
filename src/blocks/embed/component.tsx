import React from "react";

import { View } from "@types";
import { IFrame, AssetWrapper } from "@components";
import * as Blocks from "@blocks";

export type Props = {
  block: Blocks.Any;
};

export const EmbedComponent: View.Component<Props> = ({ block }) => {
  return (
    <AssetWrapper block={block}>
      <IFrame block={block} />
    </AssetWrapper>
  );
};