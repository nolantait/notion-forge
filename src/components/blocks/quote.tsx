import React from "react";

import { cs } from "@utils";
import { useNotionContext } from "@context";
import { Components } from "@types";
import { QuoteBlock } from "@entities";

export type Props = {
  block: QuoteBlock;
  className?: string;
};

export const Component: Components.Presenter<Props> = ({
  block,
  className,
}) => {
  const { components } = useNotionContext();
  const { blockColor, title } = block;

  const style = cs("notion-quote", `notion-${blockColor}`, className);

  return (
    <blockquote className={style}>
      <components.text value={title} block={block} />
    </blockquote>
  );
};
