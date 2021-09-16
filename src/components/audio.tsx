import React from "react";

import { useNotionContext } from "@context";
import { cs } from "@utils";
import { AudioProps } from "@types";

export const Audio = (props: AudioProps) => {
  const { block, className } = props;
  const { recordMap } = useNotionContext();
  const signedUrl = recordMap.signed_urls[block.id];

  return (
    <div className={cs("notion-audio", className)}>
      <audio controls preload="none" src={signedUrl} />
    </div>
  );
};
