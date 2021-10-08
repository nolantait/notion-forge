import React from "react";

import { View, Domain } from "@types";
import { IFrame, AssetWrapper } from "@components";

export type Props = {
  block: Domain.Blocks.Any;
};

export const TypeformComponent: View.Component<Props> = ({ block }) => {
  return (
    <AssetWrapper block={block}>
      <IFrame block={block} />
    </AssetWrapper>
  );
};
