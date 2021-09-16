import React from "react";

import {
  cs,
  getTextContent,
  getPageTableOfContents,
  getBlockParentPage,
  uuidToId,
} from "@utils";
import { HeaderProps } from "@types";
import { LinkIcon } from "@icons";
import { useNotionContext } from "@context";

const tocIndentLevelCache: {
  [blockId: string]: number;
} = {};

export const Header = ({ block, blockId }: HeaderProps): JSX.Element => {
  const { recordMap, components } = useNotionContext();

  if (!block.properties) return <></>;

  const blockColor = block.format?.block_color;
  const id = uuidToId(block.id);
  const title = getTextContent(block.properties.title) || `Notion Header ${id}`;

  // we use a cache here because constructing the ToC is non-trivial
  let indentLevel = tocIndentLevelCache[block.id];
  let indentLevelClass: string = "";

  if (indentLevel === undefined) {
    const page = getBlockParentPage(block, recordMap);

    if (page) {
      const toc = getPageTableOfContents(page, recordMap);
      const tocItem = toc.find((tocItem) => tocItem.id === block.id);

      if (tocItem) {
        indentLevel = tocItem.indentLevel;
        tocIndentLevelCache[block.id] = indentLevel;
      }
    }
  }

  if (indentLevel !== undefined) {
    indentLevelClass = `notion-h-indent-${indentLevel}`;
  }

  const isH1 = block.type === "header";
  const isH2 = block.type === "sub_header";
  const isH3 = block.type === "sub_sub_header";

  const classNameStr = cs(
    isH1 && "notion-h notion-h1",
    isH2 && "notion-h notion-h2",
    isH3 && "notion-h notion-h3",
    blockColor && `notion-${blockColor}`,
    indentLevelClass,
    blockId
  );

  const innerHeader = (
    <span>
      <div id={id} className="notion-header-anchor" />

      <a className="notion-hash-link" href={`#${id}`} title={title}>
        <LinkIcon />
      </a>

      <span className="notion-h-title">
        <components.text value={block.properties.title} block={block} />
      </span>
    </span>
  );

  //page title takes the h1 so all header blocks are greater
  if (isH1) {
    return (
      <h2 className={classNameStr} data-id={id}>
        {innerHeader}
      </h2>
    );
  } else if (isH2) {
    return (
      <h3 className={classNameStr} data-id={id}>
        {innerHeader}
      </h3>
    );
  } else {
    return (
      <h4 className={classNameStr} data-id={id}>
        {innerHeader}
      </h4>
    );
  }
};
