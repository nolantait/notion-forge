import React from "react";

import { Components } from "@types";
import { IFrame, AssetWrapper } from "@components";
import * as Blocks from "@blocks";

export type Props = {
  block: Blocks.Any;
};

export const TypeformComponent: Components.Presenter<Props> = ({ block }) => {
  return (
    <AssetWrapper block={block}>
      <IFrame block={block} />
    </AssetWrapper>
  );
};
