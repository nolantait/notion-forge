import React from "react";
import { SyncBlock } from "notion-types";
import { cs } from "../utils";

interface SyncContainerProps {
  block: SyncBlock;
  blockId: string;
  children?: React.ReactNode;
}

export const SyncContainer = (props: SyncContainerProps) => {
  const { children, blockId } = props;
  const style = cs("notion-sync-block", blockId);

  return <div className={style}>{children}</div>;
};
