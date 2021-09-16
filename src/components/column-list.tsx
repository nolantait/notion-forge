import React from "react";
import { cs } from "@utils";
import { ColumnListProps } from "@types";

export const ColumnList = (props: ColumnListProps) => {
  const { blockId, children } = props;
  const style = cs("notion-row", blockId);

  return <div className={style}>{children}</div>;
};
