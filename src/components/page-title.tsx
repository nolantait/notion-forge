import React from "react";

import { cs, getBlockTitle, decorate } from "@utils";
import { useNotionContext } from "@context";
import { PageTitlePresenter } from "@types";

export const PageTitle: PageTitlePresenter = ({ block, className }) => {
  const { recordMap, components, defaultPageIcon } = useNotionContext();

  const title = getBlockTitle(block, recordMap);

  return (
    <span className={cs("notion-page-title", className)}>
      <components.pageIcon
        block={block}
        defaultIcon={defaultPageIcon}
        className="notion-page-title-icon"
      />

      <span className="notion-page-title-text">
        <components.text value={decorate(title)} block={block} />
      </span>
    </span>
  );
};
