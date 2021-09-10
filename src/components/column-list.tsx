import React from "react";
import { cs } from "../utils";

interface ColumnListProps {
  blockId: string;
  children: React.ReactNode;
}

export const ColumnList = (props: ColumnListProps) => {
  const { blockId, children } = props;
  const style = cs("notion-row", blockId);

  return <div className={style}>{children}</div>;
};
