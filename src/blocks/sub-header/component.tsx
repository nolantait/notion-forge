import React from "react";

import { View } from "@types";
import { cs } from "@utils";
import { Entity as SubHeaderBlock } from "./";
import { Heading } from "../";

export type Props = {
  block: SubHeaderBlock;
  className?: string;
};

export const SubHeaderComponent: View.Component<Props> = ({
  block,
  className,
}) => {
  const blockColor = block.blockColor.getOrElse("transparent");
  const id = block.uuid;

  const classNameStr = cs(
    "notion-h notion-h2",
    `notion-${blockColor}`,
    className
  );

  return (
    <h3 className={classNameStr} data-id={id}>
      <Heading block={block} />
    </h3>
  );
};
