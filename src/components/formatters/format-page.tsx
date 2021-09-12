import React from "react";
import { PageFormat } from "notion-types";
import { useNotionContext } from "../../context";

export const FormatPage = (decorator: PageFormat): React.ReactNode => {
  const { components, recordMap, mapPageUrl } = useNotionContext();

  // link to an internal block (within the current workspace)
  const blockId = decorator[1];
  const linkedBlock = recordMap.block[blockId]?.value;
  if (!linkedBlock) {
    console.log('"p" missing block', blockId);
    return null;
  }

  return (
    <components.pageLink className="notion-link" href={mapPageUrl(blockId)}>
      <components.pageTitle block={linkedBlock} />
    </components.pageLink>
  );
};
