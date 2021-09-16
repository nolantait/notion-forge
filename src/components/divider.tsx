import React from "react";

import { cs } from "@utils";
import { DividerProps } from "@types";

export const Divider = ({ blockId }: DividerProps): JSX.Element => {
  return <hr className={cs("notion-hr", blockId)} />;
};
