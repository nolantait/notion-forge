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

interface AsideTableOfContentsParams {
  block: PageBlock;
}

interface TableOfContentsParams {
  blockId: string;
  block: PageBlock;
}

export const TableOfContents = (props: TableOfContentsParams) => {
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

export const AsideTableOfContents = (props: AsideTableOfContentsParams) => {
  // const throttleMs = 100;
  const { darkMode, recordMap } = useNotionContext();
  const { block } = props;
  // const [activeSection, _setActiveSection] = useScrollSpy(throttleMs);
  const toc = getPageTableOfContents(block, recordMap);

  return (
    <div className="notion-aside-table-of-contents">
      <div className="notion-aside-table-of-contents-header">
        Table of Contents
      </div>

      <nav
        className={cs("notion-table-of-contents", !darkMode && "notion-gray")}
      >
        {toc.map((tocItem) => {
          const id = uuidToId(tocItem.id);

          return (
            <a
              key={id}
              href={`#${id}`}
              className={cs(
                "notion-table-of-contents-item",
                `notion-table-of-contents-item-indent-level-${tocItem.indentLevel}`
                // activeSection === id && "notion-table-of-contents-active-item"
              )}
            >
              <span
                className="notion-table-of-contents-item-body"
                style={{
                  display: "inline-block",
                  marginLeft: tocItem.indentLevel * 16,
                }}
              >
                {tocItem.text}
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
};
