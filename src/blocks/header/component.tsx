import React from "react";

import { View } from "@types";
import { cs } from "@utils";
import { Entity as HeaderBlock } from "./";
import { Heading } from "../";

export type Props = {
  block: HeaderBlock;
  className?: string;
};

export const HeaderComponent: View.Component<Props> = ({
  block,
  className,
}) => {
  const blockColor = block.blockColor.getOrElse("transparent");
  const id = block.uuid;

  const classNameStr = cs(
    "notion-h notion-h1",
    `notion-${blockColor}`,
    className
  );

  //page title takes the h1 so all header blocks are greater
  return (
    <h2 className={classNameStr} data-id={id}>
      <Heading block={block} />
    </h2>
  );
};
