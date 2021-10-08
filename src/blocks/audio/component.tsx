import React from "react";

import { useNotionContext } from "@context";
import { cs } from "@utils";
import { View } from "@types";
import { Entity as AudioBlock } from "./";
import { SignedUrl } from "@entities";

export type Props = {
  block: AudioBlock;
  className?: string;
};

export const AudioComponent: View.Component<Props> = ({ block, className }) => {
  const { recordMap } = useNotionContext();
  const signedUrl = recordMap
    .getSignedUrl(block.id)
    .getOrElse(new SignedUrl(""));
  const style = cs("notion-audio", className);

  return (
    <div className={style}>
      <audio controls preload="none" src={signedUrl.href} />
    </div>
  );
};
