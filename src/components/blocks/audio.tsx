import React from "react";

import { useNotionContext } from "@context";
import { cs } from "@utils";
import { Components } from "@types";
import { AudioBlock } from "@entities";

export type Props = {
  block: AudioBlock;
  className?: string;
};

export const Component: Components.Presenter<Props> = ({
  block,
  className,
}) => {
  const { recordMap } = useNotionContext();
  const { id } = block;
  const signedUrl = recordMap.signed_urls[id];
  const style = cs("notion-audio", className);

  return (
    <div className={style}>
      <audio controls preload="none" src={signedUrl} />
    </div>
  );
};
