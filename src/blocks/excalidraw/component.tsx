import React from "react";

import { Domain, View } from "@types";
import { IFrame, AssetWrapper } from "@components";

export type Props = {
  block: Domain.Blocks.Any;
};

export const ExcalidrawComponent: View.Component<Props> = ({ block }) => {
  return (
    <AssetWrapper block={block}>
      <IFrame block={block} />
    </AssetWrapper>
  );
};
