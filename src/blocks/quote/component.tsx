import React from "react";

import { cs } from "@utils";
import { useNotionContext } from "@context";
import { View } from "@types";
import { Entity as QuoteBlock } from "./";
import { Decorated } from "@entities";

export type Props = {
  block: QuoteBlock;
  className?: string;
};

export const QuoteComponent: View.Component<Props> = ({ block, className }) => {
  const { components } = useNotionContext();

  const color = block.blockColor.getOrElse("transparent");
  const title = block.title.getOrElse(Decorated.empty());
  const style = cs("notion-quote", `notion-${color}`, className);

  return (
    <blockquote className={style}>
      <components.text value={title} block={block} />
    </blockquote>
  );
};
