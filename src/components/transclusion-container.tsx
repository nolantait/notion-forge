import React from "react";
import { cs } from "../utils";

export const TransclusionContainer: React.FC<{
  blockId: string;
  children?: React.ReactNode;
}> = (props) => {
  const { blockId, children } = props;
  const style = cs("notion-sync-block", blockId);

  return <div className={style}>{children}</div>;
};
