import React from "react";
import { cs } from "../utils";
import { PageBlock } from "notion-types";
import {
  getBlockParentPage,
  getPageTableOfContents,
  uuidToId,
} from "notion-utils";

// import useScrollSpy from "../hooks/use-scroll-spy";
import { useNotionContext } from "../context";

interface TOCParams {
  blockId: string;
  block: PageBlock;
}

export const TableOfContents: React.FC<TOCParams> = (props) => {
  const { recordMap } = useNotionContext();
  const { block, blockId } = props;

  const page = getBlockParentPage(block, recordMap);
  if (!page) return null;

  const toc = getPageTableOfContents(page, recordMap);
  const blockColor = block.format?.block_color;
  const style = cs(
    "notion-table-of-contents",
    blockId,
    blockColor && `notion-${blockColor}`
  );

  return (
    <div className={style}>
      {toc.map((tocItem) => (
        <a
          key={tocItem.id}
          href={`#${uuidToId(tocItem.id)}`}
          className="notion-table-of-contents-item"
        >
          <span
            className="notion-table-of-contents-item-body"
            style={{
              display: "inline-block",
              marginLeft: tocItem.indentLevel * 24,
            }}
          >
            {tocItem.text}
          </span>
        </a>
      ))}
    </div>
  );
};
