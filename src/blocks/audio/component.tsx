import React from "react";

import { useNotionContext } from "@context";
import { cs } from "@utils";
import { Components } from "@types";
import { Entity as AudioBlock } from "./";

export type Props = {
  block: AudioBlock;
  className?: string;
};

export const AudioComponent: Components.Presenter<Props> = ({
  block,
  className,
}) => {
  const { recordMap } = useNotionContext();
  const signedUrl = recordMap.getSignedUrl(block.id).getOrElse("");
  const style = cs("notion-audio", className);

  return (
    <div className={style}>
      <audio controls preload="none" src={signedUrl} />
    </div>
  );
};
