import React from "react";

import { SyncContainerPresenter } from "@types";
import { cs } from "@utils";

export const SyncContainer: SyncContainerPresenter = ({
  children,
  blockId,
}) => {
  const style = cs("notion-sync-block", blockId);

  return <div className={style}>{children}</div>;
};
