import React from "react";
import { QuoteBlock } from "notion-types";
import { cs } from "../utils";
import { useNotionContext } from "../context";

interface QuoteProps {
  blockId: string;
  block: QuoteBlock;
}

export const Quote = (props: QuoteProps) => {
  const { components } = useNotionContext();
  const { block, blockId } = props;
  const { properties } = block;

  if (!properties) return null;

  const blockColor = block.format?.block_color;

  const style = cs(
    "notion-quote",
    blockColor && `notion-${blockColor}`,
    blockId
  );

  const title = properties.title ?? "";

  return (
    <blockquote className={style}>
      <components.text value={title} block={block} />
    </blockquote>
  );
};
