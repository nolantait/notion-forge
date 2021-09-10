import React from "react";
import { cs } from "../utils";

interface SyncContainerProps {
  blockId: string;
  children?: React.ReactNode;
}

export const SyncContainer = (props: SyncContainerProps) => {
  const { children, blockId } = props;
  const style = cs("notion-sync-block", blockId);

  return <div className={style}>{children}</div>;
};
