import React from "react";

import { Domain, View } from "@types";
import { IFrame, AssetWrapper } from "@components";

export type Props = {
  block: Domain.Blocks.Gist.Entity;
};

export const GistComponent: View.Component<Props> = ({ block }) => {
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
