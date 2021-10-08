import React from "react";

import { View } from "@types";
import { cs } from "@utils";
import { Entity as SubSubHeaderBlock } from "./";
import { Heading } from "../";

export type Props = {
  block: SubSubHeaderBlock;
  className?: string;
};

export const SubSubHeaderComponent: View.Component<Props> = ({
  block,
  className,
}) => {
  const blockColor = block.blockColor.getOrElse("transparent");
  const id = block.uuid;

  const classNameStr = cs(
    "notion-h notion-h3",
    `notion-${blockColor}`,
    className
  );

  return (
    <h4 className={classNameStr} data-id={id}>
      <Heading block={block} />
    </h4>
  );
};
