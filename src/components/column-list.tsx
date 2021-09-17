import React from "react";

import { cs } from "@utils";
import { ColumnListPresenter } from "@types";

export const ColumnList: ColumnListPresenter = (props) => {
  const { blockId, children } = props;
  const style = cs("notion-row", blockId);

  return <div className={style}>{children}</div>;
};
