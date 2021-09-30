import React from "react";

import { Components } from "@types";
import { Entity as BulletedListBlock } from "./";
import { List } from "@blocks";

export type Props = {
  block: BulletedListBlock;
  className?: string;
  children?: React.ReactNode;
};

export const BulletedListComponent: Components.Presenter<Props> = ({
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
