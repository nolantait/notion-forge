import React from "react";

import { cs } from "@utils";
import { View } from "@types";

export type Props = {
  className?: string;
  children?: React.ReactNode;
};

export const ColumnListComponent: View.Component<Props> = ({
  className,
  children,
}) => {
  const style = cs("notion-row", className);

  return <div className={style}>{children}</div>;
};
