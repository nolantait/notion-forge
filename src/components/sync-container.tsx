import React from "react";

import { SyncContainerProps } from "@types";
import { cs } from "@utils";

export const SyncContainer = (props: SyncContainerProps) => {
  const { children, blockId } = props;
  const style = cs("notion-sync-block", blockId);

  return <div className={style}>{children}</div>;
};
