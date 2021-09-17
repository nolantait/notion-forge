import React from "react";

import { cs } from "@utils";
import { useNotionContext } from "@context";
import { Notion, QuotePresenter } from "@types";

const defaultTitle: Notion.Decoration[] = [[""]];
const defaultProperties = { title: defaultTitle };

export const Quote: QuotePresenter = ({ block, blockId }) => {
  const { components } = useNotionContext();
  const { properties = defaultProperties } = block;
  const blockColor = block.format?.block_color;
  const title = properties.title;

  const style = cs(
    "notion-quote",
    blockColor && `notion-${blockColor}`,
    blockId
  );

  return (
    <blockquote className={style}>
      <components.text value={title} block={block} />
    </blockquote>
  );
};
