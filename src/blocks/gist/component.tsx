import React from "react";

import { Components } from "@types";
import { IFrame, AssetWrapper } from "@components";
import * as Blocks from "@blocks";

export type Props = {
  block: Blocks.Any;
};

export const GistComponent: Components.Presenter<Props> = ({ block }) => {
  let src = block.displaySource.getOrElse("");
  if (!src.length) throw new Error(`Could not parse github gist src ${src}`);
  if (!src.endsWith(".pibb")) {
    src = `${src}.pibb`;
  }

  return (
    <AssetWrapper block={block}>
      <IFrame block={block} title="Github Gist" src={src} />
    </AssetWrapper>
  );
};
