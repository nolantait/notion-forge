import React from "react";

import { View } from "@types";
import { Entity as NumberedListBlock } from "./";
import { List } from "@blocks";

export type Props = {
  block: NumberedListBlock;
  className?: string;
  children?: React.ReactNode;
};

export const NumberedListComponent: View.Component<Props> = ({
  block,
  className,
  children,
}) => {
  return (
    <List block={block} className={className}>
      {children}
    </List>
  );
};
