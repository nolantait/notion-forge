import React from "react";

import { Components, Entities } from "@types";
import { LinkIcon } from "@icons";
import { useNotionContext } from "@context";
import {
  cs,
  getPageTableOfContents,
  getBlockParentPage,
  uuidToId,
} from "@utils";
import { PageBlock, Decorated } from "@entities";

const tocIndentLevelCache: {
  [blockId: string]: number;
} = {};

export type Props = {
  block:
    | Entities.HeaderBlock
    | Entities.SubHeaderBlock
    | Entities.SubSubHeaderBlock;
  className?: string;
};

export const Component: Components.Presenter<Props> = ({
  block,
  className,
}) => {
  const { recordMap, components } = useNotionContext();

  const { blockColor } = block;
  const id = uuidToId(block.id);
  const defaultTitle = new Decorated(`Notion header ${id}`);
  const title = block.title.getOrElse(defaultTitle).asString;

  // we use a cache here because constructing the ToC is non-trivial
  let indentLevel = tocIndentLevelCache[block.id];
  let indentLevelClass = "";

  if (indentLevel === undefined) {
    const dto = getBlockParentPage(block._dto, recordMap);

    if (dto) {
      const page = new PageBlock(dto);
      const toc = getPageTableOfContents(page._dto as any, recordMap);
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
    className
  );

  const innerHeader = (
    <span>
      <div id={id} className="notion-header-anchor" />

      <a className="notion-hash-link" href={`#${id}`} title={title}>
        <LinkIcon />
      </a>

      <span className="notion-h-title">
        <components.text value={block.title.asDecoration} block={block} />
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
