import React from "react";

import { cs } from "@utils";
import { View } from "@types";

export type Props = {
  className?: string;
};

export const DividerComponent: View.Component<Props> = ({ className }) => {
  return <hr className={cs("notion-hr", className)} />;
};
