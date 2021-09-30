import React from "react";

import { Components } from "@types";
import { cs } from "@utils";

export type Props = {
  children?: React.ReactNode;
  className?: string;
};

export const TransclusionContainerComponent: Components.Presenter<Props> = ({
  children,
  className,
}) => {
  const style = cs("notion-sync-block", className);

  return <div className={style}>{children}</div>;
};
