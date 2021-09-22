import React from "react";

import { cs } from "@utils";
import { Components } from "@types";

export type Props = {
  className?: string;
  children?: React.ReactNode;
};

export const Component: Components.Presenter<Props> = ({
  className,
  children,
}) => {
  const style = cs("notion-row", className);

  return <div className={style}>{children}</div>;
};
