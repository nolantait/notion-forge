import React from "react";

import { Components } from "@types";
import { Entity as NumberedListBlock } from "./";
import { List } from "@blocks";

export type Props = {
  block: NumberedListBlock;
  className?: string;
  children?: React.ReactNode;
};

export const NumberedListComponent: Components.Presenter<Props> = ({
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
