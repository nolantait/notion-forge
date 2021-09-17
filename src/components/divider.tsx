import React from "react";

import { cs } from "@utils";
import { DividerPresenter } from "@types";

export const Divider: DividerPresenter = ({ blockId }): React.ReactElement => {
  return <hr className={cs("notion-hr", blockId)} />;
};
