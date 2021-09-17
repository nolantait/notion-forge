import React from "react";

import { Notion, QuoteProps } from "@types";
import { cs } from "@utils";
import { useNotionContext } from "@context";

const defaultTitle: Notion.Decoration[] = [[""]];
const defaultProperties = { title: defaultTitle };

export const Quote = (props: QuoteProps): React.ReactElement => {
  const { components } = useNotionContext();
  const { block, blockId } = props;
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
