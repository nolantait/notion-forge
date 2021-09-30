import React from "react";

import { cs } from "@utils";
import { useNotionContext } from "@context";
import { Components } from "@types";
import { Component as PageIcon } from "@components/page-icon";
import { Decorated, PageBlock } from "@entities";

export type Props = {
  block: PageBlock;
  className?: string;
};

export const Component: Components.Presenter<Props> = ({
  block,
  className,
}) => {
  const { components, defaultPageIcon } = useNotionContext();
  const title = block.title.getOrElse(new Decorated());
  const style = cs("notion-page-title", className);

  return (
    <span className={style}>
      <PageIcon
        block={block}
        defaultIcon={defaultPageIcon}
        className="notion-page-title-icon"
      />

      <span className="notion-page-title-text">
        <components.text value={title} block={block} />
      </span>
    </span>
  );
};
