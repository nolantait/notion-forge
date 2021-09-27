import React from "react";

import { cs } from "@utils";
import { Components } from "@types";

export type Props = {
  className?: string;
};

export const Component: Components.Presenter<Props> = ({ className }) => {
  return <hr className={cs("notion-hr", className)} />;
};
