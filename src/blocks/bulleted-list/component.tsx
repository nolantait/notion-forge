import React from "react";

import { View } from "@types";
import { List } from "@blocks";
import { Entity as BulletedListBlock } from "./";

export type Props = {
  block: BulletedListBlock;
  className?: string;
  children?: React.ReactNode;
};

export const BulletedListComponent: View.Component<Props> = ({
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
